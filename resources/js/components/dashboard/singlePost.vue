<template>
  <div class="container">
    <div class="row">
      <DashLeft />
      <div class="col-lg-6 middlesec">
        <section id="post" ref="post">
          <div class="card" v-if="post.post_ref_no">
            <div class="p-3">
              <div class="d-flex align-items-center userprofdtl">
                <div class="profile-lg">
                  <img
                    :src="
                      post.post_user.fullimage
                        ? post.post_user.fullimage
                        : $store.state.defaultImage
                    "
                    alt=""
                    class="cursor-pointer"
                    @click.prevent="openImageBox(post.post_user.fullimage)"
                    v-if="post.posting_as == 'user'"
                  />
                  <img
                    :src="
                      post.sourceimage
                        ? post.sourceimage
                        : $store.state.defaultImage
                    "
                    alt=""
                    class="cursor-pointer"
                    @click.prevent="openImageBox(post.sourceimage)"
                    v-if="post.posting_as != 'user'"
                  />
                </div>
                <div class="create-postpic">
                  <template v-if="post.posting_as != 'user'">
                    <p>
                      <!-- <strong>{{ post.sourcename }} </strong> -->
                      <postlistShow
                        :post="post"
                        @openPostingModal="openPostingModal"
                      ></postlistShow>
                    </p>
                  </template>
                  <template v-else>
                    <template v-if="post.post_user.user_type == 'doctor'">
                      <p>
                        <router-link
                          :to="'/viewprofile/' + post.post_user.user_ref_no"
                          ><strong>{{
                            post.post_user
                              ? post.post_user.first_name +
                                " " +
                                post.post_user.last_name
                              : ""
                          }}</strong></router-link
                        >
                        <template v-if="post.post_user.doctor">
                          <span
                            v-if="post.post_user.doctor.is_kol"
                            :class="
                              post.post_user.user_type == 'doctor' &&
                              post.post_user.doctor.is_kol
                                ? 'kol'
                                : ''
                            "
                            >KOL</span
                          >
                        </template>
                        <postlistShow
                          :post="post"
                          @openPostingModal="openPostingModal"
                        ></postlistShow>
                      </p>

                      <p
                        class="pxssmall greytext letter-spacing"
                        v-if="post.post_user.doctor"
                      >
                        <strong>{{
                          post.post_user.doctor.qualification | capitalize
                        }}</strong>
                      </p>
                    </template>
                    <template v-else>
                      <p v-if="post.post_user.user_type != 'doctor'">
                        <strong
                          >{{
                            post.post_user
                              ? post.post_user.first_name +
                                " " +
                                post.post_user.last_name
                              : ""
                          }}
                        </strong>
                        <postlistShow
                          :post="post"
                          @openPostingModal="openPostingModal"
                        ></postlistShow>
                      </p>
                    </template>
                  </template>
                  <p class="pxssmall greytext">{{ post.published }}</p>
                </div>
              </div>
              <read-more
                more-str="read more"
                :text="post.desc"
                link="#"
                :max-chars="400"
              ></read-more>
            </div>

            <div class="post-picbg">
              <template v-if="post.post_image.length > 0">
                <img
                  class="post-pic"
                  :src="post.post_image"
                  @click.prevent="openImageBox(post.post_image)"
                  alt=""
                />
              </template>
            </div>
            <div class="commentspost">
              <div class="likescomment-md d-flex">
                <div>
                  <span @click.prevent="openLikeModal(post)"
                    >{{ post.like_count ? post.like_count : 0 }} Likes</span
                  >
                </div>
                <a @click.prevent="fetchComments(post)">
                  <span>{{ post.comment_count ? post.comment_count : 0 }}</span>
                  Comments
                </a>
              </div>

              <div class="p-3 d-flex likecommntbtn">
                <div
                  v-if="
                    loader.loading && loader.loader_ref_no == post.post_ref_no
                  "
                >
                  <img src="/assets/img/loader-btn.gif" alt="" />
                </div>
                <div v-else>
                  <a
                    v-if="post.user_liked"
                    class="like active"
                    @click="postUnLike(post)"
                    ><strong>Liked</strong>
                  </a>
                  <a v-else @click="postLike(post)" class="like"
                    ><strong>Like</strong>
                  </a>
                </div>
                <div>
                  <a class="comment" @click.prevent="fetchComments(post)">
                    <strong>Comment</strong>
                  </a>
                </div>
                <div>
                  <a
                    class="share"
                    @click.prevent="
                      openShareModal(post.post_ref_no, post.desc, 'post')
                    "
                  >
                    <strong>Share</strong>
                  </a>
                </div>
              </div>
              <comment
                v-if="showComments && showPostComments == post.post_ref_no"
                :comments="postComments"
                :postData="post"
                isview="view"
                @commentUpdate="commentUpdate"
              ></comment>
            </div>
          </div>
        </section>
      </div>
      <DashRight></DashRight>
    </div>
    <template v-if="$store.state.likeModal">
      <likeModal :likes="likes"></likeModal>
    </template>
    <openListModal
      v-if="openlistmodal"
      :passdata="passdata"
      :source="pass_source"
      @closeListModal="openlistmodal = !openlistmodal"
    />
    <imageBox
      v-if="$store.state.lightBoxModal"
      :user_image="user_image_popup"
    />
  </div>
