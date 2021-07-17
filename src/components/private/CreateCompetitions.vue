

<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" fixed title="Loading table...">
      <base-spinner></base-spinner>
    </base-dialog>

    <!--  -->
    <create-dialog
      :show="!!openDialogCompetitionCreation"
      title="Create new competition"
      @close="manageDialogCompetition"
    >
      <div class="card text-dark bg-light mb-0">
        <div class="card-body">
          <form class="" @submit.prevent="formSubmit">
            <!--    Events   -->
            <div class="p-2">
              <label for="" class="col-form-label">Event</label>

              <select
                v-model="form.events.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Events')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the event</option>
                <option v-for="item in events" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <!--    Dances   -->

            <div class="p-2">
              <label for="" class="col-form-label">Dances</label>

              <select
                v-model="form.dances.value"
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
            <!--    Disciplines   -->

            <div class="p-2">
              <label for="" class="col-form-label">Disciplines</label>

              <select
                v-model="form.disciplines.value"
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

            <!--    Select judges disciplines   -->
            <div class="p-2">
              <label for="" class="col-form-label"
                >Select judges disciplines</label
              >

              <select
                v-model="form.judges_disciplines.value"
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

            <!--    Judges licenses   -->
            <div class="p-2">
              <label for="" class="col-form-label">Judges licenses</label>

              <select
                v-model="form.judges_licenses.value"
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

            <!--    Official licenses  -->
            <div class="p-2">
              <label for="" class="col-form-label">Official licenses</label>

              <select
                v-model="form.officials_licenses.value"
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

            <!--    Choose official roles -->
            <div class="p-2">
              <label for="" class="col-form-label">Choose official roles</label>

              <select
                v-model="form.officials_roles.value"
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

            <!-- ------------------- -->

            <!--    Sectors discipline-->
            <div class="p-2">
              <label for="" class="col-form-label">Sectors discipline</label>

              <select
                v-model="form.sectors_discipline.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Sectors_discipline')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the Sectors discipline
                </option>
                <option
                  v-for="item in sectors_discipline"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Unit type<-->
            <div class="p-2">
              <label for="" class="col-form-label">Unit type</label>
              <select
                v-model="form.unit_type.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Unit_type')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the unit type</option>
                <option
                  v-for="item in unit_type"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Choose age category  -->
            <div class="p-2">
              <label for="" class="col-form-label">Choose age category</label>
              <select
                v-model="form.age_category.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Age_category')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose age category</option>
                <option
                  v-for="item in age_category"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Classe -->
            <div class="p-2">
              <label for="" class="col-form-label">Classe</label>
              <select
                v-model="form.classe.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Classe')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the classe</option>
                <option v-for="item in classe" :key="item.id" :value="item.id">
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Competition type -->
            <div class="p-2">
              <label for="" class="col-form-label">Competition type</label>
              <select
                v-model="form.competition_type.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Competition_type')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the competition type
                </option>
                <option
                  v-for="item in competition_type"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Choose judging systems-->
            <div class="p-2">
              <label for="" class="col-form-label"
                >Choose judging systems</label
              >
              <select
                v-model="form.judging_systems.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Judging_systems')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose judging systems
                </option>
                <option
                  v-for="item in judging_systems"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Choose rounds-->
            <div class="p-2">
              <label for="" class="col-form-label">Choose rounds</label>
              <select
                v-model="form.rounds.value"
                class="w3-select w3-border text-black"
                name="option"
                @click="loadTable('Rounds')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose rounds</option>
                <option v-for="item in rounds" :key="item.id" :value="item.id">
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <div class="">
              <h6 class="mt-2">Other fields goes here ....</h6>
            </div>

            <!-- ------------------- -->

            <p>
              <button type="submit" class="btn btn-primary mt-4">Create</button>
            </p>
          </form>
        </div>
      </div>
    </create-dialog>

    <create-dialog
      :show="!!openDialogCompetitionCreationFromFids"
      title="Create From Fids"
      @close="manageDialogCompetitionFromFids"
    >
      <div>
        <p class="py-4">
          <button
            class="w3-button w3-small w3-white w3-border w3-border-blue w3-wide"
            @click="loadFidsCompetitionsMethod"
          >
            Load the table
          </button>

          <button
            :disabled="checkItems.length <= 0"
            class="
              w3-button w3-small w3-blue w3-border w3-border-blue w3-wide
              ml-3
            "
            @click="checkCompetitionsSubmit"
          >
            Insert
          </button>
        </p>

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
                <div class="form-check">
                  <input
                    v-model="checkItems"
                    :value="item.id"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                </div>
              </td>
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
    </create-dialog>

    <!-- ----------------------------------------------------------------------------------------------------------------------- -->

    <div class="row p-0 m-0">
      <div class="col mx-4 mt-4">
        <div class="btn-group btn-group-md" role="group" aria-label="">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="openDialogCompetitionCreation = true"
          >
            Create new competition
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="openDialogCompetitionCreationFromFids = true"
          >
            Create from Fids
          </button>
        </div>
      </div>
    </div>
    <div class="row p-0 m-0">
      <div class="col m-4">
        <table class="w3-table-all w3-small mb-4">
          <thead>
            <tr class="w3-blue">
              <th>License</th>
              <th>Discipline</th>
              <th>Age group</th>
              <th>Class</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="w3-hover-grey"
              v-for="item in myCompetitions"
              :key="item.id"
            >
              <td>{{ item.license }}</td>
              <td>{{ item.discipline }}</td>
              <td>{{ item.age_group }}</td>
              <td>{{ item.classe }}</td>
              <td>
                <div
                  class="px-4 cursor-pointer"
                  @click="deleteItem(item.id, item.license)"
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
</template>



