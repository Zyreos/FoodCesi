<template>
  <v-app>
    <page-header />
    <v-main>
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
