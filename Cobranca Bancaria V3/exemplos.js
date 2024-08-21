const { incluirBoleto,
    alterarDadosBoleto,
    baixarBoleto,
    consultarBoleto,
    listarBoletosPagador,
    emitirSegundaVia
} = require('./api');
const { enums } = require('./schemas/enums');


// Exemplo de utilizacao do endpoint POST /cobranca-bancaria/v3/boletos
const boleto = {
    "numeroCliente": process.env.NUMERO_CLIENTE_COBRANCA,
    "codigoModalidade": enums.codigoModalidade.SIMPLES_COM_REGISTRO,
    "numeroContaCorrente": 0,
    "codigoEspecieDocumento": enums.codigoEspecieDocumento.DUPLICATA_MERCANTIL,
    "dataEmissao": "2018-09-20",
    "nossoNumero": 2588658,
    "seuNumero": "1235512",
    "identificacaoBoletoEmpresa": "4562",
    "identificacaoEmissaoBoleto": enums.identificacaoEmissaoBoleto.CLIENTE_EMITE,
    "identificacaoDistribuicaoBoleto": enums.identificacaoDistribuicaoBoleto.CLIENTE_DISTRIBUI,
    "valor": 156.23,
    "dataVencimento": "2018-09-20",
    "dataLimitePagamento": "2018-09-20",
    "valorAbatimento": 1,
    "tipoDesconto": enums.tipoDesconto.VALOR_FIXO_ATE_DATA_INFORMADA,
    "dataPrimeiroDesconto": "2018-09-20",
    "valorPrimeiroDesconto": 1,
    "dataSegundoDesconto": "2018-09-20",
    "valorSegundoDesconto": 0,
    "dataTerceiroDesconto": "2018-09-20",
    "valorTerceiroDesconto": 0,
    "tipoMulta": enums.tipoMulta.VALOR_FIXO,
    "dataMulta": "2018-09-20",
    "valorMulta": 5,
    "tipoJurosMora": enums.tipoJurosMora.VALOR_POR_DIA,
    "dataJurosMora": "2018-09-20",
    "valorJurosMora": 4,
    "numeroParcela": 1,
    "aceite": true,
    "codigoNegativacao": enums.codigoNegativacao.NEGATIVAR_DIAS_UTEIS,
    "numeroDiasNegativacao": 60,
    "codigoProtesto": enums.codigoProtesto.PROTESTAR_DIAS_CORRIDOS,
    "numeroDiasProtesto": 30,
    "pagador": {
        "numeroCpfCnpj": "98765432185",
        "nome": "Marcelo dos Santos",
        "endereco": "Rua 87 Quadra 1 Lote 1 casa 1",
        "bairro": "Santa Rosa",
        "cidade": "Luziânia",
        "cep": "72320000",
        "uf": "DF",
        "email": "pagador@dominio.com.br"
    },
    "beneficiarioFinal": {
        "numeroCpfCnpj": "98784978699",
        "nome": "Lucas de Lima"
    },
    "mensagensInstrucao": [
        "Descrição da Instrução 1",
        "Descrição da Instrução 2",
        "Descrição da Instrução 3",
        "Descrição da Instrução 4",
        "Descrição da Instrução 5"
    ],
    "gerarPdf": false,
    "rateioCreditos": [
        {
            "numeroBanco": 756,
            "numeroAgencia": 4027,
            "numeroContaCorrente": 0,
            "contaPrincipal": true,
            "codigoTipoValorRateio": enums.codigoTipoValorRateio.PERCENTUAL,
            "valorRateio": 100,
            "codigoTipoCalculoRateio": enums.codigoTipoCalculoRateio.VALOR_COBRADO,
            "numeroCpfCnpjTitular": "98765432185",
            "nomeTitular": "Marcelo dos Santos",
            "codigoFinalidadeTed": enums.codigoFinalidadeTed.CREDITO_EM_CONTA,
            "codigoTipoContaDestinoTed": enums.codigoTipoContaDestinoTed.CONTA_CORRENTE,
            "quantidadeDiasFloat": 1,
            "dataFloatCredito": "2020-12-30"
        }
    ],
    "codigoCadastrarPIX": enums.codigoCadastrarPIX.COM_PIX,
    "numeroContratoCobranca": process.env.NUMERO_CONTRATO_COBRANCA
}
incluirBoleto(boleto)
    .then(response => {
        console.log('Incluir Boleto:', response.data);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });

