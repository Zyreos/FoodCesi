let mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        users: {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            restorer_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            deliverer_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        },
        articles: [{
            article_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article"
            },
            quantity: {
                type: Number,
                required: false 
            }
        }],
        time: {
            type: Date,
            required: false
        },
        eta: {
            type: Number,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        state: {
            type: String,
            default: "Confirmation",
            required: false
        },
        content: [{
            type: String,
            required: false
        }],
        price: {
            fee_deliverer: {
                type: Number,
                required: false
            },
            fee_application: {
                type: Number,
                required: false
            },
            tip: {
                type: Number,
                required: false
            },
            total_price: {
                type: Number,
                required: false
            },
        }
    },
    { timestamps: true },
  );

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;