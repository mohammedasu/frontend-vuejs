<template>
  <header>
    <nav class="navbar navbar-expand-lg navbarcustm container">
      <a href="/dashboard" class="navbar-brand">
        <img class="logo" src="/assets/img/logo.png" alt="" />
      </a>
      <a class="searchicon-mb" href="#search">
        <img src="/assets/img/searchicon.svg" alt="" />
      </a>
      <router-link
        to="/notifications"
        class="nav-link notification notificationmb"
      >
      </router-link>
      <search-box></search-box>
      <button
        type="button"
        id="nav-icon4"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <li class="mb-block card pt-3">
            <div class="profile mb-1 mt-0">
              <a href="#">
                <img
                  :src="
                    getUser.fullimage
                      ? getUser.fullimage
                      : $store.state.defaultImage
                  "
                  alt=""
                />
              </a>
            </div>
            <div class="text-center">
              <h6>{{ getUser.first_name + " " + getUser.last_name }}</h6>
              <p v-if="getUser.doctor">
                {{ getUser.doctor.specialityname }}
              </p>
              <p>
                <router-link class="anchor" to="/profile"
                  ><strong>View Profile </strong
                  ><img src="/assets/img/right-arrow-blue.svg" alt=""
                /></router-link>
              </p>
              <p class="connections">
                <router-link to="/connections"
                  ><strong>{{ getUser.connection_count }}</strong>
                  Connections</router-link
                >
              </p>
            </div>
          </li>
          <li class="mb-none">
            <a
              href="/dashboard"
              class="nav-link home"
              :class="$route.name === 'dashboard' ? 'active' : ''"
            >
              <p>Home</p>
              <!--Desktop-->
            </a>
          </li>
          <li class="mb-none">
            <router-link
              to="/docsstudio"
              class="nav-link docsoriginals"
              :class="$route.name === 'docsstudio' ? 'active' : ''"
            >
              <p>Docs Studio</p>
            </router-link>
          </li>
          <li class="mb-none">
            <router-link
              to="/networks"
              class="nav-link network"
              :class="$route.name === 'networks' ? 'active' : ''"
            >
              <p>Network</p>
            </router-link>
          </li>

          <li class="mb-none">
            <router-link
              to="/messages"
              class="nav-link messages"
              :class="$route.name === 'messages' ? 'active' : ''"
            >
              <p>Messages</p>
            </router-link>
          </li>

          <li class="mb-none">
            <router-link
              to="/notifications"
              class="nav-link notification"
              :class="$route.name === 'notifications' ? 'active' : ''"
            >
              <p>Notifications</p>
            </router-link>
          </li>
          <li class="mb-block">
            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#nearbyservices"
            >
              Find nearby Services
            </button>
            <div id="nearbyservices" class="collapse">
              <ul class="profilelist card">
                <li>
                  <router-link
                    :to="{
                      path: '/nearbyservices',
                      query: { type: 'near doctors' },
                    }"
                  >
                    <img src="assets/img/doctor-iconsm.svg" />Nearby Doctors
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/nearbyservices',
                      query: { type: 'near hospitals' },
                    }"
                  >
                    <img src="assets/img/hospitalicon.svg" />Nearby Hospitals
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/nearbyservices',
                      query: { type: 'near clinics' },
                    }"
                  >
                    <img src="assets/img/clinicicon.svg" />Nearby Clinics
                  </router-link>
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/nearbyservices',
                      query: { type: 'near diagnostics' },
                    }"
                  >
                    <img src="assets/img/diagnosticsicon.svg" />Nearby
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
                    <img src="assets/img/chemisticon.svg" />Nearby Chemist
                  </router-link>
                </li>
              </ul>
            </div>
            <router-link class="sidebarlistbtn title" to="/nearbypatients"
              >Find nearby Patients</router-link
            >
            <router-link
              to="/findbyalumni"
              class="sidebarlistbtn title"
              v-if="getUser.user_type == 'doctor'"
            >
              Find your Alumni
            </router-link>

            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#learning"
            >
              Learning
            </button>
            <div id="learning" class="collapse">
              <ul class="profilelist mb-block card">
                <template v-if="getUser.user_type != 'patient'">
                  <li>
                    <h6 class="px-3 pt-2 mb-0 pb-0 mb-block card"></h6>
                  </li>
                  <li>
                    <router-link to="/journals"
                      ><img
                        src="assets/img/journalsicon.svg"
                        alt=""
                      />Journals</router-link
                    >
                  </li>
                </template>
                <template v-if="getUser.user_type == 'doctor'">
                  <li>
                    <router-link to="/webinar"
                      ><img src="assets/img/webinaricon.svg" alt="" />Live
                      Webinars</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/comingsoon"
                      ><img
                        src="assets/img/qnaicon.svg"
                        alt=""
                      />Q&A</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/comingsoon"
                      ><img src="assets/img/kolicon.svg" alt="" />KOL
                      Opinions</router-link
                    >
                  </li>
                </template>
                <li>
                  <router-link to="/events">
                    <img src="/assets/img/calender.svg" alt="" />Events
                  </router-link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#Pages"
            >
              Pages
            </button>
            <div id="Pages" class="collapse">
              <router-link
                v-if="pages.length < 1"
                class="outlinebtn mx-3 text-center mt-1 mb-3"
                to="/createpage"
                >Create Page +
              </router-link>
              <span class="nofound-sm" v-if="pages.length < 1"
                >No result found
              </span>
              <ul class="profilelist card">
                <li v-for="page in pages" :key="page.page_ref_no">
                  <router-link :to="'/page/' + page.page_ref_no"
                    ><img src="/assets/img/groupsicon.svg" alt="" />
                    {{ page.name }}</router-link
                  >
                </li>
                <li v-if="pages.length > 0">
                  <router-link class="anchor seeall" to="/allpages"
                    >See All
                  </router-link>
                </li>
              </ul>
            </div>

            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#Groups"
            >
              Groups
            </button>
            <div id="Groups" class="collapse">
              <router-link
                v-if="groups.length < 1"
                class="outlinebtn mx-3 text-center mt-1 mb-3"
                to="/creategroup"
                >Create Group +
              </router-link>
              <span class="nofound-sm" v-if="groups.length < 1"
                >No result found
              </span>
              <ul class="profilelist card">
                <li v-for="group in groups" :key="group.group_ref_no">
                  <router-link :to="'/group/' + group.group_ref_no"
                    ><img src="/assets/img/groupsicon.svg" alt="" />
                    {{ group.name }}</router-link
                  >
                </li>

                <li>
                  <router-link
                    class="anchor seeall"
                    v-if="groups.length > 0"
                    to="/groups"
                    >See All
                  </router-link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#othersservices"
            >
              Other Services
            </button>
            <div id="othersservices" class="collapse" style="">
              <div class="card sidebarlist pb-0 mb-1 servicesdoct">
                <a
                  href="http://healwell24.com/online-doctor-consultation"
                  target="_blank"
                >
                  <p class="px-3 pt-2 mb-0">
                    <strong>Consult a Doctor</strong>
                    <span class="yellow-tag mt-1">NEW</span>
                  </p>
                  <p class="px-3 pt-0 pb-1 mb-2">
                    <span class="smalltext10">On </span>
                    <img
                      height="16"
                      src="/assets/img/healwell24_logo.png"
                      alt=""
                      class="ml-1"
                    />
                  </p>
                </a>

                <hr class="mx-2 mb-0 mt-0" />
                <a
                  href="http://healwell24.com/lab-test-at-home"
                  target="_blank"
                >
                  <p class="px-3 pt-2 mb-0">
                    <strong>Book a Lab Test</strong>
                    <span class="yellow-tag mt-1">NEW</span>
                  </p>
                  <p class="px-3 pt-0 pb-1 mb-2">
                    <span class="smalltext10">On </span>
                    <img
                      height="16"
                      src="/assets/img/healwell24_logo.png"
                      alt=""
                      class="ml-1"
                    />
                  </p>
                </a>

                <hr class="mx-2 mb-0 mt-0" />
                <a href="https://plushealthcare.co.in" target="_blank">
                  <p class="px-3 pt-2 mb-0">
                    <strong>Healthcare Marketplace</strong>
                    <span class="yellow-tag mt-1">NEW</span>
                  </p>
                  <p class="px-3 pt-0 pb-1 mb-2">
                    <span class="smalltext10">On </span>
                    <img
                      height="15"
                      src="/assets/img/plus_healthcare_logo.png"
                      alt=""
                      class="ml-1"
                    />
                  </p>
                </a>

                <hr class="mx-2 mb-0 mt-0" />
                <a href="https://plushealthcare.co.in/services" target="_blank">
                  <p class="px-3 pt-2 mb-0">
                    <strong>Home Care Services</strong>
                    <span class="yellow-tag mt-1">NEW</span>
                  </p>
                  <p class="px-3 pt-0 pb-1 mb-2">
                    <span class="smalltext10">On </span>
                    <img
                      height="15"
                      src="/assets/img/plus_healthcare_logo.png"
                      alt=""
                      class="ml-1"
                    />
                  </p>
                </a>
              </div>
            </div>
            <button
              v-if="getUser.user_type == 'doctor'"
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#clinicmanagement"
            >
              Clinic Management
            </button>
            <div id="clinicmanagement" class="collapse">
              <ul class="profilelist mb-block card">
                <li>
                  <router-link to="/doctor-crm/dashboard"
                    ><img src="/assets/img/groupsicon.svg" />Dashboard
                  </router-link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="sidebarlistbtn collapsed"
              data-toggle="collapse"
              data-target="#myaccount"
            >
              My Account
            </button>
            <div id="myaccount" class="collapse">
              <ul class="profilelist card">
                <li>
                  <router-link to="/basicdetails">
                    <img alt="" src="/assets/img/user.svg" />View
                    profile</router-link
                  >
                </li>
                <li>
                  <a href="#" id="logout_mobile">
                    <img alt="" src="/assets/img/logout.svg" />Logout</a
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="b-sidebar-backdrop"></div>
      </div>
      <div class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <div class="profile-sm">
              <img
                :src="
                  getUser.fullimage
                    ? getUser.fullimage
                    : $store.state.defaultImage
                "
                alt=""
              />
            </div>
          </span>
          <span>{{ getUser.first_name + " " + getUser.last_name }}</span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/profile" class="dropdown-item">
            <img width="22" height="22" src="/assets/img/user.svg" alt="" />View
            profile
          </router-link>
          <a class="dropdown-item" href="#" id="logout">
            <img
              width="22"
              height="22"
              src="/assets/img/logout.svg"
              alt=""
            />Logout</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { fetchAllPageBackendUrl, groupUrl } from "../../path";
import searchBox from "./searchBox.vue";
import mixinRequest from "../../mixins/request";

export default {
  mixins: [mixinRequest],
  components: { searchBox },
  data() {
    return {
      pages: [],
      groups: [],
    };
  },
  created() {
    //await this.$store.dispatch("getUser");
    document.addEventListener("scroll", this.sideBarScroll);
    //if(this.$store.state.is_registration_completed == 1) {
    this.fetchPages();
    this.fetchGroups();
    //}
  },
  methods: {
    async fetchPages() {
      const data = await this.getRequest(fetchAllPageBackendUrl + "?limit=3");
      this.pages = data.page_data;
    },
    async fetchGroups() {
      const data = await this.getRequest(
        groupUrl.fetchAllGroupBackendUrl + "?limit=3"
      );
      this.groups = data.group_data;
    },
  },
};
</script>

<style>
</style>