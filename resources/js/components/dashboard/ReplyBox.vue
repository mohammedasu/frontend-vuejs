<template>
  <div class="create-postpic pl-0">
    <div class="commentbox">
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"
            >{{ $store.state.post.lastCommentUser.first_name }}
            {{ $store.state.post.lastCommentUser.last_name }}</span
          >
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Write a Reply..."
          @keyup.enter="submitReply(commented)"
          v-model="replybox"
        />
      </div>
      <button
        type="button"
        class="sendarrow disabled"
        @click.prevent="submitReply(commented)"
      >
        <img src="/assets/img/send.svg" v-if="!replyloading" alt="" />
        <img
          v-if="replyloading"
          class="ml-1"
          width="18"
          height="18"
          src="/assets/img/loader-blue.gif"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script>
import mixin from "../../mixins/comment";
export default {
  props: ["commented", "mainComment", "lastCommentUser", "isview"],
  data() {
    return {
      replybox: "",
      replyloading: false,
    };
  },
  mixins: [mixin],
  methods: {
    async submitReply(commented) {
      commented.mainComment = this.mainComment;
      const data = await this.submitCommentRequest(commented, "reply");
      this.replybox = "";
      /* if (this.isview == "view") {
        this.$emit("replyUpdate", data);
      } */
      this.$emit("replyUpdate", data);
      // this.$store.dispatch("post/updatePost", data);
      this.$store.dispatch("post/hideReplyBox");
    },
  },
};
</script>

<style scoped>
.input-group-text {
  background-color: #fff !important;
  border-right: none;
}
.form-control {
  border-left: none;
}
</style>