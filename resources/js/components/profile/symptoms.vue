<template>
  <div
    class="tab-pane fade"
    id="yoursymptoms"
    role="tabpanel"
    aria-labelledby="nav-yoursymptoms-tab"
  >
    <form class="specialitypage form" id="symptom_speciality_form">
      <label class="lablecheckbox"
        ><input
          type="checkbox"
          id="chk_select"
          name="chk_select"
          value="symptoms"
          class="symptoms_checkbox"
          @change="showhideForm($event)"
        />
        <span class="chkboxspan"></span> I know the symptoms
      </label>
      <label class="lablecheckbox"
        ><input
          type="checkbox"
          id="chk_select"
          name="chk_select"
          value="speciality"
          class="speciality_checkbox"
          @change="showhideForm($event)"
        />
        <span class="chkboxspan"></span> I know the speciality
      </label>
      <div id="div1" style="display: none">
        <h4 class="pb-4 text-center mt-4">Select Symptoms</h4>
        <div class="d-flex flex-wrap">
          <div class="scrollbarpan">
            <div
              class="checkmain"
              v-for="(symptom, index) in symptom_master_list"
              :key="index"
            >
              <input
                type="checkbox"
                name="chk_symptoms"
                class="radioinput"
                :id="symptom.symptom_master_ref_no"
                :value="symptom.symptom_master_ref_no"
                @change="onChange($event)"
              />
              <label :for="symptom.symptom_master_ref_no">
                <img
                  :src="symptom.icon ? symptom.icon : $store.state.defaultImage"
                  alt=""
                />{{ symptom.symptom_name }}</label
              >
            </div>
          </div>
        </div>
      </div>
      <div id="div2" style="display: none">
        <h4 class="pb-4 text-center mt-4">Select Speciality</h4>

        <div class="d-flex flex-wrap">
          <div class="scrollbarpan">
            <div
              class="checkmain"
              v-for="(speciality, index) in speciality_master_list"
              :key="index"
            >
              <input
                type="checkbox"
                name="chk_speciality"
                class="radioinput"
                :id="speciality.speciality_master_ref_no"
                :value="speciality.speciality_master_ref_no"
                @change="onChange($event)"
              />
              <label :for="speciality.speciality_master_ref_no">
                <img
                  :src="
                    speciality.icon
                      ? speciality.icon
                      : $store.state.defaultImage
                  "
                  alt=""
                />{{ speciality.speciality_name }}</label
              >
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="loaderbtn btnfill btnfull mt-4"
        @click.prevent="savePatientDetails"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["speciality_master_list", "symptom_master_list"],
  data() {
    return {};
  },
  created() {
    this.fetchSpecialityMasterList();
  },
  methods: {
    showhideForm(event) {
      //var group = "input:checkbox[class= 'radioinput']";
      //$(group).prop("checked", false);
      if (event.target.value == "symptoms") {
        $("#div1").show();
        $("#div2").hide();
        $(".speciality_checkbox").prop("checked", false);
      }
      if (event.target.value == "speciality") {
        $("#div2").show();
        $("#div1").hide();
        $(".symptoms_checkbox").prop("checked", false);
      }
    },
    onChange(event) {
      this.selected_speciality = event.target.value;
    },
    savePatientDetails() {
      this.$emit("savePatientDetails");
    },
    fetchSpecialityMasterList() {
      this.$emit("fetchSpecialityMasterList");
    },
  },
};
</script>
