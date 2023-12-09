const joi = require("joi");

export default async (input: any) => {
	const registerSchema = joi.object({
		order_id: joi.string().required().messages({
			"string.base": "Order id should be a type of 'text'",
			"string.empty": "Order id cannot be empty",
			"any.required": "Order id is required",
		}),
		qty: joi.string().required().messages({
			"string.base": "Quantity should be a type of 'text'",
			"string.empty": "Quantity cannot be empty",
			"any.required": "Quantity is required",
		})
	});

	let { error, value } = registerSchema.validate(input, { abortEarly: false });
	let newError
	if (error) {
		newError = error.message.split(".");
	}

	return { errors: newError || null, value };
};