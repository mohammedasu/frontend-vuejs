<template>
  <div class="col-lg-9 middlesec doctorslist">
    <doctorslist
      :doctor_data="doctor_data"
      @postConnect="postConnect"
      @findByAlumniDoctors="findByAlumniDoctors"
      @loadData="loadMoreDoctors"
    ></doctorslist>
  </div>
</template>

<script>
import mixin from "../../mixins/doctors";

export default {
  mixins: [mixin],
  async created() {
    await this.findByAlumniDoctors();
  },
};
</script>
