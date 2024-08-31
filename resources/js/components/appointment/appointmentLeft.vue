<template>
  <div class="col-lg-4 col-md-4 asidesec appbookingleft">
    <div class="card p-3">
      <h6 class="title-sm">Online Consultation Appointment - Select Time</h6>
      <div class="userprofdtl">
        <div class="profile">
          <img
            :src="
              doctordetails.user_image ? doctordetails.user_image : $store.state.defaultImage
            "
            alt=""
          />
        </div>
        <div class="create-postpic">
          <h5>{{ doctordetails.first_name }} {{ doctordetails.last_name }}</h5>
          <p class="greytext">
            {{ doctordetails.experience }} Years Experience
          </p>
          <p class="greytext mb-2">{{ doctordetails.speciality_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["doctordetails"],
};
</script>
