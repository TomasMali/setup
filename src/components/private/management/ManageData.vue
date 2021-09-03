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
import ManageJudgesSystems from "./tables/ManageJudgesSystems.vue";
import ManageOfficialsLicense from "./tables/ManageOfficialsLicense.vue";
import ManageOfficialsRoles from "./tables/ManageOfficialsRoles.vue";
import ManageRounds from "./tables/ManageRounds.vue";
import ManageSectorsDisciplines from "./tables/ManageSectorsDisciplines.vue";
import ManageUnitType from "./tables/ManageUnitType.vue";
import ManageCompetitionType from "./tables/ManageCompetitionType.vue";
import ManageClass from "./tables/ManageClass.vue";
import ManageAgeCategory from "./tables/ManageAgeCategory.vue";
export default {
  components: {
    ManageRoles,
    ManageUsers,
    ManageDances,
    ManageDisciplines,
    ManageJudgesDisciplines,
    ManageJudgesLicenses,
    ManageJudgesSystems,
    ManageOfficialsLicense,
    ManageOfficialsRoles,
    ManageRounds,
    ManageSectorsDisciplines,
    ManageUnitType,
    ManageCompetitionType,
    ManageClass,
    ManageAgeCategory,
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
        {
          component: "manage-judges-systems",
          name: "Manage judging systems",
        },
        {
          component: "manage-officials-license",
          name: "Manage officials license",
        },
        {
          component: "manage-officials-roles",
          name: "Manage officials roles",
        },
        {
          component: "manage-rounds",
          name: "Manage rounds",
        },
        {
          component: "manage-sectors-disciplines",
          name: "Manage sector disciplines",
        },
        {
          component: "manage-unit-type",
          name: "Manage unit types",
        },
        {
          component: "manage-competition-type",
          name: "Manage competition types",
        },
        {
          component: "manage-class",
          name: "Manage classes",
        },
        {
          component: "manage-age-category",
          name: "Manage age category",
        },
      ];
    },
    first() {
      return "Manage Users";
    },
  },
};
</script>
