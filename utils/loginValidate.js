const Joi = require("@hapi/joi");

const loginValidate = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(255).required(),
});

module.exports = loginValidate;
