<template>
  <div>
    <!-- Manual Components Creation  -->

    <div>
      <!--    Events   -->
      <div class="p-2">
        <select
          v-model="events.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
          name="option"
          @click="loadTable('Events')"
        >
          <optgroup disabled hidden></optgroup>
          <option value="" disabled selected id="text-color">
            Choose the event
          </option>
          <option v-for="item in events.tab" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <!--    Disciplines   -->

      <div class="p-2">
        <select
          v-model="disciplines.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
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
            {{ item.description }} - {{ item.sector }}
          </option>
        </select>
      </div>

      <!--    Classe -->
      <div class="p-2">
        <select
          v-model="classe.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
          name="option"
          @click="loadTable('Classe')"
        >
          <optgroup disabled hidden></optgroup>
          <option value="" disabled selected>Choose the classe</option>
          <option v-for="item in classe.tab" :key="item.id" :value="item.id">
            {{ item.description }} - {{ item.id }}
          </option>
        </select>
      </div>

      <!--    Choose age group/category  -->
      <div class="p-2">
        <select
          v-model="age_category.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
          name="option"
          @click="loadTable('Age_category')"
        >
          <optgroup disabled hidden></optgroup>
          <option value="" disabled selected>Choose age group</option>
          <option
            v-for="item in age_category.tab"
            :key="item.id"
            :value="item.id"
          >
            {{ item.description }} - {{ item.id }}
          </option>
        </select>
      </div>

      <!--    Dances   -->

      <div class="p-2">
        <select
          v-model="dances.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
          name="option"
          @click="loadTable('Dances')"
        >
          <optgroup disabled hidden></optgroup>
          <option value="" disabled selected>Choose the dance</option>
          <option v-for="item in dances.tab" :key="item.id" :value="item.id">
            {{ item.description }} - {{ item.id }}
          </option>
        </select>
      </div>

      <!--    Unit type<-->
      <div class="p-2">
        <select
          v-model="unit_type.value"
          class="  form-select form-select-sm "
          aria-label=".form-select-sm example"
          name="option"
          @click="loadTable('Unit_type')"
        >
          <optgroup disabled hidden></optgroup>
          <option value="" disabled selected>Choose the unit type</option>
          <option v-for="item in unit_type.tab" :key="item.id" :value="item.id">
            {{ item.description }} - {{ item.id }}
          </option>
        </select>
      </div>

      <!--    Choose rounds-->

      <div class="">
        <h6 class="mt-2">Other fields goes here ....</h6>
      </div>

      <!-- ------------------- -->
    </div>
  </div>
</template>

<script>
export default {
  emits: ["insertFidsCompleated"],
  props: ["obj"],
  data() {
    return {
      events: { value: "", isValid: true, tab: [] },
      disciplines: { value: "", isValid: true, tab: [] },
      age_category: { value: "", isValid: true, tab: [] },
      classe: { value: "", isValid: true, tab: [] },
      unit_type: { value: "", isValid: true, tab: [] },
      dances: { value: "", isValid: true, tab: [] },
      judgingSystemPreliminary: { value: "", isValid: true, tab: [] },
      judgingSystemFinal: { value: "", isValid: true, tab: [] },
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

      myCompetitions: [],
      isFormValid: true,
      isLoading: false,
      error: null,
      tab: null,
      isMobile: false,
      competition: {},
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
        disciplines: this.disciplines.value === "" ? 0 : this.disciplines.value,
        age_category: this.age_category.value,
        classe: this.classe.value,
        unit_type: this.unit_type.value,
        dances: this.dances.value,

        judgingSystemPreliminary: this.judgingSystemPreliminary.value,
        judgingSystemFinal: this.judgingSystemFinal.value,
        calculationType: this.calculationType.value,
        FirstAgeMAX: this.FirstAgeMAX.value,
        SecondAgeMIN: this.SecondAgeMIN.value,
        SecondAgeMAX: this.SecondAgeMAX.value,
        AlternativeAgeGroup: this.AlternativeAgeGroup.value,
        PercFQAge: this.PercFQAge.value,
        PercFQClass: this.PercFQClass.value,
        MembersMIN: this.MembersMIN.value,
        MembersMAX: this.MembersMAX.value,
        ExclusiveGender: this.ExclusiveGender.value,
        MusicRequired: this.MusicRequired.value,
        AliasRequired: this.AliasRequired.value,
        user: this.$store.getters["auth/userId"],
      };
      // console.log(this.form);
      // do the post
      try {
        await this.$store.dispatch(
          "competition/addMyCompetition",
          actionPayload
        );
        this.$emit("insertFidsCompleated");
        //
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
      // clean the fields
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
          case "Dances":
            await this.$store.dispatch("tab/getTabs", tabName);
            this.dances.tab = this.$store.getters["tab/get" + tabName];
            break;
          //

          default:
            await this.$store.dispatch("tab/getTabs", tabName);
            this.tab = this.$store.getters["tab/get" + tabName];
        }
        // console.log(this.tab[0]);
      } catch (error) {
        //   console.log(error);
      }
    },
  },
  computed: {},
  watch: {
    obj: function(newVal) {
      this.competition = this.obj;
      console.log("Compet: ", newVal);
    },
  },
  created() {
    this.competition = this.obj;
    if (screen.width <= 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  },
};
</script>

<style scoped>
.scroll {
  height: 420px;
  overflow-y: scroll;
}

select {
  width: 100%;
  padding: 5px;
  border-radius: 0px;
}
select option {
  color: red;
}
</style>
