<template>
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
        <v-flex md4>
          <v-card
            :loading="loading"
            class="ma-3"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
           </template>
            <v-img
            src="mcdo.jpg"
            height="200px"
            ></v-img>

            <v-card-title>
              McDonald's
            </v-card-title>

            <v-card-actions>
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="reserve"
              >
                Reserve
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

                <v-card-text>
                  <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 wihte--text"
                    column
                    >
                    <v-chip>5:30PM</v-chip>

                    <v-chip>7:30PM</v-chip>

                    <v-chip>8:00PM</v-chip>

                    <v-chip>9:00PM</v-chip>
                  </v-chip-group>
                </v-card-text>
              </div>
            </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="burger-king.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Burger King
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
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

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="indien.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Indien
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show2 = !show2"
            >
              <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show2">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>


      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="pates.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Marcucci
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show3 = !show3"
            >
              <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show3">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="pizza-denis.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Pizza Denis
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show4 = !show4"
            >
              <v-icon>{{ show4 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show4">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
       </v-flex>       
    </v-layout>
  </v-flex>
  <div class="chinois">
      <h3>Les Asiatiques</h3>
  </div>
  <v-divider></v-divider>

  <v-flex d-flex>
      <v-layout wrap class="layout">
        <v-flex md4>
          <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="pizza-michel.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Pizza Michel
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show5 = !show5"
            >
              <v-icon>{{ show5 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show5">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="salade-bar.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Salad Bar
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show6 = !show6"
            >
              <v-icon>{{ show6 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show6">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="supermarche.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Supermarché
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show7 = !show7"
            >
              <v-icon>{{ show7 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show7">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>


      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="sushi.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Asiakéo
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show8 = !show8"
            >
              <v-icon>{{ show8 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show8">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex md4>
        <v-card
          class="ma-3"
          max-width="344"
          >
          <v-img
          src="vegan.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
            Chez Vegis
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show9 = !show9"
            >
              <v-icon>{{ show9 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show9">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
       </v-flex>       
    </v-layout>
  </v-flex>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
  export default defineComponent ({
    name: 'AboutView',
    data: () => ({
      show: false,
      show1: false, 
      show2: false, 
      show3: false, 
      show4: false,
      show5: false,
      show6: false, 
      show7: false, 
      show8: false, 
      show9: false,
      loading: false,
      selection: 1,
    }),
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },

  })
</script>

<style>
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
</style>
