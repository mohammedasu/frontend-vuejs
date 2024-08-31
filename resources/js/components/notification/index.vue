<template>
  <div class="container">
    <div class="row">
      <DashLeft></DashLeft>
      <div class="col-lg-6 middlesec notifications">
        <div
          class="text-center"
          v-if="notifications.length < 1 && loadnotification"
        >
          <img
            class="pt-5 pb-2 mt-3"
            src="/assets/img/notificationsfill.png"
            alt=""
          />
          <p class="mb-1"><strong>No Notifications</strong></p>
          <p>You have not received any notifications yet.</p>
        </div>
        <div
          class="card"
          id="post"
          v-if="notifications.length > 0 && loadnotification"
        >
          <ul class="notificationslist">
            <li
              v-for="notification in notifications"
              :key="notification.user_notification_ref_no"
            >
              <div class="d-flex userprofdtl">
                <div class="profile-lg">
                  <img
                    title="Image 1"
                    class="canvas thumbnail img-responsive profilepiclick"
                    :src="
                      notification.source_data
                        ? notification.source_data.fullimage
                          ? notification.source_data.fullimage
                          : $store.state.defaultImage
                        : $store.state.defaultImage
                    "
                    alt=""
                  />
                </div>
                <div class="create-postpic">
                  <template v-if="notification.target_link">
                    <a :href="notification.target_link">
                      <p>
                        {{ notification.notification_text }}
                      </p>
                    </a>
                  </template>
                  <template v-else>
                    <p>
                      {{ notification.notification_text }}
                    </p>
                  </template>
                  <p class="greytext">{{ notification.published }}</p>
                </div>
              </div>

              <div class="notificationsright">
                <div class="position-relative">
                  <div class="profile-xl" v-if="notification.target_data">
                    <img
                      :src="
                        notification.target_data.fullimage
                          ? notification.target_data.fullimage
                          : $store.state.imageShow
                      "
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <button
            v-if="next_page"
            class="btnfill mx-auto d-flex"
            @click.prevent="loadMore()"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import mixinRequest from "../../mixins/request";
import { notificationUrl } from "../../path";
export default {
  mixins: [mixinRequest],
  components: {
    DashLeft,
  },
  data() {
    return {
      loadnotification: false,
      notifications: [],
      next_page: null,
    };
  },
  created() {
    this.fetchUserNotifications();
  },
  methods: {
    async fetchUserNotifications() {
      const data = await this.getRequest(
        notificationUrl.fetchUserNotifications
      );
      if (data.user_notification_data) {
        this.notifications = data.user_notification_data;
        this.loadnotification = true;
        this.next_page = data.next_page;
      }
    },
    async loadMore() {
      let callUrl = this.next_page;
      if (callUrl) {
        const data = await this.getRequest(callUrl);
        if (data.user_notification_data) {
          const moreData = data.user_notification_data;
          // this block is for page_like_data(follow pages)
          moreData.map((item) => {
            this.notifications.push(item);
          });
        }
        this.next_page = data.next_page;
      }
    },
  },
};
</script>


<style>
</style>