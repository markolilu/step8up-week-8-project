const jwt = require('jsonwebtoken');

const secret = 'thisisasecretkey';
const expiration = '2h';

const authMiddleware = (req, res, next) => {

    let token = req.headers.authorization || req.query.token || req.body.token;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return res.status(400).json({message: 'Bearer token not found / not supplied'});
    }

    try {
        const {data} = jwt.verify(token, secret, {maxAge: expiration});
        req.user = data;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({message: 'Invalid token'});
    }

    return req;
};

const signToken = (user) => {
    const payload = {
        username: user.username,
        email: user.email,
        id: user.id
    };
    return jwt.sign({data: payload}, secret, {expiresIn: expiration});
};

module.exports = {authMiddleware, signToken};