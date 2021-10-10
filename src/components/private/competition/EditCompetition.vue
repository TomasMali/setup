<template>
  <!-- Modal -->
  <div
    class="modal  fade "
    id="editCompetitionModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-xl ">
      <div class="modal-content">
        <!--
          <div class="modal-header purple">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Competition
              </h5>
              <button
                type="button"
                class="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
              -->
        <div class="modal-body mx-5 mt-4">
          <!--------------------------------------------------  Load FIDS  -->
          <!--    Disciplines   -    
          DDDD: {{ getClickedCompetition }}
              -->

          <div class="px-5 mt-2">
            <!--    Events   -->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1">Event</span>
              <select
                disabled
                v-model="event"
                class="  form-select form-select-sm "
                aria-label=".form-select-sm example"
                name="option"
              >
                <optgroup disabled hidden></optgroup>
                <option value="" disabled selected id="text-color">
                  Choose the event
                </option>
                <option
                  v-for="item in events.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>

              <span class="input-group-text ml-1" id="basic-addon1"
                >License</span
              >

              <input
                disabled
                type="text"
                v-model="getClickedCompetition.license"
                class="text-left form-control"
              />
            </div>

            <!--    Discipline   -->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text " id="basic-addon1"
                >Discipline</span
              >
              <select
                disabled
                v-model="getClickedCompetition.discipline"
                class="  form-select form-select-sm "
                aria-label=".form-select-sm example"
                name="option"
              >
                <option
                  v-for="item in disciplines.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.description }}
                </option>
              </select>
              <span class="input-group-text ml-1" id="basic-addon1"
                >Classe</span
              >
              <input
                disabled
                type="text"
                v-model="getClickedCompetition.classe"
                class="  form-select form-select-sm text-left"
              />
            </div>

            <!--    Choose age group/category  -->
            <!--    United type   -->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1">Age group</span>
              <input
                disabled
                type="text"
                v-model="getClickedCompetition.age_group"
                class="text-left form-control"
              />
              <span class="input-group-text ml-1" id="basic-addon1"
                >United type</span
              >
              <select
                disabled
                v-model="getClickedCompetition.unit_type"
                class="  form-select form-select-sm "
              >
                <option
                  v-for="item in unit_type.tab"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.description }} - {{ item.id }}
                </option>
              </select>
            </div>

            <!--    Choose age group/category  -->
            <!--    United type   -->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Judging_system_preliminary</span
              >
              <select
                v-model="getClickedCompetition.judging_system_preliminary"
                class="  form-select form-select-sm "
              >
                <option
                  v-for="item in judging_systems.tab"
                  :key="item.id"
                  :value="item.judging_systems_id"
                >
                  {{ item.description }} - {{ item.judging_systems_id }}
                </option>
              </select>
              <span class="input-group-text ml-1" id="basic-addon1"
                >Judging_system_final</span
              >
              <select
                v-model="getClickedCompetition.judging_system_final"
                class="  form-select form-select-sm "
              >
                <option
                  v-for="item in judging_systems.tab"
                  :key="item.id"
                  :value="item.judging_systems_id"
                >
                  {{ item.description }} - {{ item.judging_systems_id }}
                </option>
              </select>
            </div>

            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text " id="basic-addon1">Title</span>
              <input
                type="text"
                v-model="getClickedCompetition.title"
                class="  form-control text-left"
              />
              <span class="input-group-text ml-1" id="basic-addon1">Hall</span>

              <input
                type="text"
                class="  form-control text-left"
                v-model="getClickedCompetition.hall"
              />
            </div>

            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text " id="basic-addon1">Price</span>
              <input
                type="number"
                v-model="getClickedCompetition.price"
                class="  form-control text-left"
              />
            </div>

            <!--    Start/End   -->

            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text " id="basic-addon1">Start</span>
              <input
                v-model="getClickedCompetition.start_competition"
                class="  form-control text-left"
                type="date"
              />
              <span class="input-group-text ml-1" id="basic-addon1">End</span>
              <input
                v-model="getClickedCompetition.end_competition"
                class="  form-control text-left"
                type="date"
              />
            </div>

            <!--    dances<-->

            <!--    Calculation type<-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1">Dances</span>

              <Multiselect
                v-model="getClickedCompetition.dances"
                mode="tags"
                :closeOnSelect="false"
                :searchable="true"
                :createTag="true"
                :options="getOptions"
                class="  form-control multi"
              />
            </div>
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text ml-1" id="basic-addon1"
                >Calculation type</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.calculation_type"
                class="text-left form-control"
              />
            </div>

            <!--  First  Age  max min<-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >First age min</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.first_age_min"
                class="text-left form-control"
              />
              <span class="input-group-text ml-1" id="basic-addon1"
                >First age max</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.first_age_max"
                class="text-left form-control"
              />
            </div>

            <!-- Second  Age  max min<-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Second age min</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.second_age_min"
                class="text-left form-control"
              />
              <span class="input-group-text ml-1" id="basic-addon1"
                >Second age max</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.second_age_max"
                class="text-left form-control"
              />
            </div>

            <!-- Alternative age group-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Alternative age group</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.alternative_age_group"
                class="text-left form-control"
              />
            </div>

            <!-- perc_fq_age-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Perc_fq_age</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.perc_fq_age"
                class="text-left form-control "
              />
              <span class="input-group-text ml-1" id="basic-addon1"
                >Perc_fq_class</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.perc_fq_class"
                class="text-left form-control"
              />
            </div>

            <!-- members_min-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Members min</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.members_min"
                class="text-left form-control "
              />
              <span class="input-group-text ml-1" id="basic-addon1"
                >Members max</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.members_max"
                class="text-left form-control"
              />
            </div>

            <!-- exclusive_gender-->
            <div class="input-group input-group-sm  p-2">
              <span class="input-group-text" id="basic-addon1"
                >Exclusive gender</span
              >
              <input
                type="text"
                v-model="getClickedCompetition.exclusive_gender"
                class="text-left form-control"
              />
            </div>

            <!-- music_required-->
            <!-- alias_required-->
            <div class="input-group input-group-sm  p-2">
              <div class="form-check purple">
                <label class="form-check-label" for="musicRequired">
                  Music required
                </label>
                <input
                  id="musicRequired"
                  class="form-check-input"
                  type="checkbox"
                  v-model="getClickedCompetition.music_required"
                />
              </div>
              <div class="form-check purple ml-5">
                <label class="form-check-label" for="aliasRequired">
                  Alias required
                </label>
                <input
                  id="aliasRequired"
                  class="form-check-input"
                  type="checkbox"
                  v-model="getClickedCompetition.alias_required"
                />
              </div>

              <div class="form-check purple ml-5">
                <label class="form-check-label" for="stars">
                  Stars
                </label>

                <input
                  id="stars"
                  type="checkbox"
                  v-model="getClickedCompetition.stars"
                  class=" form-check-input   "
                />
              </div>
            </div>

            <!-- ------------------- -->
          </div>

          <!--------------------------------------------------  Load FIDS  -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="$emit('doSave', getClickedCompetition)"
          >
            Save
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
</template>

