/**
 * Este módulo fornece funções para interagir com a API de pagamentos via PIX do Sicoob.
 * As funções fazem requisições a diferentes endpoints da API utilizando o pacote `client` padrão.
 *
 * Requisitos:
 * - Pacote `client` que fornece a classe `Client` para fazer requisições HTTP.
 * - Funções auxiliares de validação e esquemas de validação dos dados.
 *
 * Funções fornecidas:
 * 1. `validarParametrosObrigatorios(parametros)`
 *    - Valida se todos os parâmetros obrigatórios foram fornecidos.
 *    - Parâmetros:
 *      - `parametros` (Objeto com pares chave-valor onde cada chave é o nome do parâmetro e cada valor é o valor do parâmetro)
 *    - Lança um erro se algum dos parâmetros obrigatórios estiver ausente ou vazio.
 *
 * 2. `iniciarPagamentoPix(data)`
 *    - Inicia um pagamento via PIX.
 *    - Parâmetros:
 *      - `data` (Objeto contendo os detalhes do pagamento, deve ser validado pelo `iniciarPagamentoPixValidator`)
 *    - Valida os dados usando `iniciarPagamentoPixValidator`.
 *    - Faz uma requisição `POST` para o endpoint `/pix-pagamentos/v2/pagamentos`.
 *    - Retorna a resposta da requisição.
 *
 * 3. `confirmarPagamentoPix(data)`
 *    - Confirma um pagamento via PIX.
 *    - Parâmetros:
 *      - `data` (Objeto contendo os detalhes da confirmação do pagamento, deve ser validado pelo `confirmarPagamentoPixValidator`)
 *    - Valida os dados usando `confirmarPagamentoPixValidator`.
 *    - Faz uma requisição `POST` para o endpoint `/pix-pagamentos/v2/pagamentos/confirmacao`.
 *    - Retorna a resposta da requisição.
 *
 * 4. `consultarPagamentoPix(endToEndId)`
 *    - Consulta o status de um pagamento via PIX.
 *    - Parâmetros:
 *      - `endToEndId` (Identificador único do pagamento via PIX)
 *    - Valida a presença do parâmetro obrigatório: `endToEndId`.
 *    - Faz uma requisição `GET` para o endpoint `/pix-pagamentos/v2/pagamentos/{endToEndId}`.
 *    - Retorna a resposta da requisição.
 *
 * Dependências:
 * - `client`: Pacote que fornece a classe `Client` para fazer requisições HTTP.
 * - `scopes`: Objeto contendo os escopos necessários para autenticação e autorização.
 * - `validator`: Objeto contendo validadores de esquema para diferentes operações de pagamento PIX.
 */

const Client = require('../client/client');
const { scopes } = require('../client/scopes');
const { validator } = require('./schemas/validators');
const { validarParametrosObrigatorios } = require('../utils');


// Função para iniciar pagamento via PIX
async function iniciarPagamentoPix(data) {
    const { error } = validator.iniciarPagamentoPixValidator.validate(data);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    const response = await client.request({
        method: 'POST',
        endpoint: '/pix-pagamentos/v2/pagamentos',
        scope: scopes.PIXPAGAMENTOS_ESCRITA,
        data
    });
    return response;
}

// Função para confirmar pagamento via PIX
async function confirmarPagamentoPix(data) {
    const { error } = validator.confirmarPagamentoPixValidator.validate(data);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    const response = await client.request({
        method: 'POST',
        endpoint: '/pix-pagamentos/v2/pagamentos/confirmacao',
        scope: scopes.PIXPAGAMENTOS_ESCRITA,
        data
    });
    return response;
}

// Função para consultar pagamento via PIX
async function consultarPagamentoPix(endToEndId) {
    validarParametrosObrigatorios({ endToEndId });

    const client = new Client();
    const response = await client.request({
        method: 'GET',
        endpoint: `/pix-pagamentos/v2/pagamentos/${endToEndId}`,
        scope: scopes.PIXPAGAMENTOS_CONSULTA
    });
    return response;
}

module.exports = {
    iniciarPagamentoPix,
    confirmarPagamentoPix,
    consultarPagamentoPix
};