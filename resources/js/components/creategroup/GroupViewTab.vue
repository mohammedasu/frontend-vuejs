<template>
  <div class="row compnyvprofl pagehomepublic group margin-top-16">
    <div class="col-lg-12 middlesec px-sm-0">
      <div class="card">
        <div class="compnyvprofl-img">
          <img
            :src="
              group_data_pass.coverimage
                ? group_data_pass.coverimage
                : $store.state.imageShow
            "
            alt=""
          />
        </div>
        <div class="d-md-flex position-relative">
          <div class="compnyvproflname">
            <h4>
              {{ group_data_pass.name | capitalize }}
              <div
                class="tagbtn"
                v-if="getUser.user_ref_no == group_data_pass.user_ref_no"
              >
                Owner
              </div>
            </h4>
            <p class="pxxssmall greytext mb-0">
              {{ group_data_pass.group_privacy | capitalize }} Group I
              {{ group_data_pass.total_members }} Members
            </p>
          </div>
          <div class="postionrigt" id="share_url">
            <div class="d-flex justify-content-end pt-3">
              <div class="treedotdrop">
                <div class="dropdown">
                  <button @click.prevent="openDropDown" class="dropbtn">
                    ...
                  </button>
                  <p ref="mylink" style="display: none">
                    {{ group_data_pass.group_ref_no }}
                  </p>
                  <div id="dropdown_list" class="dropdown-content">
                    <router-link
                      :to="'/creategroup/' + group_data_pass.group_ref_no"
                      class="model_alerttbtn"
                      v-if="group_data_pass.user_ref_no == getUser.user_ref_no"
                    >
                      <img
                        alt=""
                        width="18"
                        height="18"
                        src="/assets/img/edit.svg"
                      />Edit Group</router-link
                    >
                    <a
                      class="model_alerttbtn"
                      @click.prevent="
                        openShareModal(
                          group_data_pass.group_ref_no,
                          group_data_pass.name,
                          'group'
                        )
                      "
                    >
                      <img
                        alt=""
                        width="18"
                        height="18"
                        src="/assets/img/share-black.svg"
                      />Share Group</a
                    >
                    <a class="model_alerttbtn" @click.prevent="copyURL">
                      <img
                        alt=""
                        width="18"
                        height="18"
                        src="/assets/img/link.svg"
                      />Copy Group Link</a
                    >
                    <a
                      class="model_alerttbtn"
                      data-toggle="modal"
                      data-target="#help"
                    >
                      <img
                        alt=""
                        width="18"
                        height="18"
                        src="/assets/img/help.svg"
                      />Help</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <template
                v-if="
                  loader.loading &&
                  loader.loader_ref_no == group_data_pass.group_ref_no
                "
              >
                <img
                  src="/assets/img/loader-btn.gif"
                  alt=""
                  width="70"
                  class="text-center mx-auto mt-4"
                />
              </template>
              <template v-else>
                <a
                  href="#"
                  @click.prevent="sendDirectJoinRequest(group_data_pass)"
                  class="btnfill mt-3"
                  v-if="
                    group_data_pass.member_status == -1 &&
                    group_data_pass.user_ref_no != getUser.user_ref_no
                  "
                >
                  <img class="mr-1" alt="" />Join Group</a
                >
                <a
                  href="#"
                  class="btnfill mt-3 active"
                  v-if="
                    group_data_pass.member_status == 0 &&
                    group_data_pass.user_ref_no != getUser.user_ref_no
                  "
                >
                  <img class="mr-1" alt="" />Request Sent</a
                >
                <a
                  href="#"
                  class="btnfill invitebtn mt-3"
                  v-if="
                    group_data_pass.member_status == 1 ||
                    group_data_pass.user_ref_no == getUser.user_ref_no
                  "
                  @click.prevent="showInviteModal"
                >
                  <img
                    class="mr-1"
                    alt=""
                    src="/assets/img/invite.svg"
                  />Invite</a
                >
              </template>
            </div>
          </div>
        </div>
        <div id="nav-tab" role="tablist" class="nav nav-tabs">
          <a
            id="nav-home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            class="nav-item nav-link active show"
            @click.prevent="fetchTabData('home')"
            >Home</a
          >
          <a
            id="nav-about-tab"
            data-toggle="tab"
            href="#about"
            role="tab"
            aria-controls="nav-about"
            aria-selected="false"
            class="nav-item nav-link"
            @click.prevent="fetchTabData('about')"
            v-if="
              getUser.user_ref_no == group_data_pass.user_ref_no ||
              group_data_pass.group_privacy == 'public' ||
              (group_data_pass.group_privacy == 'private' &&
                group_data_pass.member_status == 1)
            "
            >About</a
          >
          <a
            id="nav-members-tab"
            data-toggle="tab"
            href="#members"
            role="tab"
            aria-controls="nav-members"
            aria-selected="false"
            class="nav-item nav-link"
            @click.prevent="fetchTabData('member')"
            v-if="
              getUser.user_ref_no == group_data_pass.user_ref_no ||
              group_data_pass.group_privacy == 'public' ||
              (group_data_pass.group_privacy == 'private' &&
                group_data_pass.member_status == 1)
            "
            >Members</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinGroup from "../../mixins/group/group";

export default {
  props: ["group_data_pass"],
  mixins: [mixinGroup],
  methods: {
    openDropDown() {
      const idSelect = document.getElementById("dropdown_list");
      idSelect.classList.toggle("show");
    },
    copyURL() {
      var ref_no = this.group_data_pass.group_ref_no;
      const domainname = window.location.origin + "/group/" + ref_no;
      var input = document
        .getElementById("share_url")
        .appendChild(document.createElement("input"));
      input.value = domainname;
      input.focus();
      input.select();
      document.execCommand("copy");
      input.style.display = "none";
      this.$toast.success("Link copied!");
    },
    fetchTabData(tabtxt) {
      this.$emit("fetchTabData", tabtxt);
    },
    showInviteModal() {
      this.$emit("showInviteModal", { val: true, type: "open" });
    },
  },
};
</script>

<style>
</style>