const Joi = require('joi');
const { enums } = require('./enums');

const transferenciaEntreContaDTOValidator = Joi.object({
    amount: Joi.number().required(),
    date: Joi.date().iso().required(),
    debtorAccount: Joi.object({
        issuer: Joi.string().required(),
        number: Joi.string().required(),
        accountType: Joi.valid(...Object.values(enums.accountType)).required(),
        personType: Joi.valid(...Object.values(enums.personType)).required()
    }).required(),
    creditorAccount: Joi.object({
        issuer: Joi.string().required(),
        number: Joi.string().required(),
        accountType: Joi.valid(...Object.values(enums.accountType)).required(),
        personType: Joi.valid(...Object.values(enums.personType)).required()
    }).required()
});

module.exports = {transferenciaEntreContaDTOValidator}