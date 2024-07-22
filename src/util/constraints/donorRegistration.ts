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
	businessName: {
		presence: {
			allowEmpty: false,
		},
	},
	businessAddress: {
		presence: {
			allowEmpty: false,
		},
		format: {
			pattern: /^[a-zA-Z0-9\s,'-]*$/,
		},
	},
	city: {
		presence: {
			allowEmpty: false,
		},
	},
	state: {
		presence: {
			allowEmpty: false,
		},
	},
	zip: {
		presence: {
			allowEmpty: false,
		},
		format: {
			pattern: /^\d{5}$/,
			message: '^Please enter a valid ZIP code',
		},
	},
	pickupInstructions: {
		presence: {
			allowEmpty: false,
		},
	},
};
