<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-5 asidesec myprofile">
        <div class="card">
          <div class="profile">
            <a href="">
              <img
                alt=""
                :src="
                  doctor_details.user_image
                    ? doctor_details.user_image
                    : $store.state.defaultImage
                "
                class="cursor-pointer"
                @click.prevent="openImageBox(doctor_details.user_image)"
              />
            </a>
          </div>
          <div class="text-center mb-4">
            <h6>
              {{ doctor_details.first_name }} {{ doctor_details.last_name }}
              <span
                v-if="doctor_details.is_kol"
                :class="
                  doctor_details.user_type == 'doctor' && doctor_details.is_kol
                    ? 'kol'
                    : ''
                "
                >KOL</span
              >
            </h6>
            <p>{{ doctor_details.speciality_name }}</p>

            <p class="connect" v-if="doctor_details.connection_status == 1">
              <a href="#" class="connectbtn active">Request Sent</a>
            </p>
            <p
              class="connect"
              v-else-if="doctor_details.connection_status == 2"
            >
              <router-link to="/networks" class="connectbtn respond"
                >Respond</router-link
              >
            </p>
            <p
              class="connect"
              v-else-if="doctor_details.connection_status == 3"
            >
              <a href="#" class="connectbtn">Connected</a>
            </p>
            <p class="connect" v-else>
              <template
                v-if="
                  loader.loading &&
                  loader.loader_ref_no == doctor_details.user_ref_no
                "
              >
                <img src="/assets/img/loader-btn.gif" alt="" />
              </template>
              <template v-else>
                <a
                  v-if="getUser.user_ref_no != doctor_details.user_ref_no"
                  href="#"
                  class="connectbtn"
                  @click.prevent="connectNow(doctor_details)"
                  ><sup>+</sup>Connect</a
                >
              </template>
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-7 middlesec invitations myprofile pr-sm-0">
        <div class="">
          <!-- Tab Horizontal sec start -->
          <nav class="card mb-0">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="card p-3 nav-item nav-link active"
                id="nav-myprofile-tab"
                data-toggle="tab"
                href="#myprofile"
                role="tab"
                aria-controls="nav-myprofile"
                aria-selected="true"
                >My Profile</a
              >
              <a
                class="nav-item nav-link"
                id="nav-post-tab"
                data-toggle="tab"
                href="#post"
                role="tab"
                aria-controls="nav-post"
                aria-selected="false"
                >Post</a
              >
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="card p-3 tab-pane fade show active"
              id="myprofile"
              role="tabpanel"
              aria-labelledby="nav-myprofile-tab"
            >
              <h6 class="titleimg mt-3">
                <img alt="" src="/assets/img/education.svg" /> Education
              </h6>
              <p class="ml-5 pl-2">{{ doctor_details.qualification }}</p>
              <h6 class="titleimg mt-4">
                <img
                  alt=""
                  src="/assets/img/university.svg"
                />University/College
              </h6>
              <p class="ml-5 pl-2">{{ doctor_details.institute_name }}</p>
              <h6 class="titleimg mt-4">
                <img alt="" src="/assets/img/bigexperience.svg" />Experience ({{
                  doctor_details.experience
                }}
                years)
              </h6>
              <p class="ml-5 pl-2">{{ doctor_details.place_of_work }}</p>
              <h6 class="titleimg mt-4">
                <img alt="" src="/assets/img/mappinline.svg" />Location
              </h6>
              <p class="ml-5 pl-2">{{ doctor_details.city }}</p>
            </div>
            <div
              class="tab-pane fade"
              id="post"
              role="tabpanel"
              aria-labelledby="nav-post-tab"
            >
              <Post
                posttxt="viewprofile"
                :ref_no="$route.params.doctor_ref_no"
              ></Post>
            </div>
          </div>
          <!-- Tab Horizontal sec end -->
        </div>
      </div>
      <imageBox
        v-if="$store.state.lightBoxModalProfile"
        :user_image="user_image_popup"
      />
    </div>
  </div>
</template>

<script>
import { fetchDoctorProfileDetails, connectionBackendUrl } from "../../path";
import requestMixin from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
import imageBox from "../common/Imagebox";
import Post from "../dashboard/Post";
export default {
  mixins: [requestMixin, mixinLoader],
  data() {
    return {
      doctor_details: {},
      user_image_popup: "",
    };
  },
  components: {
    Post,
    imageBox,
  },
  created() {
    this.fetchDoctorProfileDetails();
  },
  methods: {
    openImageBox(user_image) {
      if (user_image) {
        this.user_image_popup = user_image;
        this.$store.commit("lightBoxModalProfile", true);
      }
    },
    async fetchDoctorProfileDetails() {
      const data = await this.getRequest(
        fetchDoctorProfileDetails +
          "?ref_no=" +
          this.$route.params.doctor_ref_no,
        this.headerConfig
      );
      this.doctor_details = data.doctor_details;
    },
    async connectNow(doctor) {
      this.showProcessLoader(doctor.user_ref_no);
      let formData = new FormData();
      formData.append("selected_user_ref_no", doctor.user_ref_no);
      const data = await this.postRequest(connectionBackendUrl, formData);
      this.$store.commit("changeUserRequestStatus", data.connection_data);
      this.doctor_details.connection_status = 1;
      this.hideProcessLoader(doctor.user_ref_no);
    },
  },
};
</script>
