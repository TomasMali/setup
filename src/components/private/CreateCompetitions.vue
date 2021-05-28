

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
          <h1 class="my-8 w3-wide">Create your competition</h1>

          <div class="w3-row-padding w3-card-4 w3-light-gray p-8">
            <div class="w3-third">
              <label>Dances</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Dances')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the dance</option>
                <option v-for="item in dances" :key="item.id" :value="item.id">
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>
            <div class="w3-third">
              <label>Disciplines</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Disciplines')"
              >
                <optgroup disabled hidden></optgroup>
                <option disabled selected>Choose the disciplines</option>
                <option
                  v-for="item in disciplines"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.sector }} - {{ item.description }}
                </option>
              </select>
            </div>
            <div class="w3-third">
              <label>Select judges disciplines</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Judges_disciplines')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose judges disciplines
                </option>
                <option
                  v-for="item in judges_disciplines"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.description }}
                </option>
              </select>
            </div>
          </div>

          <div class="w3-row-padding w3-card-4 w3-light-gray p-8 my-8">
            <div class="w3-third">
              <label>Judges licenses</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Judges_licenses')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the judges licenses
                </option>
                <option
                  v-for="item in judges_licenses"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }}
                </option>
              </select>
            </div>
            <div class="w3-third">
              <label>Official licenses</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Officials_licenses')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the official licenses
                </option>
                <option
                  v-for="item in officials_licenses"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }}
                </option>
              </select>
            </div>
            <div class="w3-third">
              <label>Choose official roles</label>
              <select
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Officials_roles')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose Officials_roles
                </option>
                <option
                  v-for="item in officials_roles"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }}
                </option>
              </select>
            </div>
          </div>

          <p>
            <button
              class="w3-btn w3-blue w3-round-large w3-large px-32 ml-3 mt-20"
            >
              Create
            </button>
          </p>
        </form>
      </div>
      <!-- ----------------------------------------------------------------------------------------------------------------------- -->
      <div class="col-span-1">
        <div style="overflow-y: auto">
          <div class="w3-bar w3-black p-2">
            <button
              class="w3-bar-item w3-button"
              :class="{ selected: mine }"
              @click="trigerToggle('mine')"
            >
              Competitions
            </button>
            <button
              class="w3-bar-item w3-button"
              :class="{ selected: !mine }"
              @click="trigerToggle('fids')"
            >
              From FIDS
            </button>
          </div>

          <div
            id="London"
            class="w3-container w3-display-container w3-animate-zoom"
            v-show="mine"
          >
            <h2 class="py-4 w3-wide">
              Here goes my created configurations....
            </h2>

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
                <tr class="w3-hover-grey">
                  <td>{{ "item.license " }}</td>
                  <td>{{ "item.discipline" }}</td>
                  <td>{{ "item.age_group" }}</td>
                  <td>{{ "item.classe" }}</td>
                  <td>
                    {{ "item.unit_type" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            id="Paris"
            class="w3-container w3-display-container w3-animate-zoom"
            v-show="!mine"
          >
            <p class="py-4">
              <button
                class="w3-button w3-small w3-white w3-border w3-border-blue w3-wide"
                @click="loadCompetitionsMethod"
              >
                Load the table
              </button>
            </p>
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
      tab: null,
      dances: null,
      disciplines: null,
      judges_disciplines: null,
      judges_licenses: null,
      officials_licenses: null,
      officials_roles: null,
      sectors_discipline: null,
      unit_type: null,
      classe: null,
      competition_type: null,
      judging_systems: null,
      rounds: null,
      mine: true,
    };
  },
  methods: {
    trigerToggle(mine) {
      if (mine === "mine") {
        this.mine = true;
      } else {
        this.mine = false;
      }
    },
    async loadCompetitions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("competition/getCompetitions");
        this.competitions = this.$store.getters["competition/getCompetitions"];
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async loadTable(tabName) {
      console.log("ciao");
      try {
        switch (tabName) {
          case "Dances":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.dances = this.$store.getters["tab/get" + tabName];
            break;
          case "Disciplines":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.disciplines = this.$store.getters["tab/get" + tabName];
            break;

          case "Judges_disciplines":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judges_disciplines = this.$store.getters["tab/get" + tabName];
            break;

          case "Judges_licenses":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judges_licenses = this.$store.getters["tab/get" + tabName];
            break;

          case "Officials_licenses":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.officials_licenses = this.$store.getters["tab/get" + tabName];
            break;

          case "Officials_roles":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.officials_roles = this.$store.getters["tab/get" + tabName];
            break;

          default:
            await this.$store.dispatch("tab/getTabs", tabName);
            this.tab = this.$store.getters["tab/get" + tabName];
        }

        console.log(this.tab[0]);
      } catch (error) {
        console.log(error);
      }
    },
    handleError() {
      this.error = null;
    },
    loadCompetitionsMethod() {
      this.loadCompetitions();
    },
  },
  created() {
    // this.loadTable("Judges_licenses");
    // this.loadCompetitions();
  },
};
</script>


<style scoped>
div {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

select {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
  font-size: 0.9rem;
  padding: 2px 5px;
}

.selected {
  background-color: cornflowerblue;
}

tbody {
  display: block;
  height: 500px;
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

