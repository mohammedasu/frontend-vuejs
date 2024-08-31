<template>
  <div class="modal fade creategrouppopup" id="creategrouppopup">
    <div class="modal-dialog">
      <div class="modal-content modal-lg">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title text-left">
            {{ edit ? "Update group" : "Create group" }}
          </h5>
          <button
            type="button"
            class="close"
            id="close_modal"
            data-dismiss="modal"
          >
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="scrollbarpan">
          <div class="modal-body">
            <form class="form">
              <div class="uploadphoto">
                <label class="newbtn">
                  <img
                    id="blah"
                    :src="
                      form.imageUrl ? form.imageUrl : $store.state.imageShow
                    "
                    alt=""
                  />
                  <input id="pic" class="pis" @change="readFile" type="file" />
                </label>
                <label class="labelstyle pt-2">Upload Logo</label>
              </div>

              <input
                type="text"
                placeholder="Enter Group Name"
                v-model="form.name"
              />

              <div class="select-arrow">
                <select class="field-select w-100" v-model="form.speciality">
                  <option value="">Select Speciality</option>
                  <option
                    v-for="speciality in specialities"
                    :key="speciality.speciality_master_ref_no"
                    :value="speciality.speciality_master_ref_no"
                  >
                    {{ speciality.speciality_name }}
                  </option>
                </select>
              </div>

              <textarea
                class="post-textarea h-50 w-100"
                placeholder="Description"
                v-model="form.description"
              ></textarea>

              <button
                type="button"
                class="loaderbtn btnfill btnfull m-0"
                @click.prevent="submitData"
              >
                {{ this.edit ? "Update Details" : "Submit Details" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profile, groupUrl } from "../../path";
import mixinRequest from "../../mixins/request";

export default {
  mixins: [mixinRequest],
  props: ["editData", "edit"],
  data() {
    return {
      specialities: [],
      form: {
        name: "",
        description: "",
        speciality: "",
        postImage: "",
        imageUrl: "",
      },
    };
  },
  created() {
    this.fetchSpeciality();
  },
  methods: {
    readFile(e) {
      this.form.postImage = e.target.files[0];
      this.form.imageUrl = URL.createObjectURL(this.form.postImage);
    },
    async fetchSpeciality() {
      const data = await this.getRequest(
        profile.fetchSpecialityMasterList,
        false
      );
      this.specialities = data.speciality_data;
      if (this.edit) {
        this.form.description = this.editData.description;
        this.form.name = this.editData.name;
        this.form.speciality = this.editData.speciality_master_ref_no;
        this.form.imageUrl = this.editData.fullimage;
      }
    },
    async submitData() {
      if (
        this.form.description == "" ||
        this.form.name == "" ||
        this.form.speciality == ""
      ) {
        this.$toast.error("Please enter name,description,speciality");
        return false;
      }
      let formData = new FormData();
      if (this.form.postImage != "") {
        formData.append("image", this.form.postImage);
      }
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("speciality", this.form.speciality);
      if (this.edit) {
        formData.append("group_ref_no", this.editData.group_ref_no);
      }
      this.$store.commit("showLoader", true);
      const url = this.edit
        ? groupUrl.updateGroupBackendUrl
        : groupUrl.addGroupBackendUrl;
      const data = await this.postRequest(url, formData);
      if (data.group_data) {
        document.getElementById("close_modal").click();
        this.$emit("sendGroup", data.group_data);
        this.form.description = "";
        this.form.name = "";
        this.form.speciality = "";
        this.form.postImage = "";
        this.form.imageUrl = "";
        if (this.edit) {
          this.$toast.success("Group updated successfully");
        } else {
          this.$toast.success("Group added successfully");
        }
      }
    },
  },
};
</script>

<style>
</style>