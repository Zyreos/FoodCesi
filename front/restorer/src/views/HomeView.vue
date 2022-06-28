<template>
  <page-orders />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageOrders from '@/components/ListOrdersComponents.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PageOrders
  }
});
</script>
