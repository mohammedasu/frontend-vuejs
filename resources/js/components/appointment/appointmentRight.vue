<template>
  <div class="col-lg-8 col-md-8 middlesec appbookingright pr-sm-0">
    <div class="card p-3">
      <!--<h5>Harish Mehta Clinic</h5>-->
      <p class="greytext addresmapin">{{ doctordetails.city }}</p>
      <p>
        Fees:
        <span class="rupee">
          <span> {{ doctordetails.fees }} </span>
        </span>
      </p>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist" style="display: none">
        <li
          class="nav-item"
          v-for="(timeslot, index) in timeslots"
          :key="index"
        >
          <a
            :class="[index ? 'nav-link' : 'nav-link active']"
            :href="'#tab' + (index + 1)"
            role="tab"
            data-toggle="tab"
          >
            {{ timeslot.date }}</a
          >
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content" style="display: none">
        <div
          role="tabpanel"
          :class="[index ? 'tab-pane fade show' : 'tab-pane fade show active']"
          v-for="(timeslot, index) in timeslots"
          :key="index"
          :id="'tab' + (index + 1)"
        >
          <div class="title-md" v-if="timeslot.morning != undefined">
            <h6><img width="30" src="assets/img/morning.png" /> Morning</h6>
            <button
              class="outlinebtn"
              href="#"
              @click.prevent="addPatientDetails(time, timeslot.date)"
              v-for="(time, index) in timeslot.morning.time"
              :key="index"
            >
              {{ time }}
            </button>
          </div>

          <div class="title-md" v-if="timeslot.afternoon != undefined">
            <h6><img width="30" src="assets/img/afternoon.png" /> Afternoon</h6>
            <button
              class="outlinebtn"
              onclick="location.href='book-appointment-details.html'"
              v-for="(time, index) in timeslot.morning.time"
              :key="index"
            >
              {{ time }}
            </button>
          </div>

          <div class="title-md" v-if="timeslot.evening != undefined">
            <h6><img width="30" src="assets/img/evening.png" /> Evening</h6>
            <button
              class="outlinebtn"
              onclick="location.href='book-appointment-details.html'"
              v-for="(time, index) in timeslot.morning.time"
              :key="index"
            >
              {{ time }}
            </button>
          </div>
          <div
            v-if="
              timeslot.morning == undefined &&
              timeslot.afternoon == undefined &&
              timeslot.evening == undefined
            "
            style="text-align: center; padding: 20px; font-weight: 500"
          >
            No time slots available
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: ["doctordetails", "timeslots"],
  mounted: function () {},
  methods: {
    addPatientDetails(time, date) {
      let payload = {};
      payload.date = date;
      payload.time = time;
      payload.show_patient_details = true;
      this.$emit("addPatientDetails", payload);
    },
  },
};
</script>

<style>
</style>