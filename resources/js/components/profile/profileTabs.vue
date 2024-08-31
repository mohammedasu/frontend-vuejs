<template>
  <nav class="header">
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"
      ><span class="navicon"></span
    ></label>
    <div class="nav nav-tabs menu" id="nav-tab" role="tablist">
      <a
        class="nav-item nav-link active"
        id="nav-basicdetails-tab"
        data-toggle="tab"
        href="#basicdetails"
        role="tab"
        aria-controls="nav-basicdetails"
        aria-selected="true"
        @click.prevent="enableSection('basicdetails')"
        >Basic details</a
      >
      <a
        v-if="basic_details.user_type == 'doctor'"
        class="nav-item nav-link"
        id="nav-professionaldetails-tab"
        data-toggle="tab"
        href="#professionaldetails"
        role="tab"
        aria-controls="nav-professionaldetails"
        aria-selected="false"
        @click.prevent="enableSection('professionaldetails')"
        >Professional details</a
      >
      <a
        v-if="basic_details.user_type == 'doctor'"
        class="nav-item nav-link"
        id="nav-yourspeciality-tab"
        data-toggle="tab"
        href="#yourspeciality"
        role="tab"
        aria-controls="nav-yourspeciality"
        aria-selected="false"
        @click.prevent="enableSection('speciality')"
        >Your speciality</a
      >
      <a
        v-if="basic_details.user_type == 'patient'"
        class="nav-item nav-link"
        id="nav-symptom-tab"
        data-toggle="tab"
        href="#yoursymptoms"
        role="tab"
        aria-controls="nav-symptoms"
        aria-selected="false"
        @click.prevent="enableSection('symptoms')"
        >Your Symptoms or Speciality</a
      >

      <!--<a
        v-if="basic_details.user_type == 'doctor'"
        class="nav-item nav-link"
        id="nav-yourservices-tab"
        data-toggle="tab"
        href="#yourservices"
        role="tab"
        aria-controls="nav-yourservices"
        aria-selected="false"
        @click.prevent="enableSection('services')"
        >Your services</a
      >-->
      <a
        class="nav-item nav-link"
        id="nav-youraddress-tab"
        data-toggle="tab"
        href="#youraddress"
        role="tab"
        aria-controls="nav-youraddress"
        aria-selected="false"
        @click.prevent="enableSection('addressdetails')"
        >Your address</a
      >
      <a
        v-if="basic_details.user_type == 'medicalstudent'"
        class="nav-item nav-link"
        id="nav-educationaldetails-tab"
        data-toggle="tab"
        href="#educationaldetails"
        role="tab"
        aria-controls="nav-educationaldetails"
        aria-selected="false"
        @click.prevent="enableSection('educationaldetails')"
        >Education Details</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  props: ["basic_details"],
  methods: {
    enableSection(val) {
      this.$emit("enableSection", val);
    },
  },
};
</script>