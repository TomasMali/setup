<template>
  <div>
    <!-- Modal Edit Components -->
    <teleport to="body">
      <!-- Modal -->
      <edit-competition
        :competiton="getClickedCompetition"
        @doSave="saveCompetition"
      ></edit-competition>
    </teleport>

    <!-- Modal Load Components -->
    <teleport to="body">
      <!-- Modal -->
      <div
        class="modal  fade"
        id="loadFidsModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl ">
          <div class="modal-content">
            <div class="modal-header purple">
              <h5 class="modal-title" id="exampleModalLabel">Load Fids Data</h5>
              <button
                type="button"
                class="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!--------------------------------------------------  Load FIDS  -->
              <load-fids
                :eventId="event"
                :start_dat="start_dat"
                :end_dat="end_dat"
                @dataUpdated="updateSelectedFids"
                ref="fids"
              >
              </load-fids>
              <!--------------------------------------------------  Load FIDS  -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="insertFromFids"
                :disabled="getCheckItems"
              >
                Insert
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
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
            <a
              class="btn btn-outline-secondary mb-1 "
              data-bs-toggle="modal"
              data-bs-target="#loadFidsModal"
            >
              Create from Fids
            </a>
          </div>
        </div>

        <div class="col col-md-2 mx-md-5 mx-4 mt-md-4 text-left">
          <!--    Select Event   -->
          <div class="">
            <select class="form-select" v-model.number="event">
              <option
                v-for="item in events.tab"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!--   Table New  -->
      <base-card class="mt-md-16 py-10 ">
        <v-card class="pa-2 mb-10">
          <h4 class="text-center text-deep-purple accent-4">
            My Competition List
          </h4></v-card
        >

        <div class=" table-responsive  ">
          <table
            class="table table-hover  table-bordered table-sm text-center my-5"
          >
            <thead class="bg-dark text-white">
              <tr class="">
                <th scope="col" v-if="!isMobile">Unit type</th>
                <th scope="col">License</th>
                <th scope="col">Discipline</th>
                <th scope="col">Age group</th>
                <th scope="col" v-if="!isMobile">Class</th>

                <th scope="col" v-if="!isMobile">Title</th>
                <th scope="col" v-if="!isMobile">Start</th>
                <th scope="col" v-if="!isMobile">End</th>
                <th scope="col" v-if="!isMobile">Stars</th>
                <th scope="col" v-if="!isMobile">Hall</th>
                <th scope="col" v-if="!isMobile">Price</th>
                <th scope="col">Edit</th>
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
                  {{ item.title }}
                </td>

                <td v-if="!isMobile">
                  {{ item.start_competition }}
                </td>

                <td v-if="!isMobile">
                  {{ item.end_competition }}
                </td>
                <td v-if="!isMobile">
                  {{ item.stars }}
                </td>
                <td v-if="!isMobile">
                  {{ item.hall }}
                </td>
                <td v-if="!isMobile">
                  {{ item.price }}
                </td>

                <td>
                  <div
                    @click="asignValue(item)"
                    data-bs-toggle="modal"
                    data-bs-target="#editCompetitionModal"
                    class=" cursor-pointer"
                  >
                    <i class="fas fa-edit"></i>
                  </div>
                </td>

                <td>
                  <div
                    @click="confirmDeletion(item.id, item.license)"
                    class=" cursor-pointer"
                  >
                    <i class="fas fa-trash"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </base-card>
      <!--  Fine Table New -->
    </div>
  </div>
</template>

<script>
//import NewCompetition from "./NewCompetition.vue";
import LoadFids from "./LoadFids.vue";
import EditCompetition from "./EditCompetition.vue";
export default {
  components: {
    // NewCompetition,
    LoadFids,
    EditCompetition,
  },
  props: ["eventId"],
  // emits: ["doSave"],
  data() {
    return {
      options: [],
      //
      open: false,
      competiton: "",
      checkItem: [],
      //
      typeDialog: null,
      selected: "A",
      checkItems: [],
      fidsCompetitions: null,
      myCompetitions: [],
      //
      event: null,
      start_dat: "",
      end_dat: "",
      events: { value: "", isValid: true, tab: [] },
      id: "",
      license: "",
      //
      isLoading: false,
      error: null,
      warning: null,
      openDialogCompetitionCreation: null,
      isMobile: false,

      discipline: "",
      disciplines: { value: "", isValid: true, tab: [] },

      tab: null,
      modal: null,
    };
  },

  mounted() {},
  methods: {
    asignValue(item) {
      var bkItem = item;
      bkItem.dances = item.dances.split(",");
      this.competiton = bkItem;
      this.disciplines.value = item.desc_discipline;
    },

    async insertFromFids() {
      try {
        await this.$store.dispatch("competition/insertFromFidsCompetitions", {
          competitionsIdArray: this.checkItems,
          start_dat: this.start_dat,
          end_dat: this.end_dat,
          event: this.event,
          user: this.$store.getters["auth/userId"],
        });
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      setTimeout(() => {
        this.loadMyCompetitions();
      }, 1000);

      this.$refs.fids.clearArr();
    },

    updateSelectedFids(items, start, end) {
      // console.log("Dentro View: ", items);
      //  console.log("Dentro View Start: ", start);
      //  console.log("Dentro End: ", end);
      this.checkItems = items;
      this.start_dat = start;
      this.end_dat = end;
    },

    async saveCompetition(competiton) {
      console.log(competiton);
      try {
        var updatedCompetition = competiton;
        var dances = "";
        competiton.dances.forEach((el) => {
          dances = dances + el + ",";
        });
        updatedCompetition.dances = dances;
        await this.$store.dispatch(
          "competition/updateMyCompetition",
          updatedCompetition
        );
        this.loadMyCompetitions();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async loadMyCompetitions() {
      this.isLoading = true;

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
            this.events.tab = this.$store.getters["event/getEvents"];
            break;
          //
          default:
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
  },
  computed: {
    getOptions() {
      return this.options;
    },
    getParamEventId() {
      return this.$route.query.eventId;
    },
    getCheckItems() {
      return this.checkItems.length <= 0;
    },
    getClickedCompetition() {
      return this.competiton;
    },
  },
  watch: {
    event: function(newVal) {
      this.$router.replace({
        path: "competitions",
        query: {
          user: this.$store.getters["auth/userId"],
          eventId: newVal,
          start_dat: this.start_dat,
          end_dat: this.end_dat,
        },
      });
      this.loadMyCompetitions();
    },
  },
  created() {
    this.loadMyCompetitions();
    this.loadTable("Events");

    this.event = this.$route.query.eventId;
    this.start_dat = this.$route.query.start_dat;
    this.end_dat = this.$route.query.end_dat;

    this.$router.replace({
      path: "competitions",
      query: {
        user: this.$store.getters["auth/userId"],
        eventId: this.event,
        start_dat: this.start_dat,
        end_dat: this.end_dat,
      },
    });

    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
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
  border-color: #673ab7;
}

select {
  border-color: #673ab7;
}

div span {
  color: white;
  background-color: #673ab7;
}
.multi {
  border-color: #673ab7;
}

button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #673ab7;
  border: 1px solid #673ab7;
  color: white;
  cursor: pointer;

  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
