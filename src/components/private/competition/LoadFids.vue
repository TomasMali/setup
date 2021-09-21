<template>
  <div @clearArr="clearArr">
    <error-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</error-dialog
    >

    <base-dialog :show="false" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <!------------------------------------------------------------->
    <!------------------------------------------------------------->
    <!------------------------------------------------------------->

    <div>
      <div class="row my-5">
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

      <div v-if="isLoading" class="text-center p-5 m-5">
        <div
          v-if="isLoading"
          class="spinner-border color_spinner "
          style="width: 4rem; height: 4rem;"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else class="table-responsive ">
        <table class="table  table-hover table-sm">
          <thead class="table-dark">
            <tr class="">
              <th>Insert</th>
              <th>Discipline</th>
              <th>Age group</th>

              <th>Start</th>
              <th>End</th>

              <th v-if="!isMobile">Class</th>
              <th v-if="!isMobile">Unit type</th>
            </tr>
          </thead>

          <tbody>
            <tr class="text-primary">
              <td>
                <div class=" ml-4 my-2">
                  <input
                    @click="filterFidsAll"
                    v-model="allSelected"
                    type="checkbox"
                    class="form-check-input select-all"
                    id="exampleCheck1"
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
              <!-- -->
              <td></td>

              <td></td>
              <!-- -->
              <td v-if="!isMobile">
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.class"
                />
              </td>
              <td v-if="!isMobile">
                <input
                  class="my-2"
                  type="text"
                  placeholder="&#xF002;  Search"
                  style="font-family: Arial, FontAwesome"
                  v-model="search.unitType"
                />
              </td>
            </tr>
            <!-- DStart Table--->

            <tr
              class="w3-hover-grey"
              v-for="(item, ind) in filterFids"
              :key="item.id"
            >
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
              <td>{{ item.desc_discipline }} - {{ ind }}</td>
              <td>{{ item.age_group }}</td>

              <td>
                <input type="date" id="val" name="val" v-model="start" />
              </td>
              <td><input type="date" id="val" name="val" v-model="end" /></td>

              <td v-if="!isMobile">{{ item.classe }}</td>
              <td v-if="!isMobile">
                {{ item.desc_unit_type }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!------------------------------------------------------------->
  </div>
</template>

<script>
export default {
  props: ["eventId", "clearComponent"],
  emits: ["dataUpdated"],
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
      start: "",
      end: "",
      allSelected: null,
    };
  },
  methods: {
    filterFidsAll(event) {
      var arr = [];
      var status = event.target.checked;
      arr = this.fidsCompetitions.filter((row) => {
        return (
          (row.desc_discipline + "")
            .toLowerCase()
            .includes(this.search.discipline.toLowerCase().toLowerCase()) &&
          (row.age_group + "")
            .toLowerCase()
            .includes(this.search.ageGroup.toLowerCase().toLowerCase()) &&
          (row.desc_unit_type + "")
            .toLowerCase()
            .includes(this.search.unitType.toLowerCase().toLowerCase()) &&
          (row.classe + "")
            .toLowerCase()
            .includes(this.search.class.toLowerCase().toLowerCase())
        );
      });
      if (status) {
        arr.forEach((el) => {
          if (!this.checkItems.includes(el.id)) {
            this.checkItems.push(el.id);
          }
        });
      } else {
        this.checkItems = [];
      }
    },

    clearArr() {
      this.checkItems = [];
      this.event.value = this.eventId;
      this.start = this.$route.query.start_dat;
      this.end = this.$route.query.end_dat;
    },
    async loadFidsCompetitions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("competition/getFidsCompetitions");
        this.fidsCompetitions = await this.$store.getters[
          "competition/getFidsCompetitions"
        ];
      } catch (error) {
        //console.log(error);
      }
      this.isLoading = false;
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

  watch: {
    checkItems: function(newVal) {
      //   console.log("CheckBoxes: ", newVal);
      this.$emit("dataUpdated", newVal, this.start, this.end);
    },
    start: function(newVal) {
      //   console.log("CheckBoxes: ", newVal);
      this.$emit("dataUpdated", this.checkItems, newVal, this.end);
    },
    end: function(newVal) {
      //   console.log("CheckBoxes: ", newVal);
      this.$emit("dataUpdated", this.checkItems, this.start, newVal);
    },
  },

  computed: {
    filterFids() {
      return this.fidsCompetitions.filter((row) => {
        return (
          (row.desc_discipline + "")
            .toLowerCase()
            .includes(this.search.discipline.toLowerCase().toLowerCase()) &&
          (row.age_group + "")
            .toLowerCase()
            .includes(this.search.ageGroup.toLowerCase().toLowerCase()) &&
          (row.desc_unit_type + "")
            .toLowerCase()
            .includes(this.search.unitType.toLowerCase().toLowerCase()) &&
          (row.classe + "")
            .toLowerCase()
            .includes(this.search.class.toLowerCase().toLowerCase())
        );
      });
    },
  },
  created() {
    this.loadTable("Events");
    this.event.value = this.eventId;
    this.start = this.$route.query.start_dat;
    this.end = this.$route.query.end_dat;

    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
};
</script>

<style scoped>
.my_checkbox {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  margin-left: 1px;
  border-color: #0082e6;
}

.select-all {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  margin-left: 1px;
  border-color: black;
}

td,
td {
  padding: 0px 1px;
  display: table-cell;
  text-align: left;
  vertical-align: top;
  font-size: 11px;
}

th {
  padding: 5px 1px;
  display: table-cell;
  text-align: left;
  vertical-align: top;
  font-size: 14px;
}

.table-responsive {
  max-height: 400px;
}
th {
  background-color: black !important;
}

.color_spinner {
  color: #673ab7;
}
</style>
