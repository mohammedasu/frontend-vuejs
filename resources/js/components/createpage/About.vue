<template>
  <div class="container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" ref="formHTML">
        <div class="row">
          <PageSidebar @redirectBack="emitChanges"></PageSidebar>
          <div class="col-lg-6 middlesec create-pages">
            <label class="labelstyle pt-2">Industry <span>*</span> </label>
            <ValidationProvider name="company_industry" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <div class="select-arrow">
                  <select
                    class="field-select w-100 whitebgs"
                    v-model="form.company_industry"
                    name="company_industry"
                  >
                    <option value="">
                      Select the industry your organization belongs to
                    </option>
                    <option
                      v-for="industry in $store.state.page.industries"
                      :key="industry.industry_ref_no"
                      :value="industry.industry_ref_no"
                    >
                      {{ industry.name }}
                    </option>
                  </select>
                </div>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2">Website</label>
            <ValidationProvider name="website" rules="weburl|max:255">
              <div slot-scope="{ errors }" class="position-relative">
                <input
                  type="text"
                  class="whitebgs mb-4"
                  placeholder="Write your website URL"
                  v-model="form.website"
                  name="website"
                />
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <label class="labelstyle pt-2">Email ID</label>
            <ValidationProvider name="email" rules="email">
              <div slot-scope="{ errors }" class="position-relative">
                <input
                  type="text"
                  class="whitebgs mb-1"
                  placeholder="Write your organizations’s Email ID"
                  v-model="form.email"
                  name="email"
                />
                <p class="pxssmall greytext pb-4">
                  This email will only be used for receiving inquiries via
                  “Contact Us” button and won’t be made publically visible.
                </p>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2">Organization Size</label>
            <div class="select-arrow">
              <ValidationProvider name="company_size" rules="required">
                <div slot-scope="{ errors }" class="position-relative">
                  <select
                    class="field-select w-100 whitebgs"
                    v-model="form.company_size"
                    name="company_size"
                  >
                    <option value="">Select company size</option>
                    <option value="1">0–1 employees</option>
                    <option value="10">2–10 employees</option>
                    <option value="50">11–50 employees</option>
                    <option value="200">51–200 employees</option>
                  </select>
                  <span class="requireds">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <label class="labelstyle pt-2">Organization Type</label>
            <div class="select-arrow">
              <ValidationProvider name="company_type" rules="required">
                <div slot-scope="{ errors }" class="position-relative">
                  <select
                    class="field-select w-100 whitebgs"
                    v-model="form.company_type"
                    name="company_type"
                  >
                    <option value="">Select company type</option>
                    <option value="public">Public company</option>
                    <option value="private">Private company</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="government">Government agency</option>
                    <option value="nonprofit">Nonprofit</option>
                    <option value="proprietorship">Sole proprietorship</option>
                  </select>
                  <span class="requireds">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <label class="labelstyle pt-2">Location</label>
            <ValidationProvider name="location" rules="required|max:250">
              <div slot-scope="{ errors }" class="position-relative">
                <textarea
                  type="text"
                  class="whitebgs mb-4"
                  placeholder="Write your address"
                  col="20"
                  v-model="form.location"
                  name="location"
                ></textarea>
                <span class="requireds pb-3">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2">About</label>
            <ValidationProvider name="aboutus" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <textarea
                  class="whitebgs mb-3"
                  col="20"
                  placeholder="Write a short description for your organisation"
                  v-model="form.aboutus"
                  name="aboutus"
                ></textarea>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2 mb-0"
              >Offerings <span>*</span>
            </label>
            <p class="mb-2">Select your organization’s offerings</p>
            {{ editData.offerings }}
            <label class="lablecheckbox">
              <input
                type="checkbox"
                value="products"
                id="offer_products"
                v-model="form.offerings"
              /><span class="chkboxspan"></span> Products (For Pharma
              Businesses, Medical Equipment Providers, etc.)</label
            >
            <label class="lablecheckbox">
              <input
                type="checkbox"
                value="services"
                id="offer_services"
                v-model="form.offerings"
              /><span class="chkboxspan"></span> Services (For Hospitals,
              Healthcare Centres, etc.)</label
            >
            <label class="lablecheckbox">
              <input
                type="checkbox"
                value="courses"
                id="offer_courses"
                v-model="form.offerings"
              /><span class="chkboxspan"></span> Courses (For Educationa
              Institutes)</label
            >
          </div>
        </div>
        <div class="card mb-0 mt-4">
          <div>
            <template v-if="loader.loading">
              <img
                src="/assets/img/loader-btn.gif"
                class="float-right"
                alt=""
              />
            </template>
            <template v-else>
              <button class="btnfill my-3 mx-3 px-5 float-right">
                {{ $store.state.page.editPage ? "Update Page" : "Create Page" }}
              </button>
            </template>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import PageSidebar from "./PageSidebar";
