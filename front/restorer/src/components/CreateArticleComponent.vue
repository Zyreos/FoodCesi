<template>
  <v-form ref="form" lazy-validation class="mx-12 my-12">
    <v-text-field v-model="name" :counter="30" label="Name" required></v-text-field>

    <v-text-field v-model="category" :counter="30" :rules="nameRules" label="Category" required></v-text-field>

    <v-text-field v-model="price" type="number" label="Price" required></v-text-field>

    <v-text-field v-model="description" :counter="50" label="Description" required></v-text-field>


    <v-text-field v-model="picture" :counter="50" label="URL-picture" required></v-text-field>
    <v-img :src="picture" height="200px" style="border: 1px solid black;"></v-img>
    <br/>
    <v-text-field v-model="available_quantity" type="number" label="Available quantity" required></v-text-field>

    <v-col>
      <v-container class="px-0" fluid>
        <v-switch v-model="show" label="Menu" color="blue"></v-switch>
      </v-container>
      <div v-show="show">
        <v-select
          v-model="products"
          :items="itemsArticles"
          item-title="name"
          item-value="_id"
          label="Articles"
          multiple
          hint="Pick your articles"
          persistent-hint
        ></v-select>
      </div>
    </v-col>

    <div class="error" v-html="error" />
    <br />

    <v-card-actions>
      <v-btn color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import ArticleService from "../../../global/services/ArticleService";
export default {
  data: () => ({
    show: false,
    error: null,
    name: null,
    category: null,
    price: 0,
    description: null,
    picture: null,
    available_quantity: null,
    products: [],
    itemsArticles: []
  }),

  methods: {
    async validate() {
      if(this.show === false) {
        this.products = [];
      }
      //create article
      try {
        const response = await ArticleService.newArticle({
          restaurant: this.$store.state.user._id,
          name: this.name,
          category: this.category,
          price: this.price,
          description: this.description,
          picture: this.picture,
          available_quantity: this.available_quantity,
          products: this.products
        });
        if(response.status == 200){
          //reload page
          console.log(response);
          this.reset();
          try {
            const productsRestaurant = (await ArticleService.getArticlesRestaurant(this.$store.state.user._id)).data.articles;
            this.itemsArticles = productsRestaurant.filter(article => article.products.length == 0);
            console.log(this.itemsArticles);
          } catch (err) {
            this.error = err.message;
          }
        } 
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  async mounted() {
    //get all articles from the restaurant
    try {
      const productsRestaurant = (await ArticleService.getArticlesRestaurant(this.$store.state.user._id)).data.articles;
      this.itemsArticles = productsRestaurant.filter(article => article.products.length == 0);
      console.log(this.itemsArticles);
    } catch (err) {
      this.error = err.message;
    }
  },
}
</script>

<style scoped>
.error {
  color: red;
}
</style>