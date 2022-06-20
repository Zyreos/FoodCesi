<template>
  <v-app>
    <page-header />
    <v-main>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link>
      </nav>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader
  },
  data () {
    return {
      //
    }
  },
})
</script>
