export default {
	email: {
		presence: {
			allowEmpty: false,
		},
		email: true,
	},
	password: {
		format: {
			message: 'must be 8-25 characters with a mix of upper & lowercase letters, numbers, and special characters',
			pattern:
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@^_`{|}~]{8,25}$/,
		},
		presence: {
			allowEmpty: false,
		},
	},
	retypedPassword: {
		equality: 'password',
		presence: {
			allowEmpty: false,
		},
	},
	firstName: {
		presence: {
			allowEmpty: false,
		},
	},
	lastName: {
		presence: {
			allowEmpty: false,
		},
	},
};
