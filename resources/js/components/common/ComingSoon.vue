<template>
  <div class="container">
    <div class="row">
      <DashLeft />
      <div class="col-lg-6 middlesec kolopinions">
        <div class="card">
          <div class="text-center py-5">
            <img src="/assets/img/learning-comingsoon.png" alt="" />
            <h2 class="bluetext pt-4 mt-2">Coming Soon!</h2>
            <p class="greytext mt-2">
              We are currently working on this feature and will launch soon!
            </p>
          </div>
        </div>
      </div>
      <DashRight></DashRight>
    </div>
  </div>
</template>


<script>
import DashLeft from "../dashboard/DashLeft";
import DashRight from "../dashboard/DashRight";

export default {
  name: "comingsoon",
  components: {
    DashLeft,
    DashRight,
  },
};
</script>

<style>
</style>