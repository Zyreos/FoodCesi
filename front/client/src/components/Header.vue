<template>
    <v-navigation-drawer
    v-model="drawer"
    app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  data: () => ({
    drawer: null, 
    items: [
          { title: 'Home', icon: 'mdi-view-dashboard', to: '/' },
          { title: 'About', icon: 'mdi-image', to: '/about' },
          { title: 'Register', icon: 'mdi-help-box', to: '/register' },
          { title: 'Login', icon: 'mdi-help-box', to: '/login' },
          { title: 'Profile', icon: 'mdi-help-box', to: '/profile' },

        ],
    }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->