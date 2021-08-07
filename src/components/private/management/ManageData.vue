<template>
  <div>
    <base-card class="my-5">
      <div class="container p-3 mt-5">
        <select v-model="selected" class="form-select ">
          <option v-for="item in manage" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <show-users v-if="selected === 'Manage Users'"> </show-users>
      <manage-roles v-if="selected === 'Roles'"> </manage-roles>
    </base-card>
  </div>
</template>

<script>
import ManageRoles from "./ManageRoles.vue";
export default {
  components: {
    ManageRoles,
  },
  data() {
    return {
      selected: "Manage Users",
    };
  },
  computed: {
    manage() {
      return ["Manage Users", "Roles"];
    },
    first() {
      return "Manage Users";
    },
  },
};
</script>
