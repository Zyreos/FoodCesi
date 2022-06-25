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
    },

    //delete user
    async deleteUser(req, res){
        const id = req.params.id;

        UserModel.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
    }

}