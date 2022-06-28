let mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        }],
        available_quantity: {
            type: Number,
            required: false
        }
    },
    { timestamps: true },
  );

const ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;