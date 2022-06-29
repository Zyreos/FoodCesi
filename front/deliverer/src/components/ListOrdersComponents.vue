<template>
    <h1>List orders</h1>
    <div class="error" v-if="error">
        {{ error }}
    </div>
    <h2>To Deliver</h2>
    <div id="container-list-orders" v-if="ordersDelivering">

        <v-card class="mx-6 my-12" width="250" v-for="order in getOrdersWithoutDeliverer()">

            <v-card-title>
                Address : {{ order.address }}
            </v-card-title>

            <v-card-actions>
                <v-btn icon @click="show1 = !show1">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn @click="confirmDelivererOrder(order)">
                    <v-icon color="secondary">
                        mdi-check
                    </v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show1">

                    <v-card-subtitle class="my-2" v-for="article in order.content">
                        {{ article }}
                    </v-card-subtitle>

                </div>
            </v-expand-transition>

        </v-card>
    </div>
    <h2>Delivered</h2>
    <div id="container-list-orders" v-if="ordersDelivering">
        <v-card class="mx-6 my-12" width="250" v-for="order in getOrdersToDelivered()">
            <v-card-title>
                Total price : {{ order.price.total_price }}$
            </v-card-title>

            <v-card-actions>
                <v-btn icon @click="show2 = !show2">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn @click="confirmDeliveredOrder(order)">
                    <v-icon color="secondary">
                        mdi-check
                    </v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show2">

                    <v-card-subtitle class="my-2" v-for="article in order.content">
                        {{ article }}
                    </v-card-subtitle>

                </div>
            </v-expand-transition>
        </v-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import OrderService from "../../../global/services/OrderService";

export default defineComponent({
    name: 'Orders',
    data: () => ({
        show1: false,
        show2: false,
        ordersDelivering: null,
        error: null,
    }),
    methods: {
        getOrdersWithoutDeliverer() {
            const tmpOrders = this.ordersDelivering.filter(tmpOrder => tmpOrder.users.deliverer_id == undefined);
            return tmpOrders;
        },
        getOrdersToDelivered() {
            const tmpOrders = this.ordersDelivering.filter(tmpOrder => tmpOrder.users.deliverer_id === this.$store.state.user._id);
            return tmpOrders;
        },
        async confirmDelivererOrder(order) {
            const response = await OrderService.confirmDelivererOrder(order._id, this.$store.state.user._id, {users: order.users});
            if(response.status == 200){
                console.log(response);
                //reload page
                this.ordersDelivering = (await OrderService.getOrdersDelivering()).data.orders;
            } 
        },
        async confirmDeliveredOrder(order) {
            const response = await OrderService.changeOrderState(order._id, {
                state: "Delivered"
            });
            if(response.status == 200){
                console.log(response);
                //reload page
                this.ordersDelivering = (await OrderService.getOrdersDelivering()).data.orders;
            } 
        }
    },
    async mounted() {
        try {
            this.ordersDelivering = (await OrderService.getOrdersDelivering()).data.orders;
            console.log(this.ordersDelivering);
        } catch (err) {
            this.error = err.message;
        }
    },
});
</script>