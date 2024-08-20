/**
 * Lista de escopos disponíveis na API, representados como um objeto imutável.
 * 
 * @constant {Object} scopes - Objeto que contém os escopos utilizados na API. 
 *                             Os scopes devem ser passados na obtenção do Access Token, e o Access Token retornado terá 
 *                             permissão somente nos scopes enviados.
 * 
 * @property {string} BOLETOS_INCLUSAO - Escopo para inclusão de boletos.
 * @property {string} BOLETOS_CONSULTA - Escopo para consulta de boletos.
 * @property {string} BOLETOS_ALTERACAO - Escopo para alteração de boletos.
 * @property {string} PAGAMENTOS_CONSULTA - Escopo de consulta para pagamentos de boletos.
 * @property {string} PAGAMENTOS_INCLUSAO - Escopo de inclusão para pagamentos de boletos.
 * @property {string} PAGAMENTOS_ALTERACAO - Escopo de alteração para pagamentos de boletos.
 * @property {string} CCO_TRANSFERENCIAS - Escopo para transferências de Conta Corrente.
 * @property {string} CCO_CONSULTA - Escopo para consulta de Conta Corrente.
 * @property {string} CONVENIOS_ESCRITA - Escopo para criações e alterações de arrecadação de convênios.
 * @property {string} CONVENIOS_CONSULTA - Escopo para consultas das operações de arrecadação de convênios.
 * @property {string} INVESTIMENTOS_CONSULTA - Escopo que permite a consulta de investimentos do cliente.
 * @property {string} INVESTIMENTOS_RESGATE - Escopo que permite o resgate de investimentos do cliente.
 * @property {string} INVESTIMENTOS_APLICACAO - Escopo que permite a aplicação em investimentos do cliente.
 * @property {string} SICOOB_CONSENTIMENTO_PAGAMENTO_ITP_ESCRITA - Permissão para escrita do consentimento de pagamento.
 * @property {string} SICOOB_CONSENTIMENTO_PAGAMENTO_ITP_LEITURA - Permissão para leitura do consentimento de pagamento.
 * @property {string} PIXPAGAMENTOS_ESCRITA - Permissão para alteração de transferências via PIX.
 * @property {string} PIXPAGAMENTOS_CONSULTA - Permissão para consulta de transferências via PIX.
 * @property {string} PIXPAGAMENTOS_WEBHOOK - Acesso e alteração de dados do webhook do PIX.
 * @property {string} PIX_READ - Permissão para consulta de dados relacionados ao PIX.
 * @property {string} COBV_READ - Permissão para consulta de cobranças com vencimento (COBV).
 * @property {string} WEBHOOK_WRITE - Permissão para alteração de webhooks.
 * @property {string} LOTECOBV_WRITE - Permissão para alteração de vencimento em lote de cobranças com vencimento.
 * @property {string} PAYLOADLOCATION_READ - Permissão para consulta de locais de payloads.
 * @property {string} COBV_WRITE - Permissão para alteração de data de vencimento de cobranças com vencimento (COBV).
 * @property {string} SPB_ESCRITA - Permissão para realizar TEDs.
 * @property {string} SPB_CONSULTA - Permissão para consulta de TEDs.
 * @property {string} OPEN_ID - Ao enviar este scope, será retornado o `id_token` juntamente com o `access_token`. Alguns endpoints exigem que o `id_token` seja enviado.
 */

const scopes = Object.freeze({
    BOLETOS_INCLUSAO: 'boletos_inclusao',
    BOLETOS_CONSULTA: 'boletos_consulta',
    BOLETOS_ALTERACAO: 'boletos_alteracao',
    PAGAMENTOS_CONSULTA: 'pagamentos_consulta',
    PAGAMENTOS_INCLUSAO: 'pagamentos_inclusao',
    PAGAMENTOS_ALTERACAO: 'pagamentos_alteracao',
    CCO_TRANSFERENCIAS: 'cco_transferencias', 
    CCO_CONSULTA: 'cco_consulta',
    CONVENIOS_ESCRITA: 'convenios_escrita',
    CONVENIOS_CONSULTA: 'convenios_consulta',
    INVESTIMENTOS_CONSULTA: 'investimentos_consulta',
    INVESTIMENTOS_RESGATE: 'investimentos_resgate',
    INVESTIMENTOS_APLICACAO: 'investimentos_aplicacao',
    SICOOB_CONSENTIMENTO_PAGAMENTO_ITP_ESCRITA: 'sicoob_consentimento_pagamento_itp_escrita',
    SICOOB_CONSENTIMENTO_PAGAMENTO_ITP_LEITURA: 'sicoob_consentimento_pagamento_itp_leitura',
    PIXPAGAMENTOS_ESCRITA: 'pixpagamentos_escrita',
    PIXPAGAMENTOS_CONSULTA: 'pixpagamentos_consulta',
    PIXPAGAMENTOS_WEBHOOK: 'pixpagamentos_webhook',
    PIX_READ: 'pix.read',
    COBV_READ: 'cobv.read',
    WEBHOOK_WRITE: 'webhook.write',
    LOTECOBV_WRITE: 'lotecobv.write',
    PAYLOADLOCATION_READ: 'payloadlocation.read',
    COBV_WRITE: 'cobv.write',
    SPB_ESCRITA: 'spb_escrita',
    SPB_CONSULTA: 'spb_consulta',
    OPEN_ID : 'openid'
});

module.exports = { scopes };