const Joi = require('joi');
const {enums} = require('./enums')

// Definição do esquema de validação
const iniciarPagamentoPixValidator = Joi.object({
  chave: Joi.string().required(),
  dataAgendamento: Joi.date().iso().required()
});


const confirmarPagamentoPixValidator = Joi.object({
  endToEndId: Joi.string().required(),
  valor: Joi.string().required(),
  meioIniciacao: Joi.valid(...Object.values(enums.meioIniciacao)).required(),
  descricao: Joi.string().optional(),
  repeticao: Joi.boolean().optional(),
  dataAgendamento: Joi.date().iso().optional(),
  origem: Joi.object({
    ispb: Joi.string().required(),
    cpfCnpj: Joi.string().required(),
    nome: Joi.string().required(),
    conta: Joi.string().required(),
    agencia: Joi.string().required(),
    tipo: Joi.valid(...Object.values(enums.tipoConta)).required(),
    chaveDict: Joi.string().optional()
  }).optional(),
  destino: Joi.object({
    ispb: Joi.string().optional(),
    cpfCnpj: Joi.string().optional(),
    nome: Joi.string().optional(),
    conta: Joi.string().optional(),
    agencia: Joi.string().optional(),
    tipo: Joi.valid(...Object.values(enums.tipoConta)),
    boolFavorecido: Joi.boolean().optional()
  }).optional()
});

const validator = { iniciarPagamentoPixValidator, confirmarPagamentoPixValidator }
module.exports = {validator}