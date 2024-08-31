<template>
  <section class="bluebglight margin-top-16 pt-3 footerfixbg">
    <General
      v-if="$store.state.page.showgeneral && displaycheck"
      :editData="editData"
      @redirecttoAbout="redirecttoAbout"
    ></General>
    <About
      v-if="$store.state.page.showabout && displaycheck"
      :editData="editData"
      @redirecttoAbout="redirecttoAbout"
    ></About>
  </section>
</template>

<script>
import General from "./General";
import About from "./About";
import { fetchSinglePageBackendUrl } from "../../path";
import mixinRequest from "../../mixins/request";
export default {
  name: "createpage",
  mixins: [mixinRequest],
  components: {
    General,
    About,
  },
  data() {
    return {
      editData: {},
      displaycheck: false,
    };
  },
  created() {
    if (this.$route.name == "editpage") {
      if (this.$route.params.page_ref_no) {
        const page_ref_no = this.$route.params.page_ref_no;
        this.$store.commit("page/setEditPage", page_ref_no);
        this.fetchEditPage(page_ref_no);
        //this.$store.dispatch("page/fetchEditPage", page_ref_no);
      }
    } else {
      this.displaycheck = true;
    }
  },
  methods: {
    redirecttoAbout(txt) {
      this.$store.commit("page/setTab", {
        txt: txt,
      });
    },
    async fetchEditPage(page_ref_no) {
      const data = await this.getRequest(
        fetchSinglePageBackendUrl + "/" + page_ref_no
      );
      if (data.page_data) {
        this.editData = data.page_data;
        this.displaycheck = true;
      }
    },
  },
};
</script>

<style>
</style>