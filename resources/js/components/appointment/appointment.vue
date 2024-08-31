<template>
  <section class="footerfixbg">
    <div class="container">
      <div class="row">
        <AppointmentLeft :doctordetails="doctordetails"></AppointmentLeft>
        <AppointmentRight
          v-if="show_patient_details == false"
          :doctordetails="doctordetails"
          :timeslots="timeslots"
          @addPatientDetails="addPatientDetails"
        ></AppointmentRight>
        <PatientDetails
          v-if="show_patient_details == true"
          :appointmentDetails="appointmentDetails"
          @processForm="processForm"
        ></PatientDetails>
        <loader-comp v-if="$store.state.loaderState"></loader-comp>
      </div>
    </div>
  </section>
</template>

<script>
import AppointmentLeft from "../appointment/appointmentLeft";
import AppointmentRight from "../appointment/appointmentRight";
import PatientDetails from "../appointment/patientDetails";
import loaderComp from "../common/PageLoader";
import mixin from "../../mixins/appointment";

export default {
  mixins: [mixin],
  components: {
    AppointmentLeft,
    AppointmentRight,
    PatientDetails,
    loaderComp
  }
};
</script>

<style>
</style>