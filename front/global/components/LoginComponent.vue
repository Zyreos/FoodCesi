<template>
  <h1>Ceci est un component Login</h1>
  <div id="login">
    <input type="Text" name="email" v-model="email" placeholder="Email" />
    <input
      type="Password"
      name="Password"
      v-model="password"
      placeholder="Password"
    />
    <br/>
    <div class="error" v-html="error" />
    <button Type="Button" @click="login">Login</button>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
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
