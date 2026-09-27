const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken, setTokenCookie } = require('../utils/authHelpers');

const Register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, provider: 'local' });
        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            message: 'User registered successfully', 
            user: user.toSafeObject() 
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: 'Error registering user', 
            error 
        });
    }
}

const Login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        setTokenCookie(res, token);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: user.toSafeObject()
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: 'Error logging in user', 
            error 
        });
    }
}

module.exports = { Register, Login };