// Exemplo de utilizacao do endpoint PATCH /cobranca-bancaria/v3/boletos/${nossoNumero}
const updateBoleto = {
    "numeroCliente": process.env.NUMERO_CLIENTE_COBRANCA,
    "codigoModalidade": enums.codigoModalidade.SIMPLES_COM_REGISTRO,
    "numeroContratoCobranca": process.env.NUMERO_CONTRATO_COBRANCA,
    "especieDocumento": {
        "codigoEspecieDocumento": enums.codigoEspecieDocumento.DUPLICATA_MERCANTIL
    },
    "seuNumero": {
        "seuNumero": "209",
        "identificacaoBoletoEmpresa": "209"
    },
    "desconto": {
        "tipoDesconto": enums.tipoDesconto.VALOR_FIXO_ATE_DATA_INFORMADA,
        "dataPrimeiroDesconto": "2018-09-20",
        "valorPrimeiroDesconto": 1,
        "dataSegundoDesconto": "2018-09-20",
        "valorSegundoDesconto": 0,
        "dataTerceiroDesconto": "2018-09-20",
        "valorTerceiroDesconto": 0
    },
    "abatimento": {
        "valorAbatimento": 156.23
    },
    "multa": {
        "tipoMulta": enums.tipoMulta.VALOR_FIXO,
        "dataMulta": "2018-09-20",
        "valorMulta": 5
    },
    "jurosMora": {
        "tipoJurosMora": enums.tipoJurosMora.VALOR_POR_DIA,
        "dataJurosMora": "2018-09-20",
        "valorJurosMora": 4
    },
    "rateioCredito": {
        "tipoOperacao": 2,
        "rateioCreditos": [
            {
                "numeroBanco": 756,
                "numeroAgencia": 4027,
                "numeroContaCorrente": 0,
                "contaPrincipal": true,
                "codigoTipoValorRateio": enums.codigoTipoValorRateio.PERCENTUAL,
                "valorRateio": 100,
                "codigoTipoCalculoRateio": enums.codigoTipoCalculoRateio.VALOR_COBRADO,
                "numeroCpfCnpjTitular": "98765432185",
                "nomeTitular": "Marcelo dos Santos",
                "codigoFinalidadeTed": enums.codigoFinalidadeTed.CREDITO_EM_CONTA,
                "codigoTipoContaDestinoTed": enums.codigoTipoContaDestinoTed.CONTA_CORRENTE,
                "quantidadeDiasFloat": 1,
                "dataFloatCredito": "2020-12-30"
            }
        ]
    },
    "pix": {
        "utilizarPix": false
    },
    "prorrogacaoVencimento": {
        "dataVencimento": "2018-09-20"
    },
    "prorrogacaoLimitePagamento": {
        "dataLimitePagamento": "2018-09-20"
    },
    "valorNominal": {
        "valor": 156.23
    }
}
var nossoNumero = 10
alterarDadosBoleto(nossoNumero, updateBoleto)
    .then(response => {
        console.log('Incluir Boleto:', response);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });

// Exemplo de utilizacao do endpoint POST /cobranca-bancaria/v3/boletos/${nossoNumero}/baixar
const baixaBoleto = {
    numeroCliente: process.env.NUMERO_CLIENTE_COBRANCA,
    codigoModalidade: enums.codigoModalidade.SIMPLES_COM_REGISTRO
}
var nossoNumero = 10
baixarBoleto(nossoNumero, baixaBoleto)
    .then(response => {
        console.log('Incluir Boleto:', response);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });

// Exemplo de utilizacao do endpoint GET /cobranca-bancaria/v3/boletos
var numeroCliente = process.env.NUMERO_CLIENTE_COBRANCA
var codigoModalidade = enums.codigoModalidade.SIMPLES_COM_REGISTRO
var nossoNumero = 10
var linhaDigitavel = null
var codigoBarras = null
consultarBoleto(numeroCliente, codigoModalidade, nossoNumero, linhaDigitavel, codigoBarras)
    .then(response => {
        console.log('Incluir Boleto:', response);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });

// Exemplo de utilizacao do endpoint GET /cobranca-bancaria/v3/pagadores/${cpfCnpj}/boletos
var numeroCliente = process.env.NUMERO_CLIENTE_COBRANCA
var cpfCnpj = '99999999999'
var codigoSituacaoBoleto = enums.codigoSituacaoBoleto.EM_ABERTO
var dataInicio = null
var dataFim = null
listarBoletosPagador(numeroCliente, cpfCnpj, codigoSituacaoBoleto, dataInicio, dataFim)
    .then(response => {
        console.log('Incluir Boleto:', response);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });

// Exemplo de utilizacao do endpoint GET /cobranca-bancaria/v3/boletos/segunda-via
var numeroCliente = process.env.NUMERO_CLIENTE_COBRANCA
var codigoModalidade = enums.codigoModalidade.SIMPLES_COM_REGISTRO
var nossoNumero = 10
var linhaDigitavel = null
var codigoBarras = null
var gerarPdf = true
var numeroContratoCobranca = null
emitirSegundaVia(numeroCliente, codigoModalidade, nossoNumero, linhaDigitavel, codigoBarras, gerarPdf, numeroContratoCobranca)
    .then(response => {
        console.log('Incluir Boleto:', response);
    })
    .catch(error => {
        console.error('Erro ao incluir boleto:', error);
    });