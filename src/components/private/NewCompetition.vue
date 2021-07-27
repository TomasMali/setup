<template>
  <div>I am the New competiton</div>
</template>














<script>
export default {
  emits: ["add-competitions"],
  data() {
    return {
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
    };
  },
  methods: {},
};
</script>