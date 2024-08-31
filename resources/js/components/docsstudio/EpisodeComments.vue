<template>
  <section>
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
            placeholder="Write a comment..."
            @keyup.enter="submitComment(episodeData)"
            v-model="episode_comment"
            :id="'episode' + episodeData.episode_ref_no"
          />
          <button
            type="button"
            class="sendarrow"
            @click.prevent="submitComment(episodeData)"
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
    <div
      class="create-post mt-2 mb-0"
      v-for="comment in episodecomments"
      :key="comment.episode_comment_ref_no"
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
            </div>
            <div class="greytext">
              {{ comment.published }}
              <div
                class="treedotdrop"
                v-if="getUser.user_ref_no == comment.user_ref_no"
              >
                <div class="dropdown">
                  <button @click.prevent="openDelete(comment)" class="dropbtn">
                    ...
                  </button>
                  <div
                    :id="comment.episode_comment_ref_no"
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
      </div>
      <!--       <a href="" class="viewmorecomments">View more comments</a>
 -->
    </div>
    <template v-if="openDeleteBox">
      <deleteModal
        @closeConfirm="closeConfirmBox"
        @deleteConfirm="deleteConfirm"
      />
    </template>
  </section>
</template>

<script>
import mixinEpisode from "../../mixins/episode";
import deleteModal from "../dashboard/deleteModal";

export default {
  props: ["comments", "comment_next_page", "episodeData"],
  mixins: [mixinEpisode],
  data() {
    return {
      episodecomments: this.$props.comments,
      episode_comment: "",
      commentloading: false,
      openDeleteBox: false,
      deleteData: {},
    };
  },
  components: {
    deleteModal,
  },
};
</script>

<style>
</style>