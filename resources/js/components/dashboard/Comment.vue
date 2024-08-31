<template>
  <section id="comments">
    <div class="create-post">
      <div class="profile-md">
        <img
          :src="
            getUser.fullimage ? getUser.fullimage : $store.state.defaultImage
          "
          alt=""
        />
      </div>
      <div class="create-postpic">
        <div class="commentbox">
          <input
            type="text"
            class="mb-0"
            @keyup.enter="submitComment(postData)"
            placeholder="Write a comment..."
            v-model="post_comment"
            :id="'post' + postData.post_ref_no"
          />
          <button
            type="button"
            class="sendarrow disabled"
            @click.prevent="submitComment(postData)"
          >
            <img src="/assets/img/send.svg" v-if="!commentloading" alt="" />
            <img
              v-if="commentloading"
              class="ml-1"
              width="18"
              height="18"
              src="/assets/img/loader-blue.gif"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
    <template v-if="postcomments.length > 0">
      <div
        class="create-post mt-2 mb-0"
        v-for="comment in postcomments"
        :key="comment.post_comment_ref_no"
      >
        <div class="profile-md">
          <img
            alt=""
            :src="
              comment.commentuser.fullimage
                ? comment.commentuser.fullimage
                : $store.state.defaultImage
            "
          />
        </div>
        <div class="create-postpic">
          <div class="comment-greybg">
            <div class="namechat d-flex">
              <div>
                <strong>{{
                  comment.commentuser
                    ? comment.commentuser.first_name +
                      " " +
                      comment.commentuser.last_name
                    : ""
                }}</strong>
                <template v-if="comment.commentuser.doctor">
                  <span
                    v-if="comment.commentuser.doctor.is_kol"
                    :class="
                      comment.commentuser.user_type == 'doctor' &&
                      comment.commentuser.doctor.is_kol
                        ? 'kol'
                        : ''
                    "
                    >KOL</span
                  >
                </template>
              </div>
              <div class="greytext">
                {{ comment.published }}

                <div
                  class="treedotdrop"
                  v-if="getUser.user_ref_no == comment.user_ref_no"
                >
                  <div class="dropdown">
                    <button
                      @click.prevent="openDelete(comment)"
                      class="dropbtn"
                    >
                      ...
                    </button>
                    <div
                      :id="comment.post_comment_ref_no"
                      class="dropdown-content"
                    >
                      <a
                        class="model_alerttbtn"
                        @click.prevent="openConfirm(comment)"
                      >
                        <img
                          alt=""
                          width="15"
                          height="15"
                          src="/assets/img/delete.svg"
                        />Delete</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-html="comment.desc"></p>
          </div>
          <div class="likereply-sm d-flex">
            <div v-if="comment.user_liked">
              <a
                @click.prevent="commentDisLike(comment, 'comment')"
                style="color: #4456a6"
                >Liked</a
              >
              <span>{{
                comment.comment_likes ? comment.comment_likes.length : 0
              }}</span>
            </div>
            <div v-else>
              <a @click.prevent="commentLike(comment, 'comment')">Like</a>
              <span>{{
                comment.comment_likes ? comment.comment_likes.length : 0
              }}</span>
            </div>
            <div class="divdr-sm">I</div>
            <div>
              <a @click="replyBox(comment)">Reply</a>
              <span>{{ comment.replies ? comment.replies.length : 0 }}</span>
            </div>
          </div>

          <!--<a href="" class="showreplies">Show Replies </a>-->
          <Replies
            :replies="comment.replies"
            :mainComment="comment.post_comment_ref_no"
            :lastCommentUser="comment.commentuser"
            @openDelete="openDelete"
            @openConfirm="openConfirm"
            :isview="isview"
            @replyUpdate="replyUpdate"
          ></Replies>
        </div>
        <ReplyBox
          v-if="
            $store.state.post.replyboxcheck &&
            comment.post_comment_ref_no == $store.state.post.mainComment
          "
          :commented="$store.state.post.commentBoxVal"
          :mainComment="$store.state.post.mainComment"
          :lastCommentUser="$store.state.post.lastCommentUser"
          :isview="isview"
          @replyUpdate="replyUpdate"
        ></ReplyBox>
      </div>
    </template>
    <template v-if="openDeleteBox">
      <deleteModal
        @closeConfirm="closeConfirmBox"
        @deleteConfirm="deleteConfirm"
      />
    </template>
  </section>
