const Article = require("../models/Article.ts");
const User = require("../models/User.ts")
let mongoose = require("mongoose");

module.exports = class ArticleConrtoller {

    static async getArticles() {
        const articles = await Article.find();
        return articles;
    }

    static async getArticlesByUser(req, res) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            Article
                .find({restaurant: req.params.id})
                .select()
                .then(function(articles) {
                    try {
                        res.send({
                        articles: articles
                    });
                    } catch (err) {
                        res.status(400).send({
                        error: 'Impossible to get the articles.'
                    })
                    }
                });
        } else {
            res.status(404).send({
                error: 'No artcile found for this restaurant'
            })
        }
    }

    static async createArticle(req, res) {
        const article = new Article(req.body);
        try {
            await article.save();
            res.send({
                article: article,
            });
        } catch (err) {
            res.status(400).send({
                error: 'Failed to create article, sorry'
            })
        }
    }

}