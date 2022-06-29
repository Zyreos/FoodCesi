const userModel = require("../models/User.ts");
const jwt = require('jsonwebtoken');
const config = require('../config/config.ts')

const ONE_WEEK = 60 * 60 * 24 * 7;
const jwtSignUser = (user) => {
    return jwt.sign({user}, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })  
}

module.exports = {
    async register(req, res) {
        const user = new userModel(req.body);
        const userToken = jwtSignUser(user);
        try {
            await user.save();
            res.cookie('jwt', userToken, { httpOnly: true, secure: false, maxAge: ONE_WEEK * 1000 });
            res.status(201).json({ user: user, token: userToken });
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },
    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await userModel.findOne({
                email: email
            })
            const userToken = jwtSignUser(user);

            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(403).send({
                  error: 'The login information was incorrect'
                })
            }

            res.cookie('jwt', userToken, { httpOnly: true, secure: false, maxAge: ONE_WEEK * 1000 });
            res.status(201).json({ user: user, token: userToken });
            return user;
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}