<template>
  <div class="container">
    <div class="row">
      <DashLeft></DashLeft>
      <div class="col-lg-9 middlesec events pagediscover">
        <nav class="card mb-1">
          <div id="nav-tab" role="tablist" class="nav nav-tabs">
            <a
              id="nav-discover-tab"
              data-toggle="tab"
              href="#discover"
              role="tab"
              aria-controls="nav-discover"
              aria-selected="true"
              class="nav-item nav-link active"
              @click.prevent="fetchGroups"
              >Discover</a
            >
            <a
              id="nav-joinedgroups-tab"
              data-toggle="tab"
              href="#joinedgroups"
              role="tab"
              aria-controls="nav-joinedgroups"
              aria-selected="false"
              class="nav-item nav-link"
              @click.prevent="fetchUserJoinedGroups"
              >Joined Groups</a
            >
            <a
              id="nav-mygroups-tab"
              data-toggle="tab"
              href="#mygroups"
              role="tab"
              aria-controls="nav-mygroups"
              aria-selected="false"
              class="nav-item nav-link"
              @click.prevent="fetchUserGroups"
              >My Groups</a
            >
            <router-link to="/creategroup" class="btnfill float-right"
              >Create Group</router-link
            >
          </div>
        </nav>
        <div id="nav-tabContent" class="tab-content">
          <div
            id="discover"
            role="tabpanel"
            aria-labelledby="nav-discover-tab"
            class="tab-pane fade show active"
          >
            <div
              class="text-center col-lg-8 col-12 mx-auto my-5"
              v-if="allgroups.length < 1 && loadinggroups"
            >
              <img src="/assets/img/Journalsicon.png" alt="" />
              <p><strong>No Group found</strong></p>
            </div>
            <ul class="eventslistul" v-if="allgroups.length > 0">
              <li v-for="group in allgroups" :key="group.group_ref_no">
                <router-link :to="'/group/' + group.group_ref_no">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="
                        group.coverimage
                          ? group.coverimage
                          : $store.state.imageShow
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    <div class="profile-lg">
                      <img
                        :src="
                          group.fullimage
                            ? group.fullimage
                            : $store.state.imageShow
                        "
                        alt=""
                      />
                    </div>
                    {{ group.name }}
                  </h6>
                  <p class="greytext pxssmall">
                    {{ group.total_members }} members
                  </p>
                </router-link>
                <template v-if="getUser.user_ref_no == group.user_ref_no">
                  <button type="button" class="btnfill btnfull active">
                    Owner
                  </button>
                </template>
                <template v-else>
                  <template
                    v-if="
                      loader.loading &&
                      loader.loader_ref_no == group.group_ref_no
                    "
                    ><img
                      src="/assets/img/loader-btn.gif"
                      alt=""
                      width="70"
                      class="text-center mx-auto mt-4"
                  /></template>
                  <template v-else>
                    <button
                      type="button"
                      class="btnfill btnfull"
                      v-if="
                        group.member_status == -1 &&
                        group.group_privacy == 'private'
                      "
                      @click.prevent="sendJoinRequest(group)"
                    >
                      Join Group
                    </button>
                    <button
                      type="button"
                      class="btnfill btnfull"
                      v-else-if="
                        group.member_status == -1 &&
                        group.group_privacy == 'public'
                      "
                      @click.prevent="sendJoinRequest(group, 'direct')"
                    >
                      Join Group
                    </button>
                    <button
                      type="button"
                      class="btnfill btnfull active"
                      v-else-if="group.member_status == 0"
                    >
                      Request Sent
                    </button>
                    <button
                      type="button"
                      class="btnfill btnfull active"
                      v-else-if="group.member_status == 1"
                    >
                      Joined
                    </button>
                  </template>
                </template>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMoreGroups('all')"
            >
              Load more
            </button>
          </div>
          <div
            id="joinedgroups"
            role="tabpanel"
            aria-labelledby="nav-joinedgroups-tab"
            class="tab-pane fade"
          >
            <div
              class="text-center col-lg-8 col-12 mx-auto my-5"
              v-if="joinedgroups.length < 1 && loadinggroups"
            >
              <img src="/assets/img/likefill.png" alt="" />
              <p><strong>No groups joined</strong></p>
              <p>
                You have not joined any groups yet. Go to Discover section and
                join groups of your interest.
              </p>
            </div>
            <ul class="eventslistul" v-if="joinedgroups.length > 0">
              <li v-for="group in joinedgroups" :key="group.group_ref_no">
                <router-link :to="'/group/' + group.group_ref_no">
                    <div class="d-flex justify-content-center">
                      <img
                        :src="
                          group.coverimage
                            ? group.coverimage
                            : $store.state.imageShow
                        "
                        alt=""
                      />
                    </div>
                    <h6>
                      <div class="profile-lg">
                        <img
                          :src="
                            group.fullimage
                              ? group.fullimage
                              : $store.state.imageShow
                          "
                          alt=""
                        />
                      </div>
                      {{ group.name }}
                    </h6>
                    <p class="greytext pxssmall">
                      {{ group.total_members }} members
                    </p>
                </router-link>
                <button type="button" class="btnfill btnfull active">
                  Group Joined
                </button>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMoreGroups('joined')"
            >
              Load more
            </button>
          </div>
          <div
            id="mygroups"
            role="tabpanel"
            aria-labelledby="nav-mygroups-tab"
            class="tab-pane fade"
          >
            <div
              class="text-center col-lg-8 col-12 mx-auto my-5"
              v-if="usergroups.length < 1 && loadinggroups"
            >
              <img src="/assets/img/Journalsicon.png" alt="" />
              <p><strong>No Group found</strong></p>
            </div>
            <ul class="eventslistul" v-if="usergroups.length > 0">
              <li v-for="group in usergroups" :key="group.group_ref_no">
                <router-link :to="'/group/' + group.group_ref_no">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="
                        group.coverimage
                          ? group.coverimage
                          : $store.state.imageShow
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    <div class="profile-lg">
                      <img
                        :src="
                          group.fullimage
                            ? group.fullimage
                            : $store.state.imageShow
                        "
                        alt=""
                      />
                    </div>
                    {{ group.name }}
                  </h6>
                  <p class="greytext pxssmall">
                    {{ group.total_members }} members
                  </p>
                </router-link>
                <button
                  type="button"
                  class="btnfill btnfull share"
                  @click.prevent="
                    openShareModal(group.group_ref_no, group.name, 'group')
                  "
                >
                  <img src="/assets/img/share.svg" alt="" />Share Group
                </button>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMoreGroups('user')"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import mixinGroup from "../../mixins/group/group";
export default {
  mixins: [mixinGroup],
  components: {
    DashLeft,
  },
  data() {
    return {
      allgroups: [],
      usergroups: [],
      joinedgroups: [],
      next_page: null,
      loadinggroups: false,
    };
  },
  created() {
    this.fetchGroups();
  },
};
</script>

<style>
</style>