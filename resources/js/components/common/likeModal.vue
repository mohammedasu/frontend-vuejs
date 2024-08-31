<template>
  <section>
    <div class="modal show createpostpopup peoplelikepopup" id="peoplelike">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Please Wait...</span>
            <img src="assets/img/loader.gif" alt="Please Wait..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">People Like</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click.prevent="closeLikeModal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form class="form" id="myform">
              <div class="scrollbarpan">
                <ul class="userlist-bordr">
                  <p class="nofound-sm" v-if="likeData.length < 1">No likes</p>
                  <li v-for="user in likeData" :key="user.user_ref_no">
                    <div class="d-flex align-items-center">
                      <div class="profile-md">
                        <img
                          :src="
                            user.like_user.fullimage
                              ? user.like_user.fullimage
                              : $store.state.defaultImage
                          "
                          alt=""
                        />
                      </div>
                      <div>
                        <template v-if="user.like_user.user_type == 'doctor'">
                          <router-link
                            :to="'/viewprofile/' + user.like_user.user_ref_no"
                          >
                            <p>
                              <strong>{{
                                user.like_user.first_name +
                                " " +
                                user.like_user.last_name
                              }}</strong>
                            </p>
                          </router-link>
                        </template>
                        <template v-else>
                          <p>
                            <strong>{{
                              user.like_user.first_name +
                              " " +
                              user.like_user.last_name
                            }}</strong>
                          </p>
                        </template>
                        <p v-if="user.like_user.doctor">
                          {{ user.like_user.doctor.specialityname }}
                        </p>
                      </div>
                    </div>
                    <template v-if="whichmodal == 'post'">
                      <div v-if="getUser.user_ref_no != user.user_ref_no">
                        <template
                          v-if="
                            loader.loading &&
                            loader.loader_ref_no == user.user_ref_no
                          "
                        >
                          <img src="/assets/img/loader-btn.gif" alt="" />
                        </template>
                        <template v-else>
                          <p class="connect" v-if="user.connection_status == 1">
                            <a class="connectbtn active">Request Sent</a>
                          </p>
                          <p
                            class="connect"
                            v-else-if="user.connection_status == 2"
                          >
                            <router-link
                              to="/networks"
                              class="connectbtn respond"
                              >Respond</router-link
                            >
                          </p>
                          <p
                            class="connect"
                            v-else-if="user.connection_status == 3"
                          >
                            <a class="connectbtn">Connected</a>
                          </p>
                          <p class="connect" v-else>
                            <a
                              class="connectbtn"
                              @click.prevent="connectNow(user)"
                              ><sup>+</sup>Connect</a
                            >
                          </p>
                        </template>
                      </div>
                    </template>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import { connectionBackendUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";

export default {
  props: ["likes", "whichmodal"],
  mixins: [mixinRequest, mixinLoader],
  data() {
    return {
      likeData: this.$props.likes,
    };
  },
  methods: {
    closeLikeModal() {
      this.$store.commit("likeModal", false);
    },
    async connectNow(user) {
      let formData = new FormData();
      this.showProcessLoader(user.user_ref_no);

      formData.append("selected_user_ref_no", user.user_ref_no);
      const data = await this.postRequest(connectionBackendUrl, formData);
      if (data.connection_data) {
        const selected_user_ref_no = data.connection_data.selected_user_ref_no;
        this.likeData = this.likeData.map((like) => {
          if (like.user_ref_no == selected_user_ref_no) {
            like.connection_status = 1;
            return like;
          }
          return like;
        });
        this.hideProcessLoader(user.user_ref_no);
      }
    },
  },
};
</script>

<style>
</style>