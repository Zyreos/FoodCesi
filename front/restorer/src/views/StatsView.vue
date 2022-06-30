<template>
  <page-stats />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageStats from '@/components/StatsComponents.vue'

export default defineComponent({
  name: 'StatsView',
  components: {
    PageStats
  }
});
</script>
