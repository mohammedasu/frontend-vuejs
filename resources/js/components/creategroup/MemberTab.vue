<template>
  <section>
    <div class="row">
      <div class="col-lg-12 middlesec px-sm-0">
        <JoiningRequest
          :joining_requests="joining_requests"
          :group_data_pass="group_data_pass"
          :request_next_page="request_next_page"
          @openJoinRequestModal="openJoinRequestModal"
          v-if="
            getUser.user_ref_no == group_data_pass.user_ref_no &&
            group_data_pass.group_privacy == 'private'
          "
        ></JoiningRequest>
        <InvitationSent
          :sent_invitations="sent_invitations"
          :group_data_pass="group_data_pass"
          :invitation_next_page="invitation_next_page"
          @openSentInviteModal="openSentInviteModal"
        ></InvitationSent>
        <div class="card px-3 pt-3 pb-0">
          <h4 class="mb-2">Members</h4>
          <p class="pxxssmall"><strong>Admin</strong></p>

          <div class="membercard-col" v-if="group_data_pass.groupuser">
            <div class="membercard">
              <div class="d-flex align-items-center">
                <div class="profile-lg">
                  <img
                    :src="
                      group_data_pass.groupuser.fullimage
                        ? group_data_pass.groupuser.fullimage
                        : $store.state.imageShow
                    "
                    alt=""
                  />
                </div>
                <div>
                  <h6>
                    {{ group_data_pass.groupuser.first_name | capitalize }}
                    {{ group_data_pass.groupuser.last_name }}
                  </h6>
                  <p
                    v-if="group_data_pass.groupuser.doctor"
                    class="pxssmall greytext mb-0"
                  >
                    {{
                      group_data_pass.groupuser.doctor.specialityname
                        ? group_data_pass.groupuser.doctor.specialityname
                        : ""
                    }}
                  </p>
                </div>
              </div>
              <!-- <div v-if="getUser.user_ref_no != group_data_pass.user_ref_no">
                <a class="selectbutton" href=""
                  ><img src="/assets/img/commenticon-black.svg" alt="" />
                  Message</a
                >
              </div> -->
            </div>
          </div>
          <MutualConnections
            :group_data_pass="group_data_pass"
            :mutual_connections="mutual_connections"
            :mutual_next_page="mutual_next_page"
            @openConnectionModal="openConnectionModal"
          ></MutualConnections>
          <AllMembers
            :group_data_pass="group_data_pass"
            :groupmembers="groupmembers"
            :group_member_next_page="group_member_next_page"
            @openMemberModal="openMemberModal"
          ></AllMembers>
        </div>
      </div>
    </div>
    <MemberModal
      v-if="show_member_modal"
      @closeModal="closeModal"
      :group_data_pass="group_data_pass"
    ></MemberModal>
    <InvitationSentModal
      v-if="show_invitesent_modal"
      @closeModal="closeModal"
      :group_data_pass="group_data_pass"
    ></InvitationSentModal>
    <JoiningRequestModal
      v-if="show_joining_request"
      @closeModal="closeModal"
      :group_data_pass="group_data_pass"
    ></JoiningRequestModal>
    <MutualConnectionModal
      v-if="show_connection_modal"
      @closeModal="closeModal"
      :group_data_pass="group_data_pass"
    ></MutualConnectionModal>
  </section>
</template>

<script>
import mixinGroup from "../../mixins/group/group";
import AllMembers from "./AllMembers";
import MutualConnections from "./MutualConnections";
import MutualConnectionModal from "./MutualConnectionModal";
import MemberModal from "./MemberModal";
import JoiningRequest from "./JoiningRequest";
import InvitationSent from "./InvitationSent";
import InvitationSentModal from "./InvitationSentModal";
import JoiningRequestModal from "./JoiningRequestModal";

export default {
  props: ["group_data_pass"],
  mixins: [mixinGroup],
  data() {
    return {
      groupmembers: [],
      show_member_modal: false,
      show_invitesent_modal: false,
      show_joining_request: false,
      show_connection_modal: false,
      group_member_next_page: null,
      sent_invitations: [],
      joining_requests: [],
      mutual_connections: [],
      invitation_next_page: null,
      request_next_page: null,
      mutual_next_page: null,
      memberTabContent: false,
    };
  },
  created() {
    this.fetchGroupMembers(this.group_data_pass);
    this.fetchInvitationSent(this.group_data_pass);
    this.fetchJoiningRequest(this.group_data_pass);
    this.fetchMutualConnections(this.group_data_pass);
  },
  components: {
    AllMembers,
    MemberModal,
    MutualConnections,
    MutualConnectionModal,
    JoiningRequest,
    InvitationSent,
    InvitationSentModal,
    JoiningRequestModal,
  },
  methods: {
    closeModal() {
      this.show_member_modal = false;
      this.show_invitesent_modal = false;
      this.show_joining_request = false;
      this.show_connection_modal = false;
      this.fetchGroupMembers(this.group_data_pass);
      this.fetchInvitationSent(this.group_data_pass);
      this.fetchJoiningRequest(this.group_data_pass);
      this.fetchMutualConnections(this.group_data_pass);
    },
    openMemberModal() {
      this.show_member_modal = true;
    },
    openSentInviteModal() {
      this.show_invitesent_modal = true;
    },
    openJoinRequestModal() {
      this.show_joining_request = true;
    },
    openConnectionModal() {
      this.show_connection_modal = true;
    },
  },
};
</script>

<style>
</style>