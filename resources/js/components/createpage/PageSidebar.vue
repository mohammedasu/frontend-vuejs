<template>
  <div class="col-lg-3 asidesec recently-visited pr-sm-0">
    <div class="sidebarlistfix">
      <div class="card sidebarlist pb-2 mb-1">
        <h4 class="px-3 py-3">
          {{ $store.state.page.editPage ? "Update Page" : "Create Page" }}
        </h4>
        <ul class="profilelist">
          <li :class="$store.state.page.showgeneral ? 'active' : ''">
            <a href="#" @click.prevent="redirectBack('general')">
              <img src="/assets/img/calendar.svg" alt="" />General</a
            >
          </li>
          <li :class="$store.state.page.showabout ? 'active' : ''">
            <a href="#">
              <img src="/assets/img/university-b.svg" alt="" />About</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whichtab: "general",
    };
  },
  methods: {
    redirectBack(txt) {
      this.whichtab = txt;
      this.$emit("redirectBack", txt);
    },
  },
};
</script>

<style>
</style>