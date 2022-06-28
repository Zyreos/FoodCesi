<template>
    <h1>List orders</h1>
    <div class="error" v-if="error">
        {{error}}
    </div>
    <h2>To confirm</h2>
    <div id="container-list-orders" v-if="orders">

        <v-card class="mx-6 my-12"  width="250"  v-for="order in getOrders('Confirmation')">
            
            <v-card-title>
                Total price : {{ order.price.total_price }}$
            </v-card-title>

          <v-card-actions>
            <v-btn icon @click="show1 = !show1">
                <v-icon >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn>
                <v-icon color="#DC143C">
                    mdi-close
                </v-icon>
            </v-btn>
            
            <v-btn >
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
    <h2>Preparation</h2>
    <div id="container-list-orders" v-if="orders">
    <v-card class="mx-6 my-12" width="250" v-for="order in getOrders('Preparation')">
        <v-card-title>
            Total price : {{ order.price.total_price }}$
        </v-card-title>

          <v-card-actions>
            <v-btn icon @click="show2 = !show2">
                <v-icon >{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            
            <v-btn >
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