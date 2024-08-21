// Enum para Tipos de Conta
const accountType = Object.freeze({
    CURRENT: 1,       // Conta Corrente
    SAVINGS: 2,       // Conta de Poupança
    TERM_DEPOSIT: 3,  // Conta de Depósito a Prazo
    PAYMENT: 4,       // Conta de Pagamentos
    CREDIT: 5,        // Conta de Crédito
    INVESTMENT: 6     // Conta de Investimento
  });
  
  // Enum para Tipos de Pessoa
  const personType = Object.freeze({
    INDIVIDUAL: 1,    // Pessoa Física
    BUSINESS: 2,      // Pessoa Jurídica
    SOLE_PROPRIETOR: 3, // Conta de Empreendedor Individual
    COOPERATIVE: 4    // Conta de Cooperativa
  });

const enums = { accountType, personType }
module.exports = {enums}