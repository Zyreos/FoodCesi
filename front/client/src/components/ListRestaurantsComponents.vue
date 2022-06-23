<template>
  <div class="error" v-if="error">
        {{error}}
  </div>
  <div id="container-list-restaurants">
    <!-- TODO : Il faut créer les balises HTML pour afficher les restaurants.
        Les données des restaurants sont dans la data() restaurants. 
        Exemple ci dessous d'une boucle for pour chaque restaurant, tu peux t'inspirer de ça pour rajouter des élements -->
    <v-layout>
      <v-flex>
        <div class="categories">
          <v-btn
              class="burger"
              >
              Burger
            </v-btn>

            <v-btn
              class="fast-food"
              >
              Fast Food
            </v-btn>
            <v-btn
              class="asia"
              >
              Asia
            </v-btn>

            <v-btn
              class="pizza"
              >
              Pizza
            </v-btn>
            <v-btn
              class="vegan"
              >
              Vegan
            </v-btn>

            <v-btn
              class="course"
              >
              Course
            </v-btn>
        </div>
      </v-flex>
    </v-layout>
  
    <div class="popular">
      <h3>Les plus populaires</h3>
    </div>
     <v-divider></v-divider>

    <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="test">
          <v-card
            v-for="restaurant in restaurants"
              :loading="loading"
              class="ma-3"
              max-width=""
            >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="200px"
              src={{restaurant.image}}
            ></v-img>

            <v-card-title>{{ restaurant.username }}</v-card-title>

            <v-card-text>
            
                <v-row justify="space-around">
                  <div>
                    <v-btn
                    class="fast-food"
                    >
                    {{ restaurant.category }}
                    </v-btn>
                  </div>
                </v-row>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="reserve(restaurant._id)"
              >
                Commander
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-title>Horraires d'ouvertures</v-card-title>
                <v-card-text>
                  <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
                    >
                      <div class="open-time">Tous les jours :</div>
                      <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.start }}</v-chip>
                      <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.end }}</v-chip>
                  </v-chip-group>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </v-layout>
    </v-flex>
  </div>
  <div class="chinois">
      <h3>Les Asiatiques</h3>
  </div>
  <v-divider></v-divider>
</template>

<script>
import { defineComponent } from 'vue';
import RestaurantService from "../../../global/services/RestaurantService";

export default defineComponent({
    name: 'Restaurant',
    data: () => ({
        show: false,
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
  .open-time {
      margin-right: 10px;
      margin-top: 10px;
      max-height: 50%;
  }
  .v-card {
    max-height: auto;
    width: auto;
  }
  .popular, .chinois{
   margin-top: 10px;
   margin-bottom: 10px;
   margin-left: 10px;
  }
  .fast-food {
        color: white !important;
        background-color: green;
        margin-left: 5px;
        margin-top: 5px;
        max-height: 50%;
    }
    .burger {
        color: white !important;
        background-color: orange;
        max-height: 50%;
        margin-left: 5px;
        margin-top: 5px;
    }
    .course {
        color: white !important;
        background-color: purple;
        margin-left: 5px;
        max-height: 50%;
        margin-top: 5px;
    }
    .asia {
        color: white !important;
        background-color: red;
        max-height: 50%;
        margin-left: 5px;
        margin-top: 5px;
    }
    .vegan {
        color: white !important;
        background-color: grey;
        margin-left: 5px;
        max-height: 50%;
        margin-top: 5px;
    }
    .pizza {
        color: white !important;
        background-color: blue;
        max-height: 50%;
        margin-left: 5px;
        margin-top: 5px;
    }
    .categories {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .layout {
      justify-content: center;
    }
    .stars {
      margin-left: 5px;
    }
    .test {
      display: flex;
    }
    
</style>