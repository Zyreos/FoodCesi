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
              @click="showtest =  !showtest"
              v-bind:class="{ 'burger': showtest, 'noburger': !showtest }"
              >
            {{showtest ? 'Burger' : 'Burger' }}
            </v-btn>

            <v-btn
              @click="showfast =  !showfast"
              v-bind:class="{ 'fast-food': showfast, 'nofast-food': !showfast }"
              >
            {{showtest ? 'Fast Food' : 'Fast Food' }}
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
            <v-btn
              class="indien"
              >
              Indien
            </v-btn>
            <v-btn
              class="pates"
              >
              Pates
            </v-btn>
        </div>
      </v-flex>
    </v-layout>
  
    <div class="popular" >
      <h3 v-show="showtest">{{showtest ? 'Les plus populaires' : '' }}</h3>
    </div>
    <div class="popular" >
      <h3 v-show="!showburger">{{showtest ? '' : 'Les Burgers' }}</h3>
    </div>
    <v-divider v-show="!showtest"></v-divider>
     <v-divider v-show="showtest"></v-divider>

    <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card v-show="showtest && showfast"
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
                    v-bind:class="categories[restaurant.category]"
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
      <h3 v-show="showtest">{{showtest ? 'Nos Suggestions' : 'Les burgers' }}</h3>
  </div>
  <v-divider v-show="showtest" ></v-divider>
  <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card v-show="showtest && showfast"
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
                    v-bind:class="categories[restaurant.category]"
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
<!-- ====================================================================
BURGER VIEW
=========================================================================
-->

    <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card v-show="!showtest"
            v-for="restaurant in restaurants.slice(1, 2)"
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
                    v-bind:class="categories[restaurant.category]"
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
    <v-divider v-show="!showtest" ></v-divider>
<!-- ====================================================================
FAST FOOD
=========================================================================
-->

    <v-flex d-flex>
      <v-layout wrap class="layout">
        <div class="card-component">
          <v-card v-show="!showfast"
            v-for="restaurant in restaurants.slice(0, 1)"
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
                    v-bind:class="categories[restaurant.category]"
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
    <v-divider v-show="!showfast" ></v-divider>
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
        showfast: true,
        showburger: false,
        restaurants: [],
        error: null,
        loading: false,
        selection: 1,
        categories: {
          "burger": 'burger',
          "asia": 'asia', 
          "fast food": 'fast-food',
          "course": 'course',
          "vegan": 'vegan', 
          "pizza": 'pizza',
          "indien": 'indien', 
          "pates": 'pates',
        }
        
      }),
    methods: {
      reserve (idRestaurant) {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        //redirection to the restaurant page by id
        this.$router.push({ name: 'Restaurant', params: { id: idRestaurant } })
      },
      select () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        //redirection to the restaurant page by id
        this.$router.push({ name: 'Category'})
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
  .nofast-food {
    color: green !important;
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
    .noburger {
        color: orange !important;
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