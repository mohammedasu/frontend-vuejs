<template>
  <div class="col-lg-6 middlesec write-message">
    <div class="card p-3">
      <div>
        <h5>
          <strong>
            {{
              selectedContact
                ? selectedContact.first_name + " " + selectedContact.last_name
                : "Select Contact"
            }}
          </strong>
        </h5>
        <p class="pxssmall greytext mb-2">
          {{
            selectedContact.doctor ? selectedContact.doctor.specialityname : ""
          }}
        </p>
      </div>
      <div class="scrollbarpan" ref="feed" id="scrollBar">
        <div class="scrollbarmain">
          <div v-for="message in sortedMessages" :key="message.message_ref_no">
            <div class="d-flex userprofdtl">
              <div class="profile-md mr-2">
                <img
                  :src="
                    message.fromUser.fullimage
                      ? message.fromUser.fullimage
                      : $store.state.defaultImage
                  "
                  alt=""
                />
              </div>
              <div class="create-postpic">
                <p>
                  <strong
                    >{{
                      message.fromUser
                        ? message.fromUser.first_name +
                          " " +
                          message.fromUser.last_name
                        : ""
                    }} </strong
                  ><span class="pxssmall greytext">{{ message.sendat }}</span>
                </p>
                <p v-html="message.message"></p>
                <a
                  v-if="message.full_file_path != ''"
                  class="clickdownload"
                  @click.prevent="downloadAttachment(message)"
                >
                  <img alt="" src="assets/img/download.svg" /><span
                    class="extension-name"
                    >Download</span
                  ></a
                >
              </div>
            </div>
            <p class="underlinedate"><span></span></p>
          </div>
        </div>
      </div>

      <div>
        <vue-editor
          v-model="form.msg"
          :editorToolbar="customToolbar"
        ></vue-editor>

        <div class="d-sm-flex align-items-center justify-content-between">
          <div class="galleryposticon d-flex align-items-center">
            <div class="galleryposticon">
              <label class="newbtn" title="Attach a file">
                <img
                  id="blah1"
                  width="22"
                  height="22"
                  src="assets/img/paperclip.svg"
                  alt=""
                />
                <input id="Gallery" type="file" @change="readMessageFile" />
                <p class="mb-0">Attach</p>
              </label>
            </div>
            <div class="post-img-prevmain p-2 pr-5" v-if="form.postFile">
              <span class="remove" @click.prevent="removeFile"></span>
              {{ form.postFile.name }}
            </div>
          </div>
          <div>
            <template v-if="loader.loading">
              <img src="/assets/img/loader-btn.gif" alt="" />
            </template>
            <template v-else>
              <button
                type="button"
                class="loaderbtn outlinebtn m-0"
                @click.prevent="sendMessage"
              >
                Send
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import mixinLoader from "../../mixins/loader";
import { fileDownloadBackendUrl } from "../../path";
import mixinRequest from "../../mixins/request";
export default {
  mixins: [mixinLoader, mixinRequest],
  data() {
    return {
      form: {
        msg: "",
        postFile: "",
      },
      customToolbar: [[""]],
      lengthScroll: 5, // this is for stopping the scrolling to go to bottom after load more messages
    };
  },
  created() {
    this.scrollToBottom();
  },
  components: {
    VueEditor,
  },
  computed: {
    ...mapGetters({
      messages: "message/getMessages",
      selectedContact: "message/getSelectedContact",
    }),
    sortedMessages() {
      return _.sortBy(this.messages, [
        (message) => {
          var dateA = new Date(message.created_at).getTime();

          return dateA;
        },
      ]);
    },
  },
  watch: {
    messages() {
      this.scrollToBottom();
    },
  },
  methods: {
    sendMessage() {
      if (this.selectedContact != "") {
        this.showProcessLoader(true);
      }
      if (this.form.msg == "") {
        this.$toast.error("Please enter message!");
        this.hideProcessLoader(true);
        return false;
      }
      this.$emit("sendMessage", {
        message: this.form.msg,
        messageFile: this.form.postFile,
      });
    },
    scrollToBottom() {
      setTimeout(() => {
        // if (this.messages.length <= this.lengthScroll) {
        this.$refs.feed.scrollTop =
          this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
        //}
        document
          .getElementById("scrollBar")
          .addEventListener("scroll", this.handleScroll);
      }, 50);
    },
    readMessageFile(e) {
      this.form.postFile = e.target.files[0];
    },
    removeFile() {
      this.form.postFile = "";
    },
    async downloadAttachment(message) {
      const data = await this.getRequest(
        fileDownloadBackendUrl + "/" + message.message_ref_no
      );
      if (data.message_data) {
        window.location.href = data.message_data;
      }
    },

    handleScroll() {
      if (document.getElementById("scrollBar").scrollTop < 5) {
        this.$store.commit("message/setLoadMore", true);
        this.$store.dispatch("message/loadMoreMessages", this.selectedContact);
        document
          .getElementById("scrollBar")
          .removeEventListener("scroll", this.handleScroll);
      }
    },
  },
};
</script>

<style>
</style>