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
          <table class="w3-table-all w3-small mb-4">
            <thead>
              <tr class="w3-blue">
                <th v-if="!isMobile">Unit type</th>
                <th>License</th>
                <th>Discipline</th>
                <th>Age group</th>
                <th v-if="!isMobile">Class</th>

                <th v-if="!isMobile">Title</th>
                <th v-if="!isMobile">Start</th>
                <th v-if="!isMobile">End</th>
                <th v-if="!isMobile">Stars</th>
                <th v-if="!isMobile">Hall</th>
                <th v-if="!isMobile">Price</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="w3-hover-grey"
                v-for="item in myCompetitions"
                :key="item.id"
              >
                <td v-if="!isMobile">{{ item.desc_unit_type }}</td>
                <td>{{ item.license }}</td>
                <td>{{ item.desc_discipline }}</td>
                <td>{{ item.age_group }}</td>
                <td v-if="!isMobile">{{ item.classe }}</td>

                <td v-if="!isMobile">{{ item.title }}</td>
                <td v-if="!isMobile">{{ item.start_competition }}</td>
                <td v-if="!isMobile">{{ item.end_competition }}</td>
                <td v-if="!isMobile">{{ item.stars }}</td>
                <td v-if="!isMobile">{{ item.hall }}</td>
                <td v-if="!isMobile">{{ item.price }}</td>

                <td>
                  <div
                    class="px-4 cursor-pointer"
                    @click="confirmDeletion(item.id, item.license)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
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
import NewCompetition from "./NewCompetition.vue";
import LoadFids from "./LoadFids.vue";
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
@media (min-width: 768px) {
  .row_padding {
    padding: 20px 260px;
  }
}

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

.my_checkbox {
  width: 5px;
  height: 5px;
}</style
>>
