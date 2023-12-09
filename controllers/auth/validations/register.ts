const joi = require("joi");

export default async (input: any) => {
	const registerSchema = joi.object({
		fullName: joi.string().min(3).max(30).required().messages({
			"string.base": "Full Name should be a type of 'text'",
			"string.empty": "Full Name cannot be empty",
			"string.min": "Full Name should have a minimum length of {#limit}",
			"string.max": "Full Name should have a maximum length of {#limit}",
			"any.required": "Full Name is required",
		}),
		email: joi.string().trim().email({ minDomainSegments: 2 }).required().messages({
			"string.base": "Email should be a type of 'text'",
			"string.empty": "Email cannot be empty",
			"string.email": "This is not a valid email",
			"any.required": "Email is required",
		}),
		password: joi.string().min(8).required().messages({
			"string.base": "Password should be a type of 'text'",
			"string.empty": "Password cannot be empty",
			"string.min": "Password must be minimum of 8 characters",
		}),
	});

	let { error, value } = registerSchema.validate(input, { abortEarly: false });
	let newError
	if (error) {
		newError = error.message.split(".");
	}

	return { errors: newError || null, value };
};