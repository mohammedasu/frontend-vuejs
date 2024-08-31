<template>
  <div class="card pb-3">
    <h4 class="ml-3 pt-3 mb-2">Patients you may know</h4>
    <Filters
      v-if="this.$route.name === 'nearbypatients'"
      @filterList="filterList"
    ></Filters>
    <span class="nofound-sm" v-if="patients.total === 0"
      >No Patients Found</span
    >

    <ul class="profilelistul">
      <li v-for="patient in patients.data" :key="patient.user_ref_no">
        <p class="connect" v-if="patient.connection_status == 1">
          <a href="#" class="connectbtn active">Request Sent</a>
        </p>
        <p class="connect" v-else-if="patient.connection_status == 2">
          <router-link to="/networks" class="connectbtn respond"
            >Respond</router-link
          >
        </p>
        <p class="connect" v-else-if="patient.connection_status == 3">
          <a href="#" class="connectbtn">Connected</a>
        </p>
        <p class="connect" v-else>
          <template
            v-if="loader.loading && loader.loader_ref_no == patient.user_ref_no"
          >
            <img src="/assets/img/loader-btn.gif" alt="" />
          </template>
          <template v-else>
            <a href="#" class="connectbtn" @click.prevent="connectNow(patient)"
              ><sup>+</sup>Connect</a
            >
          </template>
        </p>
        <div class="profile">
          <img
            :src="
              patient.user_image
                ? patient.user_image
                : $store.state.defaultImage
            "
            alt=""
          />
        </div>
        <p>
          <strong
            >{{ patient.first_name | capitalize }} {{ patient.last_name }}
          </strong>
        </p>
        <template v-if="patient.looking_for">
          <p class="bordertop"><strong>Who I am </strong></p>
          <p class="mb-1" v-if="patient.looking_for.speciality_list">
            <strong>Speciality looking for :</strong>
          </p>
          <div class="whoiam" v-if="patient.looking_for.speciality_list">
            <!--showing only 2 speciality & Symptoms by default -->
            <span
              v-for="(
                speciality, index
              ) in patient.looking_for.speciality_list.slice(0, 2)"
              :key="index"
            >
              {{ speciality.speciality_name }}
            </span>
            <details v-if="patient.looking_for.speciality_list.length > 2">
              <summary>
                <span class="grouptag" id="open"> more</span>
              </summary>
              <span
                v-for="(
                  speciality, index
                ) in patient.looking_for.speciality_list.slice(2)"
                :key="index"
              >
                {{ speciality.speciality_name }}
              </span>
            </details>
          </div>
          <p class="mb-1" v-if="patient.looking_for.symptom_list">
            <strong>Symptoms :</strong>
          </p>
          <div class="whoiam" v-if="patient.looking_for.symptom_list">
            <span
              v-for="(symptom, index) in patient.looking_for.symptom_list.slice(
                0,
                2
              )"
              :key="index"
            >
              {{ symptom.symptom_name }}
            </span>
            <details v-if="patient.looking_for.symptom_list.length > 2">
              <summary>
                <span class="grouptag" id="open"> more</span>
              </summary>
              <span
                v-for="(
                  symptom, index
                ) in patient.looking_for.symptom_list.slice(2)"
                :key="index"
              >
                {{ symptom.symptom_name }}
              </span>
            </details>
          </div>
        </template>

        <p class="greytext clinicmap" v-if="patient.city">{{ patient.city }}</p>
      </li>
    </ul>
    <div class="mt-3">
      <a
        class="anchor seeall pt-3"
        v-if="patients.next_page_url"
        @click.prevent="loadMore(patients)"
      >
        See More
      </a>
    </div>
  </div>
</template>

<script>
import Filters from "../nearby/filters";
import mixinLoader from "../../mixins/loader";

export default {
  props: ["patients"],
  mixins: [mixinLoader],
  data() {
    return {
      currentPage: 1,
      nextPage: 2,
    };
  },
  components: {
    Filters,
  },
  methods: {
    connectNow(patient) {
      this.showProcessLoader(patient.user_ref_no);
      this.$emit("postConnect", patient); //emitting function to parent from child
    },
    loadMore(data) {
      this.$emit("loadData", data); //emitting function to parent from child
    },
    filterList(params) {
      this.$emit("filterList", params);
    },
  },
};
</script>

<style>
</style>