<template>
  <div class="container">
    <div class="row">
      <DashLeft />
      <div class="col-lg-9 middlesec events">
        <nav class="card mb-1">
          <div id="nav-tab" role="tablist" class="nav nav-tabs">
            <a
              id="nav-allevents-tab"
              data-toggle="tab"
              href="#allevents"
              role="tab"
              aria-controls="nav-allevents"
              aria-selected="true"
              class="nav-item nav-link active"
              @click.prevent="fetchAllEvents"
              >All Events</a
            >
            <a
              id="nav-myevents-tab"
              data-toggle="tab"
              href="#myevents"
              role="tab"
              aria-controls="nav-myevents"
              aria-selected="false"
              class="nav-item nav-link"
              @click.prevent="fetchUserEvents"
              v-if="getUser.user_type == 'doctor'"
              >My Events</a
            >
            <router-link
              to="/createevent"
              v-if="getUser.user_type == 'doctor'"
              class="btnfill float-right"
            >
              Create Event
            </router-link>
          </div>
        </nav>

        <div id="nav-tabContent" class="tab-content">
          <div
            id="allevents"
            role="tabpanel"
            aria-labelledby="nav-allevents-tab"
            class="tab-pane fade show active"
          >
            <div
              class="mx-auto text-center pt-5 mt-3"
              v-if="allevents.length < 1"
            >
              <img src="/assets/img/dashboard-patient/appointment.svg" alt="" />
              <h6 class="greytext mt-1">No event found.</h6>
            </div>
            <ul class="eventslistul">
              <li v-for="event in allevents" :key="event.event_ref_no">
                <router-link :to="'event/' + event.event_ref_no">
                  <div
                    v-if="event.fullimage"
                    :style="'background-image: url(' + event.fullimage + ')'"
                  ></div>
                  <div
                    v-else
                    style="background-image: url(/assets/img/eventscover.jpg)"
                  ></div>
                  <p>
                    <strong>{{ event.title }} </strong>
                  </p>
                  <p class="greytext clockicon">
                    {{ event.startdatetime }} {{ event.timezone }}
                  </p>
                </router-link>
              </li>
            </ul>
            <button
              v-if="nextpage"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMoreEvents('all')"
            >
              loadmore
            </button>
          </div>
          <div
            id="myevents"
            role="tabpanel"
            aria-labelledby="nav-myevents-tab"
            class="tab-pane fade"
          >
            <template
              v-if="
                today.events.length > 0 ||
                upcoming.events.length > 0 ||
                past.events.length > 0
              "
            >
              <p class="mb-1 mt-0">
                <strong>Today’s Events</strong>
              </p>
              <template v-if="today.events.length > 0">
                <ul class="eventslistul" v-if="today.events.length > 0">
                  <li v-for="event in today.events" :key="event.event_ref_no">
                    <router-link :to="'event/' + event.event_ref_no">
                      <div
                        v-if="event.fullimage"
                        :style="
                          'background-image: url(' + event.fullimage + ')'
                        "
                      ></div>
                      <div
                        v-else
                        style="
                          background-image: url(/assets/img/eventscover.jpg);
                        "
                      ></div>
                      <p>
                        <strong>{{ event.title }} </strong>
                      </p>
                      <p class="greytext clockicon">
                        {{ event.startdatetime }} {{ event.timezone }}
                      </p>
                    </router-link>
                  </li>
                </ul>
                <button
                  v-if="today.nextpage"
                  class="btnfill mx-auto d-flex"
                  @click.prevent="loadMoreEvents('today')"
                >
                  loadmore
                </button>
              </template>
              <template v-else>
                <div class="card mt-2">
                  <div class="text-center py-4">
                    <img src="/assets/img/nopost-image.png" alt="" />
                    <h5>No events found at this moment.</h5>
                  </div>
                </div>
              </template>

              <p class="mb-1 mt-2"><strong>Upcoming Events</strong></p>
              <template v-if="upcoming.events.length > 0">
                <ul class="eventslistul">
                  <li
                    v-for="event in upcoming.events"
                    :key="event.event_ref_no"
                  >
                    <router-link :to="'event/' + event.event_ref_no">
                      <div
                        v-if="event.fullimage"
                        :style="
                          'background-image: url(' + event.fullimage + ')'
                        "
                      ></div>
                      <div
                        v-else
                        style="
                          background-image: url(/assets/img/eventscover.jpg);
                        "
                      ></div>
                      <p>
                        <strong>{{ event.title }} </strong>
                      </p>
                      <p class="greytext clockicon">
                        {{ event.startdatetime }} {{ event.timezone }}
                      </p>
                    </router-link>
                  </li>
                </ul>
                <button
                  v-if="upcoming.nextpage"
                  class="btnfill mx-auto d-flex"
                  @click.prevent="loadMoreEvents('upcoming')"
                >
                  loadmore
                </button>
              </template>
              <template v-else>
                <div class="card mt-2">
                  <div class="text-center py-4">
                    <img src="/assets/img/nopost-image.png" alt="" />
                    <h5>No events found at this moment.</h5>
                  </div>
                </div>
              </template>
              <p class="mb-1 mt-2"><strong>Past Events</strong></p>
              <template v-if="past.events.length > 0">
                <ul class="eventslistul">
                  <li v-for="event in past.events" :key="event.event_ref_no">
                    <router-link :to="'event/' + event.event_ref_no">
                      <div
                        v-if="event.fullimage"
                        :style="
                          'background-image: url(' + event.fullimage + ')'
                        "
                      ></div>
                      <div
                        v-else
                        style="
                          background-image: url(/assets/img/eventscover.jpg);
                        "
                      ></div>
                      <p>
                        <strong>{{ event.title }} </strong>
                      </p>
                      <p class="greytext clockicon">
                        {{ event.startdatetime }} {{ event.timezone }}
                      </p>
                    </router-link>
                  </li>
                </ul>
                <button
                  v-if="past.nextpage"
                  class="btnfill mx-auto d-flex"
                  @click.prevent="loadMoreEvents('past')"
                >
                  loadmore
                </button>
              </template>
              <template v-else>
                <div class="card mt-2">
                  <div class="text-center py-4">
                    <img src="/assets/img/nopost-image.png" alt="" />
                    <h5>No events found at this moment.</h5>
                  </div>
                </div>
              </template>
            </template>
            <template v-else
              ><div class="mx-auto text-center pt-5 mt-3">
                <img
                  src="/assets/img/dashboard-patient/appointment.svg"
                  alt=""
                />
                <h6 class="greytext mt-1">
                  You do not have any event at this moment.
                </h6>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import { eventUrl } from "../../path";
