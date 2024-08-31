<template>
  <section>
    <div
      class="modal show createpostpopup educationaldetailss"
      id="educationaldetailss"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">
              {{ checktxt == "add" ? "Add Education" : "Edit Education" }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click.prevent="closeEducationModal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="scrollbarpan pr-3">
              <!--- Form start --->
              <form class="">
                <label class="labelstyle pt-2">
                  Education <span>*</span>
                </label>
                <div class="select-arrow">
                  <select
                    class="field-select w-100"
                    v-model="form.qualification_level_ref_no"
                    requierd
                  >
                    <option value="">Select your level of education</option>
                    <option
                      v-for="level in alllevels"
                      :value="level.qualification_level_ref_no"
                      :key="level.qualification_level_ref_no"
                    >
                      {{ level.qualification_level_name }}
                    </option>
                  </select>
                </div>
                <label class="labelstyle pt-2"
                  >Qualification <span>*</span>
                  <div class="float-right">
                    <label class="lablecheckbox pxxssmall fnormal">
                      <input
                        type="checkbox"
                        name="pursuing"
                        v-model="form.pursuing"
                      />
                      <span class="chkboxspan"></span> Pursuing</label
                    >
                  </div></label
                >
                <input
                  type="text"
                  placeholder="Enter your qualification"
                  v-model="form.qualification"
                />

                <label class="labelstyle pt-2"
                  >Name of Institute or College <span>*</span></label
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
                      : form.institute_master_ref_no_student)
                      ? 'checked'
                      : ''
                  "
                  @input="selectOther(other_institute_ref_no, $event)"
                />
                Other
                <div>
                  <v-select
                    label="institute_name"
                    :options="allinstitutes"
                    v-model="form.institute_master_ref_no_display"
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
                          : form.institute_master_ref_no_student) &&
                      selected_other
                    "
                    name="other_institute_name_student"
                    id="other_institute_name_student"
                    v-model="form.other_institute_name_student"
                    placeholder="Enter your institute name"
                  />
                </div>

                <div class="row">
                  <div class="col-sm-6 gender">
                    <label class="labelstyle pt-2"
                      >Start Year <span>*</span></label
                    >
                    <div class="select-arrow">
                      <select
                        class="field-select w-100"
                        name="start_year"
                        id="start_year"
                        v-model="form.start_year"
                      >
                        <option value="">Select Start year</option>
                        <option
                          v-for="year in startyears"
                          :value="year"
                          :key="year"
                        >
                          {{ year }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-6 gender" v-if="!form.pursuing">
                    <label class="labelstyle pt-2"
                      >End Year <span>*</span></label
                    >
                    <div class="select-arrow">
                      <select
                        class="field-select w-100"
                        name="end_year"
                        id="end_year"
                        v-model="form.end_year"
                        aria-placeholder="Select End year"
                      >
                        <option value="">Select End year</option>
                        <option
                          v-for="year in endyears"
                          :value="year"
                          :key="year"
                        >
                          {{ year }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <label class="labelstyle pt-2"
                  >Description <span>*</span></label
                >
                <textarea
                  class="textarea h-50"
                  placeholder="Write description here"
                  rows="2"
                  cols="20"
                  v-model="form.description"
                ></textarea>

                <template v-if="loader.loading">
                  <img src="/assets/img/loader-btn.gif" alt="" />
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="loaderbtn btnfill mt-2 mb-2 float-right"
                    @click.prevent="submitData"
                  >
                    {{ this.checktxt == "add" ? "Save" : "Update" }}
                  </button>
                </template>
              </form>
              <!--- Form end  --->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import { educationUrl, profile } from "../../path";
import mixinRequest from "../../mixins/request";
import vSelect from "vue-select";
import mixinLoader from "../../mixins/loader";

export default {
  mixins: [mixinRequest, mixinLoader],
  props: ["checktxt", "passdata"],
  components: {
    vSelect,
  },

  data() {
    return {
      alllevels: [],
      allinstitutes: [],
      form: {
        qualification_level_ref_no: "",
        qualification: "",
        institute_master_ref_no_student: "",
        institute_master_ref_no_display: "",
        other_institute_name_student: "",
        pursuing: false,
        start_year: "",
        end_year: "",
        description: "",
      },
      currentYear: new Date().getFullYear(),
      yearlength: 100,
      institute_master_ref_no: "",
      other_institute_ref_no: "OTH45948759799436746",
      selected_other: false,
    };
  },
  created() {
    this.fetchQualificationLevels();
    this.fetchInstituteMasterList();
    if (this.checktxt == "edit") {
      this.fillEditData();
    }
  },
  computed: {
    startyears() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: this.yearlength },
        (value, index) => year - index
      );
    },
    endyears() {
      const year = new Date().getFullYear() + 10;
      return Array.from(
        { length: this.yearlength },
        (value, index) => year - index
      );
    },
  },
  methods: {
    async fetchQualificationLevels() {
      const data = await this.getRequest(profile.fetchqualificationlevellist);
      this.alllevels = data.qualification_level_data;
    },
    async fetchInstituteMasterList() {
      const data = await this.getRequest(profile.fetchInstituteMasterList);
      this.allinstitutes = data.institute_data;
    },
    validateEducationData() {
      let response = true;
      if (
        this.form.qualification_level_ref_no == "" ||
        this.form.start_year == "" ||
        this.form.institute_master_ref_no_student == "" ||
        this.form.qualification == "" ||
        this.form.description == "" ||
        (this.form.pursuing == 0 && this.form.end_year == "")
      ) {
        response = false;
      }
      return response;
    },
    async submitData() {
      if (!this.selected_other) {
        this.form.institute_master_ref_no_student =
          this.institute_master_ref_no;
      } else {
        this.form.institute_master_ref_no_student = this.other_institute_ref_no;
      }
      const response_validate = this.validateEducationData();
      if (response_validate) {
        const formdata = new FormData();

        formdata.append("description", this.form.description);
        formdata.append("start_year", this.form.start_year);
        formdata.append("end_year", this.form.end_year);
        formdata.append("pursuing", this.form.pursuing ? 1 : 0);
        formdata.append(
          "institute_master_ref_no_student",
          this.form.institute_master_ref_no_student
        );
        formdata.append(
          "other_institute_name_student",
          this.form.other_institute_name_student
        );
        formdata.append("qualification", this.form.qualification);
        formdata.append(
          "qualification_level_ref_no",
          this.form.qualification_level_ref_no
        );

        this.showProcessLoader(true);
        if (this.checktxt == "add") {
          const data = await this.postRequest(
            educationUrl.educationdetails,
            formdata
          );
          if (data.education_data) {
            this.emitChanges(data.education_data);
          }
        } else {
          formdata.append("_method", "PUT");
          const data = await this.postRequest(
            educationUrl.educationdetails +
              "/" +
              this.passdata.education_ref_no,
            formdata
          );
          if (data.education_data) {
            this.emitChanges(data.education_data);
          }
        }
        this.hideProcessLoader(true);
      } else {
        this.$toast.error("Please fill the form !");
      }
    },
    fillEditData() {
      const editData = this.passdata;
      this.form.qualification_level_ref_no =
        editData.qualification_level_ref_no;
      this.form.qualification = editData.qualification;
      this.form.start_year = editData.start_year;
      this.form.end_year = editData.end_year ? editData.end_year : "";
      this.form.pursuing = editData.pursuing;
      this.form.description = editData.description;
      if (editData.institute_master_ref_no == this.other_institute_ref_no) {
        this.selected_other = true;
        this.setSelected({
          institute_name: "Other",
          institute_master_ref_no: this.other_institute_ref_no,
        });
        this.form.other_institute_name_student = editData.other_institute_name;
      } else {
        this.selected_other = false;
        this.form.institute_master_ref_no_display = editData.institute_data
          ? editData.institute_data.institute_name
          : "";
        this.setSelected({
          institute_name: editData.institute_data
            ? editData.institute_data.institute_name
            : "",
          institute_master_ref_no: editData.institute_master_ref_no,
        });
      }
    },
    setSelected(value) {
      this.form.institute_master_ref_no_student = value.institute_master_ref_no;
      this.institute_master_ref_no = value.institute_master_ref_no;
      if (value.institute_master_ref_no == this.other_institute_ref_no) {
        this.selected_other = true;
      } else {
        this.selected_other = false;
      }
    },
    selectOther(value, event) {
      if (event.target.checked) {
        this.setSelected({
          institute_name: "Other",
          institute_master_ref_no: this.other_institute_ref_no,
        });
      } else {
        this.setSelected({
          institute_name: "Select Name of University or College",
          institute_master_ref_no: "",
        });
      }
    },
    closeEducationModal() {
      this.$emit("closeEducationModal");
    },
    emitChanges(data) {
      this.$emit("emitChanges", data);
    },
  },
};
</script>

<style scoped>
.educationaldetailss .scrollbarpan {
  min-height: 400px !important;
}
</style>