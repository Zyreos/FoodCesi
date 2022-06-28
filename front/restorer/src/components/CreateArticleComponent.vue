<template>
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation 
    class="mx-12 my-12"
  >
    <v-text-field
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="category"
      :counter="30"
      :rules="nameRules"
      label="Category"
      required
    ></v-text-field>

    <v-text-field
      v-model="price"
      type="number"
      label="Price"
      required
    ></v-text-field>

    <v-text-field
      v-model="description"
      :counter="50"
      :rules="nameRules"
      label="Description"
      required
    ></v-text-field>


    <v-text-field
      v-model="picture"
      :counter="50"
      :rules="nameRules"
      label="URL-picture"
      required
    ></v-text-field>

    <v-text-field
      v-model="available_quantity"
      type="number"
      label="Available quantity"
      required
    ></v-text-field>

  <v-col>
    <v-switch
     @click="show = !show"
      v-model="showAddArticles"
      label="Menu"
      color="blue"
    ></v-switch>
    
            <div v-show="show">
            <v-card-actions>
                <v-card-title>Add Articles</v-card-title>
                <v-spacer></v-spacer> 
                <v-btn @click="show1 = !show1">
                    <v-icon>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-card-actions>
            <div v-show="show1">
                <v-text-field
                v-model="article_name"
                :counter="30"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>

                <v-text-field
                    v-model="article_category"
                    :counter="30"
                    :rules="nameRules"
                    label="Category"
                     required
                ></v-text-field>


                <v-text-field
                    v-model="article_description"
                    :counter="50"
                    :rules="nameRules"
                    label="Description"
                    required
                ></v-text-field>
                <v-card-actions> 
                     <v-spacer></v-spacer>               
                    <v-btn >
                    Add
                </v-btn>
                
            </v-card-actions>

         </div>        
            </div>
   


  </v-col>
<v-card-actions>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>
    <v-spacer></v-spacer>  
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
    <v-spacer></v-spacer>  
    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
</v-card-actions>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],

      
      show: false,
      show1: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>