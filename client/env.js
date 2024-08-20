const Joi = require('joi');
require('dotenv').config({ path: '../.env' });

/**
 * Esquema de validação para as variáveis de ambiente.
 * 
 * @typedef {Object} EnvVars
 * @property {string} CLIENT_ID - Ao gerar um aplicativo no Portal Developers, um `client_id` é gerado. O aplicativo pode ser criado em https://developers.sicoob.com.br. Na geração do aplicativo, lembre-se de habilitar os escopos necessários a serem utilizados. 
 * @property {string} CERTIFICATE_PATH - Caminho para o certificado PFX, obrigatório.
 * @property {string} CERTIFICATE_PASSWORD - Senha para o certificado PFX, obrigatório.
 * @property {string} BASE_URL - URL base para a API, obrigatório.
 * @property {string} BASE_URL_AUTH - URL base para autenticação, obrigatório.
 */

const envSchema = Joi.object({
    CLIENT_ID: Joi.string().required(),
    CERTIFICATE_PATH: Joi.string().required(),
    CERTIFICATE_PASSWORD: Joi.string().required(),
    BASE_URL: Joi.string().required(),
    BASE_URL_AUTH: Joi.string().required(),
}).unknown().required();

/**
 * Validação das variáveis de ambiente.
 * 
 * O processo de validação verifica se as variáveis de ambiente obrigatórias 
 * estão presentes e seguem o formato esperado. Em caso de erro, uma exceção 
 * será lançada.
 * 
 * @throws {Error} Se qualquer variável de ambiente obrigatória estiver ausente ou inválida.
 * 
 * @type {EnvVars} envVars - Variáveis de ambiente validadas.
 */
const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Configuração de ambiente inválida: ${error.message}`);
}

module.exports = { envVars };