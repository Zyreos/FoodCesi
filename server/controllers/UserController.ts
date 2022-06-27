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

    async getUserById(req, res){
        const id = req.params.id;

        UserModel.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    },

    //update user
    async updateUser(req, res) {
        if(!req.body){
            return res
                .status(400)
                .send({ message : "Data to update can not be empty"})
        }
    
        const id = req.params.id;
        UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update user information"})
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