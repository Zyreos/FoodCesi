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
          <v-btn v-on:Click="getAll()"
          @click="showtest = !showtest">All
            </v-btn>
          <v-btn v-for="category in categories" v-on:Click="getRestaurantsBycategory(category.category)"
              v-bind:class="swancate[category.category]"
              @click="showtest =  showtest"
              >
              {{category.category}}
            </v-btn>
        </div>
      </v-flex>
    </v-layout> 
  
    <div class="popular">
      <h3 v-show="!showtest">{{showtest ? '' : 'Les plus populaires' }}</h3>
    </div>
     <v-divider></v-divider>

    <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card
            v-for="restaurant in restaurants.slice(0, 5)"
              class="ma-3"
              width="264px"
            >
            <v-img
              :src="restaurant.profile_picture"
              height="200px"
            ></v-img>

            <v-card-title>{{ restaurant.name_restaurant }}</v-card-title>

            <v-card-text>
            
                <v-row justify="space-around">
                  <div>
                    <v-btn
                    v-bind:class="swancate[restaurant.category]"
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
                      <div class="open-hours">
                        <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.start }}</v-chip>
                        <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.end }}</v-chip>
                      </div>
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
      <h3 v-show="showtest">{{showtest ? '' : 'Nos Suggestions' }}</h3>
  </div>
  <v-divider></v-divider>
  <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card
            v-for="restaurant in restaurants.slice(5, 10)"
              class="ma-3"
              width="264px"
            >
            <v-img
              :src="restaurant.profile_picture"
              height="200px"
            ></v-img>

            <v-card-title>{{ restaurant.name_restaurant }}</v-card-title>

            <v-card-text>
            
                <v-row justify="space-around">
                  <div>
                    <v-btn 
                    v-bind:class="swancate[restaurant.category]"
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
                @click="show1 = !show1"
              >
                <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show1">
                <v-divider></v-divider>
                <v-card-title>Horraires d'ouvertures</v-card-title>
                <v-card-text>
                  <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
                    >
                      <div class="open-time">Tous les jours :</div>
                      <div class="open-hours">
                        <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.start }}</v-chip>
                        <v-chip v-if="restaurant.schedule !== undefined">{{ restaurant.schedule.end }}</v-chip>
                      </div>
                  </v-chip-group>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </v-layout>
    </v-flex>
</template>

<script>
import { defineComponent } from 'vue';
import RestaurantService from "../../../global/services/RestaurantService";

export default defineComponent({
    name: 'Restaurant',
    data: () => ({
        show: false,
        show1: false,
        showtest: true,
        restaurants: [],
        error: null,
        loading: false,
        selection: 1,
        category: null,
        categories: [],
        swancate: {
          "burger": 'burger',
          "asia": 'asia', 
          "fast food": 'fast-food',
          "course": 'course',
          "vegan": 'vegan', 
          "pizza": 'pizza',
          "indien": 'indien', 
          "pates": 'pates',
          "libanese": 'libanese',
        }
      }),
    methods: {
      reserve (idRestaurant) {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        //redirection to the restaurant page by id
        this.$router.push({ name: 'Restaurant', params: { id: idRestaurant } })
      },
      getRestaurantsBycategory(category){
        this.category = category
        console.log(category)
        RestaurantService.getRestaurantsByCategory(category).then((res) => {
          this.restaurants = res.data.restaurants
        })
      },
      getAll(){
        RestaurantService.getAllRestaurants().then((res) => {
          this.restaurants = res.data.restaurants
        })
      }
    },
    async mounted() {
        try {
            this.restaurants = (await RestaurantService.getAllRestaurants()).data.restaurants;
            this.categories = (await RestaurantService.getAllCategories()).data.restaurants;
            this.categories = this.categories.filter((set => f => !set.has(f.category) && set.add(f.category))(new Set));

            console.log(this.restaurants);
            console.log(this.categories);
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
    .indien {
        color: white !important;
        background-color: rgb(0, 0, 0);
        max-height: 50%;
        margin-left: 5px;
        margin-top: 5px;
    }
    .pates {
        color: white !important;
        background-color: brown;
        max-height: 50%;
        margin-left: 5px;
        margin-top: 5px;
    }
    .libanese {
      color: white !important;
      background-color: rgb(158, 158, 81);
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
    .card-component {
      display: flex;
    }
    .open-hours {
      justify-content: center;
      margin-right: 10px;
      margin-top: 10px;
      max-height: 50%;
    }
    
</style>