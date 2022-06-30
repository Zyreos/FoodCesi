<template>
    <v-navigation-drawer
    v-model="drawer"
    app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            FoodCesi
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="'/'" link>
            <v-icon>mdi-view-dashboard</v-icon>
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/profile'" link v-if="$store.state.isUserLoggedIn">
            <v-icon>mdi-account-circle</v-icon>
            <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/stats'" link v-if="$store.state.isUserLoggedIn">
            <v-icon>mdi-account-circle</v-icon>
            <v-list-item-title>Stats</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/register'" link v-if="!$store.state.isUserLoggedIn">
            <v-icon>mdi-account-plus</v-icon>
            <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/login'" link v-if="!$store.state.isUserLoggedIn">
            <v-icon>mdi-login</v-icon>
            <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/create_article'" link v-if="$store.state.isUserLoggedIn">
            <v-icon>mdi-folder-plus</v-icon>
            <v-list-item-title>Create</v-list-item-title>
        </v-list-item>
        <page-disconnect />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      app
      color="primary"
      dark
      src="salade.jpg"
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>FoodCesi</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon :to="'/profile'" link v-if="$store.state.isUserLoggedIn">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageDisconnect from "../../../global/components/DisconnectComponent.vue";

export default defineComponent({
  name: "Header",
  components: {
    PageDisconnect,
  },
  data: () => ({
    drawer: null, 
    })
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->