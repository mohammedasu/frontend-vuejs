<template>
  <section>
    <div class="card px-3 pt-3 pb-0" v-if="joining_requests.length > 0">
      <div class="d-flex">
        <h4 class="mb-2 mr-3">Joining Requests</h4>
        <a
          v-if="request_next_page"
          href="#"
          data-toggle="modal"
          data-target="#requestconnections"
          class="pt-0 anchor seeall cantnu"
          @click.prevent="openJoinRequestModal"
          >See all</a
        >
      </div>
      <div class="membercard-col">
        <div
          class="membercard"
          v-for="request in joining_requests"
          :key="request.member_ref_no"
        >
          <div class="d-flex align-items-center">
            <div class="profile-lg">
              <img
                :src="
                  request.user.fullimage
                    ? request.user.fullimage
                    : $store.state.defaultImage
                "
                alt=""
              />
            </div>
            <div>
              <h6>
                {{ request.user.first_name | capitalize }}
                {{ request.user.last_name }}
              </h6>
              <p class="pxssmall greytext mb-0" v-if="request.user.doctor">
                <strong>{{
                  request.user.doctor.specialityname
                    ? request.user.doctor.specialityname
                    : ""
                }}</strong>
              </p>
            </div>
          </div>
          <div class="membercardinner">
            <template
              v-if="
                loader.loading && loader.loader_ref_no == request.member_ref_no
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
                @click.prevent="acceptRequest(request)"
                >Approve Request</a
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
  props: ["joining_requests", "request_next_page"],
  mixins: [mixinGroup],
  methods: {
    openJoinRequestModal() {
      this.$emit("openJoinRequestModal");
    },
  },
};
</script>

<style>
</style>