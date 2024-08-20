const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Cria um agente HTTPS utilizando um certificado PFX.
 * 
 * Esta função lê um arquivo de certificado PFX a partir do caminho fornecido e 
 * cria um agente HTTPS configurado com o certificado e a senha fornecidos. 
 * Para todas as APIs do Sicoob, é obrigatório fornecer este agente HTTPS na 
 * requisição.
 * 
 * @param {string} certPath - O caminho relativo para o arquivo PFX. O caminho é 
 * relativo ao diretório onde o script está localizado.
 * @param {string} certPassword - A senha para o arquivo PFX.
 * 
 * @returns {https.Agent} Um agente HTTPS configurado com o certificado PFX e a senha.
 * 
 * @throws {Error} Se houver um problema ao ler o arquivo PFX, um erro será lançado 
 * com a mensagem apropriada.
 * 
 * @example
 * const { getCertificateAgent } = require('./path/to/your/module');
 * 
 * const agent = getCertificateAgent('path/to/certificate.pfx', 'your_password');
 */
function getCertificateAgent(certPath, certPassword) {
    try {
        const pfxPath = path.join(__dirname, certPath);
        const pfx = fs.readFileSync(pfxPath);
        return new https.Agent({
            pfx,
            passphrase: certPassword
        });
    } catch (error) {
        throw new Error(`Erro ao ler o arquivo PFX: ${error.message}`);
    }
}

module.exports = { getCertificateAgent };