</template>

<script>
import Replies from "./Replies";
import ReplyBox from "./ReplyBox";
import mixin from "../../mixins/comment";
import mixinRequest from "../../mixins/request";

import deleteModal from "./deleteModal";
import { deleteCommentBackendUrl } from "../../path";

export default {
  props: ["postData", "isview", "comments", "comment_next_page"],
  components: {
    Replies,
    ReplyBox,
    deleteModal,
  },
  data() {
    return {
      post_comment: "",
      show_reply: false,
      openDeleteBox: false,
      deleteData: {},
      postcomments: this.$props.comments,
      commentloading: false,
    };
  },
  mixins: [mixin, mixinRequest],
  methods: {
    async submitComment(val) {
      const data = await this.submitCommentRequest(val, "");
      if (data) {
        this.post_comment = "";
        if (this.isview == "view") {
          this.$emit("commentUpdate", data);
        }
        const originalState = [...this.postcomments];
        originalState.unshift(data.post_comment_data);
        this.postcomments = originalState;
        this.$store.commit("post/updateCommentCount", {
          post_ref_no: val.post_ref_no,
          type: "increment",
        });
      }
    },
    openDelete(comment) {
      const commentSelect = document.getElementById(
        comment.post_comment_ref_no
      );
      commentSelect.classList.toggle("show");
    },
    openConfirm(comment) {
      this.openDeleteBox = true;
      this.deleteData = comment;
    },
    closeConfirmBox(payload) {
      this.openDeleteBox = payload;
      const commentSelect = document.getElementById(
        this.deleteData.post_comment_ref_no
      );
      commentSelect.classList.toggle("show");
    },
    async deleteConfirm(payload) {
      this.openDeleteBox = payload;
      let formData = new FormData();
      if (this.deleteData.appendType) {
        formData.append("appendType", "reply");
      } else {
        formData.append("appendType", "comment");
      }
      formData.append("mainComment", this.deleteData.mainComment);
      formData.append("_method", "delete");
      formData.append("post_ref_no", this.deleteData.post_ref_no);
      formData.append(
        "post_comment_ref_no",
        this.deleteData.post_comment_ref_no
      );
      this.$store.commit("showLoader", true);

      const data = await this.postRequest(deleteCommentBackendUrl, formData);
      if (data.post_comment_data) {
        if (this.isview == "view") {
          this.$emit("commentUpdate", data.post_comment_data);
        }
        if (this.deleteData.appendType == "reply") {
          this.replyUpdate(data);
        } else {
          const index = this.postcomments.indexOf(this.deleteData);
          this.postcomments.splice(index, 1);
          this.$store.commit("post/updateCommentCount", {
            post_ref_no: this.deleteData.post_ref_no,
            type: "decrement",
          });
        }
      } else {
        this.$toast.error("Unable to delete!");
      }
    },
    replyBox(val) {
      this.$store.dispatch("post/showReplyBox", val);
    },
    replyUpdate(payload) {
      if (payload) {
        this.postcomments = this.postcomments.map((comment) => {
          if (
            comment.post_comment_ref_no ===
            payload.post_comment_data.post_comment_ref_no
          ) {
            return payload.post_comment_data;
          }
          return comment;
        });
      }
    },
    async commentLike(comment, appendType) {
      comment.appendType = appendType;
      const data = await this.commentLikeRequest(comment);
      if (this.isview == "view") {
        this.$emit("commentUpdate", data);
      }
      if (data.post_comment_data) {
        this.changeCommentLikeCount(data.post_comment_data);
      }
    },
    async commentDisLike(comment, appendType) {
      comment.appendType = appendType;
      const data = await this.commentDisLikeRequest(comment);
      if (this.isview == "view") {
        this.$emit("commentUpdate", data);
      }
      if (data.post_comment_data) {
        this.changeCommentLikeCount(data.post_comment_data);
      }
    },
    changeCommentLikeCount(commentresponse) {
      this.postcomments = this.postcomments.map((comment) => {
        if (
          commentresponse.post_comment_ref_no === comment.post_comment_ref_no
        ) {
          return commentresponse;
        }
        return comment;
      });
    },
  },
};
</script>