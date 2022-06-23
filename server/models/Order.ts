let mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        articles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }],
        time: {
            type: String,
            required: false
        },
        eta: {
            type: String,
            required: false
        },
        address: {
            //type: [UserSchema.address],
            type: String,
            required: false
        },
        state: {
            type: String,
            default: "Confirmation",
            required: false
        },
        content: {
            type: Map,
            of: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        }
    },
    { timestamps: true },
  );

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;