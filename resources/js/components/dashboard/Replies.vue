<template>
  <section id="replies">
    <div class="viewmorecomment" :id="'comment_' + mainComment">
      <div
        class="create-post mt-2 mb-0"
        v-for="reply in replies"
        :key="reply.post_comment_ref_no"
      >
        <div class="profile-md">
          <img
            :src="
              reply.commentuser.fullimage
                ? reply.commentuser.fullimage
                : $store.state.defaultImage
            "
            alt=""
          />
        </div>
        <div class="create-postpic">
          <div class="comment-greybg">
            <div class="namechat d-flex">
              <div>
                <strong>{{
                  reply.commentuser
                    ? reply.commentuser.first_name +
                      " " +
                      reply.commentuser.last_name
                    : ""
                }}</strong>
                <template v-if="reply.commentuser.doctor">
                  <span
                    v-if="reply.commentuser.doctor.is_kol"
                    :class="
                      reply.commentuser.user_type == 'doctor' &&
                      reply.commentuser.doctor.is_kol
                        ? 'kol'
                        : ''
                    "
                    >KOL</span
                  >
                </template>
              </div>
              <div class="greytext">{{ reply.published }}</div>
              <div
                class="treedotdrop"
                v-if="getUser.user_ref_no == reply.user_ref_no"
              >
                <div class="dropdown">
                  <button class="dropbtn" @click.prevent="openDelete(reply)">
                    ...
                  </button>
                  <div :id="reply.post_comment_ref_no" class="dropdown-content">
                    <a
                      class="model_alerttbtn"
                      @click.prevent="openConfirm(reply)"
                      ><img
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
            <p>
              <span class="badge badge-info">
                {{
                  reply.reply_to_user
                    ? reply.reply_to_user.first_name +
                      " " +
                      reply.reply_to_user.last_name
                    : ""
                }}</span
              >
              <span v-html="reply.desc"></span>
            </p>
          </div>
          <div class="likereply-sm d-flex">
            <div v-if="reply.user_liked">
              <a
                @click.prevent="commentDisLike(reply, 'reply')"
                style="color: blue"
                >Liked</a
              >
              <span>{{
                reply.comment_likes ? reply.comment_likes.length : 0
              }}</span>
            </div>
            <div v-else>
              <a @click.prevent="commentLike(reply, 'reply')">Like</a>
              <span>{{
                reply.comment_likes ? reply.comment_likes.length : 0
              }}</span>
            </div>

            <div class="divdr-sm">I</div>
            <div>
              <a @click="replyBox(reply)">Reply</a>
<!--               <span>{{ reply.replies ? reply.replies.length : 0 }}</span>
 -->            </div>
          </div>
        </div>

        <!-- <replies
          :replies="reply.replies"
          :mainComment="mainComment"
          :lastCommentUser="lastCommentUser"
          @openDelete="openDelete"
          @openConfirm="openConfirm"
          :isview="isview"
          @replyUpdate="replyUpdate"
        ></replies> -->
      </div>
    </div>
  </section>
</template>

<script>
import mixin from "../../mixins/comment";
export default {
  name: "replies",
  props: ["replies", "mainComment", "lastCommentUser", "isview"],
  mixins: [mixin],
  data() {
    return {
      lastPost: {},
    };
  },
  methods: {
    async commentLike(reply, appendType) {
      reply.appendType = appendType;
      reply.mainComment = this.$props.mainComment;
      const data = await this.commentLikeRequest(reply);
      //this.lastPost = data;
      /*   if (this.isview == "view") {
        this.$emit("replyUpdate", data);
      } */
      this.$emit("replyUpdate", data);
    },
    async commentDisLike(reply, appendType) {
      reply.appendType = appendType;
      reply.mainComment = this.$props.mainComment;
      const data = await this.commentDisLikeRequest(reply);
      // this.lastPost = data;

      /*  if (this.isview == "view") {
        this.$emit("replyUpdate", data);
      } */
      this.$emit("replyUpdate", data);
    },
    replyUpdate(data) {
      this.$emit("replyUpdate", data);
    },
    replyBox(reply) {
      reply.mainComment = this.$props.mainComment;
      this.$store.dispatch("post/showReplyBox", reply);
    },
    openDelete(reply) {
      this.$emit("openDelete", reply);
    },
    openConfirm(reply) {
      reply.appendType = "reply";
      reply.mainComment = this.mainComment;
      this.$emit("openConfirm", reply);
    },
  },
};
</script>

<style>
</style>