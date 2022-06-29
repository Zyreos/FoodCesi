let mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        }],
        available_quantity: {
            type: Number,
            required: true
        }
    },
    { timestamps: true },
  );

const ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;