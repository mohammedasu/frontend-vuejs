<template>
  <section class="footerfixbg">
    <div class="container">
      <div class="row">
        <DashLeft></DashLeft>
        <DoctorRight></DoctorRight>
        <loader-comp v-if="$store.state.loaderState"></loader-comp>
      </div>
    </div>
  </section>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import DoctorRight from "./DoctorRight";
import loaderComp from "../common/PageLoader";

export default {
  components: {
    DashLeft,
    DoctorRight,
    loaderComp,
  },
};
</script>

<style>
</style>