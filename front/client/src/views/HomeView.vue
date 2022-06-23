<template>
  <page-restaurants />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageRestaurants from '@/components/ListRestaurantsComponents.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PageRestaurants
  }
});
</script>
