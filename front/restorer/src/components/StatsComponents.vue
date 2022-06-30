<template>
    <div class="error" v-html="error" />
    <div v-if="orders">
        <h1>Stats</h1>
        <p><b>number of orders:</b> {{ orders.length }}</p>
        <p><b>average price of an order:</b> {{ averagePrice() }}$</p>

        <!--
            TODO
            Graph avec le nombre de commandes par jour depuis la création du restaurant    
        -->
        <h2>Number of orders per day</h2>
        <NbOrdersPerDayChart :chart-data="nbOrdersPerDayChartData" height="40vh" width="80vw"/>

        <!--
        TODO
        Graph avec le nombre de commandes selon l'heure de la journée
    -->

        <!--
        TODO
        Graph avec le prix moyen d'un panier comparé aux autres restos
    -->

        <!--
        TODO
        Graph avec les articles les plus achetés
    -->
    </div>
</template>

<script>
import { defineComponent } from "vue";
import OrderService from "../../../global/services/OrderService";
import NbOrdersPerDayChart from './charts/NbOrdersPerDayChart'

export default defineComponent({
    data: () => ({
        orders: null,
        nbOrdersPerDayChartData: null
    }),
    components: { NbOrdersPerDayChart },
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
            listTime.forEach(function(v) {
                countDates.hasOwnProperty(v)? ++countDates[v] : countDates[v] = 1;
            });

            //insert to statistics
            this.nbOrdersPerDayChartData = {
                labels: Object.keys(countDates),
                datasets: [ { 
                    label: 'Number of orders',
                    backgroundColor: '#0000ff4d',
                    data: Object.values(countDates) 
                } ]
            }
        }
    },
    async mounted() {
        try {
            this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
            console.log(this.orders);
            this.setNbOrdersPerDayChartData();
        } catch (err) {
            this.error = err.message;
        }
    },
})
</script>