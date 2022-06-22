let mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        users: {
            //type: [UserSchema.name],
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        eta: {
            type: String,
            required: true
        },
        addresses: {
            //type: [UserSchema.address],
            type: String,
            required: true
        },
        state: {
            type: String,
            default: "Confirmation",
            required: true
        },
        content: {
            type: Map,
            of: String,
            required: true
        },
        price: {
            type: Map,
            of: String,
            required: true
        }
    },
    { timestamps: true },
  );

UserSchema.pre('save', async function() {
    
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;