mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
        time: {
            type: String,
            required: true
        },
        eta: {
            type: String,
            required: true
        },
        address: {
            type: Array,
            
        }
    },
    { timestamps: true },
  );

UserSchema.pre('save', async function() {
    
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;