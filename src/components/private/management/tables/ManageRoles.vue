<template>
  <div>
    <div class="container my-5">
      <div class="table-responsive ">
        <table class="table table-hover table-responsive  table-sm text-center">
          <thead class="bg-dark text-white">
            <tr class="">
              <th scope="col">#</th>

              <th scope="col">Name</th>

              <th scope="col">Public</th>
              <th scope="col">Events</th>
              <th scope="col">Competitions</th>
              <th class=" " scope="col">
                Modify Users
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(role, index) in roles" :key="role.id">
              <td scope="row">{{ index + 1 }}</td>

              <td class="text-center mx-0 px-0 ">
                <input type="text" v-model="role.name" class="text-center" />
              </td>

              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="role.page.allow.public"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="role.page.allow.events"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="role.page.allow.competitions"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="checkbox"
                  v-model="role.page.allow.manageUser"
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
      roles: null,

      isLoading: false,
    };
  },
  methods: {
    async loadRolesTable() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tab/getTabs", "Roles");
        this.roles = this.$store.getters["tab/get" + "Roles"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadRolesTable();
  },
};
</script>
