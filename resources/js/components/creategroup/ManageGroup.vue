<template>
  <section class="footerfixbg">
    <div class="container">
      <div class="row">
        <div
          class="
            col-lg-12
            middlesec
            invitations
            groupsall
            groupsallthree
            px-sm-0
          "
        >
          <div class="card pb-3">
            <router-link to="/allgroups" class="outlinebtn btn-rd postionrigt"
              >Back</router-link
            >

            <!-- Tab Horizontal sec start -->
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-groups-tab"
                  data-toggle="tab"
                  href="#groups"
                  role="tab"
                  aria-controls="nav-groups"
                  aria-selected="true"
                  @click.prevent="fetchMembers"
                  >Members</a
                >
                <a
                  class="nav-item nav-link"
                  id="nav-yourgroups-tab"
                  data-toggle="tab"
                  href="#yourgroups"
                  role="tab"
                  aria-controls="nav-yourgroups"
                  aria-selected="false"
                  @click.prevent="fetchPendingRequest"
                  >Requested</a
                >
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="groups"
                role="tabpanel"
                aria-labelledby="nav-groups-tab"
              >
                <ul class="px-3 ulboderbotm">
                  <p class="nofound-sm" v-if="members.length < 1">
                    No members found
                  </p>
                  <li v-for="member in members" :key="member.member_ref_no">
                    <template v-if="member.user">
                      <a href="#">
                        <div class="d-flex userprofdtl mb-0">
                          <div class="profile logo">
                            <img
                              :src="
                                member.user.fullimage
                                  ? member.user.fullimage
                                  : $store.state.defaultLogo
                              "
                              alt=""
                            />
                          </div>
                          <div class="create-postpic">
                            <h6>
                              {{ member.user.first_name | capitalize }}
                              {{ member.user.last_name }}
                              <template v-if="member.user.doctor">
                                <span
                                  v-if="member.user.doctor.is_kol"
                                  :class="
                                    member.user.user_type == 'doctor' &&
                                    member.user.doctor.is_kol
                                      ? 'kol'
                                      : ''
                                  "
                                  >KOL</span
                                >
                              </template>
                            </h6>
                            <p class="greytext" v-if="member.user.doctor">
                              {{ member.user.doctor.specialityname }}
                            </p>
                          </div>
                        </div>
                      </a>
                    </template>
                    <div class="d-flex justify-content-center">
                      <template
                        v-if="
                          loader.loading &&
                          loader.loader_ref_no == member.member_ref_no
                        "
                        ><img src="/assets/img/loader-btn.gif" alt=""
                      /></template>
                      <template v-else>
                        <a
                          @click.prevent="removeMember(member, 'remove')"
                          class="btnfill btn-rd"
                          >Remove</a
                        >
                      </template>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                class="tab-pane fade"
                id="yourgroups"
                role="tabpanel"
                aria-labelledby="nav-yourgroups-tab"
              >
                <div class="px-0 middlesec">
                  <ul class="px-3 ulboderbotm">
                    <p class="nofound-sm" v-if="pending_requests.length < 1">
                      No requests found
                    </p>
                    <li
                      v-for="request in pending_requests"
                      :key="request.member_ref_no"
                    >
                      <template v-if="request.user">
                        <a href="#">
                          <div class="d-flex userprofdtl mb-0">
                            <div class="profile logo">
                              <img
                                :src="
                                  request.user.fullimage
                                    ? request.user.fullimage
                                    : $store.state.defaultLogo
                                "
                                alt=""
                              />
                            </div>
                            <div class="create-postpic">
                              <h6>
                                {{ request.user.first_name | capitalize }}
                                {{ request.user.last_name }}
                                <span
                                  v-if="request.user.doctor.is_kol"
                                  :class="
                                    request.user.user_type == 'doctor' &&
                                    request.user.doctor.is_kol
                                      ? 'kol'
                                      : ''
                                  "
                                  >KOL</span
                                >
                              </h6>
                              <p class="greytext" v-if="request.user.doctor">
                                {{ request.user.doctor.specialityname }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </template>
                      <div class="d-flex justify-content-center">
                        <template
                          v-if="
                            loader.loading &&
                            loader.loader_ref_no == request.member_ref_no
                          "
                          ><img src="/assets/img/loader-btn.gif" alt=""
                        /></template>
                        <template v-else>
                          <a
                            @click.prevent="removeMember(request, 'reject')"
                            class="outlinebtn btnfillnone btn-rd"
                            >Ignore</a
                          >
                          <a
                            @click.prevent="acceptRequest(request)"
                            class="btnfill btn-rd"
                            >Accept</a
                          >
                        </template>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Tab Horizontal sec end -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { groupMemberUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";

export default {
  mixins: [mixinRequest, mixinLoader],
  data() {
    return {
      members: [],
      pending_requests: [],
      defaultImage: "/assets/img/logo.png",
    };
  },
  created() {
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      const params = this.$route.params;
      if (params.group_ref_no) {
        const data_members = await this.getRequest(
          groupMemberUrl.fetchMemberBackendUrl + "/" + params.group_ref_no
        );
        this.members = data_members.group_member_data;
      }
    },
    async fetchPendingRequest() {
      const params = this.$route.params;
      if (params.group_ref_no) {
        const data = await this.getRequest(
          groupMemberUrl.fetchPendingRequestedMemberBackendUrl +
            "/" +
            params.group_ref_no
        );
        this.pending_requests = data.group_member_data;
      }
    },
    async acceptRequest(memberdata) {
      const index = this.pending_requests.indexOf(memberdata);
      let formData = new FormData();
      this.showProcessLoader(memberdata.member_ref_no);
      formData.append("member_ref_no", memberdata.member_ref_no);
      const data = await this.postRequest(
        groupMemberUrl.updateMemberBackendUrl,
        formData
      );
      this.hideProcessLoader(memberdata.member_ref_no);
      if (data.group_member_data) {
        this.pending_requests.splice(index, 1);
      }
    },

    async removeMember(memberdata, requesttxt) {
      let formData = new FormData();
      formData.append("_method", "delete");
      this.showProcessLoader(memberdata.member_ref_no);
      const data = await this.postRequest(
        groupMemberUrl.deleteMemberBackendUrl + "/" + memberdata.member_ref_no,
        formData
      );
      this.hideProcessLoader(memberdata.member_ref_no);
      if (data.group_member_data) {
        if (requesttxt == "reject") {
          const index = this.pending_requests.indexOf(memberdata);
          this.pending_requests.splice(index, 1);
        } else {
          const index = this.pending_requests.indexOf(memberdata);
          this.members.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style>
</style>