<template>
  <div class="card p-3" v-if="mutual_connections.length > 0">
    <p class="mb-2">
      <strong>{{ totaldisplay_connections }} connections in this group</strong>
    </p>
    <div class="d-flex mb-2 mt-1">
      <div
        class="profile-md"
        v-for="member in mutual_connections.slice(0, 8)"
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
      <div class="roundbtn" v-if="mutual_next_page">
        {{ totaldisplay_connections }}+
      </div>
    </div>
    <div class="d-flex flex-wrap mt-1">
      <span
        class="pxssmall greytext"
        v-for="member in mutual_connections.slice(0, 3)"
        :key="member.member_ref_no"
      >
        {{ member.user.first_name ? member.user.first_name : "" }},
      </span>
      <details v-if="mutual_next_page">
        <summary>
          <a
            href="#"
            class="py-2 border-0"
            @click.prevent="redirectTab('member')"
          >
            see all
          </a>
        </summary>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  props: ["totaldisplay_connections", "mutual_connections", "mutual_next_page"],
  methods: {
    redirectTab(txt) {
      this.$emit("redirectTab", txt);
    },
  },
};
</script>

<style>
</style>