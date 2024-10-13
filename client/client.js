const axios = require('axios')
const { envVars } = require('./env')
const { getCertificateAgent } = require('./certs')
const { validateRequestConfig } = require('./validator')

/**
 * Cliente para interagir com APIs do Sicoob que são protegidas por OAuth2 (Client Credentials).
 * 
 * @class
 */
class Client {
    constructor() {
        this.baseUrlAuth = envVars.BASE_URL_AUTH
        this.clientId = envVars.CLIENT_ID
        this.certAgent = getCertificateAgent(envVars.CERTIFICATE_PATH, envVars.CERTIFICATE_PASSWORD)
        this.baseUrl = envVars.BASE_URL
    }

    /**
     * Obtém um token de acesso para escopo(s) específico(s).
     * 
     * @param {string} scope - O escopo para o qual o token de acesso é solicitado. Deve ser passado como uma string contendo um ou mais escopos, separados por espaços.
     * @param {boolean} [metaToken=false] - Se verdadeiro, retorna o objeto data completo da resposta. Por padrão, retorna apenas o `access_token`.
     * 
     * @returns {Promise<string|Object|null>} Retorna o `access_token` como uma string, ou o objeto completo da resposta, ou `null` se não for possível obter o token.
     * 
     * @throws {Error} Se o parâmetro `scope` estiver ausente ou não for uma string.
     */
    async getAccessToken(scope, metaToken = false) {
        if (!scope || typeof scope !== 'string') {
            throw new Error("O parâmetro 'scope' é obrigatório e deve ser do tipo string.")
        }

        const reqConfig = {
            method: 'POST',
            url: `${this.baseUrlAuth}/auth/realms/cooperado/protocol/openid-connect/token`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: this.clientId,
                scope: scope
            }),
            httpsAgent: this.certAgent
        }

        try {
            const response = await axios(reqConfig)
            return metaToken ? response.data : response.data.access_token
        } catch (error) {
            throw new Error('Erro ao obter o accessToken: ' + (error.response?.data || error.message))
        }
    }

    /**
     * Realiza uma requisição HTTP configurada, considerando o modelo das requisições aceitas 
     * nas APIs do SICOOB
     * 
     * @param {Object} config - Configuração da requisição.
     * @param {string} config.method - O método HTTP (GET, POST, PUT, PATCH, DELETE).
     * @param {string} config.endpoint - O endpoint da API relativo à `baseUrl`.
     * @param {string} [config.scope] - O escopo para obter o token de acesso, se não fornecido o `accessTokenCache`.
     * @param {Object} [config.data] - Dados a serem enviados no corpo da requisição.
     * @param {Object} [config.params] - Parâmetros a serem passados na URL da requisição.
     * @param {Object} [config.addHeaders] - Cabeçalhos adicionais para a requisição. Considerando que alguns endpoints
     * necessitam de Headers adicionais ao padrão.
     * @param {string} [config.accessTokenCache] - Token de acesso já obtido e reutilizado na requisição. Enviando
     * esse parâmetro não será obtido um novo Token de acesso antes de realizar a requisição.
     * 
     * @returns {Promise<Object>} A resposta da requisição.
     * 
     * @throws {Error} Se a configuração da requisição for inválida ou se ocorrer um erro na requisição.
     */
    async request(config) {
        const { error } = validateRequestConfig(config)
        if (error) {
            throw new Error(`Configuração da requisição inválida: ${error.message}`)
        }

        let accessToken = config.accessTokenCache || await this.getAccessToken(config.scope)
        if (!accessToken) {
            throw new Error("Falha ao obter o token de acesso.")
        }

        let url = `${this.baseUrl}${config.endpoint}`;
        if (config.params) {
            // Remove valores undefined e null
            const filteredParams = Object.fromEntries(
                Object.entries(config.params)
                    .filter(([_, value]) => value !== undefined && value !== null)
            );

            const params = new URLSearchParams(filteredParams).toString();
            url = params ? `${url}?${params}` : url;
        }

        let headers = {
            client_id: this.clientId,
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...config.addHeaders || {} //Caso houver headers adicionais enviados na config
        }

        const requestConfig = {
            url,
            method: config.method,
            headers,
            httpsAgent: this.certAgent
        }

        if (['POST', 'PUT', 'PATCH'].includes(config.method.toUpperCase())) {
            requestConfig.headers["Content-Type"] = 'application/json'
            requestConfig.data = config.data
        }

        try {
            const response = await axios(requestConfig)
            return response
        } catch (error) {
            console.error('Erro na requisição:', error.response?.data || error.message)
            throw error
        }
    }
}

module.exports = Client