

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
            <tr
              class="w3-hover-grey"
              v-for="item in fidsCompetitions"
              :key="item.id"
            >
              <td>
                <div class="form-check my_checkbox">
                  <input
                    v-model="checkItems"
                    :value="item.id"
                    type="checkbox"
                    class="form-check-input p-2"
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
      fidsCompetitions: null,
      isMobile: false,
      event: { value: null, isValid: true },
      events: null,
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
        this.fidsCompetitions =
          this.$store.getters["competition/getFidsCompetitions"];
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
  },
  created() {
    this.loadTable("Events");
    this.event.value = this.eventId;
  },
};
</script>


<style scoped>
.my_checkbox {
  width: 5px;
  height: 5px;
}
</style>