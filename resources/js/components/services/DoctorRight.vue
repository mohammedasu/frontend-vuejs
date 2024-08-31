<template>
  <div class="col-lg-9 middlesec doctorslist">
    <doctorslist :doctors="doctors" @postConnect="postConnect"></doctorslist>
  </div>
</template>

<script>
import mixin from "../../mixins/doctors";
export default {
  mixins: [mixin],
  created() {
    this.fetchOnlineConsultationDoctors();
  },
};
</script>

<style>
</style>