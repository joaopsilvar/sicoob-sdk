/**
 * Este módulo fornece funções para interagir com a API de cobrança bancária.
 * As funções fazem requisições a diferentes endpoints da API utilizando o pacote `client` padrão.
 *
 * Requisitos:
 * - Pacote `client` que fornece a classe `Client` para fazer requisições HTTP.
 * - Funções auxiliares de validação e esquemas de validação dos dados.
 *
 * Funções fornecidas:
 * 1. `incluirBoleto(data)`
 *    - Inclui um novo boleto no sistema.
 *    - Parâmetros:
 *      - `data` (Objeto contendo os dados do boleto a ser incluído, deve ser validado pelo `BoletoValidator`)
 *
 * 2. `consultarBoleto(numeroCliente, codigoModalidade, nossoNumero, linhaDigitavel, codigoBarras)`
 *    - Consulta um boleto com base nos parâmetros fornecidos.
 *    - Parâmetros:
 *      - `numeroCliente` (Número do cliente)
 *      - `codigoModalidade` (Código da modalidade do boleto)
 *      - `nossoNumero` (Número do boleto, opcional)
 *      - `linhaDigitavel` (Linha digitável do boleto, opcional)
 *      - `codigoBarras` (Código de barras do boleto, opcional)
 *    - Regras:
 *      - Pelo menos um dos parâmetros opcionais (`nossoNumero`, `linhaDigitavel`, `codigoBarras`) deve ser enviado.
 *
 * 3. `listarBoletosPagador(numeroCliente, cpfCnpj, codigoSituacao, dataInicio, dataFim)`
 *    - Lista todos os boletos de um pagador específico.
 *    - Parâmetros:
 *      - `numeroCliente` (Número do cliente)
 *      - `cpfCnpj` (CPF ou CNPJ do pagador)
 *      - `codigoSituacao` (Código da situação dos boletos)
 *      - `dataInicio` (Data de início do período de busca, opcional)
 *      - `dataFim` (Data de fim do período de busca, opcional)
 *
 * 4. `emitirSegundaVia(numeroCliente, codigoModalidade, nossoNumero, linhaDigitavel, codigoBarras, gerarPdf, numeroContratoCobranca)`
 *    - Emite a segunda via de um boleto.
 *    - Parâmetros:
 *      - `numeroCliente` (Número do cliente)
 *      - `codigoModalidade` (Código da modalidade do boleto)
 *      - `nossoNumero` (Número do boleto, opcional)
 *      - `linhaDigitavel` (Linha digitável do boleto, opcional)
 *      - `codigoBarras` (Código de barras do boleto, opcional)
 *      - `gerarPdf` (Flag para gerar o PDF da segunda via, obrigatório)
 *      - `numeroContratoCobranca` (Número do contrato de cobrança, opcional)
 *    - Regras:
 *      - Pelo menos um dos parâmetros opcionais (`nossoNumero`, `linhaDigitavel`, `codigoBarras`) deve ser enviado.
 *      - `gerarPdf` é obrigatório e deve ser um booleano.
 *
 * 5. `alterarDadosBoleto(nossoNumero, boletoUpdate)`
 *    - Altera os dados de um boleto existente.
 *    - Parâmetros:
 *      - `nossoNumero` (Número do boleto a ser alterado)
 *      - `boletoUpdate` (Objeto contendo os dados atualizados do boleto, deve ser validado pelo `AlterarBoletoValidator`)
 *
 * 6. `baixarBoleto(nossoNumero, data)`
 *    - Solicita o baixar de um boleto.
 *    - Parâmetros:
 *      - `nossoNumero` (Número do boleto a ser baixado)
 *      - `data` (Objeto contendo os dados necessários para o baixar, deve ser validado pelo `BaixarBoletoValidator`)
 *
 * Dependências:
 * - `client`: Pacote que fornece a classe `Client` para fazer requisições HTTP.
 * - `scopes`: Objeto contendo os escopos necessários para autenticação e autorização.
 * - `validator`: Validador de esquemas para diferentes operações de boletos.
 * - `validarParametrosObrigatorios`: Função auxiliar para validar a presença de parâmetros obrigatórios.
 */

