const Order = require("../models/Order.ts");
const User = require("../models/User.ts")
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

    static async createOrderPost(req, res) {
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

    static async createOrder(req, res) {
        const order = new Order({
            users: {
                user_id: req.params.body.user_id,
                restorer_id: req.params.body.restorer_id,
                },
                articles: [{
                    article_id: req.params.body.article_id,
                    quantity: req.params.body.quantity
                }],
                time: req.params.body.eta,
                address: req.params.body.address,
                state: req.params.body.state,
                content: req.params.body.content,
                price: {
                    fee_deliverer: req.params.body.fee_deliverer,
                    fee_application: req.params.body.fee_application,
                    tip: req.params.body.tip,
                    total_price: req.params.body.total_price,
                }
        });
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