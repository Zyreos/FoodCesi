<template>
  <h1>Ceci est un component Register</h1>
  <div id="register">
    <input type="Text" name="username" v-model="username" placeholder="Username" />
    <input type="Number" name="age" v-model="age" placeholder="Age" />
    <input type="Text" name="email" v-model="email" placeholder="Email" />
    <input
      type="Password"
      name="Password"
      v-model="password"
      placeholder="Password"
    />
    <br/>
    <div class="error" v-html="error" />
    <button Type="Button" @click="register">Register</button>
  </div>
  <h1 v-if="!$store.state.isUserLoggedIn">Je suis pas connecté</h1>
  <h1 v-if="$store.state.isUserLoggedIn">Je suis connecté</h1>
</template>

<script>
import AuthenticationService from "../../../global/services/AuthenticationService";
export default {
  data() {
    return {
      username: "",
      age: 18,
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          age: this.age,
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.error
      }
      
    },
  },
};
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