</template>

<script>
import DashLeft from "./DashLeft";
import DashRight from "./DashRight";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import Comment from "./Comment.vue";
import likeModal from "../common/likeModal";

import mixin from "../../mixins/post";
import mixinLoader from "../../mixins/loader";
import postlistShow from "../common/modals/PostListShow";
import openListModal from "../common/modals/OpenListModal";
import imageBox from "../common/Imagebox";

import {
  singlePostBackendUrl,
  fetchPostCommentsUrl,
  fetchMultiplePageBackendUrl,
  groupUrl,
} from "../../path";

export default {
  name: "singlepost",
  mixins: [mixin, mixinRequest, mixinShare, mixinLoader],
  components: {
    DashLeft,
    DashRight,
    Comment,
    likeModal,
    postlistShow,
    openListModal,
    imageBox,
  },
  data() {
    return {
      post: {},
      likes: [],
      showComments: false,
      showPostComments: null,
      postComments: [],
      passdata: [],
      pass_source: null,
      openlistmodal: false,
      user_image_popup: "",
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    openImageBox(user_image) {
      if (user_image) {
        this.user_image_popup = user_image;
        this.$store.commit("lightBoxModal", true);
      }
    },
    async openLikeModal(post) {
      this.$store.commit("showLoader", true);
      const data = await this.postLikes(post);
      this.likes = data.data.post_like_data;
      this.$store.commit("likeModal", true);
    },
    async fetchPost() {
      const params = this.$route.params;
      if (params.post_ref_no) {
        const url = singlePostBackendUrl + "/" + params.post_ref_no;
        const data = await this.getRequest(url);
        if (data.post_data) {
          this.post = data.post_data;
        }
      }
    },
    async postLike(post) {
      this.showProcessLoader(post.post_ref_no);
      const data = await this.postLikeRequest(post);
      this.hideProcessLoader(post.post_ref_no);

      this.post = data;
    },
    async postUnLike(post) {
      this.showProcessLoader(post.post_ref_no);
      const data = await this.postUnLikeRequest(post);
      this.hideProcessLoader(post.post_ref_no);

      this.post = data;
    },
    commentUpdate(payload) {
      // console.log(payload);
    },
    async fetchComments(post) {
      const url = fetchPostCommentsUrl + "/" + post.post_ref_no;
      const data = await this.getRequest(url);
      if (data.post_comment_data) {
        this.showComments = true;
        this.showPostComments = post.post_ref_no;
        this.postComments = data.post_comment_data;
      }
    },
    async openPostingModal(payload) {
      const post = payload;
      this.pass_source = post.source;
      let url = "";
      if (post.source == "group") {
        url = groupUrl.fetchMultipleGroupBackendUrl + "/" + post.source_ref_no;
      } else if (post.source == "page") {
        url = fetchMultiplePageBackendUrl + "/" + post.source_ref_no;
      }
      const data = await this.getRequest(url);
      this.openlistmodal = true;
      if (post.source == "group") {
        this.passdata = data.group_data;
      } else if (post.source == "page") {
        this.passdata = data.page_data;
      }
    },
  },
};
</script>

<style>
</style>