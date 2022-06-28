<template>
    <div class="title">
        <h1>My profile</h1>
    </div>
    <div class="error" v-if="error">
        {{ error }}
    </div>
    <div v-if="!$store.state.isUserLoggedIn">
        You need to be connected
    </div>

    <div v-if="$store.state.isUserLoggedIn">
        <v-form class="profile-content" ref="form" v-model="valid" lazy-validation>
            <div>
                <p class="title-cat">Name :</p>
                <v-col cols="12" md="4">
                    <v-text-field class="textfield" v-model="username" required readonly>{{ $store.state.user.username }}
                    </v-text-field>
                </v-col>
                <p class="title-cat">Email :</p>
                <v-col cols="12" md="4">
                    <v-text-field class="textfield" v-model="email" required readonly>{{ $store.state.user.email }}
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <p class="title-age">Age :</p>
                    <v-text-field class="textage" v-model="age" style="width: 80px" readonly>{{ $store.state.user.age }}
                    </v-text-field>
                </v-col>
            </div>
        </v-form>
        <v-divider></v-divider>
        <div id="container-orders" v-if="orders">

            <h2 class="title" style="margin-top:20px">My orders</h2>
            <v-spacer></v-spacer>
            <div class="order">
                <v-row>
                    <v-col cols="12" sm="6">
                        <h3>Orders being processed</h3>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn class="expand" icon @click="show = !show">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <div class="orders" v-for="order in getProcessedOrders()" style="border: 2px solid green;">
                        <p><b>Address :</b> {{ order.address }}</p>
                        <p><b>Status :</b> {{ order.state }}</p>
                        <p><b>Estimated time arrival :</b> {{ order.eta }} minute(s)</p>
                        <p><b>Price to pay :</b> {{ getPriceToPay(order) }}$</p>
                        <p><b>Fee application :</b> {{ order.price.fee_application }}$</p>
                        <p><b>Fee deliverer :</b> {{ order.price.fee_deliverer }}$</p>
                        <p><b>Tip :</b> {{ order.price.tip }}$</p>
                        <p><b>Sum product prices :</b> {{ order.price.total_price }}$</p>
                        <p><b>Order content :</b> {{ order.content }}</p>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-expand-transition>

            <div class="order">
                <v-row>
                    <v-col cols="12" sm="6">
                        <h3>Completed Order</h3>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn class="expand" icon @click="show = !show">
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <v-expand-transition>
                <div v-show="show1">
                    <v-divider></v-divider>
                    <div class="orders" v-for="order in getCompletedOrders()" style="border: 2px solid black;">
                        <p><b>Address :</b> {{ order.address }}</p>
                        <p><b>Status :</b> {{ order.state }}</p>
                        <p><b>Estimated time arrival :</b> {{ order.eta }} minute(s)</p>
                        <p><b>Price to pay :</b> {{ getPriceToPay(order) }} $</p>
                        <p><b>Fee application :</b> {{ order.price.fee_application }}$</p>
                        <p><b>Fee deliverer :</b> {{ order.price.fee_deliverer }}$</p>
                        <p><b>Tip :</b> {{ order.price.tip }}$</p>
                        <p><b>Sum product prices :</b> {{ order.price.total_price }}$</p>
                        <p><b>Order content :</b> {{ order.content }}</p>
                    </div>
                    <v-divider></v-divider>
                </div>
            </v-expand-transition>
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
        error: null,
        show: false,
        show1: false,
    }),
    methods: {
        getProcessedOrders() {
            const statesArray = ["Confirmation", "Preparation", "Delivering"];
            const processedOrders = this.orders.filter(tmpOrder => statesArray.indexOf(tmpOrder.state) > -1);
            return processedOrders;
        },
        getCompletedOrders() {
            const statesArray = ["Cancelled", "Delivered"];
            const completedOrders = this.orders.filter(tmpOrder => statesArray.indexOf(tmpOrder.state) > -1);
            return completedOrders;
        },
        getPriceToPay(order) {
            const total =
                order.price.fee_application +
                order.price.fee_deliverer +
                order.price.tip +
                order.price.total_price;
            return total;
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
.error {
    color: red;
}

.profile-content {
    box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    padding-top: 20px;
    border-radius: 25px;
}

.title {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 20px;
}

.title-cat {
    margin-left: 18%;
}

.textfield {
    width: 400px;
    margin-left: 50%;
}

.textage {
    margin-left: 50%;
}

.title-age {
    margin-left: 55%;
}

.order {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 12px;
}

.expand {
    align-items: left;
}

.orders {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>