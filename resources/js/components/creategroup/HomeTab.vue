<template>
  <div class="row">
    <div class="col-lg-3 asidesec recently-visited">
      <div class="card p-3">
        <h6>About us</h6>
        <p>
          {{ group_data_pass.description.slice(0, 100) }}
        </p>
        <a
          v-if="group_data_pass.description.length > 100"
          @click.prevent="redirectTab('about')"
          href="#"
          class="border-0 anchor seeall"
        >
          Read more</a
        >
      </div>
      <div class="asidesec">
        <div class="sidebarlistfix">
          <div class="card invitations group mb-1">
            <h6 class="px-3 py-2">Members</h6>
            <ul class="px-3 ulboderbotm" v-if="group_data_pass.groupuser">
              <li>
                <div class="d-flex userprofdtl mb-0">
                  <div class="profile-lg">
                    <img
                      :src="
                        group_data_pass.groupuser.fullimage
                          ? group_data_pass.groupuser.fullimage
                          : $store.state.defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <div class="create-postpic">
                    <h6>
                      {{ group_data_pass.groupuser.first_name | capitalize }}
                      {{ group_data_pass.groupuser.last_name }}
                    </h6>
                    <p
                      v-if="group_data_pass.groupuser.doctor"
                      class="pxssmall greytext"
                    >
                      {{
                        group_data_pass.groupuser.doctor.specialityname
                          ? group_data_pass.groupuser.doctor.specialityname
                          : ""
                      }}
                    </p>

                    <div class="tagbtn">Admin</div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="mx-3">
              <hr />
              <div class="d-flex" v-if="groupmembers.length > 0">
                <div
                  class="profile-md"
                  v-for="member in groupmembers"
                  :key="member.member_ref_no"
                >
                  <img
                    :src="
                      member.user.fullimage
                        ? member.user.fullimage
                        : $store.state.defaultImage
                    "
                    alt=""
                  />
                </div>

                <div class="roundbtn" v-if="totalmembers > 5">
                  {{ totalmembers }}+
                </div>
              </div>
              <div
                class="d-flex justify-content-center"
                v-if="totalmembers > 0"
              >
                <a
                  href="#"
                  @click.prevent="redirectTab('member')"
                  class="pt-4 pb-3 anchor seeall"
                  >See all</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-lg-6 middlesec"
      v-if="
        group_data_pass.group_privacy == 'public' ||
        (group_data_pass.group_privacy == 'private' &&
          group_data_pass.member_status == 1) ||
        group_data_pass.user_ref_no == getUser.user_ref_no
      "
    >
      <connectionDiv
        v-if="group_data_pass.group_privacy == 'public'"
        :mutual_connections="mutual_connections"
        :totaldisplay_connections="totaldisplay_connections"
        :mutual_next_page="mutual_next_page"
        @redirectTab="redirectTab"
      ></connectionDiv>
      <createPost
        v-if="
          getUser.user_ref_no == group_data_pass.user_ref_no ||
          group_data_pass.group_post_setting != 'admin'
        "
      ></createPost>

      <post posttxt="group" :ref_no="$route.params.group_ref_no"></post>
    </div>
    <div class="col-lg-3 asidesec pr-sm-0" v-if="othergroups.length > 0">
      <div class="card sidebarlist">
        <h6 class="px-3 pt-3 pb-2">Other Groups</h6>
        <ul class="profilelist">
          <div v-for="group in othergroups" :key="group.group_ref_no">
            <li v-if="group_data_pass.group_ref_no != group.group_ref_no">
              <a :href="'/group/' + group.group_ref_no"
                ><img src="/assets/img/groupsicon.svg" alt="" />
                {{ group.name }}</a
              >
            </li>
          </div>
        </ul>
        <router-link
          class="pt-3 pb-3 anchor seeall"
          v-if="othergroups.length > 0"
          to="/groups"
          >See All
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import connectionDiv from "./ConnectionDiv";
import createPost from "../common/CreatePost";
import post from "../dashboard/Post";
import { groupUrl, groupMemberUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinGroup from "../../mixins/group/group";

export default {
  props: ["group_data_pass"],
  mixins: [mixinRequest, mixinGroup],
  components: {
    createPost,
    post,
    connectionDiv,
  },
  data() {
    return {
      othergroups: [],
      groupmembers: [],
      mutual_connections: [],
      totaldisplay_connections: 0,
      mutual_next_page: null,
      totalmembers: 0,
    };
  },
  created() {
    this.fetchOtherGroupsOnHomeTab();
    this.fetchGroupMembersOnHomeTab(this.group_data_pass);
    this.fetchMutualConnections(this.group_data_pass);
  },
  methods: {
    async fetchOtherGroupsOnHomeTab() {
      const data = await this.getRequest(
        groupUrl.fetchAllGroupBackendUrl + "?limit=5"
      );
      this.othergroups = data.group_data;
    },
    async fetchGroupMembersOnHomeTab(group) {
      const data = await this.getRequest(
        groupMemberUrl.fetchMemberBackendUrl + "/" + group.group_ref_no
      );
      if (data.group_member_data) {
        this.groupmembers = data.group_member_data;
        this.totalmembers = data.total;
      }
    },
    redirectTab(txt) {
      this.$emit("redirectTab", txt);
    },
  },
};
</script>

<style>
</style>