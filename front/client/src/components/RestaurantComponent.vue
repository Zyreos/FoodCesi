
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
             <div class="flex-wrap d-flex"> 
                <v-card :loading="loading" class="mx-auto my-12"  width="374" v-for="article in articles">
                   <div v-if="!article.products.length">
                    <v-img src="https://tn.fishki.net/26/upload/post/2020/07/15/3369927/57b132579713bba6c722a6b8f7585278.jpg"></v-img>
                    <v-card-title>{{article.name}}</v-card-title>
                     <v-card-subtitle>{{article.price}} $</v-card-subtitle>
                        <p class="ma-2">{{article.category}}</p>
                        <p class="ma-2">{{article.description}}</p>
                        <p class="ma-2">dispo: {{article.available_quantity}}</p>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="ma-2" color="secondary" @click="AddArticleToBasket(article)"><v-icon >mdi-basket</v-icon></v-btn>
                        </v-card-actions> 
                    </div>
                   <div v-else-if="article.products.length">
                   <v-img src="https://kartinkin.net/uploads/posts/2021-03/1617150564_54-p-burger-krasivo-55.jpg"></v-img>
                    <v-card-title>{{article.name}}</v-card-title>
                     <v-card-subtitle>{{article.price}} $</v-card-subtitle>
                        <p class="ma-2">{{article.category}}</p>
                        <p class="ma-2">{{article.description}}</p>
                        <p class="ma-2">dispo: {{article.available_quantity}}</p>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="show = !show">
                        <v-icon color="secondary">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                         </v-btn>
                            <v-btn class="ma-2" color="secondary" @click="AddArticleToBasket(article)"><v-icon >mdi-basket</v-icon></v-btn>
                        </v-card-actions>
                        <v-expand-transition>
                    <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                        <div v-for="productId in article.products" style="border: 1px solid #00FA9A ;" :set="tmpArticle = getArticleById(productId)">
                        <p>{{tmpArticle.name}}</p>
                        <p>{{tmpArticle.category}}</p>
                        <p>{{tmpArticle.description}}</p>
                        
                    </div>
                    <br/>
                </v-card-text> 
            </div>
                </v-expand-transition>
            </div>     
        </v-card>
        </div>
           
        </div>
    </div>
    <br />
    
    <div id="container-basket">
        <h2>Basket</h2>
        <div id="list-articles" v-if="basket.articles.length > 0">
            <div  class="flex-wrap d-flex" >
        <v-card :loading="loading" class="mx-auto my-12"  width="250" v-for="article in basket.articles">
        <v-img src="https://tn.fishki.net/26/upload/post/2020/07/15/3369927/57b132579713bba6c722a6b8f7585278.jpg"></v-img>
                    <v-card-title>{{article.name}}</v-card-title>
                     <v-card-subtitle>{{article.price}} $</v-card-subtitle>
                        <v-card-actions>
                            <v-btn class="ma-2" color="secondary" @click="AddQuantityArticle(article, 1)"><v-icon>mdi-plus</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            {{article.nbArticles}}
                            <v-spacer></v-spacer>
                            <v-btn class="ma-2" color="secondary" @click="RemoveQuantityArticle(article, 1)"><v-icon>mdi-minus</v-icon></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="ma-2" color="secondary" @click="RemoveArticle(article, 1)"><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-actions> 
        
          </v-card>
     </div>
        </div>
        <div v-else>
            <p class="error">Basket is empty</p>
        </div> </div>
    <br/>

   
    <div id="container-payment" v-if="basket.articles.length > 0">
        <h2>Payment</h2>
        <v-row>
            <v-col cols="4">
                <v-text-field
                    label="Tip"
                    prefix="$"
                    v-model="basket.tip"
                ></v-text-field> 
            </v-col>
        </v-row>
        <p>Total price: {{ basket.total_price }} $</p>
        <v-btn block color="primary" @click="Pay()">Payment</v-btn>
    </div>
</template>

<script>
import RestaurantService from "../../../global/services/RestaurantService";
import ArticleService from "../../../global/services/ArticleService";
import OrderService from "../../../global/services/OrderService";
export default {
    data () {
        return {
            show: false,
            restaurant: null,
            articles: null,
            error: null,
            basket: {
                articles: [],
                idUser: null,
                idRestaurant: null,
                tip: 2,
                address: null,
                total_price: 0
            }
        }
    },
    methods: {
        setTotalPrice() {
            const sum = this.basket.articles.reduce((accumulator, object) => {
                return accumulator + (object.price * object.nbArticles);
            }, 0);
            this.basket.total_price = sum + this.basket.tip;
        },
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
            this.setTotalPrice();
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
            const index = this.basket.articles.findIndex(x => x.idArticle === article.idArticle);
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
            this.setTotalPrice();
        },
        RemoveArticle(articleIndex) {
            this.basket.articles.splice(articleIndex, 1);
        },
        Pay() {
            console.log(this.basket);
            const response = OrderService.newOrder({
                basket: this.basket
            });
            console.log(response);
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
