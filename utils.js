// Função para validar parâmetros obrigatórios
function validarParametrosObrigatorios(params) {
    for (const [key, value] of Object.entries(params)) {
        if (!value) {
            throw new Error(`O parâmetro ${key} é obrigatório.`);
        }
    }
}

module.exports = {validarParametrosObrigatorios}