<template>
  <section id="post" ref="post">
    <div v-if="getPosts.length < 1 && $store.state.post.showpost">
      <div class="card">
        <div class="text-center py-4">
          <img src="/assets/img/nopost-image.png" alt="" />
          <h5>No post found at this moment.</h5>
          <p v-if="posttxt == 'page'" class="greytext">
            Like our page and stay tuned for more updates.
          </p>
        </div>
      </div>
    </div>
    <template v-if="getPosts.length > 0">
      <div class="card" v-for="post in getPosts" :key="post.post_ref_no">
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
                  post.sourceimage ? post.sourceimage : $store.state.imageShow
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
            <div
              class="treedotdrop"
              v-if="getUser.user_ref_no == post.user_ref_no"
            >
              <div class="dropdown">
                <button class="dropbtn" @click="openDelete(post)">...</button>
                <div :id="post.post_ref_no" class="dropdown-content">
                  <a class="model_alerttbtn" @click.prevent="openConfirm(post)"
                    ><img
                      alt=""
                      width="15"
                      height="15"
                      src="/assets/img/delete.svg"
                    /><strong>Delete Post</strong></a
                  >
                </div>
              </div>
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
                >{{ post.like_count ? post.like_count : 0 }}
                Likes
              </span>
            </div>
            <a @click.prevent="fetchComments(post)">
              <span>{{ post.comment_count ? post.comment_count : 0 }}</span>
              Comments
            </a>
          </div>

          <div class="p-3 d-flex likecommntbtn">
            <div
              v-if="loader.loading && loader.loader_ref_no == post.post_ref_no"
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
            :comment_next_page="commentNextPage"
            :postData="post"
            isview=""
          ></comment>
          <a
            @click.prevent="loadMoreComments(post)"
            v-if="commentNextPage && showPostComments == post.post_ref_no"
            class="viewmorecomments"
            >View more comments</a
          >
        </div>
      </div>
    </template>
    <div
      v-infinite-scroll="handleScroll"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    ></div>
    <template v-if="openConfirmBox">
      <deleteModal
        @closeConfirm="closeConfirmBox"
        @deleteConfirm="deleteConfirmPost"
      />
    </template>
    <template v-if="openDeleteList">
      <deletelistModal :post="deleteModal" @closeDeleteList="closeDeleteList" />
    </template>
    <template v-if="$store.state.likeModal">
      <likeModal :likes="likes" whichmodal="post"></likeModal>
    </template>
    <postModal v-if="$store.state.post.post_popupmodal" showCondition="post" />
    <posttoModal v-if="$store.state.post.post_topopupmodal" />
    <postasModal v-if="$store.state.post.post_aspopupmodal" />
    <postlistModal v-if="$store.state.post.post_listpopupmodal" />
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Comment from "./Comment.vue";
import deleteModal from "./deleteModal";
import deletelistModal from "./deleteListModal";
import likeModal from "../common/likeModal";
import mixin from "../../mixins/post";
import mixinPubishPost from "../../mixins/publishpost";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import mixinLoader from "../../mixins/loader";
import postModal from "../common/PostModal";
import posttoModal from "../common/modals/PostToModal";
import postasModal from "../common/modals/PostAsModal";
import postlistModal from "../common/modals/PostListModal";
import postlistShow from "../common/modals/PostListShow";
import openListModal from "../common/modals/OpenListModal";

