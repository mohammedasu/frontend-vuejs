<template>
  <section id="contacts">
    <p v-if="sortedContacts.length < 1">No Contacts!</p>
    <a
      @click="contactSelect(contact)"
      v-for="contact in sortedContacts"
      :key="contact.connection_ref_no"
    >
      <template v-if="getUser.user_ref_no !== contact.user_ref_no">
        <div class="d-flex userprofdtl">
          <div class="profile-lg">
            <img
              :src="
                contact.fromUser.fullimage
                  ? contact.fromUser.fullimage
                  : $store.state.defaultImage
              "
              alt=""
            />
          </div>
          <div class="create-postpic">
            <p>
              <strong>{{
                contact.fromUser
                  ? contact.fromUser.first_name +
                    " " +
                    contact.fromUser.last_name
                  : ""
              }}</strong>
              <template v-if="contact.lastMessage">
                <span>{{ contact.lastMessage.last_message_date }}</span>
              </template>
            </p>
            <template v-if="contact.lastMessage">
              <!-- <template v-if="contact.lastMessage.decryptmessage.length > 20">
                <p
                  class="greytext"
                  v-html="
                    contact.lastMessage.decryptmessage.substring(0, 20) + '...'
                  "
                ></p>
              </template> -->
              <template>
                <p
                  class="greytext"
                  v-html="contact.lastMessage.decryptmessage.substring(0, 20)"
                ></p>
              </template>
            </template>
            <span class="count" v-if="contact.unread">{{
              contact.unread
            }}</span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="d-flex userprofdtl">
          <div class="profile-lg">
            <img
              :src="
                contact.toUser.fullimage
                  ? contact.toUser.fullimage
                  : $store.state.defaultImage
              "
              alt=""
            />
          </div>
          <div class="create-postpic">
            <p>
              <strong>{{
                contact.toUser
                  ? contact.toUser.first_name + " " + contact.toUser.last_name
                  : ""
              }}</strong>
              <template v-if="contact.lastMessage">
                <span>{{ contact.lastMessage.last_message_date }}</span>
              </template>
            </p>
            <template v-if="contact.lastMessage">
              <!--  <template v-if="contact.lastMessage.decryptmessage.length > 20">
                <p
                  class="greytext"
                  v-html="
                    contact.lastMessage.decryptmessage.substring(0, 20) + '...'
                  "
                ></p>
              </template> -->
              <template>
                <p
                  class="greytext"
                  v-html="contact.lastMessage.decryptmessage.substring(0, 20)"
                ></p>
              </template>
            </template>
            <span class="count" v-if="contact.unread">{{
              contact.unread
            }}</span>
          </div>
        </div>
      </template>
    </a>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    contactSelect(val) {
      let selectContact = "";
      if (this.$store.state.user.user_ref_no !== val.user_ref_no) {
        selectContact = val.fromUser;
      } else {
        selectContact = val.toUser;
      }
      localStorage.setItem("selectedContact", JSON.stringify(selectContact));
      let payload = { selectedContact: selectContact };
      this.$store.dispatch("message/setMessageContact", payload);
      this.$store.dispatch("message/fetchMessages", payload);
    },
  },
  computed: {
    ...mapGetters({
      contacts: "message/getContacts",
      messages: "message/getMessages",
      notifications: "message/getNotification",
      selectedContact: "message/getSelectedContact",
    }),

    sortedContacts: function () {
      this.contacts.sort((a, b) => {
        return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
      });
      return this.contacts;
    },
  },

  watch: {
    contacts() {
      return this.$store.state.message.contacts;
    },
  },
};
</script>

<style>
</style>