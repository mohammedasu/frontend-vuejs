<template>
  <section v-if="sent_invitations.length > 0">
    <div class="card px-3 pt-3 pb-0">
      <div class="d-flex">
        <h4 class="mb-2 mr-3">Invited</h4>
        <a
          v-if="invitation_next_page"
          href="#"
          data-toggle="modal"
          data-target="#inviteconnections"
          class="pt-0 anchor seeall cantnu"
          @click.prevent="openSentInviteModal"
          >See all</a
        >
      </div>
      <div class="membercard-col">
        <div
          class="membercard"
          v-for="invitation in sent_invitations"
          :key="invitation.member_ref_no"
        >
          <div class="d-flex align-items-center">
            <div class="profile-lg">
              <img
                :src="
                  invitation.user.fullimage
                    ? invitation.user.fullimage
                    : $store.state.defaultImage
                "
                alt=""
              />
            </div>
            <div>
              <h6>
                {{ invitation.user.first_name | capitalize }}
                {{ invitation.user.last_name }}
              </h6>
              <p class="pxssmall greytext mb-0" v-if="invitation.user.doctor">
                <strong>{{
                  invitation.user.doctor.specialityname
                    ? invitation.user.doctor.specialityname
                    : ""
                }}</strong>
              </p>
            </div>
          </div>
          <div class="membercardinner">
            <template
              v-if="
                loader.loading &&
                loader.loader_ref_no == invitation.member_ref_no
              "
            >
              <img
                src="/assets/img/loader-btn.gif"
                class="float-right"
                alt=""
              />
            </template>
            <template v-else>
              <a
                class="selectbutton"
                href="#"
                @click.prevent="cancelInvitation(invitation)"
                >Cancel Invitation</a
              >
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixinGroup from "../../mixins/group/group";
export default {
  props: ["sent_invitations", "invitation_next_page"],
  mixins: [mixinGroup],
  methods: {
    openSentInviteModal() {
      this.$emit("openSentInviteModal");
    },
  },
};
</script>

<style>
</style>