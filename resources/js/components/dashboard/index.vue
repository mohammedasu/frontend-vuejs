<template>
  <div class="container">
    <div class="row">
      <DashLeft />
      <DashMiddle />
      <DashRight></DashRight>
    </div>
  </div>
</template>

<script>
import DashLeft from "./DashLeft";
import DashMiddle from "./DashMiddle";
import DashRight from "./DashRight";
import mixinTracking from "../../mixins/tracking";

export default {
  name: "dashboard",
  mixins: [mixinTracking],
  components: {
    DashLeft,
    DashMiddle,
    DashRight,
  },
};
</script>

<style>
</style>