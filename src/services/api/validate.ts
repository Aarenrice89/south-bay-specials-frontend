import { ZodError, type ZodType } from 'zod';

const validate = (schema: ZodType, data: unknown, logging = true): ZodType => {
	try {
		return schema.parse(data);
	} catch (e) {
		if (e instanceof ZodError) {
			e.cause = e.message;
		}
		if (logging) {
			console.error(e);
		}
		throw e;
	}
};

const validateAsync = (
	schema: ZodType,
	data: unknown,
	logging = true,
): Promise<ZodType> => {
	return new Promise((resolve, reject) => {
		try {
			resolve(validate(schema, data, logging));
		} catch (e) {
			reject(e);
		}
	});
};

export { validate, validateAsync };
