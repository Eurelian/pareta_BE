const Joi = require("@hapi/joi");

const schema = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(255).required(),
});

module.exports = schema;