const Client = require('../client/client');
const { validarParametrosObrigatorios } = require('../utils');
const { scopes } = require('../client/scopes');
const { validator } = require('./schemas/validators');

// Função para incluir um boleto
async function incluirBoleto(data) {
    const { error } = validator.BoletoValidator.validate(data);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    return await client.request({
        method: 'POST',
        endpoint: '/cobranca-bancaria/v3/boletos',
        scope: scopes.BOLETOS_INCLUSAO,
        data
    });
}

// Função para consultar um boleto
async function consultarBoleto(
    numeroCliente,
    codigoModalidade,
    nossoNumero = null,
    linhaDigitavel = null,
    codigoBarras = null
) {
    validarParametrosObrigatorios({ numeroCliente, codigoModalidade });

    if (!nossoNumero && !linhaDigitavel && !codigoBarras) {
        throw new Error(
            'Pelo menos um dos parâmetros deve ser enviado: nossoNumero, linhaDigitavel, codigoBarras'
        );
    }

    const client = new Client();
    return await client.request({
        method: 'GET',
        endpoint: '/cobranca-bancaria/v3/boletos',
        params: {
            numeroCliente,
            codigoModalidade,
            nossoNumero,
            linhaDigitavel,
            codigoBarras
        },
        scope: scopes.BOLETOS_CONSULTA
    });
}

// Função para listar boletos de um pagador
async function listarBoletosPagador(
    numeroCliente,
    cpfCnpj,
    codigoSituacao,
    dataInicio = null,
    dataFim = null
) {
    validarParametrosObrigatorios({ numeroCliente, cpfCnpj, codigoSituacao });

    const client = new Client();
    return await client.request({
        method: 'GET',
        endpoint: `/cobranca-bancaria/v3/pagadores/${cpfCnpj}/boletos`,
        params: {
            numeroCliente,
            codigoSituacao,
            dataInicio,
            dataFim
        },
        scope: scopes.BOLETOS_CONSULTA
    });
}

// Função para emitir a segunda via de um boleto
async function emitirSegundaVia(
    numeroCliente,
    codigoModalidade,
    nossoNumero = null,
    linhaDigitavel = null,
    codigoBarras = null,
    gerarPdf = true,
    numeroContratoCobranca = null
) {
    validarParametrosObrigatorios({
        numeroCliente,
        codigoModalidade,
        gerarPdf
    });

    if (!nossoNumero && !linhaDigitavel && !codigoBarras) {
        throw new Error(
            'Pelo menos um dos parâmetros deve ser enviado: nossoNumero, linhaDigitavel, codigoBarras'
        );
    }

    const client = new Client();
    return await client.request({
        method: 'GET',
        endpoint: '/cobranca-bancaria/v3/boletos/segunda-via',
        params: {
            numeroCliente,
            codigoModalidade,
            nossoNumero,
            linhaDigitavel,
            codigoBarras,
            gerarPdf,
            numeroContratoCobranca
        },
        scope: scopes.BOLETOS_CONSULTA
    });
}

// Função para alterar dados de um boleto
async function alterarDadosBoleto(nossoNumero, boletoUpdate) {
    validarParametrosObrigatorios({ nossoNumero });

    const { error } = validator.AlterarBoletoValidator.validate(boletoUpdate);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    return await client.request({
        method: 'PATCH',
        endpoint: `/cobranca-bancaria/v3/boletos/${nossoNumero}`,
        scope: scopes.BOLETOS_ALTERACAO,
        data: boletoUpdate
    });
}

// Função para baixar um boleto
async function baixarBoleto(nossoNumero, data) {
    validarParametrosObrigatorios({ nossoNumero });

    const { error } = validator.BaixarBoletoValidator.validate(data);
    if (error) {
        throw new Error(`Erro na validação dos dados: ${error.message}`);
    }

    const client = new Client();
    return await client.request({
        method: 'POST',
        endpoint: `/cobranca-bancaria/v3/boletos/${nossoNumero}/baixar`,
        scope: scopes.BOLETOS_ALTERACAO,
        data
    });
}

module.exports = {
    incluirBoleto,
    consultarBoleto,
    listarBoletosPagador,
    emitirSegundaVia,
    alterarDadosBoleto,
    baixarBoleto
};