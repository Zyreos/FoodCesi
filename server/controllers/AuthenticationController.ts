const userModel = require("../models/models.ts");
const jwt = require('jsonwebtoken');
const config = require('../config/config.ts')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign({user}, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })  
}

module.exports = {
    async register(req, res) {
        const user = new userModel(req.body);
        try {
            await user.save();
            res.send({
                user: user,
                token: jwtSignUser(user)
            });
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

            res.send({
                user: user,
                token: jwtSignUser(user)
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}