import { addPageBackendUrl, updatePageBackendUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
export default {
  mixins: [mixinRequest, mixinLoader],
  props: ["editData"],
  components: {
    PageSidebar,
  },
  data() {
    return {
      defaultImage: "/assets/img/uploadimage.png",
      form: {
        company_industry: this.editData.industry_ref_no
          ? this.editData.industry_ref_no
          : this.$store.state.page.form.company_industry,
        website: this.editData.website
          ? this.editData.website
          : this.$store.state.page.form.website,
        email: this.editData.email
          ? this.editData.email
          : this.$store.state.page.form.email,
        company_size: this.editData.company_size
          ? this.editData.company_size
          : this.$store.state.page.form.company_size,
        company_type: this.editData.company_type
          ? this.editData.company_type
          : this.$store.state.page.form.company_type,
        aboutus: this.editData.aboutus
          ? this.editData.aboutus
          : this.$store.state.page.form.aboutus,
        offerings: this.editData.offerings
          ? this.editData.offerings
          : this.$store.state.page.form.offerings,
        location: this.editData.location
          ? this.editData.location
          : this.$store.state.page.form.location,
      },
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.$store.dispatch("page/fetchIndustries");
    if (this.editData.page_ref_no) {
      const offerings = this.editData.offerings;
      if (offerings != "" && offerings != null) {
        const splitData = offerings.split(",");
        this.form.offerings = splitData;
      } else {
        this.form.offerings = [];
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("page/setState", {
        company_industry: this.form.company_industry,
        website: this.form.website,
        email: this.form.email,
        company_size: this.form.company_size,
        company_type: this.form.company_type,
        aboutus: this.form.aboutus,
        offerings: this.form.offerings,
        location: this.form.location,
      });
      const result = this.validateData();
      if (result) {
        if (this.$store.state.page.editPage) {
          this.updateData();
        } else {
          this.saveData();
        }
      }
    },
    async saveData() {
      const formDataPass = this.$store.state.page.form;
      this.showProcessLoader(true);
      console.log(formDataPass);
      let formData = new FormData();
      const keys = Object.keys(formDataPass);
      keys.forEach((key, index) => {
        formData.append(key, formDataPass[key]);
      });
      formData.delete("imageUrl");
      formData.delete("coverimageUrl");
      const data = await this.postRequest(addPageBackendUrl, formData);
      this.hideProcessLoader(true);
      if (data.page_data) {
        this.$toast.success("Page Successfully Created !");
        window.location.href = "/page/" + data.page_data.page_ref_no;
      }
    },
    async updateData() {
      const formDataPass = this.$store.state.page.form;
      this.showProcessLoader(true);
      console.log(formDataPass);
      let formData = new FormData();
      const keys = Object.keys(formDataPass);
      keys.forEach((key, index) => {
        formData.append(key, formDataPass[key]);
      });
      formData.delete("imageUrl");
      formData.delete("coverimageUrl");
      formData.append("page_ref_no", this.$store.state.page.editPage);
      const data = await this.postRequest(updatePageBackendUrl, formData);
      this.hideProcessLoader(true);
      if (data.page_data) {
        this.$toast.success("Page Successfully Updadted !");
        window.location.href = "/page/" + data.page_data.page_ref_no;
      }
    },
    validateData() {
      var response = true;
      const formData = this.$store.state.page.form;
      if (
        formData.name == "" ||
        formData.tagline == "" ||
        formData.page_visibility == "" ||
        formData.company_industry == "" ||
        formData.location == "" ||
        formData.company_size == "" ||
        formData.company_type == "" ||
        formData.aboutus == ""
      ) {
        this.$toast.error("Please fill the form !");
        response = false;
      }
      return response;
    },
    emitChanges(txt) {
      this.$emit("redirecttoAbout", txt);
    },
  },
};
</script>

<style>
</style>