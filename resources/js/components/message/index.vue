<template>
  <div class="container">
    <div class="row">
      <MsgLeft></MsgLeft>
      <MsgRight @sendMessage="sendMessage" v-if="renderRightSide"></MsgRight>
    </div>
  </div>
</template>

<script>
import mixinRequest from "../../mixins/request";
import MsgLeft from "./MsgLeft";
import MsgRight from "./MsgRight";
import { headerConfig } from "../../setHeaders";
import { userUrl, sendMessageBackendUrl } from "../../path";
import { mapGetters } from "vuex";

export default {
  name: "messages",
  mixins: [mixinRequest],
  data() {
    return {
      renderRightSide: true,
    };
  },
  components: {
    MsgLeft,
    MsgRight,
  },
  created() {
    let reloadContactGet = localStorage.getItem("selectedContact");

    if (reloadContactGet) {
      this.$store.commit("message/setContact", JSON.parse(reloadContactGet));
    }

    if (this.selectedContact) {
      let payload = { selectedContact: this.selectedContact };
      this.$store.dispatch("message/fetchMessages", payload);
    }
  },
  computed: mapGetters({
    selectedContact: "message/getSelectedContact",
    contacts: "message/getContacts",
  }),
  methods: {
    incomingMessage(incomingMessage) {
      if (
        this.selectedContact &&
        incomingMessage.from_user_ref_no == this.selectedContact.user_ref_no
      ) {
        this.saveNewMessage(incomingMessage);
        return;
      }
      this.sendNewNotification(incomingMessage, false);
    },
    saveNewMessage(message) {
      this.$store.commit("message/addMessage", message);
      this.$store.dispatch("message/updateUnreadCountBackend", {
        user_ref_no: this.selectedContact.user_ref_no,
      });
    },
    sendNewNotification(incomingMessage, newCheck) {
      this.$store.commit("message/updateUnreadCount", {
        user_ref_no: incomingMessage.from_user_ref_no,
        created_at: incomingMessage.created_at,
        newCheck: newCheck,
        completeMessage: incomingMessage,
      });
    },
    async sendMessage(payload) {
      if (!this.selectedContact.user_ref_no) {
        this.$toast.error("Please select contact!");
        return;
      }
      const formData = new FormData();
      formData.append("message", payload.message);
      formData.append("messageFile", payload.messageFile);
      formData.append("to_user_ref_no", this.selectedContact.user_ref_no);
      const data = await this.postRequest(sendMessageBackendUrl, formData);
      if (data.message_data) {
        this.saveNewMessage(data.message_data);
        this.renderRightSide = false;
        this.$nextTick(() => {
          this.renderRightSide = true;
        });
      }
    },
  },
  async mounted() {
    await axios.get(userUrl.fetchUserBackendUrl, headerConfig).then(
      (response) => {
        let data = response.data.data;
        Echo.private(`messages.${data.user_data.user_ref_no}`).listen(
          "MessageEvent",
          (e) => {
            this.incomingMessage(e.message);
          }
        );
      },
      (err) => {
        return false;
      }
    );
  },
};
</script>