const Joi = require('joi');
const { enums } = require('./enums');

const RateioCreditos = Joi.object({
    numeroBanco: Joi.number().required(),
    numeroAgencia: Joi.number().required(),
    numeroContaCorrente: Joi.number().required(),
    contaPrincipal: Joi.boolean().required(),
    codigoTipoValorRateio: Joi.number().valid(...Object.values(enums.codigoTipoValorRateio)).required(),
    valorRateio: Joi.number().required(),
    codigoTipoCalculoRateio: Joi.number().valid(...Object.values(enums.codigoTipoCalculoRateio)).required(),
    numeroCpfCnpjTitular: Joi.string().max(14).required(),
    nomeTitular: Joi.string().max(50).required(),
    codigoFinalidadeTed: Joi.number().valid(...Object.values(enums.codigoFinalidadeTed)).required(),
    codigoTipoContaDestinoTed: Joi.string().valid(...Object.values(enums.codigoTipoContaDestinoTed)).required(),
    quantidadeDiasFloat: Joi.number().required(),
    dataFloatCredito: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional()
})

const BoletoValidator = Joi.object({
    numeroCliente: Joi.number().required(),
    codigoModalidade: Joi.number().valid(...Object.values(enums.codigoModalidade)).required(),
    numeroContaCorrente: Joi.number().required(),
    codigoEspecieDocumento: Joi.string().valid(...Object.values(enums.codigoEspecieDocumento)).required(),
    dataEmissao: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    nossoNumero: Joi.number().optional(),
    seuNumero: Joi.string().max(18).required(),
    identificacaoBoletoEmpresa: Joi.string().max(25).optional(),
    identificacaoEmissaoBoleto: Joi.number().valid(...Object.values(enums.identificacaoEmissaoBoleto)).required(),
    identificacaoDistribuicaoBoleto: Joi.number().valid(...Object.values(enums.identificacaoDistribuicaoBoleto)).required(),
    valor: Joi.number().required(),
    dataVencimento: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    dataLimitePagamento: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorAbatimento: Joi.number().optional(),
    tipoDesconto: Joi.number().valid(...Object.values(enums.tipoDesconto)).required(),
    dataPrimeiroDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorPrimeiroDesconto: Joi.number().optional(),
    dataSegundoDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorSegundoDesconto: Joi.number().optional(),
    dataTerceiroDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorTerceiroDesconto: Joi.number().optional(),
    tipoMulta: Joi.number().valid(...Object.values(enums.tipoMulta)).required(),
    dataMulta: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorMulta: Joi.number().optional(),
    tipoJurosMora: Joi.number().valid(...Object.values(enums.tipoJurosMora)).required(),
    dataJurosMora: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
    valorJurosMora: Joi.number().optional(),
    numeroParcela: Joi.number().min(1).max(99).required(),
    aceite: Joi.boolean().optional(),
    codigoNegativacao: Joi.number().valid(...Object.values(enums.codigoNegativacao)).optional(),
    numeroDiasNegativacao: Joi.number().optional(),
    codigoProtesto: Joi.number().valid(...Object.values(enums.codigoProtesto)).optional(),
    numeroDiasProtesto: Joi.number().optional(),
    pagador: Joi.object({
        numeroCpfCnpj: Joi.string().max(14).required(),
        nome: Joi.string().max(50).required(),
        endereco: Joi.string().max(40).required(),
        bairro: Joi.string().max(30).required(),
        cidade: Joi.string().max(40).required(),
        cep: Joi.string().max(8).required(),
        uf: Joi.string().max(2).required(),
        email: Joi.string().email().optional()
    }).required(),
    beneficiarioFinal: Joi.object({
        numeroCpfCnpj: Joi.string().max(14).required(),
        nome: Joi.string().max(40).required()
    }).optional(),
    mensagensInstrucao: Joi.array().items(Joi.string().max(40)).max(5).optional(),
    gerarPdf: Joi.boolean().optional(),
    rateioCreditos: Joi.array().items(RateioCreditos).optional(),
    codigoCadastrarPIX: Joi.number().valid(...Object.values(enums.codigoCadastrarPIX)).optional(),
    numeroContratoCobranca: Joi.string().max(64).optional()
});

const AlterarBoletoValidator = Joi.object({
    numeroCliente: Joi.number().required(),
    codigoModalidade: Joi.valid(...Object.values(enums.codigoModalidade)).required(),
    numeroContratoCobranca: Joi.number().optional(),
    especieDocumento: Joi.object({
        codigoEspecieDocumento: Joi.valid(...Object.values(enums.codigoEspecieDocumento)).required()
    }).optional(),
    seuNumero: Joi.object({
        seuNumero: Joi.string().max(18).required(),
        identificacaoBoletoEmpresa: Joi.string().optional()
    }).optional(),
    desconto: Joi.object({
        tipoDesconto: Joi.valid(...Object.values(enums.tipoDesconto)).required(),
        dataPrimeiroDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        valorPrimeiroDesconto: Joi.number().optional(),
        dataSegundoDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        valorSegundoDesconto: Joi.number().optional(),
        dataTerceiroDesconto: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        valorTerceiroDesconto: Joi.number().optional(),
    }).optional(),
    abatimento: Joi.object({
        valorAbatimento: Joi.number().required()
    }).optional(),
    multa: Joi.object({
        tipoMulta: Joi.valid(...Object.values(enums.tipoMulta)).required(),
        dataMulta: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        valorMulta: Joi.number().optional(),
    }).optional(),
    jurosMora: Joi.object({
        tipoJurosMora: Joi.valid(...Object.values(enums.tipoJurosMora)).required(),
        dataJurosMora: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        valorJurosMora: Joi.number().optional(),
    }).optional(),
    rateioCredito: Joi.object({
        tipoOperacao: Joi.valid(...Object.values(enums.tipoOperacaoAlterarRateio)).required(),
        rateioCreditos: Joi.array().items(RateioCreditos).required()
    }).optional(),
    pix: Joi.object({
        utilizarPix: Joi.boolean().required()
    }).optional(),
    prorrogacaoVencimento: Joi.object({
        dataVencimento: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    }).optional(),
    prorrogacaoLimitePagamento: Joi.object({
        dataLimitePagamento: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    }).optional(),
    valorNominal: Joi.object({
        valor: Joi.number().required()
    }).optional()
});

const BaixarBoletoValidator = Joi.object({
    numeroCliente: Joi.number().required(),
    codigoModalidade: Joi.valid(...Object.values(enums.codigoModalidade)).required(),
});
const validator = { BoletoValidator, AlterarBoletoValidator, BaixarBoletoValidator };
module.exports = { validator };