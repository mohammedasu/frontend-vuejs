<template>
  <section class="footerfixbg">
    <router-view></router-view>
    <loader-comp v-if="$store.state.loaderState"></loader-comp>
    <verifiedComp v-if="$store.state.verifiedModal"></verifiedComp>
    <shareComp v-if="$store.state.shareModal"></shareComp>
  </section>
</template>

<script>
import loaderComp from "./common/PageLoader";
import verifiedComp from "./common/verifiedModal";
import shareComp from "./common/shareModal";

export default {
  components: {
    loaderComp,
    verifiedComp,
    shareComp,
  },
};
</script>
