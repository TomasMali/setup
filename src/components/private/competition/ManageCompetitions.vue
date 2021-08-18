<template>
  <div>
    <error-dialog
      dialogType="warning"
      :show="!!warning"
      @ok="deleteItem"
      title="Attention!"
      @close="handleWarning"
      >{{ warning }}</error-dialog
    >

    <base-dialog
      :show="!!error"
      :type="typeDialog"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <!-- Fids Components -->

    <new-competition
      :open="!!openDialogCompetitionCreation"
      @close="openDialogCompetitionCreation = null"
    >
    </new-competition>

    <!--  Load FIDS  -->
    <load-fids
      v-if="!!openDialogCompetitionCreationFromFids"
      @close="openDialogCompetitionCreationFromFids = null"
      @insertFidsCompleated="loadMyCompetitions()"
      :eventId="getParamEventId"
    >
    </load-fids>

    <!-- ----------------------------------------------------------------------------------------------------------------------- -->
    <div class="row_padding">
      <div class="row p-0 m-0">
        <div class=" col-md-4 mx-md-5 mx-4  mt-4 text-right-md ">
          <div>
            <a
              class="btn  btn-outline-secondary mb-1"
              @click="openDialogCompetitionCreation = true"
            >
              Create new competition
            </a>
            <a class="btn btn-outline-secondary mb-1 " @click="openFids">
              Create from Fids
            </a>
          </div>
        </div>

        <div class="col col-md-2 mx-md-5 mx-4 mt-md-4 text-left">
          <!--    Select Event   -->
          <div class="">
            <select class="form-select" v-model.number="event">
              <option v-for="item in events" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- My Components List -->
      <div class="row   m-0">
        <div class="col m-4">
          <div class=" my-5">
            <div class=" table-responsive">
              <table
                class="table table-responsive table-bordered table-sm text-center  my-5"
              >
                <thead class="bg-dark text-white">
                  <tr class="">
                    <th scope="col" v-if="!isMobile">Unit type</th>
                    <th scope="col">License</th>
                    <th scope="col">Discipline</th>
                    <th scope="col">Age group</th>
                    <th scope="col" v-if="!isMobile">Class</th>

                    <th scope="col" v-if="!isMobile">Title</th>
                    <th scope="col" v-if="false">Start</th>
                    <th scope="col" v-if="false">End</th>
                    <th scope="col" v-if="!isMobile">Stars</th>
                    <th scope="col" v-if="!isMobile">Hall</th>
                    <th scope="col" v-if="!isMobile">Price</th>
                    <th scope="col">Save</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in myCompetitions" :key="item.id">
                    <td v-if="!isMobile">{{ item.desc_unit_type }}</td>

                    <td>{{ item.license }}</td>
                    <td>{{ item.desc_discipline }}</td>
                    <td>{{ item.age_group }}</td>
                    <td v-if="!isMobile">{{ item.classe }}</td>

                    <td v-if="!isMobile" class=" ">
                      <input type="text" v-model="item.title" />
                    </td>

                    <td v-if="false">
                      <input
                        name="start_competition"
                        id="start_competition"
                        type="date"
                        v-model.trim="item.start_competition"
                        placeholder="End date registration"
                      />
                    </td>
                    <td v-if="false">
                      <input type="date" v-model="item.end_competition" />
                    </td>
                    <td v-if="!isMobile">
                      <input type="checkbox" v-model.number="item.stars" />
                    </td>
                    <td v-if="!isMobile">
                      <input type="text" v-model="item.hall" />
                    </td>
                    <td v-if="!isMobile">
                      <input type="number" v-model.number="item.price" />
                    </td>

                    <td>
                      <div
                        class=" cursor-pointer"
                        @click="saveCompetition(item)"
                      >
                        <i class="fas fa-save"></i>
                      </div>
                    </td>

                    <td>
                      <div
                        class=" cursor-pointer"
                        @click="confirmDeletion(item.id, item.license)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewCompetition from "./NewCompetition.vue";
import LoadFids from "./LoadFids.vue";
import moment from "moment";
export default {
  components: {
    NewCompetition,
    LoadFids,
  },
  props: ["eventId"],
  data() {
    return {
      typeDialog: null,
      selected: "A",
      checkItems: [],
      fidsCompetitions: null,
      myCompetitions: [],
      //
      event: null,
      events: null,
      id: "",
      license: "",
      //
      isFormValid: true,
      isLoading: false,
      error: null,
      warning: null,
      openDialogCompetitionCreationFromFids: null,
      openDialogCompetitionCreation: null,
      isMobile: false,
    };
  },
  computed: {
    getParamEventId() {
      return this.$route.query.eventId;
    },
  },
  watch: {
    event: function(newVal) {
      this.$router.replace({
        path: "competitions",
        query: {
          user: this.$store.getters["auth/userId"],
          eventId: newVal,
        },
      });
      this.loadMyCompetitions();
    },
  },
  methods: {
    dateConverter(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    async saveCompetition(competiton) {
      try {
        await this.$store.dispatch(
          "competition/updateMyCompetition",
          competiton
        );
        this.loadMyCompetitions();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async loadMyCompetitions() {
      this.isLoading = true;
      this.openDialogCompetitionCreationFromFids = null;

      try {
        await this.$store.dispatch("competition/getMyCompetitions", {
          user: this.$store.getters["auth/userId"],
        });

        if (typeof this.$route.query.eventId === "undefined") {
          //  console.log(this.$route.query.eventId);
          this.myCompetitions = this.$store.getters[
            "competition/getMyCompetitions"
          ];
        } else {
          this.myCompetitions = this.$store.getters[
            "competition/getMyCompetitions"
          ].filter((el) => {
            return el.event == this.event;
          });
        }
      } catch (error) {
        console.log(error);
      }
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
    confirmDeletion(id, license) {
      this.id = id;
      this.license = license;
      this.warning =
        "Are you sure you want to delete this competition from database?";
    },
    async deleteItem() {
      // do the delete
      this.handleWarning();
      try {
        const actionPayload = {
          id: this.id,
          license: this.license,
          user: this.$store.getters["auth/userId"],
        };
        await this.$store.dispatch(
          "competition/deleteMyCompetition",
          actionPayload
        );
        this.loadMyCompetitions();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
      this.typeDialog = null;
    },

    handleWarning() {
      this.warning = null;
    },

    manageDialogCompetitionFromFids() {
      this.openDialogCompetitionCreationFromFids = null;

      // this.form.events.value = null;
    },

    openFids() {
      if (typeof this.$route.query.eventId === "undefined") {
        //alert("No event selected. Please select an event from the Event page");
        this.typeDialog = "Error";
        this.error =
          "No event selected. Please select an event from the Event page";
        return;
      }

      this.openDialogCompetitionCreationFromFids = true;
    },
  },
  created() {
    this.loadMyCompetitions();

    this.loadTable("Events");
    this.event = this.$route.query.eventId;

    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
};
</script>

<style scoped>
@media (min-width: 2000px) {
}

td,
tr {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
}

.selected {
  background-color: cornflowerblue;
}

.my_checkbox {
  width: 5px;
  height: 5px;
}

.table-responsive {
  max-height: 400px;
}

input {
  background-color: white;
  text-align: center;
}
</style>