<script>
export default {
  data() {
    return {
      checkItems: [],
      form: {
        events: { value: null, isValid: true },
        dances: { value: null, isValid: true },
        disciplines: { value: null, isValid: true },
        judges_disciplines: { value: null, isValid: true },
        judges_licenses: { value: null, isValid: true },
        officials_licenses: { value: null, isValid: true },
        officials_roles: { value: null, isValid: true },
        sectors_discipline: { value: null, isValid: true },
        unit_type: { value: null, isValid: true },
        classe: { value: null, isValid: true },
        age_category: { value: null, isValid: true },
        competition_type: { value: null, isValid: true },
        judging_systems: { value: null, isValid: true },
        rounds: { value: null, isValid: true },
      },
      //
      fidsCompetitions: null,
      myCompetitions: null,
      isFormValid: true,
      isLoading: false,
      error: null,
      tab: null,
      events: null,
      dances: null,
      disciplines: null,
      judges_disciplines: null,
      judges_licenses: null,
      officials_licenses: null,
      officials_roles: null,
      sectors_discipline: null,
      unit_type: null,
      classe: null,
      age_category: null,
      competition_type: null,
      judging_systems: null,
      rounds: null,
      mine: true,
      openDialogCompetitionCreation: null,
      openDialogCompetitionCreationFromFids: null,
    };
  },
  methods: {
    async checkCompetitionsSubmit() {
      console.log(this.checkItems);

      // this.isLoading = true;
      try {
        await this.$store.dispatch("competition/insertFromFidsCompetitions", {
          competitionsIdArray: this.checkItems,
          event: this.$route.query.eventId,
          user: this.$route.query.user,
        });
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.openDialogCompetitionCreationFromFids = null;
      this.checkItems = [];
      this.loadMyCompetitions();

      //   this.isLoading = false;
    },
    async deleteItem(id, license) {
      if (
        confirm(
          "Are you sure you want to delete this competition from database?"
        )
      ) {
        // do the delete
        try {
          const actionPayload = {
            id: id,
            license: license,
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
      }
    },

    async loadFidsCompetitions() {
      this.isLoading = true;
      this.openDialogCompetitionCreationFromFids = null;
      try {
        await this.$store.dispatch("competition/getFidsCompetitions");
        this.fidsCompetitions =
          this.$store.getters["competition/getFidsCompetitions"];
      } catch (error) {
        //console.log(error);
      }
      this.isLoading = false;
      this.openDialogCompetitionCreationFromFids = true;
    },
    async loadMyCompetitions() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("competition/getMyCompetitions", {
          user: this.$store.getters["auth/userId"],
        });
      } catch (error) {
        console.log(error);
      }

      if (typeof this.$route.query.eventId === "undefined") {
        //  console.log(this.$route.query.eventId);
        this.myCompetitions =
          this.$store.getters["competition/getMyCompetitions"];
      } else
        this.myCompetitions = this.$store.getters[
          "competition/getMyCompetitions"
        ].filter((el) => {
          return el.event == this.$route.query.eventId;
        });

      this.isLoading = false;
    },
    async loadTable(tabName) {
      // console.log("ciao");
      try {
        switch (tabName) {
          case "Events":
            await this.$store.dispatch("event/getEvents");
            this.events = this.$store.getters["event/getEvents"];
            break;
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
          //
          case "Sectors_discipline":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.sectors_discipline = this.$store.getters["tab/get" + tabName];
            break;

          case "Unit_type":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.unit_type = this.$store.getters["tab/get" + tabName];
            break;

          case "Age_category":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.age_category = this.$store.getters["tab/get" + tabName];
            break;
          //
          case "Classe":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.classe = this.$store.getters["tab/get" + tabName];
            break;

          case "Competition_type":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.competition_type = this.$store.getters["tab/get" + tabName];
            break;

          case "Judging_systems":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judging_systems = this.$store.getters["tab/get" + tabName];
            break;

          case "Rounds":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.rounds = this.$store.getters["tab/get" + tabName];
            break;

          default:
            await this.$store.dispatch("tab/getTabs", tabName);
            this.tab = this.$store.getters["tab/get" + tabName];
        }

        // console.log(this.tab[0]);
      } catch (error) {
        //   console.log(error);
      }
    },

    ////////////////////////////
    async formSubmit() {
      this.isLoading = true;

      console.log(this.form.events.value);
      const actionPayload = {
        license: "FREE",
        events: this.form.events.value,
        dances: this.form.dances.value,
        disciplines: this.form.disciplines.value,
        judges_disciplines: this.form.judges_disciplines.value,
        judges_licenses: this.form.judges_licenses.value,
        officials_licenses: this.form.officials_licenses.value,
        officials_roles: this.form.officials_roles.value,
        sectors_discipline: this.form.sectors_discipline.value,
        unit_type: this.form.unit_type.value,
        classe: this.form.classe.value,
        age_category: this.form.age_category.value,
        competition_type: this.form.competition_type.value,
        judging_systems: this.form.judging_systems.value,
        rounds: this.form.rounds.value,
      };
      // console.log(this.form);
      // do the post
      try {
        await this.$store.dispatch(
          "competition/addMyCompetition",
          actionPayload
        );

        this.loadMyCompetitions();
        //
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
      // clean the fields
      /*
      this.form.dances.value = null;
      this.form.events.value = null;
      this.form.disciplines.value = null;
      this.form.judges_disciplines.value = null;
      this.form.judges_licenses.value = null;
      this.form.officials_licenses.value = null;
      this.form.officials_roles.value = null;
      this.form.sectors_discipline.value = null;
      this.form.unit_type.value = null;
      this.form.classe.value = null;
      this.form.age_category.value = null;
      this.form.competition_type.value = null;
      this.form.judging_systems.value = null;
      this.form.rounds.value = null;
      */
    },

    handleError() {
      this.error = null;
    },

    manageDialogCompetition() {
      this.openDialogCompetitionCreation = null;
    },
    manageDialogCompetitionFromFids() {
      this.openDialogCompetitionCreationFromFids = null;
    },
    loadFidsCompetitionsMethod() {
      this.loadFidsCompetitions();
    },
  },
  created() {
    // this.loadTable("Judges_licenses");
    // this.loadFidsCompetitions();
    this.loadMyCompetitions();
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

