<template>
    <div class="error" v-html="error" />
    <div v-if="orders">
        <h1>Stats</h1>
        <p><b>number of orders:</b> {{ orders.length }}</p>
        <p><b>average price of an order:</b> {{ averagePrice() }}$</p>

        <h2>Number of orders per day</h2>
        <NbOrdersPerDayChart :chart-data="nbOrdersPerDayChartData" :height="150" />

        <h2>Number of orders per hour</h2>
        <NbOrdersPerHourChart :chart-data="nbOrdersPerHourChartData" :height="150" />

        <h2>Most popular articles</h2>
        <v-container class="my-5" style="width: 600px; height: 800px;">
            <MostPopularArticlesChart :chart-data="mostPopularArticlesChartData" />
        </v-container>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import OrderService from "../../../global/services/OrderService";
import ArticleService from "../../../global/services/ArticleService";
import NbOrdersPerDayChart from './charts/NbOrdersPerDayChart'
import NbOrdersPerHourChart from './charts/NbOrdersPerHourChart'
import MostPopularArticlesChart from './charts/MostPopularArticlesChart'

export default defineComponent({
    data: () => ({
        orders: null,
        articles: null,
        nbOrdersPerDayChartData: null,
        nbOrdersPerHourChartData: null,
        mostPopularArticlesChartData: null
    }),
    components: { NbOrdersPerDayChart, NbOrdersPerHourChart, MostPopularArticlesChart },
    methods: {
        averagePrice() {
            const avg = this.orders.reduce((r, c) => r + c.price.total_price, 0) / this.orders.length;
            return avg;
        },
        setNbOrdersPerDayChartData() {
            const listTime = [];
            //get all the dates
            this.orders.forEach(element => {
                listTime.push(element.time.split('T')[0])
            });

            //count all the dates
            var countDates = {};
            listTime.forEach(function (v) {
                countDates.hasOwnProperty(v) ? ++countDates[v] : countDates[v] = 1;
            });

            //order by values
            const ordered = Object.keys(countDates).sort().reduce(
                (obj, key) => {
                    obj[key] = countDates[key];
                    return obj;
                },
                {}
            );

            //insert to statistics
            this.nbOrdersPerDayChartData = {
                labels: Object.keys(ordered),
                datasets: [{
                    label: 'Number of orders',
                    backgroundColor: '#0000ff4d',
                    data: Object.values(ordered),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }
        },
        setNbOrdersPerHourChartData() {
            const listTime = [];
            this.orders.forEach(element => {
                const tmpDate = new Date(element.time);
                listTime.push(tmpDate.getHours())
            });

            //count all the times
            var countDates = {};
            listTime.forEach(function (v) {
                countDates.hasOwnProperty(v) ? ++countDates[v] : countDates[v] = 1;
            });

            //order by values
            const ordered = Object.keys(countDates).sort().reduce(
                (obj, key) => {
                    obj[key] = countDates[key];
                    return obj;
                },
                {}
            );

            //insert to statistics
            this.nbOrdersPerHourChartData = {
                labels: Object.keys(ordered),
                datasets: [{
                    label: 'Number of orders',
                    backgroundColor: '#0000ff4d',
                    data: Object.values(ordered),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }
        },
        setMostPopularArticlesChartData() {
            const listArticles = [];
            this.orders.forEach(element => {
                element.articles.forEach(article => {
                    for (let i = 0; i < article.quantity; i++) {
                        listArticles.push(article.article_id);
                    }
                });
            });

            //count all the articles
            var countArticles = {};
            listArticles.forEach(function (v) {
                countArticles.hasOwnProperty(v) ? ++countArticles[v] : countArticles[v] = 1;
            });

            //change productId by the name
            for (const [key, value] of Object.entries(countArticles)) {
                this.articles.forEach(article => {
                    if (article._id === key) {
                        countArticles[article.name] = countArticles[key];
                        delete countArticles[key];
                    }
                });
            }

            //insert to statistics
            this.mostPopularArticlesChartData = {
                labels: Object.keys(countArticles),
                datasets: [{
                    label: 'Number of orders',
                    backgroundColor: '#0000ff4d',
                    data: Object.values(countArticles),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }
        }
    },
    async mounted() {
        try {
            this.articles = (await ArticleService.getArticlesRestaurant(this.$store.state.user._id)).data.articles;
            this.orders = (await OrderService.getOrdersRestaurant(this.$store.state.user._id)).data.orders;
            this.setNbOrdersPerDayChartData();
            this.setNbOrdersPerHourChartData();
            this.setMostPopularArticlesChartData();
        } catch (err) {
            this.error = err.message;
        }
    },
})
</script>