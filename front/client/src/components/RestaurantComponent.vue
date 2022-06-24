<template>
    <div class="error" v-if="error">
        {{error}}
    </div>
    <div id="container-restaurant" v-if="restaurant">
        <h1>{{restaurant.username}}</h1>
        <p><b>Address : </b>{{restaurant.address.street}}, {{restaurant.address.city}}, {{restaurant.address.postal_code}}</p>
        <p>{{restaurant.description}}</p>
        <br/>
        <div id="container-products">
            <h2>Products</h2>
            <div class="article" v-for="article in articles" style="border: 2px solid black; margin: 20px;">
                <!-- Non Menu -->
                <div v-if="!article.products.length">
                    <p>{{article.name}}</p>
                    <p>{{article.category}}</p>
                    <p>{{article.price}} $</p>
                    <p>{{article.description}}</p>
                    <!-- <img src={{article.picture}}/>  -->
                    <p>dispo : {{article.available_quantity}}</p>
                    <v-btn block color="secondary" @click="AddArticleToBasket(article)">Add</v-btn>
                </div>
                <!-- Menu -->
                <div v-else-if="article.products.length">
                    <p>{{article.name}}</p>
                    <p>{{article.category}}</p>
                    <p>{{article.price}} $</p>
                    <p>{{article.description}}</p>
                    <p>dispo : {{article.available_quantity}}</p>
                    <v-btn block color="secondary" @click="AddArticleToBasket(article)">Add</v-btn>
                    <!-- Articles du menu -->
                    <div v-for="productId in article.products" style="border: 2px solid black;" :set="tmpArticle = getArticleById(productId)">
                        <p>{{tmpArticle.name}}</p>
                        <p>{{tmpArticle.category}}</p>
                        <p>{{tmpArticle.price}} $</p>
                        <p>{{tmpArticle.description}}</p>
                        <p>dispo : {{tmpArticle.available_quantity}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div id="container-basket">
        <h2>Basket</h2>
        <div id="list-articles">
            <div class="basket-articles" v-for="article in basket.articles">
                <p>{{article.nbArticles}}</p>
                <p>{{article.price}}</p>
                <p>{{article.name}}</p>
                <v-btn block color="secondary" @click="RemoveQuantityArticle(article, 1)">Remove</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import RestaurantService from "../../../global/services/RestaurantService";
import ArticleService from "../../../global/services/ArticleService";
export default {
    data () {
        return {
            restaurant: null,
            articles: null,
            error: null,
            basket: {
                articles: [],
                idUser: null,
                idRestaurant: null,
                tip: 0,
                address: null
            }
        }
    },
    methods: {
        getArticleById(idArticle) {
            const article = this.articles.find(x => x._id === idArticle);
            return article;
        },
        AddArticleToBasket(article) {
            if(this.basket.articles.find(x => x.idArticle === article._id)) {
                this.AddQuantityArticle(article, 1);
            }
            else {
                //create the article in the basket
                this.AddNewArticle(article);
            }
        },
        AddNewArticle(article) {            
            this.basket.articles.push({
                nbArticles: 1,
                idArticle: article._id,
                price: article.price,
                name: article.name
            });
        },
        AddQuantityArticle(article, nbArticlesAdd) {
            const index = this.basket.articles.findIndex(x => x.idArticle === article._id);
            this.basket.articles[index].nbArticles = this.basket.articles[index].nbArticles + nbArticlesAdd;
            //if quantity > quantity available
            if(this.basket.articles[index].nbArticles > article.available_quantity) {
                this.basket.articles[index].nbArticles = article.available_quantity;
            }
        },
        RemoveQuantityArticle(article, nbArticlesAdd) {
            const index = this.basket.articles.findIndex(x => x.idArticle === article.idArticle);
            this.basket.articles[index].nbArticles = this.basket.articles[index].nbArticles - nbArticlesAdd;
            //if quantity is null, remove product from basket
            if(this.basket.articles[index].nbArticles <= 0) {
                this.RemoveArticle(index);
            }
        },
        RemoveArticle(articleIndex) {
            this.basket.articles.splice(articleIndex, 1);
        }
    },
    async mounted() {
        try {
            const idRestaurant = this.$route.params.id;
            this.restaurant = (await RestaurantService.getRestaurant(idRestaurant)).data.restaurant;
            this.articles = (await ArticleService.getArticlesRestaurant(idRestaurant)).data.articles;
            //setup basket
            this.basket.idRestaurant = idRestaurant;
            this.basket.idUser = this.$store.state.user._id;
        } catch (err) {
            this.error = err.message;
        }
    },
};
</script>

<style scoped>
.error {
    color: red;
  }
</style>
