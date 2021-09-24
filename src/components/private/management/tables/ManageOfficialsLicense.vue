<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div class="container my-5">
      <div class="table-responsive ">
        <table class="table table-hover table-sm ">
          <thead class="bg-dark text-white">
            <tr class="">
              <th scope="col">#</th>
              <th scope="col">Id officials licenses</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in officialsLicenses" :key="index">
              <td scope="row">{{ index + 1 }}</td>

              <td class=" mx-0 px-0 ">
                <input type="text" v-model="item.id" />
              </td>

              <td>
                <input type="text" v-model="item.description" />
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
      officialsLicenses: null,
      isLoading: false,
    };
  },
  methods: {
    async loadOfficialsLicensesTable() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tab/getTabs", "Officials_licenses");
        this.officialsLicenses = this.$store.getters[
          "tab/get" + "Officials_licenses"
        ];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadOfficialsLicensesTable();
  },
};
</script>

<style scoped>
.table-responsive {
  height: 560px;
}
</style>
