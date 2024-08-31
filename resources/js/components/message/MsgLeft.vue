<template>
  <div class="col-lg-4 asidesec messaging">
    <div class="card p-3">
      <h6>Messaging</h6>
      <div class="scrollbarpan">
        <connections></connections>
      </div>
    </div>
  </div>
</template>

<script>
import Connections from "./connections";
import mixinRequest from "../../mixins/request";
import { fetchContactsBackendUrl } from "../../path";
export default {
  mixins: [mixinRequest],
  components: {
    Connections,
  },
  methods: {
    async callConnection() {
      const data = await this.getRequest(fetchContactsBackendUrl);
      this.$store.commit("message/fetchContacts", data.connection_data);
    },
  },
  created() {
    this.callConnection();
  },
};
</script>

<style>
</style>