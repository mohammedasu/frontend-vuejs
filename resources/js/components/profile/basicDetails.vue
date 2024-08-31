<template>
  <section>
    <div
      class="tab-pane fade show active"
      id="basicdetails"
      role="tabpanel"
      aria-labelledby="nav-basicdetails-tab"
    >
      <!--- Form start --->
      <form
        class="form"
        id="basic_details_form"
        @submit.prevent="saveBasicDetails"
      >
        <div class="uploadphoto">
          <a
            href="#"
            data-toggle="modal"
            data-target="#change_photo"
            class="uploadphoto"
          >
            <label class="newbtn">
              <img
                id="user_image"
                ref="user_image"
                alt=""
                :src="
                  basic_details.fullimage
                    ? basic_details.fullimage
                    : $store.state.defaultImage
                "
              />
            </label>
          </a>
          <label class="labelstyle pt-2">Upload Your Photo</label>
        </div>
        <label class="labelstyle pt-2">First Name <span>*</span> </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter your first name"
          :value="basic_details.first_name"
          ref="first_name"
          maxlength="60"
          required
        />
        <label class="labelstyle pt-2">Last Name <span>*</span> </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Enter your last name"
          :value="basic_details.last_name"
          ref="last_name"
          maxlength="60"
          required
        />
        <label class="labelstyle pt-2">User Name <span>*</span> </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="Enter your User Name"
          :value="basic_details.user_name"
          ref="user_name"
          maxlength="60"
          required
        />
        <label class="labelstyle pt-2">Email Id  </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email Id"
          :value="basic_details.email"
          ref="email"
          maxlength="60"
          required
          :readonly="basic_details.email ? true : false"
        />
        <div class="row">
          <div class="col-sm-12">
            <label class="labelstyle pt-2">Mobile No. </label>
            <div class="position-relative">
              <div class="select-arrow mobilecode">
                <select
                  class="field-select"
                  id="country_code_basic"
                  name="country_code"
                  ref="country_code"
                  :value="
                    basic_details.country_code
                      ? basic_details.country_code
                      : '+91'
                  "
                >
                  <option
                    v-for="countrycode in country_codes"
                    :key="countrycode.country_code"
                    :value="countrycode.country_code"
                  >
                    {{ countrycode.name }}
                  </option>
                </select>
              </div>
              <input
                type="number"
                name="mobile_number"
                id="mobile_number"
                ref="mobile_number"
                placeholder="Enter mobile no"
                maxlength="60"
                class="mobilecodeinput"
                :value="basic_details.mobile"
                :readonly="basic_details.mobile ? true : false"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 gender">
            <label class="labelstyle pt-2">Gender <span>*</span> </label>
            <div class="select-arrow">
              <select
                class="field-select"
                id="gender"
                name="gender"
                ref="gender"
                required
              >
                <option value="">Select Gender</option>
                <option value="male" :selected="basic_details.gender == 'male'">
                  Male
                </option>
                <option
                  value="female"
                  :selected="basic_details.gender == 'female'"
                >
                  Female
                </option>
              </select>
            </div>
          </div>
          <div class="col-sm-6">
            <label class="labelstyle pt-2">Dob<span>*</span></label>
            <div class="form-group">
              <datepicker
                id="dob"
                name="dob"
                format="dd-MM-yyyy"
                :value="basic_details.dob"
                ref="dob"
                required
              ></datepicker>
            </div>
          </div>
        </div>
        <button type="submit" class="loaderbtn btnfill btnfull mt-2">
          Save
        </button>
      </form>
      <!--- Form end l --->
    </div>
    <!-- The Modal Popup Change photo start -->
    <div class="modal fade createpostpopup" id="change_photo">
      <div class="modal-dialog modal-lm">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Change photo</h5>
            <button type="button" class="close" @click="closeModal">
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body px-0">
            <div
              class="
                d-flex
                align-items-center
                justify-content-center
                text-center
                py-4
                px-3
              "
            >
              <div>
                <h3>Keep your profile fresh!</h3>
                <p>Take or upload a photo.</p>

                <!-- Loader -->
                <div
                  v-show="isCameraOpen && isLoading"
                  class="loader"
                  style="position: inherit"
                ></div>
                <!-- Loader end -->

                <div v-if="isCameraOpen" v-show="!isLoading">
                  <video
                    v-show="!isPhotoTaken"
                    ref="camera"
                    :width="450"
                    :height="337.5"
                    autoplay
                  ></video>

                  <canvas
                    v-show="isPhotoTaken"
                    id="photoTaken"
                    ref="canvas"
                    :width="450"
                    :height="337.5"
                  ></canvas>
                </div>

                <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
                  <button type="button" class="button" @click="takePhoto">
                    <img alt="Capture" src="assets/img/photo.svg" />
                  </button>
                </div>
              </div>
            </div>
            <div
              class="
                modal-footer
                pb-0
                d-flex
                align-items-center
                justify-content-end
              "
            >
              <div>
                <button
                  type="button"
                  class="btn-rd btnfill m-0 mb-none"
                  :disabled="isCameraOpen"
                  @click="toggleCamera"
                >
                  Use camera
                </button>
                <button
                  type="button"
                  class="btn-rd btnfill m-0"
                  @click="openImageUpload"
                >
                  Upload photo
                </button>
                <input
                  id="pic"
                  class="pis"
                  @change="readURL($event)"
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal Popup Change photo end -->

    <!-- The Modal Popup Photo Crop start -->
    <div class="modal fade pl-0" id="crop_photo">
      <div class="modal-dialog modal-lm">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Crop photo</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body px-0">
            <div
              class="
                d-flex
                align-items-center
                justify-content-center
                text-center
                px-3
              "
            >
              <div id="demo-basic">
                <img id="crop_user_image" alt="" src="assets/img/profile.png" />
              </div>
            </div>
            <div
              class="
                modal-footer
                pb-0
                d-flex
                align-items-center
                justify-content-end
              "
            >
              <div>
                <button
                  class="btn-rd btnfill m-0"
                  id="crop_button"
                  @click="cropImage"
                >
                  Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal Popup Photo Crop end -->
  </section>
</template>

<script>
import mixin from "../../mixins/basicDetails";

export default {
  mixins: [mixin],
};
</script>