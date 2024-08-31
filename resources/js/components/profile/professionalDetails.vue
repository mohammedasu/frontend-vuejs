<template>
  <div
    class="tab-pane fade"
    id="professionaldetails"
    role="tabpanel"
    aria-labelledby="nav-professionaldetails-tab"
  >
    <form
      class="form"
      id="professional_details_form"
      @submit.prevent="saveProfessionalDetails"
    >
      <label class="labelstyle pt-2">Qualification <span>*</span> </label>
      <input
        type="text"
        :value="professional_details.qualification"
        ref="qualification"
        maxlength="100"
        placeholder="Enter your qualification"
        required
      />
      <label class="labelstyle pt-2"
        >Name of University or College<span>*</span></label
      >
      <input
        type="checkbox"
        class="mb-2"
        name="other"
        id="other"
        :checked="
          other_institute_ref_no ==
          (institute_master_ref_no != ''
            ? institute_master_ref_no
            : professional_details.institute_master_ref_no)
            ? 'checked'
            : ''
        "
        @input="selectOther(other_institute_ref_no, $event)"
      />
      Other

      <v-select
        label="institute_name"
        :options="institute_master_list"
        :value="professional_details.institute_name"
        @input="setSelected"
        placeholder="Select Name of University or College"
      >
      </v-select>
      <input
        type="text"
        ref="other_institute_name"
        v-if="
          other_institute_ref_no ==
            (institute_master_ref_no != ''
              ? institute_master_ref_no
              : professional_details.institute_master_ref_no) && selected_other
        "
        :value="professional_details.other_institute_name"
        name="other_institute_name"
        id="other_institute_name"
        placeholder="Enter your institute name"
      />
      <input
        type="hidden"
        ref="institute_master_ref_no"
        :value="
          institute_master_ref_no != ''
            ? institute_master_ref_no
            : professional_details.institute_master_ref_no
        "
      />
      <input
        type="hidden"
        ref="institute_name"
        :value="professional_details.institute_name"
      />
      <label class="labelstyle pt-2">Experience <span>*</span> </label>
      <input
        type="text"
        :value="professional_details.experience"
        ref="experience"
        maxlength="100"
        placeholder="Enter your experience"
        required
      />
      <label class="labelstyle pt-2">Place of Work<span>*</span></label>
      <input
        type="text"
        :value="professional_details.place_of_work"
        ref="place_of_work"
        maxlength="100"
        placeholder="Enter Hospital, Clinic or Institution Name"
        required
      />

      <label class="labelstyle pt-2">Registration Number<span>*</span></label>
      <input
        type="text"
        :value="professional_details.registration_number"
        ref="registration_number"
        maxlength="100"
        placeholder="Enter your registration number"
        required
      />

      <button type="submit" class="loaderbtn btnfill btnfull mt-3">Save</button>
    </form>
    <!--- Form end --->
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  props: ["professional_details", "institute_master_list"],
  data() {
    return {
      institute_master_ref_no: "",
      other_institute_ref_no: "OTH45948759799436746",
      selected_other: true,
    };
  },
  components: {
    vSelect,
  },
  created() {
    this.fetchProfessionalDetails();
  },
  methods: {
    setSelected(value) {
      $(".vs__selected").html(value.institute_name);
      this.institute_master_ref_no = value.institute_master_ref_no;
      if (value.institute_master_ref_no == this.other_institute_ref_no) {
        this.selected_other = true;
      } else {
        this.selected_other = false;
      }
    },
    saveProfessionalDetails() {
      this.$emit(
        "saveProfessionalDetails",
        this.$refs,
        this.institute_master_ref_no
      );
    },
    fetchProfessionalDetails() {
      this.$emit("fetchProfessionalDetails");
    },
    selectOther(value, event) {
      if (event.target.checked) {
        this.setSelected({
          institute_name: "Other",
          institute_master_ref_no: this.other_institute_ref_no,
        });
      } else {
        this.setSelected({
          institute_name: this.$refs.institute_name.value,
          institute_master_ref_no: "",
        });
      }
    },
  },
};
</script>
  