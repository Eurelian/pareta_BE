const Joi = require("@hapi/joi");

const loginValidate = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Please enter a registered email address",
		"any.required": "Please enter a registered email address",
	}),
	password: Joi.string().min(8).max(255).required().messages({
		"string.empty": "Please enter your password",
		"any.required": "Please enter your password",
	}),
});

module.exports = loginValidate;
