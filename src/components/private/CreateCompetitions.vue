

<template>
  <div style="max-height: 400px">
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div class="m-4 md:m-10 lg:grid lg:grid-cols-2 gap-4 mx-4">
      <div class="col-span-1 mycard mb-4">
        <!--  -->
        <form class="w-full">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                License
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="FIDS"
              />
              <p class="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Discipline
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Boogie Woogie"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Age group
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="8/9"
              />
              <p class="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Class
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="B3"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Unit type
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>Coppie</option>
                  <option>Formazione</option>
                  <option>Single</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Boh
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="boh"
              />
            </div>
          </div>
        </form>
        <!--  -->
      </div>
      <div class="col-span-1">
        <div style="overflow-y: auto">
          <table class="w3-table-all w3-small mb-4">
            <thead>
              <tr class="w3-blue">
                <th>License</th>
                <th>Discipline</th>
                <th>Age group</th>
                <th>Class</th>
                <th>Unit type</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="w3-hover-grey"
                v-for="item in competitions"
                :key="item.id"
              >
                <td>{{ item.license }}</td>
                <td>{{ item.discipline }}</td>
                <td>{{ item.age_group }}</td>
                <td>{{ item.classe }}</td>
                <td>
                  {{ item.unit_type }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      competitions: null,
      isFormValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadCompetitions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getCompetitions");
        this.competitions = this.$store.getters.getCompetitions;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCompetitions();
  },
};
</script>


<style scoped>
tbody {
  display: block;
  height: 600px;
  overflow: auto;
}
thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed; /* even columns width , fix width of table too*/
}
thead {
  width: calc(
    100% - 1em
  ); /* scrollbar is average 1em/16px width, remove it from thead width */
}

.mycard {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

.scrollable {
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>>

