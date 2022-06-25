
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Role
        </th>
        <th class="text-left">
          Status
        </th>
        <th class="text-left">
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td style="display:flex; justify-content: space-evenly">
          <v-btn>Action</v-btn>
          <v-btn color="error" v-on:Click="deleteUser(user._id)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { defineComponent } from 'vue';
import UserService from "../../../global/services/UserService";

export default defineComponent({
  name: 'Users',
  data() 
  {
    return {users:null}
  },
  methods: 
  {
    getData(){
      UserService.getAllUsers().then((result) => {
        console.log(result)
        this.users = result.data
      });
    },

    deleteUser(id){
      UserService.deleteUser(id).then(()=>{
        this.getData()
      });
    }
  },
  async mounted() {
    this.getData();
  }
});
</script>

<style>

</style>