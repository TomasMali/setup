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

              <th scope="col">Id dance</th>

              <th scope="col">Description</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dances" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>

              <td class="mx-0 px-0 ">
                <input type="text" v-model="item.id" />
              </td>

              <td>
                <input type="text" id="text" v-model="item.description" />
              </td>
              <td>
                <input type="text" id="text" v-model="item.notes" />
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
      dances: null,
      isLoading: false,
    };
  },
  methods: {
    async loadDanceTable() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("tab/getTabs", "Dances");
        this.dances = this.$store.getters["tab/get" + "Dances"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadDanceTable();
  },
};
</script>

<style scoped>
.table-responsive {
  max-height: 400px;
}
</style>
