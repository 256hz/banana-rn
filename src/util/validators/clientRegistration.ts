export default {
  email: {
    presence: { allowEmpty: false },
    email: true,
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
};
