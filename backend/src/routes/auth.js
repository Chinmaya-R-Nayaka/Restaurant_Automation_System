const express = require('express');
const { Login, Register, CurrentUser, Logout } = require('../controllers/authControllers');
const { validate, loginSchema, registerSchema } = require('../validators/authValidator');
const protect = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post('/login', validate(loginSchema), Login);
authRouter.post('/register', validate(registerSchema), Register);
authRouter.get('/me', protect, CurrentUser);
authRouter.post('/logout', Logout);

module.exports = authRouter;