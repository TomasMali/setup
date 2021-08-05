<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Loading...">
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="container mt-5">
      <div class="table-responsive">
        <table class="table table-responsive  table-sm table-hover text-center">
          <thead class="bg-dark text-white">
            <tr class="">
              <th scope="col">#</th>
              <th scope="col">Edit</th>
              <th scope="col">Name</th>
              <th scope="col">Save</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>

              <th scope="col">Public</th>
              <th scope="col">Events</th>
              <th scope="col">Competitions</th>
              <th class=" " scope="col">
                Modify Users
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.email">
              <th scope="row">{{ index + 1 }}</th>

              <td>
                <div class="px-4 cursor-pointer">
                  <i class="fas fa-save"></i>
                </div>
              </td>
              <td>
                <div class="px-4 cursor-pointer">
                  <i class="fas fa-edit"></i>
                </div>
              </td>

              <td>{{ user.name }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role_name }}</td>

              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.public"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.events"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.competitions"
                />
              </td>
              <td class=" ">
                <input
                  class=""
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.manageUser"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      isLoading: false,
    };
  },
  methods: {
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("user/fetchUsers");

        this.users = this.$store.getters["user/getUsers"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadUsers();
  },
};
</script>
