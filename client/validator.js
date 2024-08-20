const Joi = require('joi');

/**
 * Valida a configuração de uma requisição com base em um esquema predefinido.
 * 
 * @param {Object} config - A configuração da requisição a ser validada.
 * @param {string} config.method - O método HTTP da requisição. Pode ser 'GET', 'POST', 'PUT', 'PATCH' ou 'DELETE'.
 * @param {string} config.endpoint - O endpoint da API relativo à baseUrl. Este campo é obrigatório.
 * @param {string} [config.scope] - O escopo da requisição. Este campo é obrigatório se `accessTokenCache` não for fornecido; caso contrário, ele é proibido.
 * @param {Object} [config.data] - O corpo da requisição. Este campo é obrigatório se o método for 'POST', 'PUT' ou 'PATCH'; caso contrário, ele é proibido.
 * @param {Object} [config.params] - Parâmetros opcionais para a URL da requisição.
 * @param {Object} [config.addHeaders] - Cabeçalhos adicionais para a requisição. Alguns endpoints necessitam de headers específicos além dos já preconfigurados por padrão na request.
 * @param {string} [config.accessTokenCache] - Cache do token de acesso. Se fornecido, o campo `scope` é proibido.
 * 
 * @throws {Error} Lança um erro se a configuração fornecida for inválida.
 */
function validateRequestConfig(config) {
    const schema = Joi.object({
        method: Joi.string().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').insensitive().required(),
        endpoint: Joi.string().required(),
        scope: Joi.string().when('accessTokenCache', {
            is: Joi.exist(),
            then: Joi.forbidden(),
            otherwise: Joi.required()
        }),
        data: Joi.object().when('method', {
            is: Joi.string().valid('POST', 'PUT', 'PATCH').insensitive(),
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),
        params: Joi.object().optional(),
        addHeaders: Joi.object().optional(),
        accessTokenCache: Joi.string().optional()
    });

    const { error, value } = schema.validate(config);
    return { error, value }
}

module.exports = { validateRequestConfig };