import imageBox from "../common/Imagebox";
import {
  deletePostBackendUrl,
  fetchPostCommentsUrl,
  fetchMultiplePageBackendUrl,
  groupUrl,
} from "../../path";
export default {
  props: ["posttxt", "ref_no"],
  data() {
    return {
      openConfirmBox: false,
      openDeleteList: false,
      openlistmodal: false,
      passdata: [],
      pass_source: null,
      deletePost: {},
      likes: [],
      showComments: false,
      showPostComments: null,
      commentNextPage: null,
      postComments: [],
      user_image_popup: "",
      busy: false,
    };
  },
  mixins: [mixin, mixinRequest, mixinShare, mixinLoader, mixinPubishPost],
  components: {
    Comment,
    deleteModal,
    deletelistModal,
    likeModal,
    postModal,
    posttoModal,
    postasModal,
    postlistModal,
    postlistShow,
    openListModal,
    imageBox,
  },
  created() {
    if (this.$route.name == "dashboard") {
      this.$store.commit("post/changePostAs", {
        txt: "user",
      });
    }
    this.$store.dispatch("post/getPost", {
      posttxt: this.posttxt,
      ref_no: this.ref_no,
    });
  },
  computed: {
    ...mapGetters({
      getPosts: "post/getPosts",
    }),
  },
  methods: {
    closeDeleteList() {
      this.openDeleteList = !this.openDeleteList;
      this.openDelete(this.deleteModal);
    },
    openImageBox(user_image) {
      if (user_image) {
        this.user_image_popup = user_image;
        this.$store.commit("lightBoxModal", true);
      }
    },
    async postLike(post) {
      this.showProcessLoader(post.post_ref_no);
      const data = await this.postLikeRequest(post);
      this.hideProcessLoader(post.post_ref_no);
      this.$store.dispatch("post/updatePost", data);
    },
    async postUnLike(post) {
      this.showProcessLoader(post.post_ref_no);
      const data = await this.postUnLikeRequest(post);
      this.hideProcessLoader(post.post_ref_no);
      this.$store.dispatch("post/updatePost", data);
    },
    handleScroll() {
      this.$store.commit("post/loadMore");
      this.$store.dispatch("post/loadMore");
    },
    openDelete(post) {
      const postSelect = document.getElementById(post.post_ref_no);
      postSelect.classList.toggle("show");
    },
    async openLikeModal(post) {
      this.$store.commit("showLoader", true);
      const data = await this.postLikes(post);
      this.likes = data.data.post_like_data;
      this.$store.commit("likeModal", true);
    },
    openConfirm(post) {
      this.openConfirmBox = true;
      this.deleteModal = post;
    },
    closeConfirmBox(payload) {
      this.openConfirmBox = payload;
      const postSelect = document.getElementById(this.deleteModal.post_ref_no);
      postSelect.classList.toggle("show");
    },
    async deleteConfirmPost(payload) {
      this.openConfirmBox = payload;
      if (this.deleteModal.is_upload_at_multiple_source) {
        this.openDeleteList = true;
      } else {
        let formData = new FormData();
        formData.append("_method", "delete");
        formData.append("post_ref_no", this.deleteModal.post_ref_no);
        const data = await this.postRequest(deletePostBackendUrl, formData);
        if (data.post_data) {
          this.$store.dispatch("post/deletePost", this.deleteModal);
          this.$toast.error("Post deleted!");
        }
      }
    },
    async fetchComments(post) {
      this.showComments = false;
      const url = fetchPostCommentsUrl + "/" + post.post_ref_no;
      const data = await this.getRequest(url);
      if (data.post_comment_data) {
        this.showPostComments = post.post_ref_no;
        this.postComments = data.post_comment_data;
        this.commentNextPage = data.next_page;
        this.$nextTick(() => {
          this.showComments = true;
        });
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

    async loadMoreComments(post) {
      const url = this.commentNextPage;
      const data = await this.getRequest(url);
      if (data.post_comment_data) {
        this.showComments = false;
        this.showPostComments = post.post_ref_no;
        const comments = data.post_comment_data;
        const originalState = [...this.postComments];
        comments.map((comment) => {
          originalState.push(comment);
        });
        this.postComments = originalState;
        this.commentNextPage = data.next_page;
        this.$nextTick(() => {
          this.showComments = true;
        });
      }
    },
  },
};
</script>

<style >
#readmore {
  float: right;
}
</style>