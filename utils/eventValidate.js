const Joi = require("@hapi/joi");

const eventValidate = Joi.object({
	name: Joi.string().empty().min(8).max(255).required().messages({
		"string.empty": "Event Name can't be an empty field",
		"string.min": `Event Name should have a minimum length of {#limit} `,
		"string.max": `Event Name should have a maximum length of {#limit} `,
		"any.required": `Event Name is a required field`,
	}),
	date: Joi.date()
		.min("now")
		.required()
		.messages({ "any.required": `Event must have a date` }),
	age_group: Joi.required().messages({
		"any.required": `Event must have a targeted age group`,
	}),
	description: Joi.string().empty().min(70).max(255).required().messages({
		"string.empty": "Event Description can't be an empty field",
		"string.min": `Event Description should have a minimum length of {#limit} `,
		"string.max": `Event Desscription should have a maximum length of {#limit} `,
		"any.required": `Event Description is a required field`,
	}),
	gometry: Joi.object()
		.required()
		.messages({ "any.required": `Event must have a location` }),
	size: Joi.number().min(4).required().messages({
		"number.min": `Event Size can't be smaller than {#limit}`,
		"any.required": `Event must have a maximum size`,
	}),
});

module.exports = eventValidate;
