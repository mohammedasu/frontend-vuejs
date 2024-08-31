<template>
  <section>
    <div class="modal show createpostpopup peoplelikepopup" id="members">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Please Wait...</span>
            <img src="assets/img/loader.gif" alt="Please Wait..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Members</h5>
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
          <div class="modal-body">
            <form class="form" id="myform">
              <div class="scrollbarpan">
                <p class="nofound-sm" v-if="modal_groupmembers.length < 1">
                  No members found
                </p>
                <ul class="userlist-bordr">
                  <li
                    v-for="member in modal_groupmembers"
                    :key="member.member_ref_no"
                  >
                    <div class="d-flex align-items-center" v-if="member.user">
                      <div class="profile-md">
                        <img
                          :src="
                            member.user.fullimage
                              ? member.user.fullimage
                              : $store.state.defaultImage
                          "
                          alt=""
                        />
                      </div>
                      <div>
                        <template v-if="member.user.user_type == 'doctor'">
                          <router-link
                            :to="'/viewprofile/' + member.user.user_ref_no"
                          >
                            <p>
                              <strong>{{
                                member.user.first_name +
                                " " +
                                member.user.last_name
                              }}</strong>
                              <template v-if="member.user.doctor">
                                <span
                                  v-if="member.user.doctor.is_kol"
                                  :class="
                                    member.user.user_type == 'doctor' &&
                                    member.user.doctor.is_kol
                                      ? 'kol'
                                      : ''
                                  "
                                  >KOL</span
                                ></template
                              >
                            </p>
                          </router-link>
                        </template>
                        <template v-else>
                          <p>
                            <strong>{{
                              member.user.first_name +
                              " " +
                              member.user.last_name
                            }}</strong>
                          </p>
                        </template>
                        <p class="greytext" v-if="member.user.doctor">
                          {{
                            member.user.doctor.specialityname
                              ? member.user.doctor.specialityname
                              : ""
                          }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <button
                  v-if="modal_next_page"
                  class="btnfill mx-auto d-flex"
                  @click.prevent="loadMoreMember()"
                >
                  Load more
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import mixinGroup from "../../mixins/group/group";

export default {
  name: "membermodal",
  mixins: [mixinGroup],
  props: ["group_data_pass"],
  created() {
    this.fetchGroupMembersInModal(this.group_data_pass);
  },
  data() {
    return {
      modal_groupmembers: [],
      modal_next_page: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", { val: false, type: "close" });
    },
    loadMoreMember() {
      this.fetchGroupMembersInModal(this.group_data_pass, "more");
    },
  },
};
</script>

<style>
</style>