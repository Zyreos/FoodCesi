<template>
    <div class="error" v-if="error">
        {{error}}
    </div>
    <div id="container-restaurant" v-if="restaurant">
        <h1>{{restaurant.username}}</h1>
        <p><b>Address : </b>{{restaurant.address.street}}, {{restaurant.address.city}}, {{restaurant.address.postal_code}}</p>
        <p>{{restaurant.description}}</p>
        <div id="container-products">
            <!-- Non Menu -->
            <div id="article" v-for="article in articles" style="border: 2px solid black;">
                <div v-if="!article.products.length">
                    <p>{{article.name}}</p>
                    <p>{{article.category}}</p>
                    <p>{{article.price}} $</p>
                    <p>{{article.description}}</p>
                    <!-- Voir avec Fanny : Je n'arrive pas à ajouter une picture avec Postman-->
                    <!-- <img src={{article.picture}}/>  -->
                    <p>dispo : {{article.available_quantity}}</p>
                </div>
            </div>
            <!-- Menu -->
            <div id="menu" v-for="article in articles" style="border: 2px solid red;">
                <div v-if="article.products.length">
                    <p>{{article.name}}</p>
                    <p>{{article.category}}</p>
                    <p>{{article.price}} $</p>
                    <p>{{article.description}}</p>
                    <p>dispo : {{article.available_quantity}}</p>
                    <!-- Articles du menu -->
                    <!-- Revoir l'architecture de la BDD pour pouvoir faire un choix parmi plusieurs produit -->
                    <div v-for="productId in article.products" style="border: 2px solid blue;" :set="tmpArticle = getArticleById(productId)">
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
</template>

<script>
import RestaurantService from "../../../global/services/RestaurantService";
import ArticleService from "../../../global/services/ArticleService";
export default {
    data () {
        return {
            restaurant: null,
            articles: null,
            error: null
        }
    },
    methods: {
        getArticleById(idArticle) {
            const article = this.articles.find(x => x._id === idArticle);
            return article;
        }
    },
    async mounted() {
        try {
            const idRestaurant = this.$route.params.id;
            this.restaurant = (await RestaurantService.getRestaurant(idRestaurant)).data.restaurant;
            this.articles = (await ArticleService.getArticlesRestaurant(idRestaurant)).data.articles;
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