<script>
export default {
  props: ["competiton"],
  emits: ["doSave"],
  data() {
    return {
      options: [],
      //
      open: false,

      checkItem: [],
      //

      event: null,

      events: { value: "", isValid: true, tab: [] },

      license: "",
      //
      isMobile: false,

      discipline: "",
      disciplines: { value: "", isValid: true, tab: [] },
      age_category: { value: "", isValid: true, tab: [] },
      classe: { value: "", isValid: true, tab: [] },
      unit_type: { value: "", isValid: true, tab: [] },
      dances: { value: "", isValid: true, tab: [] },
      judging_systems: { value: "", isValid: true, tab: [] },
      calculationType: { value: "", isValid: true, tab: [] },
      FirstAgeMIN: { value: "", isValid: true, tab: [] },
      FirstAgeMAX: { value: "", isValid: true, tab: [] },
      SecondAgeMIN: { value: "", isValid: true, tab: [] },
      SecondAgeMAX: { value: "", isValid: true, tab: [] },
      AlternativeAgeGroup: { value: "", isValid: true, tab: [] },
      PercFQAge: { value: "", isValid: true, tab: [] },
      PercFQClass: { value: "", isValid: true, tab: [] },
      MembersMIN: { value: "", isValid: true, tab: [] },
      MembersMAX: { value: "", isValid: true, tab: [] },
      ExclusiveGender: { value: "", isValid: true, tab: [] },
      MusicRequired: { value: "", isValid: true, tab: [] },
      AliasRequired: { value: "", isValid: true, tab: [] },
    };
  },
  methods: {
    async loadTable(tabName) {
      try {
        switch (tabName) {
          case "Events":
            await this.$store.dispatch("event/getEventsFromDb", {
              user: this.$store.getters["auth/userId"],
            });
            this.events.tab = this.$store.getters["event/getEvents"];
            break;

          case "Disciplines":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.disciplines.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Age_category":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.age_category.tab = this.$store.getters["tab/get" + tabName];
            break;
          case "Classe":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.classe.tab = this.$store.getters["tab/get" + tabName];
            break;

          case "Unit_type":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.unit_type.tab = this.$store.getters["tab/get" + tabName];
            break;

          case "Judging_systems":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.judging_systems.tab = this.$store.getters["tab/get" + tabName];
            break;

          case "Dances":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.dances.tab = this.$store.getters["tab/get" + tabName];

            this.dances.tab.forEach((element) => {
              this.options.push({
                value: element.id,
                label: element.description,
              });
            });

            break;
          //

          default:
        }
        // console.log(this.tab[0]);
      } catch (error) {
        //   console.log(error);
      }
    },
  },
  computed: {
    getOptions() {
      return this.options;
    },
    getClickedCompetition() {
      return this.competiton;
    },
  },
  watch: {
    //   discipline: function(newVal) {
    //    this.disciplines.value = newVal;
    // console.log("new val", newVal);
    //},
  },
  created() {
    this.loadTable("Dances");
    //this.loadMyCompetitions();
    this.loadTable("Classe");
    this.loadTable("Events");
    this.loadTable("Disciplines");
    this.loadTable("Unit_type");
    this.loadTable("Judging_systems");

    //console.log("Query", this.start_dat);

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

.selected {
  background-color: cornflowerblue;
}

.my_checkbox {
  width: 5px;
  height: 5px;
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
  background-color: #77619b;
}
.multi {
  border-color: #673ab7;
}

button {
  text-decoration: none;

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
</style>
