<template>
  <section>
    <div
      class="tab-pane fade"
      id="educationaldetails"
      role="tabpanel"
      aria-labelledby="nav-educationaldetails-tab"
    >
      <!--- Form start --->
      <form class="">
        <div class="d-flex justify-content-center">
          <div class="p-sm-3 m-2 col-lg-8 col-12">
            <div class="d-flex justify-content-end">
              <a
                class="outlinebtngrey mb-3"
                @click.prevent="openEducationModal('add', '')"
                ><span>+</span> Add</a
              >
            </div>
            <template v-if="alleducations.length > 0">
              <div
                v-for="education in alleducations"
                :key="education.education_ref_no"
              >
                <div class="d-sm-flex justify-content-sm-between">
                  <div>
                    <p class="mb-0 pxxxssmall">
                      <strong>{{ education.qualification }}</strong>
                    </p>
                    <p class="greytext pxxxssmall mb-sm-0">
                      <strong>{{
                        education.institute_data
                          ? education.institute_data.institute_name
                          : ""
                      }}</strong>
                    </p>
                  </div>

                  <div>
                    <span class="pxxxssmall"
                      >{{ education.start_year }} -
                      {{
                        education.end_year ? education.end_year : "Present"
                      }}</span
                    ><span
                      ><a
                        class="ml-4 float-right"
                        @click.prevent="openEducationModal('edit', education)"
                        href="#"
                        ><img src="/assets/img/edit-pen.svg" alt="" /></a
                    ></span>
                  </div>
                </div>
                <p class="pxxxssmall mt-3">
                  {{ education.description }}
                </p>
                <hr />
              </div>
            </template>
          </div>
        </div>
      </form>
    </div>
    <EducationModal
      v-if="showmodal"
      :checktxt="check_txt"
      :passdata="passdata"
      @closeEducationModal="closeEducationModal"
      @emitChanges="emitChanges"
    ></EducationModal>
  </section>
</template>

<script>
import EducationModal from "./educationModal";
import { educationUrl } from "../../path";
import mixinRequest from "../../mixins/request";
export default {
  mixins: [mixinRequest],
  components: {
    EducationModal,
  },
  data() {
    return {
      alleducations: [],
      showmodal: false,
      check_txt: "",
      passdata: "",
    };
  },
  created() {
    this.fetchEducation();
  },
  methods: {
    async fetchEducation() {
      const data = await this.getRequest(educationUrl.educationdetails);
      this.alleducations = data.education_data;
    },
    openEducationModal(check_txt, data) {
      this.showmodal = true;
      this.check_txt = check_txt;
      this.passdata = data;
    },
    closeEducationModal() {
      this.showmodal = false;
      this.check_txt = "";
      this.passdata = "";
    },
    emitChanges(data) {
      if (this.check_txt == "add") {
        this.alleducations.push(data);
        this.$toast.success("Successfully Added !");
        this.showmodal = false;
        this.check_txt = "";
        this.passdata = "";
      } else {
        this.alleducations = this.alleducations.map((education) => {
          if (education.education_ref_no === data.education_ref_no) {
            return data;
          }
          return education;
        });
        this.$toast.success("Successfully Updated !");
        this.showmodal = false;
        this.check_txt = "";
        this.passdata = "";
      }
    },
  },
};
</script>

<style>
</style>