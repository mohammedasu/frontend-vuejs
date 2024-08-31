<template>
  <section v-if="groupmembers.length > 0">
    <hr />
    <h6 class="mb-2 d-flex yourconnections">
      <span>All members </span>
      <span v-if="group_member_next_page"
        ><a href="" class="selectbutton" @click.prevent="openMemberModal">
          See all</a
        ></span
      >
    </h6>
    <div class="membercard-col">
      <div
        class="membercard"
        v-for="member in groupmembers"
        :key="member.member_ref_no"
      >
        <div class="d-flex align-items-center">
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
          <div v-if="member.user">
            <h6>
              {{ member.user.first_name | capitalize }}
              {{ member.user.last_name }}
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
  props: ["group_data_pass", "groupmembers", "group_member_next_page"],
  methods: {
    openMemberModal() {
      this.$emit("openMemberModal");
    },
  },
};
</script>

<style>
</style>