<template>
  <div class="col-lg-3 articlesec recently-visited pr-sm-0">
    <div class="sidebarlistfix" id="sidebar_left">
      <div class="scrollbarpan srlg">
        <div class="card mb-1">
          <div class="profile-xl mb-1">
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
            <router-link
              v-if="getUser.doctor"
              :to="'/viewprofile/' + getUser.user_ref_no"
            >
              <h6>
                {{ getUser.first_name | capitalize }} {{ getUser.last_name }}
                <template v-if="getUser.doctor">
                  <span
                    v-if="getUser.doctor.is_kol"
                    :class="
                      getUser.user_type == 'doctor' && getUser.doctor.is_kol
                        ? 'kol'
                        : ''
                    "
                    >KOL</span
                  >
                </template>
              </h6>
            </router-link>

            <h6 v-if="!getUser.doctor">
              {{ getUser.first_name | capitalize }} {{ getUser.last_name }}
            </h6>
            <p
              class="pxssmall greytext letter-spacing mb-1"
              v-if="getUser.doctor"
            >
              <strong> {{ getUser.doctor.qualification | capitalize }}</strong>
            </p>
            <p class="mb-2" v-if="getUser.doctor">
              {{ getUser.doctor.specialityname }}
            </p>

            <p class="connections">
              <router-link to="/connections">
                <strong>{{ getUser.connection_count }}</strong>
                Connections</router-link
              >
            </p>
          </div>
        </div>
        <template
          v-if="
            $route.name != 'pagelist' &&
            $route.name != 'grouplist' &&
            $route.name != 'usernotification'
          "
        >
          <div class="card sidebarlist pb-3 mb-1">
            <h6 class="px-3 py-2">Learning</h6>
            <ul class="profilelist">
              <template v-if="getUser.user_type != 'patient'">
                <li>
                  <router-link to="/journals">
                    <img src="/assets/img/journalsicon.svg" alt="" />Journals
                  </router-link>
                </li>
              </template>
              <template v-if="getUser.user_type == 'doctor'">
                <li>
                  <router-link to="/webinar">
                    <img src="/assets/img/webinaricon.svg" alt="" />Live
                    Webinars
                  </router-link>
                </li>
                <li>
                  <router-link to="/comingsoon">
                    <img src="/assets/img/qnaicon.svg" alt="" />Q&A
                  </router-link>
                </li>
                <li>
                  <router-link to="/comingsoon">
                    <img src="/assets/img/kolicon.svg" alt="" />KOL Opinions
                  </router-link>
                </li>
              </template>
              <li>
                <router-link to="/events">
                  <img src="/assets/img/calender.svg" alt="" />Events
                </router-link>
              </li>
            </ul>
          </div>
          <div
            class="card sidebarlist mb-1"
            v-if="getUser.user_type == 'doctor'"
          >
            <router-link to="/findbyalumni" class="title">
              <h6 class="px-3 py-2">Find your Alumni</h6>
            </router-link>
          </div>
          <div class="card invitations sidebarlist mb-1">
            <h6 class="px-3 py-2">Pages</h6>
            <router-link
              v-if="pages.length < 1"
              class="outlinebtn mx-3 text-center mt-1 mb-3"
              to="/createpage"
              >Create Page +
            </router-link>
            <span class="nofound-sm" v-if="pages.length < 1"
              >No result found</span
            >
            <ul class="profilelist" v-if="pages.length > 0">
              <li v-for="page in pages" :key="page.page_ref_no">
                <router-link :to="'/page/' + page.page_ref_no"
                  ><img src="/assets/img/groupsicon.svg" alt="" />
                  {{ page.name }}</router-link
                >
              </li>
              <router-link
                class="anchor seeall"
                v-if="pages.length > 0"
                to="/allpages"
                >See All
              </router-link>
            </ul>
          </div>
          <div class="card invitations sidebarlist mb-1">
            <h6 class="px-3 py-2">Groups</h6>
            <router-link
              v-if="groups.length < 1"
              class="outlinebtn mx-3 text-center mt-1 mb-3"
              to="/creategroup"
              >Create Group +
            </router-link>
            <span class="nofound-sm" v-if="groups.length < 1"
              >No result found
            </span>
            <ul class="profilelist" v-if="groups.length > 0">
              <li v-for="group in groups" :key="group.group_ref_no">
                <router-link :to="'/group/' + group.group_ref_no"
                  ><img src="/assets/img/groupsicon.svg" alt="" />
                  {{ group.name }}</router-link
                >
              </li>
              <router-link
                class="anchor seeall"
                v-if="groups.length > 0"
                to="/groups"
                >See All
              </router-link>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllPageBackendUrl, groupUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
import mixinsDashboard from "../../mixins/dashboard";
export default {
  mixins: [mixinsDashboard, mixinRequest, mixinLoader],
  data() {
    return {
      pages: [],
      groups: [],
    };
  },
  created() {
    this.loadSideBarJqueryCode();
    this.fetchPages();
    this.fetchGroups();
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