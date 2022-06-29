<template>
    <div class="error" v-html="error" />
    <h1>Stats</h1>
    <p><b>number of orders:</b> 20</p>
    <p><b>average price of an order:</b> 20$</p>

    <!--
        TODO
        Graph avec le nombre de commandes par jour depuis la création du restaurant    
    -->

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
</template>

<script>
    import { defineComponent } from "vue";
    import OrderService from "../../../global/services/OrderService";

    export default defineComponent({
        data: () => ({
            orders: null
        }),
        methods: {
            
        },
        async mounted() {
            try {
                this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
                console.log(this.orders);
            } catch (err) {
                this.error = err.message;
            }
        },
    })
</script>