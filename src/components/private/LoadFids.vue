<template>
  <div>
    <error-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</error-dialog
    >

    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <create-dialog
      :show="showDialog && !isLoading"
      :insertOff="checkItems.length <= 0 || event.value === null"
      title="Create From Fids"
      @close="$emit('close')"
      @insert="insertSelectedCompetitons"
    >
      <div>
        <div class="row mb-4">
          <div class="col col-md-4">
            <button
              class="
                w3-button w3-small w3-white w3-border w3-border-blue w3-wide
              "
              @click="loadFidsCompetitions"
            >
              Load the table
            </button>
          </div>

          <div class="col col-md-8">
            <!--    Select Event   -->
            <div class="">
              <select class="form-select" v-model.number="event.value">
                <option v-for="item in events" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <table class="w3-table-all w3-small mb-4">
          <thead>
            <tr class="w3-blue">
              <th>Insert</th>
              <th>Discipline</th>
              <th>Age group</th>
              <th>Class</th>
              <th>Unit type</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-primary">
              <td>
                <div class="cursor-pointer ml-4 my-2" @click="cleanFilter()">
                  <img
                    src="https://img.icons8.com/material-outlined/18/000000/clear-filters.png"
                  />
                </div>
              </td>
              <td>
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.discipline"
                />
              </td>
              <td>
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.ageGroup"
                />
              </td>
              <td>
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.class"
                />
              </td>
              <td>
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.unitType"
                />
              </td>
            </tr>

            <tr class="w3-hover-grey" v-for="item in filterFids" :key="item.id">
              <td>
                <div class="form-check">
                  <input
                    v-model="checkItems"
                    :value="item.id"
                    type="checkbox"
                    class="form-check-input my_checkbox"
                    id="exampleCheck1"
                  />
                </div>
              </td>
              <td>{{ item.desc_discipline }}</td>
              <td>{{ item.age_group }}</td>
              <td>{{ item.classe }}</td>
              <td>
                {{ item.desc_unit_type }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </create-dialog>
  </div>
</template>

<script>
export default {
  props: ["eventId"],
  emits: ["insertFidsCompleated", "close", "showDialog"],
  data() {
    return {
      checkItems: [],
      fidsCompetitions: [],
      isMobile: false,
      event: { value: null, isValid: true },
      events: null,
      search: {
        discipline: "",
        ageGroup: "",
        class: "",
        unitType: "",
      },

      isLoading: false,
      showDialog: true,
      error: null,
    };
  },
  methods: {
    async loadFidsCompetitions() {
      this.isLoading = true;

      // this.openDialogCompetitionCreationFromFids = null;
      try {
        await this.$store.dispatch("competition/getFidsCompetitions");
        this.fidsCompetitions = this.$store.getters[
          "competition/getFidsCompetitions"
        ];
      } catch (error) {
        //console.log(error);
      }
      this.isLoading = false;

      /*
  

      if (typeof this.$route.query.eventId === "undefined") {
        alert("No event selected. Please select an event from the Event page");
        return;
      }

      this.openDialogCompetitionCreationFromFids = true;
      this.checkItems = [];

*/
    },
    async insertSelectedCompetitons() {
      if (this.checkItems.length <= 0 || this.event.value === null) {
        this.showDialog = false;
        this.error = "Please select at least one element!";
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch("competition/insertFromFidsCompetitions", {
          competitionsIdArray: this.checkItems,
          event: this.event.value,
          user: this.$store.getters["auth/userId"],
        });
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.$emit("insertFidsCompleated");
      this.isLoading = false;
    },
    async loadTable(tabName) {
      try {
        switch (tabName) {
          case "Events":
            await this.$store.dispatch("event/getEventsFromDb", {
              user: this.$store.getters["auth/userId"],
            });
            this.events = this.$store.getters["event/getEvents"];
            break;
          default:

          //   await this.$store.dispatch("tab/getTabs", tabName);
          //  this.tab = this.$store.getters["tab/get" + tabName];
        }
        // console.log(this.tab[0]);
      } catch (error) {
        //   console.log(error);
      }
    },
    handleError() {
      this.error = null;
      this.showDialog = true;
    },
    cleanFilter() {
      this.search.discipline = "";
      this.search.ageGroup = "";
      this.search.class = "";
      this.search.unitType = "";
    },
  },
  computed: {
    filterFids() {
      return this.fidsCompetitions.filter((row) => {
        console.log(row);
        return (
          row.desc_discipline
            .toLowerCase()
            .includes(this.search.discipline.toLowerCase().toLowerCase()) &&
          row.age_group
            .toLowerCase()
            .includes(this.search.ageGroup.toLowerCase().toLowerCase()) &&
          row.desc_unit_type
            .toLowerCase()
            .includes(this.search.unitType.toLowerCase().toLowerCase()) &&
          row.classe

            .toLowerCase()
            .includes(this.search.class.toLowerCase().toLowerCase())
        );
      });
    },
  },
  created() {
    this.loadTable("Events");
    this.event.value = this.eventId;
  },
};
</script>

<style scoped>
.w3-table td,
.w3-table th,
.w3-table-all td {
  padding: 0px 1px;
  display: table-cell;
  text-align: left;
  vertical-align: top;
  font-size: 11px;
}

.my_checkbox {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  margin-left: 1px;
  border-color: #0082e6;
}
</style>
