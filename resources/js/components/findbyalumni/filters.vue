<template>
  <div class="px-3 filter mt-3">
    <div class="d-flex">
      <span
        ><img width="20" height="20" alt="" src="assets/img/filter.svg"
      /></span>
      <div class="ml-2">
        <v-select
          label="institute_name"
          v-model="institute_display"
          :options="institute_master_list"
          @input="setSelected"
          placeholder="Select Name of University or College"
        >
        </v-select>
      </div>
    </div>
    <div class="">
      <a
        href="#"
        title="Search"
        class="btnfill btn-rd ml-sm-2 d-table"
        @click.prevent="filterList"
        >Search</a
      >
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { profile } from "../../path";
import requestMixin from "../../mixins/request";
export default {
  props: ["data", "user_data"],
  mixins: [requestMixin],
  data() {
    return {
      institute_display: "",
      institute_master_ref_no: "",
      institute_master_list: [],
    };
  },
  components: {
    vSelect,
  },

  created() {
    this.fetchInstituteMasterList();
  },
  methods: {
    async fetchInstituteMasterList() {
      const data = await this.getRequest(profile.fetchInstituteMasterList);
      this.institute_master_list = data.institute_data;
      if (this.$props.user_data.doctor) {
        this.institute_master_ref_no =
          this.$props.user_data.doctor.institute_master_ref_no;
      }
      this.institute_master_list.map((institute) => {
        if (institute.institute_master_ref_no == this.institute_master_ref_no) {
          this.institute_display = institute.institute_name;
        }
      });
      this.setSelected({
        institute_name: this.institute_display,
        institute_master_ref_no: this.institute_master_ref_no,
      });
    },
    setSelected(value) {
      $(".vs__selected").html(value.institute_name);
      this.institute_display = value.institute_name;
      this.institute_master_ref_no = value.institute_master_ref_no;
    },
    filterList() {
      let params = [];
      if (this.institute_master_ref_no == "") {
        this.$toast.error("Select any institute");
        return;
      }
      if (this.institute_master_ref_no != "") {
        params["institute"] = this.institute_master_ref_no;
        this.$emit("findByAlumniDoctors", params);
      }
    },
  },
};
</script>