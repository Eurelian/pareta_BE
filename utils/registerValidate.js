const Joi = require("@hapi/joi");

const registerValidate = Joi.object({
	name: Joi.string().empty().min(3).max(255).required().messages({
		"string.empty": "Name Field can't be empty",
		"any.required": "Please enter your name",
	}),
	email: Joi.string().empty().email().required().messages({
		"string.empty": "Please enter a valid Email address ",
		"any.default": "Please enter a valid Email address ",
	}),
	password: Joi.string().min(8).max(255).required().messages({
		"string.min": "Password must have at least 8 characters",
		"any.required": "Please enter a password",
	}),
});

module.exports = registerValidate;
