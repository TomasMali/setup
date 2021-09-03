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
              <th scope="col">Id age category</th>
              <th scope="col">Description</th>

              <th scope="col">Description</th>
              <th scope="col">From AgeCompetition</th>
              <th scope="col">To ageCompetition</th>
              <th scope="col">To agePartner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in ageCategory" :key="index">
              <td scope="row">{{ index + 1 }}</td>

              <td class=" mx-0 px-0 ">
                <input type="text" v-model="item.id" />
              </td>

              <td>
                <input type="text" v-model="item.description" />
              </td>

              <td>
                <input type="text" v-model="item.from_age_competitor" />
              </td>
              <td>
                <input type="text" v-model="item.to_age_competitor" />
              </td>
              <td>
                <input type="text" v-model="item.from_age_partner" />
              </td>
              <td>
                <input type="text" v-model="item.to_age_partner" />
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
      ageCategory: null,
      isLoading: false,
    };
  },
  methods: {
    async loadTable() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tab/getTabs", "Age_category");
        this.ageCategory = this.$store.getters["tab/get" + "Age_category"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadTable();
  },
};
</script>

<style scoped>
.table-responsive {
  max-height: 400px;
}
</style>
