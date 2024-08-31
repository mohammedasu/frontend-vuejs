<template>
  <section>
    <div class="container">
      <div class="row">
        <p v-if="!iframeurl">Please contact event admin!</p>
        <iframe
          v-if="
            loaddata &&
            event_data.eventstart == 1 &&
            event_data.eventend == 0 &&
            iframeurl
          "
          :src="iframeurl"
          style="
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            border: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            z-index: 999999;
          "
          allow="microphone; camera; fullscreen"
          :title="event_data.title"
          id="iframeId"
        ></iframe>
        <template v-if="event_data.event_ref_no">
          <p
            class="greytext mb-0"
            v-if="
              event_data.eventstart == 0 && event_data.eventend == 0 && loaddata
            "
          >
            <strong>The event is yet to start. Come back later!</strong>
          </p>
          <p
            class="greytext mb-0"
            v-if="event_data.eventend == 1 && loaddata == true"
          >
            <strong>The event is closed.</strong>
          </p>
        </template>
        <p class="greytext mb-0" v-if="loadmsg != null && loaddata == false">
          <strong>{{ loadmsg }}</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { eventUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinJoinTracking from "../../mixins/joineventtracking";

export default {
  mixins: [mixinRequest, mixinJoinTracking],
  data() {
    return {
      event_data: {
        event_ref_no: null,
      },
      loaddata: false,
      loadmsg: null,
      iframeurl: null,
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
        eventUrl.checkUserCanJoinBackendUrl + "/" + event_ref_no
      );
      if (data.event_data) {
        const eventdata = data.event_data.event_data;
        const eventuser = eventdata.eventuser;
        if (
          (this.getUser.user_type == "doctor" &&
            eventdata.participant == "doctor") ||
          (this.getUser.user_type == "doctor" &&
            eventdata.participant == "doctor_student") ||
          (this.getUser.user_type == "medicalstudent" &&
            eventdata.participant == "doctor_student") ||
          eventdata.participant == "public" ||
          this.getUser.user_ref_no == eventdata.user_ref_no ||
          (eventdata.participant == "connection" &&
            data.event_data.connected != null)
        ) {
          this.loaddata = true;
          this.event_data = eventdata;
          if (this.getUser.user_ref_no == eventdata.user_ref_no) {
            this.iframeurl = eventdata.host_link;
          } else {
            this.iframeurl = eventdata.user_join_link;
          }

          if (eventdata.eventstart == 1 && eventdata.eventend == 0) {
            this.callJoinTracking();
          }
        } else {
          this.loaddata = false;
          this.event_data = {
            event_ref_no: null,
          };
          this.loadmsg = "You can't join this event!";
        }
      }
    },
  },
};
</script>

<style>
</style>