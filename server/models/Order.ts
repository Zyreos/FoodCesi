mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
        user: {
            type: [UserSchema.name],
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
            type: [UserSchema.address],
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;