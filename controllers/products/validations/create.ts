const joi = require("joi");

export default async (input: any) => {
	const registerSchema = joi.object({
		name: joi.string().required().messages({
			"string.base": "Name should be a type of 'text'",
			"string.empty": "Name cannot be empty",
			"any.required": "Name is required",
		}),
		type: joi.string().required().messages({
			"string.base": "Type should be a type of 'text'",
			"string.empty": "Type cannot be empty",
			"any.required": "Type is required",
		}),
		writer: joi.string().required().messages({
			"string.base": "Writer should be a type of 'text'",
			"string.empty": "Writer cannot be empty",
			"any.required": "Writer is required",
		}),
		avatar: joi.string().dataUri().required().messages({
			"string.base": "Avatar should be a type of 'text'",
			"string.empty": "Avatar cannot be empty",
			"any.required": "Avatar is required",
		}),
		description: joi.string().required().messages({
			"string.base": "Description should be a type of 'text'",
			"string.empty": "Description cannot be empty",
			"any.required": "Description is required",
		}),
		units: joi.string().required().messages({
			"string.base": "Units should be a type of 'text'",
			"string.empty": "Units cannot be empty",
			"any.required": "Units is required",
		})
	});

	let { error, value } = registerSchema.validate(input, { abortEarly: false });
	let newError
	if (error) {
		newError = error.message.split(".");
	}

	return { errors: newError || null, value };
};