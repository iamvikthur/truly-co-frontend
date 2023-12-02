export const emailField = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i,
    message: 'Invalid email address',
  },
};

export const fullNameField = {
  required: 'Full name is required',
};

export const passwordField = {
  required: 'Password is required',
  minLength: { value: 8, message: 'The password must be at least 8 characters long' },
  maxLength: { value: 64, message: 'The password must be fewer than 64 characters' },
  validate: {
    lowercase: (v) => /[a-z]/.test(v) || 'The password must contain at least one lowercase letter',
    uppercase: (v) => /[A-Z]/.test(v) || 'The password must contain at least one uppercase letter',
    number: (v) => /[0-9]/.test(v) || 'The password must contain at least one number',
    special: (v) =>
      /[^A-Za-z0-9]/.test(v) || 'The password must contain at least one special character',
  },
};