import mixinRequest from "../../mixins/request";
export default {
  mixins: [mixinRequest],
  data() {
    return {
      allevents: [],
      nextpage: null,
      today: {
        events: [],
        nextpage: null,
      },
      upcoming: {
        events: [],
        nextpage: null,
      },
      past: {
        events: [],
        nextpage: null,
      },
      defaultImage: "/assets/img/eventscover.jpg",
    };
  },
  components: {
    DashLeft,
  },
  created() {
    this.fetchAllEvents();
  },
  methods: {
    async fetchAllEvents() {
      const data = await this.getRequest(eventUrl.fetchAllEventBackendUrl);
      if (data.event_data) {
        this.allevents = data.event_data;
        this.nextpage = data.next_page;
      }
    },
    async loadMoreEvents(txt) {
      let callUrl = null;
      if (txt == "all") {
        callUrl = this.nextpage;
      } else if (txt == "today") {
        callUrl = this.today.nextpage;
      } else if (txt == "upcoming") {
        callUrl = this.upcoming.nextpage;
      } else if (txt == "past") {
        callUrl = this.past.nextpage;
      }
      const data = await this.getRequest(callUrl);
      if (data.event_data) {
        const moreData = data.event_data;
        if (txt == "all") {
          moreData.map((item) => {
            this.allevents.push(item);
          });
          this.nextpage = data.next_page;
        } else if (txt == "today") {
          moreData.map((item) => {
            this.today.events.push(item);
          });
          this.today.nextpage = data.next_page;
        } else if (txt == "upcoming") {
          moreData.map((item) => {
            this.upcoming.events.push(item);
          });
          this.upcoming.nextpage = data.next_page;
        } else if (txt == "past") {
          moreData.map((item) => {
            this.past.events.push(item);
          });
          this.past.nextpage = data.next_page;
        }
      }
    },
    fetchUserEvents() {
      this.fetchTodayEvents();
      this.fetchUpcomingEvents();
      this.fetchPastEvents();
    },
    async fetchTodayEvents() {
      const data = await this.getRequest(eventUrl.fetchTodayEventBackendUrl);
      if (data.event_data) {
        this.today.events = data.event_data;
        this.today.nextpage = data.next_page;
      }
    },
    async fetchUpcomingEvents() {
      const data = await this.getRequest(eventUrl.fetchUpcomingEventBackendUrl);
      if (data.event_data) {
        this.upcoming.events = data.event_data;
        this.upcoming.nextpage = data.next_page;
      }
    },
    async fetchPastEvents() {
      const data = await this.getRequest(eventUrl.fetchPastEventBackendUrl);
      if (data.event_data) {
        this.past.events = data.event_data;
        this.past.nextpage = data.next_page;
      }
    },
  },
};
</script>

<style>
</style>