const userModelRestaurants = require("../models/User.ts");
const mongoose = require('mongoose');

module.exports = {
    //get all restaurants availables
    async getAll(req, res) {
        userModelRestaurants
            .find({role: 'restorer', status: 'active'})
            .select('username category description schedule adress')
            .then(function(restaurants) {
                try {
                    res.send({
                        restaurants: restaurants
                    });
                } catch (err) {
                    res.status(400).send({
                        error: 'Impossible to get the restaurants.'
                    })
                }
        });
    },
    //get restaurant by Id
    async getRestaurant(req, res) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            userModelRestaurants
                .findById(req.params.id)
                .select('username category description schedule adress status role')
                .then(function(restaurant) {
                    try {
                        if(restaurant.role !== 'restorer' || restaurant.status !== 'active') {
                            res.status(400).send({
                                error: "This restaurant is not available."
                            });
                        }
                        else {
                            res.send({
                                restaurant: restaurant
                                //TODO: send also the products of the restaurant
                            });
                        }
                    } catch (err) {
                        res.status(400).send({
                            error: 'Impossible to get the restaurant.'
                        })
                    }
            });
        }
        else {
            res.status(404).send({
                error: 'Restaurant not found.'
            })
        }
    }
}