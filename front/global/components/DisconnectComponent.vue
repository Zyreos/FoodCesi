<template>
    <v-btn block color="primary" v-if="$store.state.isUserLoggedIn" @click="disconnect">
        Disconnect
    </v-btn>
</template>

<script>
export default {
  methods: {
    async disconnect() {
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUser', null);      
    },
  },
};
</script>