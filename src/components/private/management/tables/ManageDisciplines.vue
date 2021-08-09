<template>
  <div>
    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div class="container my-5">
      <div class="table-responsive ">
        <table class="table table-hover table-responsive  table-sm ">
          <thead class="bg-dark text-white">
            <tr class="">
              <th scope="col">#</th>
              <th scope="col">Id discipline</th>

              <th scope="col">Description</th>
              <th scope="col">Sector</th>
              <th scope="col">Dances</th>
              <th scope="col">2020</th>
              <th scope="col">2021</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in disciplines" :key="index">
              <th scope="row">{{ index + 1 }}</th>

              <td class="text-center mx-0 px-0 ">
                <input type="text" v-model="item.id" class="text-center" />
              </td>

              <td>
                <input type="text" v-model="item.description" />
              </td>
              <td>
                <input type="text" v-model="item.sector" />
              </td>
              <td>
                <input type="text" v-model="item.dances" />
              </td>
              <td>
                <input type="text" v-model="item.year_2020" />
              </td>
              <td>
                <input type="text" v-model="item.year_2021" />
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
      disciplines: null,
      isLoading: false,
    };
  },
  methods: {
    async loadDisciplinesTable() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tab/getTabs", "Disciplines");
        this.disciplines = this.$store.getters["tab/get" + "Disciplines"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadDisciplinesTable();
  },
};
</script>

<style scoped>
.table-responsive {
  max-height: 400px;
}
</style>
