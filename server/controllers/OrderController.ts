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
        const content = req.body.basket.articles.map(
            obj => {
                return obj.quantity + " x " + obj.name + ", Unit Price: " + obj.price + "$, Total Price: " + obj.price * obj.quantity + "$";
            }
        );
        const order = new Order({
            users: {
                user_id: req.body.basket.idUser,
                restorer_id: req.body.basket.idRestaurant,
                },
                articles: req.body.basket.articles,
                time: Date.now(),
                eta: req.body.basket.eta,
                address: req.body.basket.address,
                state: req.body.basket.state,
                content: content,
                price: {
                    fee_deliverer: 2,
                    fee_application: 2,
                    tip: req.body.basket.tip,
                    total_price: req.body.basket.total_price,
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

    static async updateOrder(req, res) {
        const states = ["Confirmation", "Preparation", "Delivery", "Delivered"];

        const order = Order.findById(req.params.id);
        
        if(order) {
            states.forEach(state => {
                if(state == order.state && state != "Delivered") {
                    let index = states.indexOf(state) + 1
                    let nextState = states[index]
                    Order.findByIdAndUpdate(req.params.id, {state: nextState}, { useFindAndModify: false})
                    .then(data => {
                        if(!data){
                            res.status(404).send({ message : `Cannot Update order with ${req.params.id}. Maybe order not found!`})
                        }else{
                            res.send(data)
                        }
                    })
                    .catch(err =>{
                        res.status(500).send({ message : "Error Update user information"})
                    })
                }
                //res.send(state + "<=>" + order.state)
            });
        } else {
            res.status(404).send({ message : "Error sdmoivhsg user information"})   
        }
    }

    static async CancelOrder(req, res) {
        const order = Order.findById(req.params.id);

        Order.findByIdAndUpdate(req.params.id, {state: "Cancelled"}, { useFindAndModify: false})

    }

}