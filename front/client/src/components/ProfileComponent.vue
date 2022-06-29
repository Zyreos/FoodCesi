<template>
  <div class="title">
    <h1>My profile</h1>
  </div>
  <div class="error" v-if="error">
    {{ error }}
  </div>
  <div v-if="!$store.state.isUserLoggedIn">You need to be connected</div>

  <div v-if="$store.state.isUserLoggedIn">
    <v-form
      class="profile-content"
      ref="form"
      v-model="valid"
      lazy-validation
      @submit="updateUser"
    >
      <div>
        <p class="title-cat">Name :</p>
        <v-col cols="12" md="4">
          <v-text-field class="textfield" v-model="username" required>
          </v-text-field>
        </v-col>
        <p class="title-cat">Email :</p>
        <v-col cols="12" md="4">
          <v-text-field class="textfield" v-model="email" required>
          </v-text-field>
        </v-col>
        <p class="title-cat">Address :</p>
        <v-col cols="12" md="4">
          <v-text-field class="textfield" placeholder="Street" v-model="addressStreet" required></v-text-field>
          <v-text-field class="textfield" placeholder="City" v-model="addressCity" required></v-text-field>
          <v-text-field class="textfield" placeholder="Postal Code" v-model="addressPostalCode" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <p class="title-age">Age :</p>
          <v-text-field class="textage" v-model="age" style="width: 80px">
          </v-text-field>
          <v-btn
            color="blue-darken-1"
            v-on:Click="getForm($store.state.user._id)"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-col>
      </div>
    </v-form>
    <v-divider></v-divider>
    <div id="container-orders" v-if="orders">
      <h2 class="title" style="margin-top: 20px">My orders</h2>
      <v-spacer></v-spacer>
      <div class="order">
        <v-row>
          <v-col cols="12" sm="6">
            <h3>Orders being processed</h3>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn class="expand" icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <div
            class="orders"
            v-for="order in getProcessedOrders()"
            style="border: 2px solid green"
          >
            <p><b>Address :</b> {{ order.address }}</p>
            <p><b>Status :</b> {{ order.state }}</p>
            <p><b>Estimated time arrival :</b> {{ order.eta }} minute(s)</p>
            <p><b>Price to pay :</b> {{ getPriceToPay(order) }}$</p>
            <p><b>Fee application :</b> {{ order.price.fee_application }}$</p>
            <p><b>Fee deliverer :</b> {{ order.price.fee_deliverer }}$</p>
            <p><b>Tip :</b> {{ order.price.tip }}$</p>
            <p><b>Sum product prices :</b> {{ order.price.total_price }}$</p>
            <p><b>Order content :</b></p>
            <li v-for="line in order.content">{{ line }}</li>
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
            <v-btn class="expand" icon @click="show1 = !show1">
              <v-icon>{{
                show1 ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-expand-transition>
        <div v-show="show1">
          <v-divider></v-divider>
          <div
            class="orders"
            v-for="order in getCompletedOrders()"
            style="border: 2px solid black"
          >
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
import { defineComponent } from "vue";
import OrderService from "../../../global/services/OrderService";
import UserService from "../../../global/services/UserService";

export default defineComponent({
  name: "Restaurant",
  data: () => ({
    orders: null,
    user: null,
    error: null,
    show: false,
    show1: false,
    username: null,
    addressStreet: null,
    addressCity: null,
    addressPostalCode: null,
    email: null,
    age: null,
    id: null,
  }),
  methods: {
    getProcessedOrders() {
      const statesArray = ["Confirmation", "Preparation", "Delivering"];
      const processedOrders = this.orders.filter(
        (tmpOrder) => statesArray.indexOf(tmpOrder.state) > -1
      );
      return processedOrders;
    },
    getCompletedOrders() {
      const statesArray = ["Cancelled", "Delivered"];
      const completedOrders = this.orders.filter(
        (tmpOrder) => statesArray.indexOf(tmpOrder.state) > -1
      );
      return completedOrders;
    },
    getPriceToPay(order) {
      const total =
        order.price.fee_application +
        order.price.fee_deliverer +
        order.price.tip +
        order.price.total_price;
      return total;
    },

    getDatabyID(id) {
      UserService.getUserByID(id).then((result) => {
        
        this.$store.dispatch('setUser', result.data)

        this.user = result.data;
        this.username = result.data.username;
        this.email = result.data.email;
        this.age = result.data.age;
        this.addressStreet = result.data.address.street;
        this.addressCity = result.data.address.city;
        this.addressPostalCode = result.data.address.postal_code;
      });
    },

    getForm(id) {
      const update = {
        id: id,
        username: this.username,
        email: this.email,
        address: {
          street: this.addressStreet,
          city: this.addressCity,
          postal_code: this.addressPostalCode
        },
        age: this.age,
      };

      console.log(update);

      UserService.updateUser(update.id, update).then(() => {
        alert("Profile changed");
        this.getDatabyID(this.$store.state.user._id);
      });
    },
  },
  async mounted() {
    try {
      this.orders = (
        await OrderService.getOrdersUser(this.$store.state.user._id)
      ).data.orders;

      this.getDatabyID(this.$store.state.user._id);
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
  box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
  box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
