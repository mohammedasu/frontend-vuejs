<template>
  <div class="container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" ref="formHTML">
        <div class="row">
          <div class="col-lg-3 articlesec recently-visited pr-sm-0">
            <div class="sidebarlistfix">
              <div class="card sidebarlist pb-2 mb-1">
                <h4 class="px-3 py-3">
                  {{ edit ? "Update Group" : "Create Group" }}
                </h4>
                <p class="pxxssmall px-3">
                  Create a group with your connections, peers, students,
                  patients, etc.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 middlesec create-pages group">
            <label class="labelstyle pt-2">Group Name <span>*</span> </label>
            <ValidationProvider name="name" rules="required|max:255">
              <div slot-scope="{ errors }" class="position-relative">
                <input
                  type="text"
                  class="whitebgs mb-4"
                  placeholder="Enter the group name"
                  v-model="form.name"
                  name="name"
                />
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <label class="labelstyle pt-2">Group Privacy <span>*</span> </label>

            <div class="d-flex">
              <div class="mr-md-3">
                <label class="lablecheckbox">
                  <input
                    type="radio"
                    value="public"
                    name="group_privacy"
                    v-model="form.group_privacy"
                  /><span class="chkboxspan"></span>
                  <span class="pxxssmall"><strong>Public Group</strong></span>
                  <p class="pxxssmall">
                    Anyone can see who is in the group and what they post.
                  </p>
                </label>
              </div>

              <div>
                <label class="lablecheckbox">
                  <input
                    type="radio"
                    value="private"
                    name="group_privacy"
                    v-model="form.group_privacy"
                  /><span class="chkboxspan"></span>
                  <span class="pxxssmall"><strong>Private Group</strong></span>
                  <p class="pxxssmall">
                    Only members can see who is in the group and what they post.
                  </p>
                </label>
              </div>
            </div>

            <label class="labelstyle pt-2"
              >Group Visibility <span>*</span>
            </label>
            <ValidationProvider name="group_visibility" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <div class="select-arrow">
                  <select
                    class="field-select w-100 whitebgs mb-4"
                    name="group_visibility"
                    v-model="form.group_visibility"
                  >
                    <option value="">Select who can join the group</option>
                    <option value="anyone">Anyone</option>
                    <option value="doctor">Doctors Only</option>
                    <option value="medicalstudent">
                      Medical Students Only
                    </option>
                    <option value="doctor,medicalstudent">
                      Doctors & Medical Students
                    </option>
                  </select>
                </div>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <label class="labelstyle pt-2"
              >Group Post Setting <span>*</span>
            </label>
            <ValidationProvider name="group_post_setting" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <div class="select-arrow">
                  <select
                    class="field-select w-100 whitebgs mb-4"
                    name="group_post_setting"
                    v-model="form.group_post_setting"
                  >
                    <option value="">Select who can post in the group</option>
                    <option value="admin">Only admin</option>
                    <option value="everyone">Everyone</option>
                  </select>
                </div>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <label class="labelstyle pt-2">Group Photo</label>
            <div class="d-md-flex justify-content-md-between">
              <div>
                <label class="newbtn">
                  <div>
                    <img
                      id="blah_logo"
                      :src="
                        form.imageUrl ? form.imageUrl : $store.state.imageShow
                      "
                      alt=""
                    />
                    <input
                      id="pic_logo"
                      class="pis"
                      @change="readFile($event, 'logo')"
                      type="file"
                    />
                    <p class="">Add Group Photo</p>
                  </div>
                </label>
              </div>
              <p class="ml-sm-4">
                We recommend a image ratio of <strong>1:1</strong> and size of
                <strong>180x180</strong> px for the group photo. Otherwise the
                image will cropped automatically to fit the recommended ratio.
              </p>
            </div>
            <label class="labelstyle pt-2">Cover Image</label>
            <label class="newbtn newbtnsecond min-height200">
              <div>
                <img
                  id="blah_cover"
                  :src="
                    form.coverimageUrl
                      ? form.coverimageUrl
                      : $store.state.imageShow
                  "
                  alt=""
                />
                <input
                  id="pic_cover"
                  class="pis"
                  @change="readFile($event, 'cover')"
                  type="file"
                />
                <p class="">Add Cover Photo</p>
              </div>
            </label>
            <p class="mt-2">
              We recommend a image ratio of <strong>3.56:1</strong> and size of
              <strong>1280x360</strong> px for the cover photo. Otherwise the
              image will cropped automatically to fit the recommended ratio.
            </p>

            <label class="labelstyle pt-2">About the group </label>
            <ValidationProvider name="description" rules="required">
              <div slot-scope="{ errors }" class="position-relative">
                <textarea
                  class="whitebgs min-height200 mb-4"
                  placeholder="Write something about the group"
                  col="10"
                  v-model="form.description"
                  name="description"
                ></textarea>
                <span class="requireds">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="card mb-0">
          <div class="d-flex justify-content-center">
            <template v-if="loader.loading">
              <img
                src="/assets/img/loader-btn.gif"
                class="float-right"
                alt=""
              />
            </template>
            <template v-else>
              <button type="submit" class="btnfill my-2 mx-3 px-5 float-right">
                {{ edit ? "Update Group" : "Create Group" }}
              </button>
            </template>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import mixinGroup from "../../mixins/group/group";
export default {
  mixins: [mixinGroup],
};
</script>

<style>
</style>