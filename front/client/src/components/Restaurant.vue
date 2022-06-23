<template>
  <v-card
    class="container"
    max-width="374"
  >
    <v-img
      height="50%"
      src="salade-bar.jpg"
    ></v-img>

    <v-card-title>McDonald's</v-card-title>

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
                    class="burger"
                    >
                    Burger
                    </v-btn>

                    <v-btn
                    class="fast-food"
                    >
                    Fast Food
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
        @click="reserve"
      >
        Commander
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Restaurant',
  data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
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