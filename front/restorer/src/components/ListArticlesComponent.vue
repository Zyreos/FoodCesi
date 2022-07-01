<template>
    <div class="error" v-if="error">
        {{ error }}
    </div>
    <v-container v-if="articles">
        <v-row v-for="article in articles" no-gutters>
            <v-col cols="12" sm="4">
                <v-container>
                    <h2><b>{{ article.name }}</b> ({{ article.category }})</h2>
                    <p>{{ article.price }}$</p>
                </v-container>
            </v-col>
            <v-col cols="12" sm="4">
                <v-btn color="error" @click="deleteArticle(article._id)">
                    Delete
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        Articles not found
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import ArticleService from "../../../global/services/ArticleService";

export default defineComponent({
    name: 'ListArticles',
    data: () => ({
        articles: null,
        error: null,
    }),
    methods: {
        async deleteArticle(articleId) {
            try {
                await ArticleService.deleteArticle(articleId);
                this.articles = (await ArticleService.getArticlesRestaurant(this.$store.state.user._id)).data.articles;
            } catch (err) {
                this.error = err.message;
            }
        }
    },
    async mounted() {
        try {
            this.articles = (await ArticleService.getArticlesRestaurant(this.$store.state.user._id)).data.articles;
            console.log(this.articles);
        } catch (err) {
            this.error = err.message;
        }
    },
});
</script>