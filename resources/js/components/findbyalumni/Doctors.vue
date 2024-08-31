<template>
  <div class="container">
    <div class="row">
      <DashLeft></DashLeft>
      <DoctorRight></DoctorRight>
    </div>
  </div>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import DoctorRight from "./DoctorRight";
export default {
  components: {
    DashLeft,
    DoctorRight,
  },
};
</script>

<style>
</style>