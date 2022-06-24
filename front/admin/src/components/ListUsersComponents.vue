
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
        <td style="display:flex; justify-content: space-evenly"><v-btn>Action</v-btn> <v-btn color="error" plain>Delete</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { defineComponent } from 'vue';
import UserService from "../../../global/services/UserService";

export default defineComponent({
    name: 'User',
    data: () => ({
        users: null,
        error: null,
        loading: false,
        selection: 1,
      }),
      methods: {
      reserve (idUser) {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
    async mounted() {
        try {
            this.users = (await UserService.getAllUsers()).data;
            console.log(this.users);
        } catch (err) {
            this.error = err.message;
        }
    }
});
</script>

<style>

</style>