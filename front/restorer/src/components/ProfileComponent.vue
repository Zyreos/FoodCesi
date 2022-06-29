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
        <p class="title-cat">Restaurant :</p>
        <v-col cols="12" md="4">
          <v-text-field class="textfield" placeholder="Category" v-model="category" required></v-text-field>
          <v-text-field class="textfield" placeholder="Description" v-model="description" required></v-text-field>
          <v-text-field class="textfield" placeholder="Name restaurant" v-model="name_restaurant" required></v-text-field>
          <v-text-field class="textfield" placeholder="Profile picture" v-model="profile_picture" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UserService from "../../../global/services/UserService";

export default defineComponent({
  name: "Restaurant",
  data: () => ({
    user: null,
    error: null,
    show: false,
    show1: false,
    username: null,
    addressStreet: null,
    addressCity: null,
    addressPostalCode: null,
    category: null,
    description: null,
    name_restaurant: null,
    profile_picture: null,
    email: null,
    id: null,
  }),
  methods: {
    getDatabyID(id) {
      UserService.getUserByID(id).then((result) => {
        this.$store.dispatch('setUser', result.data)

        this.user = result.data;
        this.username = result.data.username;
        this.email = result.data.email;
        this.addressStreet = result.data.address.street;
        this.addressCity = result.data.address.city;
        this.addressPostalCode = result.data.address.postal_code;
        this.category = result.data.category;
        this.description = result.data.description;
        this.name_restaurant = result.data.name_restaurant;
        this.profile_picture = result.data.profile_picture;
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
        category: this.category,
        description: this.description,
        name_restaurant: this.name_restaurant,
        profile_picture: this.profile_picture,
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