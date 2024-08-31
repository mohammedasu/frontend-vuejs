<template>
  <section v-if="mutual_connections.length > 0">
    <hr />
    <h6 class="mb-2 d-flex yourconnections">
      <span>Your connections </span>
      <span v-if="mutual_next_page"
        ><a href="#" class="selectbutton" @click.prevent="openConnectionModal">
          See all</a
        ></span
      >
    </h6>

    <div class="membercard-col">
      <div
        class="membercard"
        v-for="member in mutual_connections"
        :key="member.member_ref_no"
      >
        <div class="d-flex align-items-center" v-if="member.user">
          <div class="profile-lg">
            <img
              :src="
                member.user.fullimage
                  ? member.user.fullimage
                  : $store.state.defaultImage
              "
              alt=""
            />
          </div>
          <div>
            <h6>
              {{ member.user.first_name | capitalize }}
              {{ member.user.last_name | capitalize }}
            </h6>
            <p class="pxssmall greytext mb-0" v-if="member.user.doctor">
              <strong>{{ member.user.doctor.specialityname }}</strong>
            </p>
          </div>
        </div>
        <!-- <div>
          <a class="selectbutton" href=""
            ><img src="assets/img/commenticon-black.svg" /> Message</a
          >
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["mutual_connections", "mutual_next_page", "group_data_pass"],
  methods: {
    openConnectionModal() {
      this.$emit("openConnectionModal");
    },
  },
};
</script>

<style>
</style>