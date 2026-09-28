const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const secret = (process.env.JWT_SECRET && process.env.JWT_SECRET.trim()) || 'my_default_JWT_secretkey';
    return jwt.sign({ id }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax',
        maxAge: 7*24*60*60*1000
    });
};

const clearTokenCookie = (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax'
    });
};

module.exports = { generateToken, setTokenCookie, clearTokenCookie };