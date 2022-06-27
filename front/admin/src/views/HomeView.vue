<template>
  <PageUsers></PageUsers>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageUsers from '@/components/ListUsersComponents.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PageUsers
  }
});
</script>
