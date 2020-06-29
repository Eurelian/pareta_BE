const Joi = require("@hapi/joi");

const eventValidate = Joi.object({
	name: Joi.string().min(8).max(255).required(),
	date: Joi.required(),
	age_group: Joi.required(),
	description: Joi.string().min(70).max(255).required(),
	size: Joi.number().required(),
});

module.exports = eventValidate;
