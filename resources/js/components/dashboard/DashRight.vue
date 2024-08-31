<template>
  <div class="col-lg-3 asidesec pr-0">
    <div class="sidebarlistfix">
      <div class="card invitations mb-1">
        <h6 class="p-3">Invitations</h6>
        <div
          class="text-center px-3 py-2"
          v-if="connections.length < 1 && grouprequests.length < 1"
        >
          <p class="mb-1"><strong>No Connection Request </strong></p>
          <p class="greytext pxssmall">
            Keep yourself updated with the latest medical trends
          </p>
        </div>

        <ul class="px-3 ulboderbotm" v-if="connections.length > 0">
          <li
            v-for="connection in filterConnections"
            :key="connection.connection_ref_no"
          >
            <div class="d-flex userprofdtl mb-0">
              <div class="profile-lg">
                <img
                  :src="
                    connection.fromUser.fullimage
                      ? connection.fromUser.fullimage
                      : $store.state.defaultImage
                  "
                  alt=""
                />
              </div>
              <div class="create-postpic">
                <h6 v-if="connection.fromUser">
                  {{ connection.fromUser.first_name | capitalize }}&nbsp;
                  {{ connection.fromUser.last_name }}
                </h6>
                <displayData :userData="connection.fromUser"></displayData>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <template
                v-if="
                  loader.loading &&
                  loader.loader_ref_no == connection.connection_ref_no
                "
              >
                <img src="/assets/img/loader-btn.gif" alt="" />
              </template>
              <template v-else>
                <a
                  href="#"
                  @click.prevent="acceptRequest(connection)"
                  class="btnfill accept"
                  >Accept
                </a>

                <a
                  href="#"
                  @click.prevent="rejectRequest(connection, 'reject')"
                  class="outlinebtn decline"
                  >Decline</a
                >
              </template>
            </div>
          </li>
        </ul>

        <ul class="px-3 ulboderbotm" v-if="grouprequests.length > 0">
          <li v-for="member in filterRequests" :key="member.member_ref_no">
            <div class="d-flex userprofdtl mb-0">
              <div class="profile-lg">
                <img
                  :src="
                    member.invitation_from.fullimage
                      ? member.invitation_from.fullimage
                      : $store.state.defaultImage
                  "
                  alt=""
                />
              </div>
              <div class="create-postpic">
                <h6 v-if="member.invitation_from">
                  {{ member.invitation_from.first_name | capitalize }}&nbsp;
                  {{ member.invitation_from.last_name }}
                </h6>
                <p v-if="member.group" class="pxssmall greytext">
                  Sent you joining request for
                </p>
                <h6 v-if="member.group">
                  {{ member.group.name | capitalize }}
                </h6>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <template
                v-if="
                  loader.loading && loader.loader_ref_no == member.member_ref_no
                "
              >
                <img src="/assets/img/loader-btn.gif" alt="" />
              </template>
              <template v-else>
                <a
                  href="#"
                  @click.prevent="
                    acceptRejectGroupJoinRequest(member, 'accept')
                  "
                  class="btnfill accept"
                  >Accept
                </a>

                <a
                  href="#"
                  @click.prevent="
                    acceptRejectGroupJoinRequest(member, 'reject')
                  "
                  class="outlinebtn decline"
                  >Decline</a
                >
              </template>
            </div>
          </li>
        </ul>

        <router-link
          class="anchor seeall"
          to="/networks"
          v-if="connections.length > 0 || grouprequests.length > 0"
          >See All
        </router-link>
      </div>
      <div class="card sidebarlist pb-0 mb-1 servicesdoct">
        <a
          href="http://healwell24.com/online-doctor-consultation"
          target="_blank"
        >
          <p class="px-3 pt-3 mb-0">
            <strong>Consult a Doctor</strong>
            <span class="yellow-tag mt-1">NEW</span>
          </p>
          <p class="px-3 pt-0 pb-1">
            <span class="smalltext10">On </span>
            <img
              height="16"
              class="ml-1"
              src="/assets/img/healwell24_logo.png"
              alt=""
            />
          </p>
        </a>
        <hr class="mx-2 mb-0 mt-0" />

        <a href="http://healwell24.com/lab-test-at-home" target="_blank">
          <p class="px-3 pt-3 mb-0">
            <strong>Book a Lab Test</strong>
            <span class="yellow-tag mt-1">NEW</span>
          </p>
          <p class="px-3 pt-0 pb-1">
            <span class="smalltext10">On </span>
            <img
              height="16"
              class="ml-1"
              src="/assets/img/healwell24_logo.png"
              alt=""
            />
          </p>
        </a>
        <hr class="mx-2 mb-0 mt-0" />

        <a href="https://plushealthcare.co.in" target="_blank">
          <p class="px-3 pt-3 mb-0">
            <strong>Healthcare Marketplace</strong>
            <span class="yellow-tag mt-1">NEW</span>
          </p>
          <p class="px-3 pt-0 pb-1">
            <span class="smalltext10">On </span>
            <img
              height="15"
              class="ml-1"
              src="/assets/img/plus_healthcare_logo.png"
              alt=""
            />
          </p>
        </a>
        <hr class="mx-2 mb-0 mt-0" />

        <a href="https://plushealthcare.co.in/services" target="_blank">
          <p class="px-3 pt-3 mb-0">
            <strong>Home Care Services</strong>
            <span class="yellow-tag mt-1">NEW</span>
          </p>
          <p class="px-3 pt-0 pb-1 mb-2">
            <span class="smalltext10">On </span>
            <img
              height="15"
              class="ml-1"
              src="/assets/img/plus_healthcare_logo.png"
              alt=""
            />
          </p>
        </a>
      </div>
      <div class="card sidebarlist mb-1">
        <router-link to="/nearbypatients" class="title">
          <h6 class="px-3 py-2">Find nearby Patients</h6>
        </router-link>
      </div>
      <div class="card sidebarlist pb-3 mb-1">
        <h6 class="px-3 py-2">Find nearby Services</h6>
        <ul class="profilelist">
          <li>
            <router-link
              :to="{
                path: '/nearbyservices',
                query: { type: 'near doctors' },
              }"
            >
              <img src="/assets/img/doctor-iconsm.svg" alt="" />Nearby Doctors
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                path: '/nearbyservices',
                query: { type: 'near hospitals' },
              }"
            >
              <img src="/assets/img/hospitalicon.svg" alt="" />Nearby Hospitals
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                path: '/nearbyservices',
                query: { type: 'near clinics' },
              }"
            >
              <img src="/assets/img/clinicicon.svg" alt="" />Nearby Clinics
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                path: '/nearbyservices',
                query: { type: 'near diagnostics' },
              }"
            >
              <img src="/assets/img/diagnosticsicon.svg" alt="" />Nearby
              Diagnostics
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                path: '/nearbyservices',
                query: { type: 'near medical' },
              }"
            >
              <img src="/assets/img/chemisticon.svg" alt="" />Nearby Chemist
            </router-link>
          </li>
        </ul>
      </div>
      <div class="card sidebarlist mb-1" v-if="getUser.user_type == 'doctor'">
        <h6 class="px-3 py-2">Clinic Management</h6>
        <router-link
          class="outlinebtn mx-3 text-center mt-1 mb-3"
          to="/doctor-crm/dashboard"
          >Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../../mixins/doctors";
import displayData from "../common/DisplayData";

export default {
  mixins: [mixin],
  data() {
    return {
      connections: [],
      grouprequests: [],
    };
  },
  computed: {
    filterConnections() {
      return this.connections.slice(0, 1);
    },
    filterRequests() {
      return this.grouprequests.slice(0, 1);
    },
  },
  components: {
    displayData,
  },
  created() {
    this.fetchConnections();
    this.fetchGroupJoinedReceivedRequest(); //user received request for group Join
  },
};
</script>

<style>
</style>