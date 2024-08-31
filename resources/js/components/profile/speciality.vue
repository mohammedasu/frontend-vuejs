<template>
  <div
    class="tab-pane fade"
    id="yourspeciality"
    role="tabpanel"
    aria-labelledby="nav-yourspeciality-tab"
  >
    <!--- Form start --->
    <form class="form">
      <div class="d-flex flex-wrap specialitypage">
        <div class="scrollbarpan">
          <div
            class="checkmain"
            v-for="(speciality, index) in speciality_master_list"
            :key="index"
          >
            <input
              type="radio"
              name="speciality"
              class="radioinput"
              :id="speciality.speciality_name"
              :value="speciality.speciality_master_ref_no"
              :checked="
                doctor_speciality.speciality_master_ref_no ==
                speciality.speciality_master_ref_no
              "
              @change="onChange($event)"
            />
            <label :for="speciality.speciality_name">
              <img
                :src="
                  speciality.icon ? speciality.icon : $store.state.defaultImage
                "
                alt=""
              />{{ speciality.speciality_name }}</label
            >
          </div>
        </div>
      </div>
      <button
        type="button"
        class="loaderbtn btnfill btnfull mt-4"
        @click.prevent="saveDoctorSpeciality"
      >
        Save
      </button>
    </form>
    <!--- Form end --->
  </div>
</template>

<script>
export default {
  props: ["speciality_master_list", "doctor_speciality"],
  data() {
    return {
      selected_speciality: "",
    };
  },
  created() {
    this.fetchSpecialityMasterList();
  },
  methods: {
    onChange(event) {
      this.selected_speciality = event.target.value;
    },
    saveDoctorSpeciality() {
      if (this.selected_speciality == "") {
        this.selected_speciality =
          this.doctor_speciality.speciality_master_ref_no;
      }
      this.$emit("saveDoctorSpeciality", this.selected_speciality);
    },
    fetchSpecialityMasterList() {
      this.$emit("fetchSpecialityMasterList");
    },
  },
};
</script>
