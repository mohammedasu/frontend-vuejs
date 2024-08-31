<template>
  <section>
    <template v-if="looking_for">
      <p class="bordertop" v-if="display_text"><strong>Who I am </strong></p>
      <p class="mb-1" v-if="looking_for.speciality_list">
        <strong>Speciality looking for :</strong>
      </p>
      <p class="whoiam" v-if="looking_for.speciality_list">
        <span
          v-for="(speciality, index) in looking_for.speciality_list"
          :key="index"
        >
          {{ speciality.speciality_name }}
        </span>
      </p>
      <p class="mb-1" v-if="looking_for.symptom_list">
        <strong>Symptoms :</strong>
      </p>
      <p class="whoiam" v-if="looking_for.symptom_list">
        <span v-for="(symptom, index) in looking_for.symptom_list" :key="index">
          {{ symptom.symptom_name }}
        </span>
      </p>
    </template>
  </section>
</template>

<script>
export default {
  props: ["looking_for", "display_text"],
};
</script>

<style>
</style>