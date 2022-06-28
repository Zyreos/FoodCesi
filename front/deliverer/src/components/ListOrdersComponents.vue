<template>
    <h1>List orders</h1>
    <div class="error" v-if="error">
        {{error}}
    </div>
    <h2>To confirm</h2>
    <div id="container-list-orders" v-if="orders">
        <div class="orders-confirm" v-for="order in getOrders('Confirmation')">
        <p><b>Total price :</b> {{ order.price.total_price }}$</p>
        <!-- click to see the content -->
        <div class="container-articles">
            <p v-for="article in order.content">{{ article }}</p>
        </div>
        <div class="container-buttons">
            <v-btn elevation="2">Cancel</v-btn>
            <v-btn elevation="2">Confirmation</v-btn>
        </div>
      </div>
    </div>
    <h2>Preparation</h2>
    <div id="container-list-orders" v-if="orders">
        <div class="orders-confirm" v-for="order in getOrders('Preparation')">
        <p><b>Total price :</b> {{ order.price.total_price }}$</p>
        <!-- click to see the content -->
        <div class="container-articles">
            <p v-for="article in order.content">{{ article }}</p>
        </div>
        <div class="container-buttons">
            <v-btn elevation="2">Prepared</v-btn>
        </div>
      </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import OrderService from "../../../global/services/OrderService";

    export default defineComponent({
        name: 'Orders',
        data: () => ({
            orders: null,
            error: null,
        }),
        methods: {
            getOrders(status) {
                const completedOrders = this.orders.filter(tmpOrder => tmpOrder.state === status);
                return completedOrders;
            }
        },
        async mounted() {
            try {
                this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
                console.log(this.orders);
            } catch (err) {
                this.error = err.message;
            }
        },
    });
</script>