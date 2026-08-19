const Joi = require("joi");

const paginationQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
}).unknown(true);

const searchQuerySchema = Joi.object({
    q: Joi.string().trim().min(2).required(),
    limit: Joi.number().integer().min(1).max(100).default(20),
}).unknown(true);

module.exports = { paginationQuerySchema, searchQuerySchema };
