const userModelRestaurants = require("../models/User.ts");

module.exports = {
    //get all restaurants availables
    //TODO : add filter to select the restaurants users
    async getAll(req, res) {
        userModelRestaurants.find({role: 'restorer'}).then(function(restaurants) {
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
    }
}