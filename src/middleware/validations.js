import validate from 'koa-req-validator';

export const registrationValidation = validate({
  email: ['require', 'isEmail', 'Not a valid Email Address'],
  password: ['require', 'isLength(8, 32)', 'Password must be between 8 and 32 characters']
});

export const loginValidation = validate({
  email: ['require', 'isEmail', 'Not a valid Email Address'],
  password: ['require', 'Password is required']
});