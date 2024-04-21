export default {
  email: {
    presence: { allowEmpty: false },
    format: {
      pattern: '^[^@]+@[^@]+\\.[^@]+$',
      message: 'please enter a valid email address',
    },
  },
  password: {
    presence: { allowEmpty: false },
    format: {
      message: 'must be 8-40 characters with a mix of letters and numbers',
      pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,40}$/,
    },
  },
  retypedPassword: {
    equality: 'password',
    presence: { allowEmpty: false },
  },
  firstName: { presence: { allowEmpty: false } },
  lastName: { presence: { allowEmpty: false } },
  businessName: { presence: { allowEmpty: false } },
  businessAddress: {
    presence: { allowEmpty: false },
    format: { pattern: /^[a-zA-Z0-9\s,'.\-#/&()]*$/ },
  },
  city: { presence: { allowEmpty: false } },
  state: { presence: { allowEmpty: false } },
  zip: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^\d{5}(-\d{4})?$/,
      message: 'please enter a valid ZIP code',
    },
  },
  pickupInstructions: { presence: { allowEmpty: false } },
};
