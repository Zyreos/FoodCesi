<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Role</th>
        <th class="text-left">Status</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td style="display: flex; justify-content: space-evenly">
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" v-on:Click="getDatabyID(user._id)"> Update </v-btn>
            </template>
            <v-form @submit="updateUser">
              <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
              <span class="text-h10" >ID : {{id}}</span>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="username" item label="Username"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="role"
                        :items="['admin', 'client', 'restorer', 'deliverer']"
                        label="Role"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="status"
                        :items="['active', 'suspended', 'banned']"
                        label="Status"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="primary" v-on:Click="getForm(user._id)" @click="dialog = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>
          <v-btn color="error" v-on:Click="deleteUser(user._id)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { defineComponent } from "vue";
import UserService from "../../../global/services/UserService";

export default defineComponent({
  name: "Users",
  data() {
    return {
      users: null,
      dialog: false,
      username: null,
      email: null,
      role: null,
      status: null,
      id: null
    };
  },
  methods: {
    getData() {
      UserService.getAllUsers().then((result) => {
        this.users = result.data;
      });
    },

    getDatabyID(id){
      UserService.getUserByID(id).then((result) => {
        this.id = id;
        this.username = result.data.username;
        this.email = result.data.email;
        this.role = result.data.role;
        this.status = result.data.status;
      });
    },
    
    getForm(id){
      const update = {
        id: this.id,
        username: this.username,
        email: this.email,
        role: this.role,
        status: this.status
      };
      
      UserService.updateUser(this.id, update).then(() => {
        this.getData();
      });
    },

    deleteUser(id) {
      UserService.deleteUser(id).then(() => {
        this.getData();
      });
    },
  },
  async mounted() {
    this.getData();
  },
});
</script>

<style></style>
