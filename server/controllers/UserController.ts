const UserModel = require("../models/User.ts")
let mongoose = require("mongoose");

module.exports = {
    
    //get all users
    async getAllUsers(req, res) {
        UserModel
            .find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(400).send({
                    error: 'Impossible to get the Users.'
                })
            })
    }

}