<template>
  <div
    id="home"
    role="tabpanel"
    aria-labelledby="nav-home-tab"
    class="tab-pane fade active show"
  >
    <div class="row">
      <div class="col-lg-12 middlesec px-sm-0">
        <div class="card px-3 pt-3 pb-0 asidesec">
          <h4 class="mb-3 mr-3">About the group</h4>
          <div class="pxxxssmall mb-3">
            <p class="pxxxssmall" v-if="!readmore">
              {{ group_data_pass.description.slice(0, 200) }}
            </p>
            <details
              v-if="group_data_pass.description.length > 200 && !readmore"
            >
              <summary v-if="!readmore">
                <span class="py-2" id="open" @click.prevent="openReadMore">
                  Read More</span
                >
              </summary>
            </details>
            <p class="pxxxssmall" v-if="readmore">
              {{ group_data_pass.description }}
            </p>
          </div>
        </div>
        <div class="card px-3 pt-3 pb-0">
          <h4 class="mb-2">Members</h4>
          <div
            class="d-flex align-items-center membercard justify-content-start"
          >
            <div class="profile-lg">
              <img
                :src="
                  group_data_pass.groupuser.fullimage
                    ? group_data_pass.groupuser.fullimage
                    : $store.state.defaultImage
                "
                alt=""
              />
            </div>
            <div class="membercarddetails">
              <h6>
                {{ group_data_pass.groupuser.first_name | capitalize }}
                {{ group_data_pass.groupuser.last_name }}
              </h6>
              <p
                v-if="group_data_pass.groupuser.doctor"
                class="pxssmall greytext mb-0"
              >
                {{
                  group_data_pass.groupuser.doctor.specialityname
                    ? group_data_pass.groupuser.doctor.specialityname
                    : ""
                }}
              </p>

              <div class="tagbtn">Admin</div>
            </div>
          </div>
          <hr />
          <div class="membercard-col">
            <div class="membercard" v-if="mutual_connections.length > 0">
              <div>
                <h6>Your connections</h6>
                <div class="d-flex flex-wrap mb-3 mt-2">
                  <div
                    class="profile-md"
                    v-for="member in mutual_connections.slice(0, 8)"
                    :key="member.member_ref_no"
                  >
                    <img
                      :src="
                        member.user.fullimage
                          ? member.user.fullimage
                          : $store.state.defaultImage
                      "
                      alt=""
                    />
                  </div>

                  <div class="roundbtn" v-if="mutual_next_page">
                    {{ totaldisplay_connections }}+
                  </div>
                </div>
                <span
                  class="pxssmall greytext mb-0"
                  v-for="member in mutual_connections.slice(0, 3)"
                  :key="member.member_ref_no"
                >
                  {{ member.user.first_name ? member.user.first_name : "" }},
                </span>
                <span class="pxssmall greytext mb-0" v-if="mutual_next_page">
                  and {{ totaldisplay_connections }} others
                </span>
              </div>
            </div>
            <div class="membercard" v-if="modal_groupmembers.length > 0">
              <div>
                <h6>All members</h6>
                <div class="d-flex flex-wrap mb-3 mt-2">
                  <div
                    class="profile-md"
                    v-for="member in modal_groupmembers.slice(0, 8)"
                    :key="member.member_ref_no"
                  >
                    <img
                      :src="
                        member.user.fullimage
                          ? member.user.fullimage
                          : $store.state.defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <div class="roundbtn" v-if="modal_next_page">
                    {{ totaldisplay }}+
                  </div>
                </div>
                <span
                  class="pxssmall greytext mb-0"
                  v-for="member in modal_groupmembers.slice(0, 3)"
                  :key="member.member_ref_no"
                >
                  {{ member.user.first_name ? member.user.first_name : "" }},
                </span>
                <span class="pxssmall greytext mb-0" v-if="modal_next_page">
                  and {{ totaldisplay }} others
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinGroup from "../../mixins/group/group";
export default {
  mixins: [mixinGroup],
  props: ["group_data_pass"],
  data() {
    return {
      readmore: false,
      modal_groupmembers: [],
      mutual_connections: [],
      totaldisplay_connections: 0,
      modal_next_page: null,
      mutual_next_page: null,
      totaldisplay: 0,
    };
  },
  created() {
    this.fetchGroupMembersInModal(this.group_data_pass);
    this.fetchMutualConnections(this.group_data_pass);
  },
  methods: {
    openReadMore() {
      this.readmore = true;
    },
  },
};
</script>

<style>
</style>