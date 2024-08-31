<template>
  <section>
    <div
      class="profile-verifiedbg"
      v-if="getUser.is_verified == isUserPending && $route.name == 'dashboard'"
    >
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <img
            width="120"
            src="/assets/img/profile-under-review-small.png"
            alt=""
          />
        </div>
      </div>
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <h6>
            <strong
              >Your profile is currently under review. It will be activated in
              48 hours.
            </strong>
          </h6>
        </div>
      </div>
    </div>


    <div
      class="profile-verifiedbg"
      v-if="getUser.is_verified == isUserSubmitProfile && $route.name == 'dashboard'"
    >
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <img
            width="120"
            src="/assets/img/profile-under-review-small.png"
            alt=""
          />
        </div>
      </div>
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <h6>
            <strong
              >Your profile information has been submitted for re-verification. You
          will be notified shortly about your profile status via e-mail.
            </strong>
          </h6>
        </div>
      </div>
    </div>

    <div
      class="profile-verifiedbg big"
      v-if="
        getUser.is_verified == isUserUnverified && $route.name == 'dashboard'
      "
    >
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <img
            width="280"
            src="/assets/img/profile-under-review-small.png"
            alt=""
          />
        </div>
      </div>
      <div class="mx-sm-3 d-flex align-items-center">
        <div>
          <h6>
            <strong
              >Due to insufficient information provided, your profile is
              temporarily inactive. Kindly update your profile with valid
              details to explore the benefits of DocsCampus.
            </strong>
          </h6>
          <router-link to="/profile" class="btnfill mb-1 mt-2 float-right"
            >Complete Profile</router-link
          >
        </div>
      </div>
    </div>

    <div
      class="middlesec row d-flex flex-wrap justify-content-between"
      v-if="getUser.is_verified == isUserUnverified && $route.name == 'profile'"
    >
      <p class="p-2">
        <strong
          >Your access to DocsCampus has been temporarily restricted. Kindly
          complete the information to reactivate your profile.</strong
        >
      </p>
      <a
        href="#"
        @click.prevent="submitForVerification"
        class="btnsm btnfill mt-0"
        >Submit for verification</a
      >
    </div>

    <div
      class="middlesec row"
      v-if="
        getUser.is_verified == isUserSubmitProfile && $route.name == 'profile'
      "
    >
      <div class="alertmsg alert alert-dismissible fade show" role="alert">
        <strong
          >Your profile information has been submitted for re-verification. You
          will be notified shortly about your profile status via e-mail.</strong
        >
        <a class="close" data-dismiss="alert" aria-label="Close"
          ><span aria-hidden="true">&times;</span></a
        >
      </div>
    </div>
  </section>
</template>

<script>
import requestMixin from "../../mixins/request";
import { profile } from "../../path";
export default {
  mixins: [requestMixin],
  data() {
    return {
      isUserPending: 2,
      isUserVerified: 1,
      isUserUnverified: 0,
      isUserSubmitProfile: 3,
    };
  },
  methods: {
    async submitForVerification() {
      this.$store.commit("showLoader", true);
      let formData = new FormData();

      const data = await this.postRequest(
        profile.submitForVerification,
        formData
      );
      this.$store.commit("showLoader", false);
      if (data.user_data) {
        this.$toast.success("Profile submit for verification.");
        this.$store.dispatch("getUser");
      }
    },
  },
};
</script>

<style>
</style>