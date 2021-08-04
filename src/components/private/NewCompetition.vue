<template>
  <div>
    <!-- Manual Components Creation  -->
    <create-dialog
      :show="open"
      title="Create new competition"
      @close="$emit('close')"
    >
      <div class="card text-dark bg-light mb-0">
        <div class="card-body">
          <form class="" @submit.prevent="formSubmit">
            <!--    Events   -->
            <div class="p-2">
              <label for="" class="col-form-label">Event</label>

              <select
                v-model="events.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Events')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the event</option>
                <option
                  v-for="item in events.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <!--    Dances   -->

            <div class="p-2">
              <label for="" class="col-form-label">Dances</label>

              <select
                v-model="dances.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Dances')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the dance</option>
                <option
                  v-for="item in dances.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>
            <!--    Disciplines   -->

            <div class="p-2">
              <label for="" class="col-form-label">Disciplines</label>

              <select
                v-model="disciplines.value"
                class="w3-select  w3-small w3-border text-black"
                name="option"
                @click="loadTable('Disciplines')"
              >
                <option value="" disabled class="">
                  Choose the disciplines
                </option>
                <option
                  v-for="item in disciplines.tab"
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
                v-model="judges_disciplines.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Judges_disciplines')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose judges disciplines
                </option>
                <option
                  v-for="item in judges_disciplines.tab"
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
                v-model="judges_licenses.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Judges_licenses')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the judges licenses
                </option>
                <option
                  v-for="item in judges_licenses.tab"
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
                v-model="officials_licenses.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Officials_licenses')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the official licenses
                </option>
                <option
                  v-for="item in officials_licenses.tab"
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
                v-model="officials_roles.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Officials_roles')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose Officials_roles
                </option>
                <option
                  v-for="item in officials_roles.tab"
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
                v-model="sectors_discipline.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Sectors_discipline')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the Sectors discipline
                </option>
                <option
                  v-for="item in sectors_discipline.tab"
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
                v-model="unit_type.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Unit_type')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the unit type</option>
                <option
                  v-for="item in unit_type.tab"
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
                v-model="age_category.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Age_category')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose age category</option>
                <option
                  v-for="item in age_category.tab"
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
                v-model="classe.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Classe')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose the classe</option>
                <option
                  v-for="item in classe.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.id }} - {{ item.description }}
                </option>
              </select>
            </div>

            <!--    Competition type -->
            <div class="p-2">
              <label for="" class="col-form-label">Competition type</label>
              <select
                v-model="competition_type.value"
                class="w3-select  w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Competition_type')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose the competition type
                </option>
                <option
                  v-for="item in competition_type.tab"
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
                v-model="judging_systems.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Judging_systems')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>
                  Choose judging systems
                </option>
                <option
                  v-for="item in judging_systems.tab"
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
                v-model="rounds.value"
                class="w3-select w3-small  w3-border text-black"
                name="option"
                @click="loadTable('Rounds')"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected>Choose rounds</option>
                <option
                  v-for="item in rounds.tab"
                  :key="item.id"
                  :value="item.id"
                >
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
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: ["open"],
  data() {
    return {
      events: { value: "", isValid: true, tab: [] },
      dances: { value: "", isValid: true, tab: [] },
      disciplines: { value: "", isValid: true, tab: [] },
      judges_disciplines: { value: "", isValid: true, tab: [] },
      judges_licenses: { value: "", isValid: true, tab: [] },
      officials_licenses: { value: "", isValid: true, tab: [] },
      officials_roles: { value: "", isValid: true, tab: [] },
      sectors_discipline: { value: "", isValid: true, tab: [] },
      unit_type: { value: "", isValid: true, tab: [] },
      classe: { value: "", isValid: true, tab: [] },
      age_category: { value: "", isValid: true, tab: [] },
      competition_type: { value: "", isValid: true, tab: [] },
      judging_systems: { value: "", isValid: true, tab: [] },
      rounds: { value: "", isValid: true, tab: [] },

      myCompetitions: [],
      isFormValid: true,
      isLoading: false,
      error: null,
      tab: null,
      openDialogCompetitionCreation: null,
      isMobile: false,
    };
  },
  methods: {
    ////////////////////////////
    async formSubmit() {
      this.isLoading = true;
      //console.log(this.form.events.value);
      const actionPayload = {
        license: "FREE",
        events: this.events.value,
        dances: this.dances.value,
        disciplines: this.disciplines.value,
        judges_disciplines: this.judges_disciplines.value,
        judges_licenses: this.judges_licenses.value,
        officials_licenses: this.officials_licenses.value,
        officials_roles: this.officials_roles.value,
        sectors_discipline: this.sectors_discipline.value,
        unit_type: this.unit_type.value,
        classe: this.classe.value,
        age_category: this.age_category.value,
        competition_type: this.competition_type.value,
        judging_systems: this.judging_systems.value,
        rounds: this.rounds.value,
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
      this.dances.value = null;
      this.events.value = null;
      this.disciplines.value = null;
      this.judges_disciplines.value = null;
      this.judges_licenses.value = null;
      this.officials_licenses.value = null;
      this.officials_roles.value = null;
      this.sectors_discipline.value = null;
      this.unit_type.value = null;
      this.classe.value = null;
      this.age_category.value = null;
      this.competition_type.value = null;
      this.judging_systems.value = null;
      this.rounds.value = null;
      */
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
          case "Dances":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.dances.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Disciplines":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.disciplines.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Judges_disciplines":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judges_disciplines.tab = this.$store.getters[
              "tab/get" + tabName
            ];
            break;
          case "Judges_licenses":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judges_licenses.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Officials_licenses":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.officials_licenses.tab = this.$store.getters[
              "tab/get" + tabName
            ];
            break;
          case "Officials_roles":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.officials_roles.tab = this.$store.getters["tab/get" + tabName];
            break;
          //
          case "Sectors_discipline":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.sectors_discipline.tab = this.$store.getters[
              "tab/get" + tabName
            ];
            break;
          case "Unit_type":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.unit_type.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Age_category":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.age_category = this.$store.getters["tab/get" + tabName];
            break;
          //
          case "Classe":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.classe.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Competition_type":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.competition_type.tab = this.$store.getters[
              "tab/get" + tabName
            ];
            break;
          case "Judging_systems":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judging_systems.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Rounds":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.rounds.tab = this.$store.getters["tab/get" + tabName];
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
    manageDialogCompetition() {
      this.openDialogCompetitionCreation = null;
    },
  },
  computed: {},

  created() {
    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
};
</script>
