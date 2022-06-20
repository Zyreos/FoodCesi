<template>
  <page-restaurant />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageRestaurant from '@/components/Restaurant.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PageRestaurant
  }
});
</script>
