<template>
    <div>
        <h1 class="title">List orders</h1>
    </div>

    <div class="error" v-if="error">
        {{ error }}
    </div>
    <div class="subtitle">
        <h2>To confirm</h2>
    </div>
    <v-divider class="divider"></v-divider>
    <div id="container-list-orders" v-if="orders">
        <v-row class="test">
            <v-col cols="12" sm="3">
                <v-card class="mx-6 my-12" width="300" v-for="order in getOrders('Confirmation')">
                    <v-card-title>
                        Order : {{ order._id.slice(19, 24) }}
                    </v-card-title>

                    <v-card-title>
                        Total price : {{ order.price.total_price }}$
                    </v-card-title>

                    <v-card-actions>
                        <v-btn icon @click="show1 = !show1">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="cancelOrder(order)">
                            <v-icon color="#DC143C">
                                mdi-close
                            </v-icon>
                        </v-btn>

                        <v-btn @click="confirmOrder(order)">
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
        <h2>Preparation</h2>
    </div>
    <v-divider class="divider"></v-divider>
    <div id="container-list-orders" v-if="orders">
        <v-row class="test">
            <v-col cols="12" sm="3">
                <v-card class="mx-6 my-12" width="300" v-for="order in getOrders('Preparation')">
                    <v-card-title>
                        Order : {{ order._id.slice(19, 24) }}
                    </v-card-title>

                    <v-card-title>
                        Total price : {{ order.price.total_price }}$
                    </v-card-title>

                    <v-card-actions>
                        <v-btn icon @click="show2 = !show2">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>

                        <v-btn @click="prepareOrder(order)">
                            <v-icon color="secondary">
                                mdi-check
                            </v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show2">

                            <v-card-subtitle class="articles" v-for="article in order.content">
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
        orders: null,
        error: null,
    }),
    methods: {
        getOrders(status) {
            const completedOrders = this.orders.filter(tmpOrder => tmpOrder.state === status);
            return completedOrders;
        },
        async cancelOrder(order) {
            const response = await OrderService.changeOrderState(order._id, {
                state: 'Cancelled'
            });
            if (response.status == 200) {
                //reload page
                this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
            }
        },
        async confirmOrder(order) {
            const response = await OrderService.changeOrderState(order._id, {
                state: 'Preparation'
            });
            if (response.status == 200) {
                //reload page
                this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
            }
        },
        async prepareOrder(order) {
            const response = await OrderService.changeOrderState(order._id, {
                state: 'Delivering'
            });
            if (response.status == 200) {
                //reload page
                this.orders = (await OrderService.getOrdersUser(this.$store.state.user._id)).data.orders;
            }
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