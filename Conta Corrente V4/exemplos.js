const { emitirExtratoCCO, getSaldo, transferenciaEntreContaSicoob } = require('./api');
const { enums } = require('./schemas/enums');

// Exemplo de utilização do endpoint GET /conta-corrente/v4/extrato/${mes}/${ano}
const mes = 8;
const ano = 2024;
const numeroContaCorrente = 12342431;
const diaInicial = null;
const diaFinal = null;
const agruparCNAB = null;

emitirExtratoCCO(mes, ano, numeroContaCorrente, diaInicial, diaFinal, agruparCNAB)
    .then(response => {
        console.log(response.data.resultado.transacoes);
    })
    .catch(err => {
        console.error('Erro ao emitir extrato:', err.message);
    });

// Exemplo de utilização do endpoint GET /conta-corrente/v4/saldo
const numeroContaCorrenteSaldo = 12431243;

getSaldo(numeroContaCorrenteSaldo)
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error('Erro ao obter saldo:', err.message);
    });

// Exemplo de utilização do endpoint POST /conta-corrente/v4/transferencias
const currentDate = new Date();
const currentDateIso = currentDate.toISOString();
const transferenciaEntreContaDTO = {
    "amount": 0.10,
    "date": currentDateIso,
    "debtorAccount": {
        "issuer": "4143",
        "number": "999999991",
        "accountType": enums.accountType.CURRENT,
        "personType": enums.personType.INDIVIDUAL
    },
    "creditorAccount": {
        "issuer": "4143",
        "number": "999999991",
        "accountType": enums.accountType.CURRENT,
        "personType": enums.personType.INDIVIDUAL
    }
};

transferenciaEntreContaSicoob(transferenciaEntreContaDTO)
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error('Erro na transferência entre contas:', err.message);
    });