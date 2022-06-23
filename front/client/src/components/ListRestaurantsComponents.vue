<template>
  <div class="error" v-if="error">
        {{error}}
  </div>
  <div id="container-list-restaurants">
    <!-- TODO : Il faut créer les balises HTML pour afficher les restaurants.
        Les données des restaurants sont dans la data() restaurants. 
        Exemple ci dessous d'une boucle for pour chaque restaurant, tu peux t'inspirer de ça pour rajouter des élements -->
    <v-card
    v-for="restaurant in restaurants"
    class="container"
    max-width="374"
    >
      <v-img
        height="50%"
        src="salade-bar.jpg"
      ></v-img>

      <v-card-title>{{ restaurant.username }}</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
          <v-container>
              <v-row justify="space-around">
                  <div>
                      <v-btn
                      class="fast-food"
                      >
                      {{ restaurant.category }}
                      </v-btn>
                  </div>
              </v-row>
          </v-container>
        </v-row>

        <div class="my-4 text-subtitle-1">
        </div>

        <div>Burgers, frites & happyMeal - Livraison, sur place ou encore Click&Collect disponible</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Horraires d'ouvertures</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
        <div class="open-time">Tous les jours :</div>
          <v-chip class="timer">08:00</v-chip>
          <v-chip>22:00</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="reserve(restaurant._id)"
        >
          Commander
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import RestaurantService from "../../../global/services/RestaurantService";

export default defineComponent({
    name: 'Restaurant',
    data: () => ({
        restaurants: null,
        error: null,
        loading: false,
        selection: 1,
      }),
    methods: {
      reserve (idRestaurant) {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        //redirection to the restaurant page by id
        this.$router.push({ name: 'Restaurant', params: { id: idRestaurant } })
      },
    },
    async mounted() {
        try {
            this.restaurants = (await RestaurantService.getAllRestaurants()).data.restaurants;
            console.log(this.restaurants);
        } catch (err) {
            this.error = err.message;
        }
    },
});
</script>

<style>
    .fast-food {
        color: white !important;
        background-color: green;
        margin-left: 5px;
        max-height: 50%;
    }
    .burger {
        color: white !important;
        background-color: orange;
        max-height: 50%;
    }
    .open-time {
        margin-right: 10px;
        margin-top: 10px;
        max-height: 50%;
    }
    .v-card {
      max-height: auto;
      width: auto;
    }
    
</style>