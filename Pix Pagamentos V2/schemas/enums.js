const meioIniciacao = Object.freeze({
    CHAVE: 'CHAVE',
    MANUAL: 'MANUAL'
})
const tipoConta = Object.freeze({
    CORRENTE: 'CORRENTE',
    POUPANCA: 'POUPANCA',
    SALARIO: 'SALARIO',
    CONTAPAGAMENTO: 'CONTAPAGAMENTO'
})

const enums = { meioIniciacao, tipoConta }
module.exports = { enums }