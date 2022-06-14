<template>
  <div class="home">
    <h1>Bienvenue sur la view d'authentification</h1>
    <router-link to="about">Redirection vers about</router-link>
    <page-register />
  </div>
</template>

<script>
import PageRegister from "@/components/RegisterComponent.vue";

export default {
  components: {
    PageRegister,
  },
};
</script>
