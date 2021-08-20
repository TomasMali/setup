<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Loading...">
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="container my-5">
      <div class="table-responsive">
        <table class="table table-responsive  table-sm text-center">
          <thead class="bg-dark text-white">
            <tr class="">
              <th scope="col">#</th>
              <th scope="col">Save</th>
              <th scope="col">Name</th>
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
                <div class="px-4 cursor-pointer" @click="saveUser(user)">
                  <i class="fas fa-save"></i>
                </div>
              </td>

              <td class="text-center mx-0 px-0 ">
                <input type="text" v-model="user.name" class="text-center" />
              </td>

              <td class="text-center mx-0 px-0">
                <input type="text" v-model="user.surname" class="text-center" />
              </td>
              <td class="text-center mx-0 px-0">
                <input type="text" v-model="user.email" class="text-center" />
              </td>
              <td class="text-center mx-0 px-0">
                <!--    Roles -->
                <strong>
                  <select
                    v-model="user.role"
                    class=""
                    name="option"
                    @click="loadRolesTable()"
                  >
                    <optgroup disabled hidden></optgroup>

                    <option
                      v-for="item in roles.tab"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </strong>
              </td>

              <td>
                <input
                  disabled
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.public"
                />
              </td>
              <td>
                <input
                  disabled
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.events"
                />
              </td>

              <td>
                <input
                  disabled
                  type="checkbox"
                  id="checkbox"
                  v-model="user.page.allow.competitions"
                />
              </td>
              <td>
                <input
                  disabled
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

      roles: { value: "", isValid: true, tab: [] },

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
    async saveUser(user) {
      try {
        await this.$store.dispatch("user/updateUser", user);

        this.loadUsers();
      } catch (error) {
        console.log(error);
      }
    },
    async loadRolesTable() {
      await this.$store.dispatch("tab/getTabs", "Roles");
      this.roles.tab = this.$store.getters["tab/get" + "Roles"];
    },
  },
  created() {
    this.loadRolesTable();
    this.loadUsers();
  },
};
</script>
