const userModel = require("../models/models.ts");

module.exports = {
    async register(req, res) {
        const user = new userModel(req.body);
        try {
            await user.save();
            res.send(user);
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
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect 1 ' + email + ' ' + password + ' ' + user.password + ' ' + user.email
                })
            }

            const isPasswordValid = password === user.password
            if (!isPasswordValid) {
                return res.status(403).send({
                  error: 'The login information was incorrect 2 ' + email + ' ' + password + ' ' + user.password + ' ' + user.email
                })
            }

            res.send({
                user: user
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}