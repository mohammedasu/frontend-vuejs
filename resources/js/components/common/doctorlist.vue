<template>
  <div class="card pb-3">
    <h4 class="ml-3 pt-3 mb-2">Doctor you may know</h4>

    <Filters
      v-if="this.$route.name === 'nearbydoctors'"
      :data="doctor_data"
      @filterList="filterList"
    ></Filters>

    <FiltersAlumni
      v-if="this.$route.name === 'findbyalumni'"
      :data="doctor_data"
      @findByAlumniDoctors="findByAlumniDoctors"
      :user_data="getUser"
    ></FiltersAlumni>
    <span class="nofound-sm" v-if="doctor_data.total === 0"
      >No Doctors Found</span
    >

    <ul class="profilelistul">
      <li v-for="doctor in doctor_data.data" :key="doctor.user_ref_no">
        <p class="connect" v-if="doctor.connection_status == 1">
          <a href="#" class="connectbtn active">Request Sent</a>
        </p>
        <p class="connect" v-else-if="doctor.connection_status == 2">
          <router-link to="/networks" class="connectbtn respond"
            >Respond</router-link
          >
        </p>
        <p class="connect" v-else-if="doctor.connection_status == 3">
          <a href="#" class="connectbtn">Connected</a>
        </p>
        <p class="connect" v-else>
          <template
            v-if="loader.loading && loader.loader_ref_no == doctor.user_ref_no"
          >
            <img src="/assets/img/loader-btn.gif" alt="" />
          </template>
          <template v-else>
            <a href="#" class="connectbtn" @click.prevent="connectNow(doctor)"
              ><sup>+</sup>Connect</a
            >
          </template>
        </p>
        <div class="profile">
          <img
            :src="
              doctor.user_image ? doctor.user_image : $store.state.defaultImage
            "
            alt=""
          />
        </div>
        <router-link :to="'viewprofile/' + doctor.user_ref_no">
          <p class="b">
            {{ doctor.first_name | capitalize }} {{ doctor.last_name }}
          </p>
        </router-link>
        <p>{{ doctor.speciality_name | capitalize }}</p>
        <p class="alumniicon">{{ doctor.qualification | capitalize }}</p>
        <p class="d-flex justify-content-between bordertop">
          <span class="greytext experienceicon"
            ><span>{{
              doctor.experience
            }}</span>
            Year Of Exp
          </span>
          <!--<span class="rupee">
            <span>{{ doctor.fees }} </span>
          </span>-->
        </p>
        <p class="greytext clinicicon" v-if="doctor.place_of_work">
          {{ doctor.place_of_work | capitalize }}
        </p>
        <!--  <p class="greytext universityicon" v-if="doctor.institute_name">
          {{ doctor.institute_name | capitalize }}
        </p> -->
        <p class="greytext clinicmap" v-if="doctor.city">
          {{ doctor.city }}
        </p>
        <!--<div @click="setDoctorParams(doctor)" class="outlinebtn my-0">Book Appointment</div>-->
      </li>
    </ul>
    <div class="mt-3">
      <a
        class="anchor seeall pt-3"
        v-if="doctor_data.next_page_url"
        @click.prevent="loadData(doctor_data)"
      >
        See More
      </a>
    </div>
  </div>
</template>

<script>
import Filters from "../nearby/filters";
import FiltersAlumni from "../findbyalumni/filters";
import mixinLoader from "../../mixins/loader";

export default {
  props: ["doctor_data"],
  mixins: [mixinLoader],
  data() {
    return {
      currentPage: 1,
      nextPage: 2,
    };
  },
  components: {
    Filters,
    FiltersAlumni,
  },
  methods: {
    connectNow(doctor) {
      this.showProcessLoader(doctor.user_ref_no);
      this.$emit("postConnect", doctor); //emitting function to parent from child
    },
    loadData(doctor) {
      this.$emit("loadData", doctor); //emitting function to parent from child
    },
    setDoctorParams(doctor) {
      this.$store.commit("appointment/setDoctorParams", doctor);
      this.$router.push("/bookappointment");
    },
    filterList(params) {
      this.$emit("filterList", params);
    },
    findByAlumniDoctors(params) {
      this.$emit("findByAlumniDoctors", params);
    },
  },
};
</script>

<style>
</style>