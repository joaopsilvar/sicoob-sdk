/**
 * Este módulo fornece funções para interagir com a API de contas corrente do Sicoob.
 * As funções fazem requisições a diferentes endpoints da API utilizando o pacote `client` padrão.
 *
 * Requisitos:
 * - Pacote `client` que fornece a classe `Client` para fazer requisições HTTP.
 * - Pacote `uuid` para gerar identificadores únicos.
 * - Funções auxiliares de validação e esquemas de validação dos dados.
 *
 * Funções fornecidas:
 * 1. `emitirExtratoCCO(mes, ano, numeroContaCorrente, diaInicial, diaFinal, agruparCNAB)`
 *    - Emite um extrato da conta corrente especificada para o mês e ano fornecidos.
 *    - Parâmetros:
 *      - `mes` (Número do mês do extrato)
 *      - `ano` (Número do ano do extrato)
 *      - `numeroContaCorrente` (Número da conta corrente)
 *      - `diaInicial` (Data inicial para o extrato, opcional)
 *      - `diaFinal` (Data final para o extrato, opcional)
 *      - `agruparCNAB` (Flag para agrupar o extrato no advindo da origem CNAB, opcional)
 *
 * 2. `getSaldo(numeroContaCorrente)`
 *    - Obtém o saldo da conta corrente especificada.
 *    - Parâmetros:
 *      - `numeroContaCorrente` (Número da conta corrente)
 *
 * 3. `transferenciaEntreContaSicoob(transferenciaEntreContaDTO)`
 *    - Realiza uma transferência entre contas Sicoob.
 *    - Parâmetros:
 *      - `transferenciaEntreContaDTO` (Objeto contendo detalhes da transferência)
 *
 * Dependências:
 * - `client`: Pacote que fornece a classe `Client` para fazer requisições HTTP.
 * - `scopes`: Objeto contendo os escopos necessários para autenticação e autorização.
 * - `uuid`: Pacote para gerar identificadores únicos.
 * - `transferenciaEntreContaDTOValidator`: Validador de esquema para transferências entre contas.
 * - `validarParametrosObrigatorios`: Função auxiliar para validar a presença de parâmetros obrigatórios.
 */

const Client = require('../client/client');
const { scopes } = require('../client/scopes');
const { v4: uuidv4 } = require('uuid');
const { transferenciaEntreContaDTOValidator } = require('./schemas/validators');
const { validarParametrosObrigatorios } = require('../utils');

// Função para emitir extrato de conta corrente
async function emitirExtratoCCO(
    mes,
    ano,
    numeroContaCorrente,
    diaInicial = null,
    diaFinal = null,
    agruparCNAB = null
) {
    validarParametrosObrigatorios({ mes, ano, numeroContaCorrente });

    const client = new Client();
    return await client.request({
        method: 'GET',
        endpoint: `/conta-corrente/v4/extrato/${mes}/${ano}`,
        params: { numeroContaCorrente, diaInicial, diaFinal, agruparCNAB },
        scope: scopes.CCO_CONSULTA
    });
}

// Função para obter saldo
async function getSaldo(numeroContaCorrente) {
    validarParametrosObrigatorios({ numeroContaCorrente });

    const client = new Client();
    return await client.request({
        method: 'GET',
        endpoint: '/conta-corrente/v4/saldo',
        params: { numeroContaCorrente },
        scope: scopes.CCO_CONSULTA
    });
}

// Função para transferir entre contas Sicoob
async function transferenciaEntreContaSicoob(transferenciaEntreContaDTO) {
    const { error } = transferenciaEntreContaDTOValidator.validate(transferenciaEntreContaDTO);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    const { access_token, id_token } = await client.getAccessToken(
        `${scopes.OPEN_ID} ${scopes.CCO_TRANSFERENCIAS}`,
        true
    );

    if (!id_token) {
        throw new Error('Erro ao obter id_token, favor verificar o scope enviado na requisição.');
    }

    return await client.request({
        method: 'POST',
        endpoint: '/conta-corrente/v4/transferencias',
        data: transferenciaEntreContaDTO,
        accessTokenCache: access_token,
        addHeaders: {
            id_token,
            'x-idempotency-key': uuidv4()
        }
    });
}

module.exports = {
    emitirExtratoCCO,
    getSaldo,
    transferenciaEntreContaSicoob
};