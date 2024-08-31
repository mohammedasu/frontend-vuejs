<template>
  <section class="footerfixbg">
    <div class="container" v-if="loading_group_data">
      <GroupViewTab
        :group_data_pass="group_data"
        @fetchTabData="fetchTabData"
        @showInviteModal="showHideInviteModal"
      ></GroupViewTab>
      <div id="nav-tabContent" class="tab-content">
        <template
          v-if="
            getUser.user_ref_no == group_data.user_ref_no ||
            group_data.group_privacy == 'public' ||
            (group_data.group_privacy == 'private' &&
              group_data.member_status == 1)
          "
        >
          <div
            id="home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            class="tab-pane fade active show"
          >
            <HomeTab
              :group_data_pass="group_data"
              @redirectTab="redirectTab"
              v-if="hometab"
            ></HomeTab>
          </div>
          <div
            id="about"
            role="tabpanel"
            aria-labelledby="nav-about-tab"
            class="tab-pane fade"
          >
            <div class="row">
              <div class="col-lg-12 middlesec px-sm-0">
                <div class="card p-3">
                  <h4 class="mb-2">About us</h4>
                  <p>
                    {{ group_data.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="members"
            role="tabpanel"
            aria-labelledby="nav-members-tab"
            class="tab-pane fade"
          >
            <MemberTab
              :group_data_pass="group_data"
              v-if="membertab"
            ></MemberTab>
          </div>
        </template>
        <template v-else>
          <HomeTabPrivate :group_data_pass="group_data"></HomeTabPrivate>
        </template>
      </div>
    </div>
    <SendInviteModal
      v-if="invite_modal_show"
      @closeInviteModal="showHideInviteModal"
      :group_data_pass="group_data"
    ></SendInviteModal>
    <postModal
      v-if="$store.state.post.post_popupmodal"
      showCondition="group"
    ></postModal>
  </section>
</template>

<script>
import postModal from "../common/PostModal";
import HomeTab from "./HomeTab";
import HomeTabPrivate from "./HomeTabPrivate";
import MemberTab from "./MemberTab";
import GroupViewTab from "./GroupViewTab";
import mixinGroup from "../../mixins/group/group";
import SendInviteModal from "./SendInviteModal";
import mixinTracking from "../../mixins/tracking";

export default {
  mixins: [mixinGroup,mixinTracking],
  components: {
    GroupViewTab,
    HomeTab,
    HomeTabPrivate,
    MemberTab,
    SendInviteModal,
    postModal,
  },
  created() {
    window.scrollTo(0, 0);

    if (this.$route.name == "editgroup" || this.$route.name == "groupview") {
      if (this.$route.params.group_ref_no) {
        const group_ref_no = this.$route.params.group_ref_no;
        if (this.$route.name == "editgroup") {
          this.edit = group_ref_no;
        }
        this.hometab = true;
        this.fetchGroupData(group_ref_no);
      }
    }
  },
};
</script>

<style>
</style>