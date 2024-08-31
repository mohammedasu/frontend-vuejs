<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-9 middlesec events">
        <div class="card">
          <div class="margin-top-16">
            <img
              :src="event_data.fullimage ? event_data.fullimage : defaultImage"
              alt=""
            />
          </div>
          <div class="d-sm-flex justify-content-between p-4">
            <div class="order-2">
              <div>
                <a
                  class="float-right"
                  @click.prevent="
                    openShareModal(
                      event_data.event_ref_no,
                      event_data.title,
                      'event'
                    )
                  "
                >
                  <img src="/assets/img/share.svg" alt="" />
                </a>
              </div>
              <router-link
                :to="'/webinar/' + event_data.event_ref_no"
                v-if="
                  getUser.user_ref_no &&
                  event_data.eventstart == 1 &&
                  event_data.eventend == 0
                "
                class="btnfill mt-0"
              >
                Join event
              </router-link>
            </div>
            <div class="order-1">
              <h3 class="mb-3">{{ event_data.title }}</h3>
              <div class="d-md-flex">
                <p>
                  <img src="/assets/img/clock.svg" alt="" />
                  {{ event_data.startdatetime }} -
                  {{ event_data.endtimedisplay }}
                  {{ event_data.timezone }}
                </p>
                <p class="ml-md-4">
                  <img src="/assets/img/doctoricon.svg" alt="" />
                  {{ event_data.participantdisplay }}
                </p>
              </div>
              <p
                class="greytext mb-0"
                v-if="event_data.eventstart == 0 && event_data.eventend == 0"
              >
                <strong
                  >The event is yet to start. Joining link will appear as soon
                  as it is activated.</strong
                >
              </p>
              <p class="greytext mb-0" v-if="event_data.eventend == 1">
                <strong>The event is closed.</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <h4 class="mb-2">About</h4>
          <p>
            {{ event_data.description }}
          </p>
        </div>
      </div>
      <div class="col-lg-3 events asidesec pr-sm-0">
        <div class="sidebarlistfix">
          <div class="card invitations mb-1">
            <h6 class="px-3 py-2">Event Host</h6>

            <ul class="px-3 ulboderbotm" v-if="event_data.eventuser">
              <li>
                <div class="d-flex userprofdtl mb-0">
                  <div class="profile-lg">
                    <img
                      :src="
                        event_data.eventuser.fullimage
                          ? event_data.eventuser.fullimage
                          : $store.state.defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <div class="create-postpic mb-3">
                    <h6 class="pxsmall">
                      {{ event_data.eventuser.first_name | capitalize }}
                      {{ event_data.eventuser.last_name }}
                      <span
                        v-if="event_data.eventuser.doctor.is_kol"
                        :class="
                          event_data.eventuser.user_type == 'doctor' &&
                          event_data.eventuser.doctor.is_kol
                            ? 'kol'
                            : ''
                        "
                        >KOL</span
                      >
                    </h6>
                    <section v-if="event_data.eventuser.doctor">
                      <p class="pxssmall greytext letter-spacing">
                        <strong>
                          {{
                            event_data.eventuser.doctor.qualification
                              | capitalize
                          }}</strong
                        >
                      </p>
                      <p class="pxssmall greytext">
                        {{ event_data.eventuser.doctor.specialityname }}
                      </p>
                    </section>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <template v-if="getUser">
            <div
              class="card sidebarlist mb-1 mt-3 pb-3"
              v-if="getUser.user_ref_no == event_data.user_ref_no"
            >
              <h6 class="px-3 py-2">Manage Event</h6>
              <ul class="profilelist">
                <li>
                  <router-link
                    :to="'/createevent/' + event_data.event_ref_no"
                    :title="event_data.title"
                  >
                    <img src="/assets/img/edit.svg" alt="" />Edit
                    Event</router-link
                  >
                </li>
                <li>
                  <a
                    @click.prevent="deleteEvent(event_data.event_ref_no)"
                    :title="event_data.title"
                  >
                    <img src="/assets/img/delete.svg" alt="" />Delete Event</a
                  >
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import mixinLoader from "../../mixins/loader";
export default {
  mixins: [mixinRequest, mixinShare, mixinLoader],
  data() {
    return {
      event_data: {},
      defaultImage: "/assets/img/big-eventscover.jpg",
    };
  },
  created() {
    window.scrollTo(0, 0);
    if (this.$route.params) {
      if (this.$route.params.event_ref_no) {
        const event_ref_no = this.$route.params.event_ref_no;
        this.fetchEventData(event_ref_no);
      }
    }
  },
  methods: {
    async fetchEventData(event_ref_no) {
      const data = await this.getRequest(
        eventUrl.fetchSingleEventBackendUrl + "/" + event_ref_no
      );
      if (data.event_data) {
        this.event_data = data.event_data;
      }
    },
    async deleteEvent(event_ref_no) {
      let formData = new FormData();
      formData.append("_method", "delete");
      const data = await this.postRequest(
        eventUrl.deleteEventBackendUrl + "/" + event_ref_no,
        formData
      );
      if (data.event_data) {
        this.event_data = {};
        this.$toast.success("Event Successfully Deleted !");
        this.$router.push("/events");
      }
    },
  },
};
</script>

<style>
</style>