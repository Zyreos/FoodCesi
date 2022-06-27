<template>
  <div v-if="!$store.state.isUserLoggedIn">
    <v-form>
      <v-container>
        <v-row>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :counter="32"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <p>Age</p>
            <v-text-field
                    v-model="age"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 80px"
              ></v-text-field>
          </v-col>
        </v-row>
        <div class="error" v-html="error" />
        <v-btn class="mr-4" type="submit" @click="register">
          submit
        </v-btn>
      </v-container>
    </v-form>
  </div>
  <div v-if="$store.state.isUserLoggedIn">you're already connected</div>
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
        this.$router.push({
          name: 'home'
        });
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
