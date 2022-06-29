<template>
    <div class="title">
        <h1>List orders</h1>
    </div>

    <div class="error" v-if="error">
        {{ error }}
    </div>
    <div class="subtitle">
        <h2>To Deliver</h2>
    </div>
    <v-divider class="divider"></v-divider>
    <div id="container-list-orders" v-if="ordersDelivering">
        <v-row class="test">
            <v-col cols="12" sm="3">
                <v-card class="mx-6 my-12" width="300" v-for="order in getOrdersWithoutDeliverer()">

                    <v-card-title>
                        Order : {{ order._id.slice(19, 24) }}
                    </v-card-title>

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
            </v-col>
        </v-row>
    </div>
    <v-divider class="divider"></v-divider>
    <div class="subtitle">
        <h2>Delivered</h2>
    </div>
    <v-divider class="divider"></v-divider>
    <div id="container-list-orders" v-if="ordersDelivering">
        <v-row class="test">
            <v-col cols="12" sm="3">
                <v-card class="mx-6 my-12" width="300" v-for="order in getOrdersToDelivered()">
                    <v-card-title>
                        Order : {{ order._id.slice(19, 24) }}
                    </v-card-title>
                    <v-card-title>
                        User Code : {{ order.users.user_id.slice(19, 24) }}
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
            </v-col>
        </v-row>
    </div>
    <v-divider class="divider"></v-divider>
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
            const response = await OrderService.confirmDelivererOrder(order._id, this.$store.state.user._id, { users: order.users });
            if (response.status == 200) {
                console.log(response);
                //reload page
                this.ordersDelivering = (await OrderService.getOrdersDelivering()).data.orders;
            }
        },
        async confirmDeliveredOrder(order) {
            const response = await OrderService.changeOrderState(order._id, {
                state: "Delivered"
            });
            if (response.status == 200) {
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

<style>
.title {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 20px;
}

.articles {
    display: block;
}

.subtitle {
    margin-left: 20px;
    text-decoration: underline;
}

.divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

#container-list-orders {
    width: 100%;
}

.test {
    justify-content: space-around;
}
</style>