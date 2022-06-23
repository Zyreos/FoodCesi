<template>
    <div class="error" v-if="error">
        {{error}}
    </div>
    <div id="container-products">
        <!-- TODO : Il faut créer les balises HTML pour afficher les produits du restaurants.
        Les données du restaurant sont dans la data() restaurant. 
        Exemple ci dessous -->
        {{restaurant}}
    </div>
</template>

<script>
import RestaurantService from "../../../global/services/RestaurantService";
export default {
    data () {
        return {
            restaurant: null,
            error: null
        }
    },
    async mounted() {
        try {
            const idRestaurant = this.$route.params.id;
            this.restaurant = (await RestaurantService.getRestaurant(idRestaurant)).data.restaurant;
        } catch (err) {
            this.error = err.message;
        }
    },
};
</script>

<style scoped>
.error {
    color: red;
  }
</style>
