<template>
  <div>
    <base-card class="my-5">
      <div class="container p-3 mt-5">
        <select v-model="selected" class="form-select ">
          <option
            v-for="item in manage"
            :key="item.component"
            :value="item.component"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <component :is="selected"></component>
    </base-card>
  </div>
</template>

<script>
import ManageRoles from "./tables/ManageRoles.vue";
import ManageUsers from "./tables/ManageUsers.vue";
import ManageDances from "./tables/ManageDances.vue";
import ManageDisciplines from "./tables/ManageDisciplines.vue";
import ManageJudgesDisciplines from "./tables/ManageJudgesDisciplines.vue";
import ManageJudgesLicenses from "./tables/ManageJudgesLicenses.vue";
export default {
  components: {
    ManageRoles,
    ManageUsers,
    ManageDances,
    ManageDisciplines,
    ManageJudgesDisciplines,
    ManageJudgesLicenses,
  },
  data() {
    return {
      selected: "manage-users",
    };
  },
  computed: {
    manage() {
      return [
        {
          component: "manage-users",
          name: "Manage users",
        },

        {
          component: "manage-roles",
          name: "Manage Roles",
        },
        {
          component: "manage-dances",
          name: "Manage Dances",
        },
        {
          component: "manage-disciplines",
          name: "Manage Disciplines",
        },
        {
          component: "manage-judges-disciplines",
          name: "Manage judges disciplines",
        },
        {
          component: "manage-judges-licenses",
          name: "Manage judges licenses",
        },
      ];
    },
    first() {
      return "Manage Users";
    },
  },
};
</script>
