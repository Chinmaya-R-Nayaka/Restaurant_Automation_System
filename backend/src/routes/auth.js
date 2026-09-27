const express = require('express');
const { Login, Register } = require('../constrollers/authControllers');
const { validate, loginSchema, registerSchema } = require('../validators/authValidator');
const authRouter = express.Router();

authRouter.post('/login', validate(loginSchema), Login);
authRouter.post('/register', validate(registerSchema), Register);

module.exports = authRouter;