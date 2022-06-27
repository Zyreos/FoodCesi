const userModelRestaurants = require("../models/User.ts");
const mongoose = require('mongoose');

module.exports = {
    //get all restaurants availables
    async getAllRestaurants(req, res) {
        userModelRestaurants
            .find({role: 'restorer', status: 'active'})
            .select('username category description schedule adress name_restaurant profile_picture')
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
    //get restaurants by category
    async getRestaurantsByCategory(req, res) {
        userModelRestaurants
            .find({role: 'restorer', status: 'active', category: req.params.category})
            .select('username category description schedule adress name_restaurant profile_picture')
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
                .select('username category description schedule address status role profile_picture')
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
    },
    //get all categories
    async getAllCategories(req, res) {
        userModelRestaurants
            .find({role: 'restorer', status: 'active'})
            .select('category')
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
}