<template>
    <h1>My profile</h1>
    <br/>
    <div class="error" v-if="error">
        {{error}}
    </div>

    <div v-if="!$store.state.isUserLoggedIn">
        You need to be connected 
    </div>

    <div v-if="$store.state.isUserLoggedIn">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <div>
            <p>Name</p>
            <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :counter="32"
              required
            >{{ $store.state.user.username}}</v-text-field>
          </v-col>
            <p>Email</p>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              required
            >{{ $store.state.user.email}}</v-text-field>
          </v-col>
            <v-col >
            <p>Age</p>
            <v-text-field
                    v-model="age"
                    type="number"
                    style="width: 80px"
              >{{ $store.state.user.age}}</v-text-field>
          </v-col>
            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Submit
            </v-btn>
        </div>
    </v-form>
        
        <div id="container-orders" v-if="orders">
            <h2>My orders</h2>
            <br/>
            <h3>Orders being processed</h3>
            <div class="orders" v-for="order in getProcessedOrders()" style="border: 2px solid green;">
                <p><b>Address :</b> {{ order.address }}</p>
                <p><b>Status :</b> {{ order.state }}</p>
                <p><b>Estimated time arrival :</b> {{ order.eta }} minute(s)</p>
                <p><b>Price to pay :</b> {{ getPriceToPay(order) }}$</p>
                <p><b>Fee application :</b> {{ order.price.fee_application }}$</p>
                <p><b>Fee deliverer :</b> {{ order.price.fee_deliverer }}$</p>
                <p><b>Tip :</b> {{ order.price.tip }}$</p>
                <p><b>Sum product prices :</b>  {{ order.price.total_price }}$</p>
                <p><b>Order content :</b> {{ order.content }}</p>
            </div>
            <br/>
            <h3>completed orders</h3>
            <div class="orders" v-for="order in getCompletedOrders()" style="border: 2px solid black;">
                <p><b>Address :</b> {{ order.address }}</p>
                <p><b>Status :</b> {{ order.state }}</p>
                <p><b>Estimated time arrival :</b> {{ order.eta }} minute(s)</p>
                <p><b>Price to pay :</b> {{ getPriceToPay(order) }} $</p>
                <p><b>Fee application :</b> {{ order.price.fee_application }}$</p>
                <p><b>Fee deliverer :</b> {{ order.price.fee_deliverer }}$</p>
                <p><b>Tip :</b> {{ order.price.tip }}$</p>
                <p><b>Sum product prices :</b>  {{ order.price.total_price }}$</p>
                <p><b>Order content :</b> {{ order.content }}</p>
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
</style>