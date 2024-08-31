<template>
  <div class="container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" ref="formHTML">
        <div class="row">
          <PageSidebar
            @redirectBack="emitChanges"
          ></PageSidebar>
          <div class="col-lg-6 middlesec create-pages">
            <label class="labelstyle pt-2">Page Name <span>*</span> </label>
            <ValidationProvider name="name" rules="required|max:255">
              <div slot-scope="{ errors }" class="position-relative">
                <input
                  type="text"
                  class="whitebgs mb-4"
                  placeholder="Enter the page name"
                  v-model="form.name"
                  name="name"
                />
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2">Tagline <span>*</span> </label>
            <ValidationProvider name="tagline" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <textarea
                  type="text"
                  class="whitebgs mb-4"
                  placeholder="Write a short tagline for your page"
                  col="10"
                  name="tagline"
                  v-model="form.tagline"
                ></textarea>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2"
              >Page Visibility <span>*</span>
            </label>
            <ValidationProvider name="page_visibility" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <div class="select-arrow">
                  <select
                    class="field-select w-100 whitebgs"
                    v-model="form.page_visibility"
                  >
                    <option value="">Select who can view your page</option>
                    <option value="public">Public (visible to all)</option>
                    <option value="doctor">Doctors Only</option>
                    <option value="doctor_student">
                      Doctors & Medical Students Only
                    </option>
                  </select>
                </div>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <label class="labelstyle pt-2">Profile Image</label>
            <div class="d-md-flex justify-content-md-between">
              <div>
                <label class="newbtn">
                  <div>
                    <img
                      id="blah"
                      :src="form.imageUrl ? form.imageUrl : defaultImage"
                      alt=""
                    />
                    <input
                      id="pic"
                      class="pis"
                      @change="readFile($event, 'profile')"
                      type="file"
                    />
                    <p class="">Add Profile Photo</p>
                  </div>
                </label>
              </div>
              <p class="ml-sm-4">
                We recommend a image ratio of 1:1 and size of 180x180 px for the
                profile photo. Otherwise the image will cropped automatically to
                fit the recommended ratio.
              </p>
            </div>
            <label class="labelstyle pt-2">Cover Image</label>
            <label class="newbtn newbtnsecond">
              <div>
                <img
                  id="blah"
                  :src="form.coverimageUrl ? form.coverimageUrl : defaultImage"
                  alt=""
                />
                <input
                  id="pic"
                  class="pis"
                  @change="readFile($event, 'cover')"
                  type="file"
                />
                <p class="">Add Cover Image</p>
              </div>
            </label>
            <p class="mt-2">
              We recommend a image ratio of 3.56:1 and size of 1280x360 px for
              the cover photo. Otherwise the image will cropped automatically to
              fit the recommended ratio.
            </p>
          </div>
        </div>
        <div class="card mb-0">
          <div>
            <button class="btnfill my-3 mx-3 px-5 float-right">Continue</button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageSidebar from "./PageSidebar";
export default {
  props: ["editData"],
  components: {
    PageSidebar,
  },
  data() {
    return {
      defaultImage: "/assets/img/uploadimage.png",
      form: {
        name: this.editData.name
          ? this.editData.name
          : this.$store.state.page.form.name,
        tagline: this.editData.tagline
          ? this.editData.tagline
          : this.$store.state.page.form.tagline,
        page_visibility: this.editData.page_visibility
          ? this.editData.page_visibility
          : this.$store.state.page.form.page_visibility,
        image: this.$store.state.page.form.image,
        coverimage: this.$store.state.page.form.coverimage,
        imageUrl: this.editData.fullimage
          ? this.editData.fullimage
          : this.$store.state.page.form.imageUrl,
        coverimageUrl: this.editData.fullcoverimage
          ? this.editData.fullcoverimage
          : this.$store.state.page.form.coverimageUrl,
      },
    };
  },
  computed: {
    ...mapGetters({
      getPageData: "page/getPageData",
    }),
  },
  methods: {
    readFile(e, whichimage) {
      if (
        e.target.files[0]["type"] === "image/jpeg" ||
        e.target.files[0]["type"] === "image/jpg" ||
        e.target.files[0]["type"] === "image/png"
      ) {
        if (whichimage == "cover") {
          this.form.coverimage = e.target.files[0];
          this.form.coverimageUrl = URL.createObjectURL(this.form.coverimage);
          this.$store.commit("page/setState", {
            state: "coverimage",
            coverimage: this.form.coverimage,
            coverimageUrl: this.form.coverimageUrl,
          });
        } else {
          this.form.image = e.target.files[0];
          this.form.imageUrl = URL.createObjectURL(this.form.image);
          this.$store.commit("page/setState", {
            state: "image",
            image: this.form.image,
            imageUrl: this.form.imageUrl,
          });
        }
      } else {
        if (whichimage == "cover") {
          this.form.coverimage = "";
          this.form.coverimageUrl = "";
          this.$store.commit("page/setState", {
            state: "coverimage",
            coverimage: this.form.coverimage,
            coverimageUrl: this.form.coverimageUrl,
          });
        } else {
          this.form.image = "";
          this.form.imageUrl = "";
          this.$store.commit("page/setState", {
            state: "image",
            image: this.form.image,
            imageUrl: this.form.imageUrl,
          });
        }
        this.$toast.error("Please select jpeg,jpg,png file !");
      }
    },
    onSubmit() {
      this.$store.dispatch("page/setState", {
        name: this.form.name,
        tagline: this.form.tagline,
        page_visibility: this.form.page_visibility,
      });
      this.$emit("redirecttoAbout", "about");
    },
    emitChanges(txt) {
      this.$emit("redirecttoAbout", txt);
    },
  },
};
</script>

<style>
</style>