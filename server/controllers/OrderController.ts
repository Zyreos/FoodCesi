const Order = require("../models/Order.ts");
const User = require("../models/User.ts")
const authController = require("./AuthenticationController.ts")
let mongoose = require("mongoose");

module.exports = class OrderConrtoller {

    static async getOrders() {
        const orders = await Order.find();
        return orders;
    }

    static async getOrdersByUser(req, res) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Order
                .find({user: req.params.id})
                .select()
                .then(function(orders) {
                    try {
                        res.send({
                        orders: orders
                    });
                    } catch (err) {
                        res.status(400).send({
                        error: 'Impossible to get the right order.'
                    })
                    }
                });
        } else {
            res.status(404).send({
                error: 'No Order found for this user'
            })
        }
    }

    static async createOrder(req, res) {
        const order = new Order(req.body);
        try {
            await order.save();
            res.send({
                order: order,
            });
        } catch (err) {
            res.status(400).send({
                error: 'Failed to create your order, sorry'
            })
        }
    }

}