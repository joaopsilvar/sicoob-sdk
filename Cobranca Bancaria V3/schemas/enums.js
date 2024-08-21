const codigoModalidade = Object.freeze({
    SIMPLES_COM_REGISTRO: 1,
});

const codigoEspecieDocumento = Object.freeze({
    CHEQUE: "CH",
    DUPLICATA_MERCANTIL: "DM",
    DUPLICATA_MERCANTIL_INDICACAO: "DMI",
    DUPLICATA_DE_SERVICO: "DS",
    DUPLICATA_SERVICO_INDICACAO: "DSI",
    DUPLICATA_RURAL: "DR",
    LETRA_DE_CAMBIO: "LC",
    NOTA_DE_CREDITO_COMERCIAL: "NCC",
    NOTA_DE_CREDITO_EXPORTACAO: "NCE",
    NOTA_DE_CREDITO_INDUSTRIAL: "NCI",
    NOTA_DE_CREDITO_RURAL: "NCR",
    NOTA_PROMISSORIA: "NP",
    NOTA_PROMISSORIA_RURAL: "NPR",
    TRIPLICATA_MERCANTIL: "TM",
    TRIPLICATA_DE_SERVICO: "TS",
    NOTA_DE_SEGURO: "NS",
    RECIBO: "RC",
    FATURA: "FAT",
    NOTA_DE_DEBITO: "ND",
    APOLICE_DE_SEGURO: "AP",
    MENSALIDADE_ESCOLAR: "ME",
    PAGAMENTO_DE_CONSORCIO: "PC",
    NOTA_FISCAL: "NF",
    DOCUMENTO_DE_DIVIDA: "DD",
    CARTAO_DE_CREDITO: "CC",
    BOLETO_PROPOSTA: "BDP",
    OUTROS: "OU",
});

const identificacaoEmissaoBoleto = Object.freeze({
    BANCO_EMITE: 1,
    CLIENTE_EMITE: 2,
});

const identificacaoDistribuicaoBoleto = Object.freeze({
    BANCO_DISTRIBUI: 1,
    CLIENTE_DISTRIBUI: 2,
});

const tipoDesconto = Object.freeze({
    SEM_DESCONTO: 0,
    VALOR_FIXO_ATE_DATA_INFORMADA: 1,
    PERCENTUAL_ATE_DATA_INFORMADA: 2,
    VALOR_POR_ANTECIPACAO_DIA_CORRIDO: 3,
    VALOR_POR_ANTECIPACAO_DIA_UTIL: 4,
    PERCENTUAL_POR_ANTECIPACAO_DIA_CORRIDO: 5,
    PERCENTUAL_POR_ANTECIPACAO_DIA_UTIL: 6,
});

const tipoMulta = Object.freeze({
    ISENTO: 0,
    VALOR_FIXO: 1,
    PERCENTUAL: 2,
});

const tipoJurosMora = Object.freeze({
    VALOR_POR_DIA: 1,
    TAXA_MENSAL: 2,
    ISENTO: 3,
});

const codigoNegativacao = Object.freeze({
    NEGATIVAR_DIAS_UTEIS: 2,
    NAO_NEGATIVAR: 3,
});

const codigoProtesto = Object.freeze({
    PROTESTAR_DIAS_CORRIDOS: 1,
    PROTESTAR_DIAS_UTEIS: 2,
    NAO_PROTESTAR: 3,
});

//Para mais informações acesse https://www.bcb.gov.br/estabilidadefinanceira/comunicacaodados
const codigoFinalidadeTed = Object.freeze({
    PAGAMENTO_IMPOSTOS_TRIBUTOS_TAXAS: 1,
    PAGAMENTO_CONCESSIONARIAS_SERVICO_PUBLICO: 2,
    PAGAMENTOS_DIVIDENDOS: 3,
    PAGAMENTO_SALARIOS: 4,
    PAGAMENTO_FORNECEDORES: 5,
    PAGAMENTO_HONORARIOS: 6,
    PAGAMENTO_ALUGUEIS_TAXAS_CONDOMINIO: 7,
    PAGAMENTO_DUPLICATAS_TITULOS: 8,
    PAGAMENTO_MENSALIDADE_ESCOLAR: 9,
    CREDITO_EM_CONTA: 10,
    OUTROS: 99999,
});

const codigoTipoContaDestinoTed = Object.freeze({
    CONTA_CORRENTE: "CC",
    CONTA_DE_DEPOSITO: "CD",
    CONTA_GARANTIDA: "CG",
});

const codigoTipoValorRateio = Object.freeze({
    PERCENTUAL: 1,
});

const codigoTipoCalculoRateio = Object.freeze({
    VALOR_COBRADO: 1,
});

const codigoCadastrarPIX = Object.freeze({
    PADRAO: 0,
    COM_PIX: 1,
    SEM_PIX: 2,
});

const tipoOperacaoAlterarRateio = Object.freeze({
    ALTERAR_RATEIO: 2,
    EXCLUIR_RATEIO: 3,
});

const codigoSituacaoBoleto = Object.freeze({
    EM_ABERTO: 1,
    BAIXADO: 2,
    LIQUIDADO: 3
});

const enums = {
    codigoModalidade,
    codigoEspecieDocumento,
    identificacaoEmissaoBoleto,
    identificacaoDistribuicaoBoleto,
    tipoDesconto,
    tipoMulta,
    tipoJurosMora,
    codigoNegativacao,
    codigoProtesto,
    codigoFinalidadeTed,
    codigoTipoContaDestinoTed,
    codigoTipoValorRateio,
    codigoTipoCalculoRateio,
    codigoCadastrarPIX,
    tipoOperacaoAlterarRateio,
    codigoSituacaoBoleto
}
module.exports = {enums};
