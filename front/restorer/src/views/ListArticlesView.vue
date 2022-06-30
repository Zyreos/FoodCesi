<template>
  <div class="home">
    <h1>List articles</h1>
    <page-list />
  </div>
</template>

<script>
import PageList from "@/components/ListArticlesComponent.vue";

export default {
  components: {
    PageList,
  },
};
</script>
