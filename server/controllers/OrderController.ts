const Order = require("../models/Order");

module.exports = class OrderConrtoller {

    static async getOrders(data) {
        const orders = await Order.find();
        return orders;
    }

    static async createOrder() {
        const newOrder = {
            users: "TODO: GET USER NAMES",
            time: "TODO: GET TIME",
            addresses: "TODO: GET USER ADDRESS",
            state: "Confirmation",
            
        }
    }


}