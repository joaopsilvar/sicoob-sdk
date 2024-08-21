const { iniciarPagamentoPix, confirmarPagamentoPix, consultarPagamentoPix } = require('./api');
const { enums } = require('./schemas/enums');

/**
 * Exemplo de utilizacao dos endpoints para iniciar um pagamento pix e do endpoint para confirmar o pagamento 
 * POST /pix-pagamentos/v2/pagamentos    E   POST /pix-pagamentos/v2/pagamentos/confirmacao
 * Os dois devem ser usados em conjunto para que o pagamento seja iniciado e confirmado.
 */
async function realizarPagamentoPix(chave, dataAgendamento, meioIniciacao, valor) {
    try {
        const iniPgto = {
            "chave": chave,
            "dataAgendamento": dataAgendamento
        };
        const responseIni = await iniciarPagamentoPix(iniPgto);
        const endToEndId = responseIni.data.endToEndId;
        if (!endToEndId) {
            throw new Error('Erro ao iniciar pagamento Pix');
        }

        const confirmPgto = {
            endToEndId: endToEndId,
            valor: valor,
            meioIniciacao: meioIniciacao
        };
        const responseFim = await confirmarPagamentoPix(confirmPgto);
        return responseFim;
    } catch (error) {
        console.error('Erro ao realizar pagamento Pix:', error.message);
        throw error;
    }
}

const chave = 'str';
const dataAgendamento = '2024-08-17';
const meioIniciacao = enums.meioIniciacao.CHAVE;
const valor = 10.90;

realizarPagamentoPix(chave, dataAgendamento, meioIniciacao, valor)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Erro na execução da função realizarPagamentoPix:', error.message);
    });

const endToEndId = '';

consultarPagamentoPix(endToEndId)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Erro na execução da função consultarPagamentoPix:', error.message);
    });