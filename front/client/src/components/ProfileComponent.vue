<template>
    <h1>My profile</h1>

    <div class="error" v-if="error">
        {{error}}
    </div>

    <div v-if="!$store.state.isUserLoggedIn">
        You need to be connected 
    </div>

    <div v-if="$store.state.isUserLoggedIn">
        <p> Hello, {{ $store.state.user.username}}!</p>
        <p>Age: {{ $store.state.user.age}}</p>
        <p>Email: {{ $store.state.user.email}}</p>

        <div id="container-orders">
            <div class="orders" v-for="order in orders" style="border: 2px solid black;">
                <p>{{ order.address }}</p>
                <p>{{ order.content }}</p>
                <p>{{ order.state }}</p>
                <p>{{ order.eta }}</p>
            </div>
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import OrderService from "../../../global/services/OrderService";

export default defineComponent({
    name: 'Restaurant',
    data: () => ({
        orders: null,
        error: null
      }),

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

<style>
    .error {
        color: red;
    }
</style>