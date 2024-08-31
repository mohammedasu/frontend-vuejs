<template>
  <section>
    <template v-if="userData.doctor">
      <p>
        {{
          userData.doctor.specialityname ? userData.doctor.specialityname : ""
        }}
      </p>
    </template>
    <template v-else-if="userData.user_type == 'patient'">
      <patientDisease
        :looking_for="userData.looking_for"
        :display_text="display_text"
      ></patientDisease>
    </template>
    <template v-else>
      <p
        class="alumniicon"
        v-if="userData.student && userData.student.qualification"
      >
        {{ userData.student.qualification | capitalize }}
      </p>
    </template>
    <p class="clinicmap" v-if="userData.address">
      {{ userData.address.city ? userData.address.city : "" }}
    </p>
  </section>
</template>

<script>
import patientDisease from "../common/PatientDisease";
export default {
  props: ["userData"],
  data() {
    return {
      display_text: false,
    };
  },
  components: {
    patientDisease,
  },
};
</script>

<style>
</style>