<template>
  <section>
    <div
      class="modal show createpostpopup sharepost inviteconnections"
      id="inviteconnections"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal Header -->
          <div class="modal-header">
            <h6 class="modal-title text-left">Invite connections</h6>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click.prevent="closeModal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <p class="greytext" v-if="selectedUser.length > 0">
                  You selected {{ selectedUser.length }} user.
                </p>
                <p class="greytext">
                  You can invite maximum 10 connections at a time.
                </p>
                <!-- <div class="searchbox searchboxsingle" id="search">
                  <form>
                    <input
                      type="search"
                      placeholder="Search connections or select below"
                    />
                    <button class="search-btn" type="submit">
                      <img alt="" src="assets/img/searchicon.svg" />
                    </button>
                  </form>
                </div> -->
                <div class="scrollbarpan max-height200 my-2">
                  <div
                    class="listcheckbox"
                    v-for="connection in userconnections"
                    :key="connection.connection_ref_no"
                  >
                    <template
                      v-if="getUser.user_ref_no !== connection.user_ref_no"
                    >
                      <label class="lablecheckbox">
                        <div class="profile-lg">
                          <img
                            :src="
                              connection.fromUser.fullimage
                                ? connection.fromUser.fullimage
                                : $store.state.defaultImage
                            "
                            alt=""
                          />
                        </div>
                        {{ connection.fromUser.first_name | capitalize }}
                        {{ connection.fromUser.last_name }}
                        <input
                          type="checkbox"
                          :id="'connection' + connection.connection_ref_no"
                          value="yes"
                          name="connections"
                          @change="
                            selectUser(
                              connection.user_ref_no,
                              connection.connection_ref_no
                            )
                          "
                        />
                        <span class="chkboxspan"></span>
                      </label>
                    </template>
                    <template v-else>
                      <label class="lablecheckbox">
                        <div class="profile-lg">
                          <img
                            :src="
                              connection.toUser.fullimage
                                ? connection.toUser.fullimage
                                : $store.state.defaultImage
                            "
                            alt=""
                          />
                        </div>
                        {{ connection.toUser.first_name | capitalize }}
                        {{ connection.toUser.last_name }}
                        <input
                          type="checkbox"
                          :id="'connection' + connection.connection_ref_no"
                          value="yes"
                          name="connections"
                          @change="
                            selectUser(
                              connection.selected_user_ref_no,
                              connection.connection_ref_no
                            )
                          "
                        />
                        <span class="chkboxspan"></span>
                      </label>
                    </template>
                  </div>
                  <button
                    v-if="connection_next_page"
                    class="btnfill mx-auto d-flex"
                    @click.prevent="fetchConfirmConnection()"
                  >
                    Load more
                  </button>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <a
                      class="selectbutton px-4"
                      href="#"
                      @click.prevent="backToMember"
                      ><strong>Back</strong></a
                    >
                  </div>
                  <div>
                    <template v-if="loader.loading">
                      <img
                        src="/assets/img/loader-btn.gif"
                        class="float-right"
                        alt=""
                      />
                    </template>
                    <template v-else>
                      <button
                        type="button"
                        class="btnfill m-0"
                        value="Submit"
                        @click.prevent="sendInvite"
                      >
                        Send Invite
                      </button>
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import mixinLoader from "../../mixins/loader";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import { fetchConfirmConnectionBackendUrl, groupMemberUrl } from "../../path";
export default {
  props: ["group_data_pass"],
  mixins: [mixinRequest, mixinLoader, mixinShare],
  created() {
    this.fetchConfirmConnection();
  },
  data() {
    return {
      userconnections: [],
      connection_next_page: null,
      selectedUser: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeInviteModal", { val: false, type: "refresh" });
    },
    backToMember() {
      this.$emit("closeInviteModal", { val: false, type: "back" });
    },
    async fetchConfirmConnection() {
      let callUrl = "";
      if (this.connection_next_page) {
        callUrl = this.connection_next_page;
      } else {
        callUrl = fetchConfirmConnectionBackendUrl;
      }
      const data = await this.getRequest(callUrl);
      if (data.connection_data) {
        if (this.connection_next_page) {
          const moreData = data.connection_data;
          moreData.map((item) => {
            this.userconnections.push(item);
          });
        } else {
          this.userconnections = data.connection_data;
        }
        this.connection_next_page = data.next_page;
      }
    },
    selectUser(userselect_ref_no, connection_ref_no) {
      if (this.selectedUser.length > 0) {
        const result = this.selectedUser.includes(userselect_ref_no);
        if (!result) {
          this.selectedUser.push(userselect_ref_no);
        } else {
          const index = this.selectedUser.indexOf(userselect_ref_no);
          this.selectedUser.splice(index, 1);
        }
      } else {
        this.selectedUser.push(userselect_ref_no);
      }
    },
    async sendInvite() {
      if (this.selectedUser.length <= 10) {
        this.showProcessLoader(this.group_data_pass.group_ref_no);
        let formData = new FormData();
        formData.append("group_ref_no", this.group_data_pass.group_ref_no);
        formData.append("invitation_to_ref_no", this.selectedUser);
        formData.append("invitation_from_ref_no", this.getUser.user_ref_no);
        const data = await this.postRequest(
          groupMemberUrl.addInviteBackendUrl,
          formData
        );
        this.hideProcessLoader(this.group_data_pass.group_ref_no);
        if (data.group_member_data) {
          this.$toast.success("Invitation sent successfully.");
          this.closeModal();
        }
      } else {
        this.$toast.error("Please select only 10 users for invitation!");
      }
    },
  },
};
</script>

<style>
</style>