<template>
  <!-- Dashboard sec start -->
  <section class="footerfixbg">
    <div class="container">
      <div class="d-flex justify-content-center create-events">
        <div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="createfrom"
              @submit.prevent="handleSubmit(onSubmit)"
              ref="formHTML"
            >
              <h4>Create Event</h4>
              <label class="labelstyle pt-2">Event Title <span>*</span></label>
              <ValidationProvider name="title" rules="required|max:255">
                <div slot-scope="{ errors }" class="position-relative">
                  <input
                    type="text"
                    placeholder="Enter the event title"
                    name="title"
                    v-model="form.title"
                  />
                  <span class="requireds">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <label class="labelstyle pt-3">Time Zone <span>*</span></label>
              <div class="select-arrow">
                <ValidationProvider name="timezone" rules="required">
                  <div slot-scope="{ errors }" class="position-relative">
                    <select
                      class="field-select"
                      v-model="form.timezone"
                      name="timezone"
                    >
                      <option value>Select your time zone</option>
                      <option
                        v-for="zone in timezonearray"
                        :key="zone.value"
                        :value="zone.value"
                      >
                        {{ zone.name }}
                      </option>
                    </select>
                    <span class="requireds">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="row">
                <div class="col-md-3 col-6">
                  <label class="labelstyle pt-3"
                    >Start Date<span>*</span></label
                  >
                  <div class="form-group mb-0">
                    <div
                      class="input-group date"
                      id="datetimepicker1"
                      data-date="1-01-1995"
                    >
                      <ValidationProvider name="start_date" rules="required">
                        <div slot-scope="{ errors }" class="position-relative">
                          <datepicker
                            id="start_date"
                            name="start_date"
                            format="dd-MM-yyyy"
                            v-model="form.start_date"
                            ref="start_date"
                            readonly
                            required
                            placeholder="dd-mm-yyyy"
                            :disabledDates="disabledDates"
                          ></datepicker>
                          <span class="input-group-addon">
                            <i class="glyphicon glyphicon-calendar">
                              <img
                                width="20"
                                src="/assets/img/calendar.svg"
                                alt=""
                            /></i>
                          </span>
                          <span class="requireds">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <label class="labelstyle pt-3"
                    >Start Time <span>*</span></label
                  >
                  <ValidationProvider name="start_time" rules="required">
                    <div slot-scope="{ errors }" class="position-relative">
                      <vue-timepicker
                        format="HH:mm:ss"
                        v-model="form.start_time"
                        name="start_time"
                        readonly
                      ></vue-timepicker>

                      <span class="requireds">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="col-md-3 col-6">
                  <label class="labelstyle pt-3">End Date <span>*</span></label>
                  <div class="form-group mb-0">
                    <div
                      class="input-group date"
                      id="datetimepicker2"
                      data-date="1-01-1995"
                    >
                      <ValidationProvider name="end_date" rules="required">
                        <div slot-scope="{ errors }" class="position-relative">
                          <datepicker
                            id="end_date"
                            name="end_date"
                            format="dd-MM-yyyy"
                            v-model="form.end_date"
                            ref="end_date"
                            readonly
                            required
                            placeholder="dd-mm-yyyy"
                            :disabledDates="disabledDates"
                          ></datepicker>
                          <span class="input-group-addon">
                            <i class="glyphicon glyphicon-calendar">
                              <img
                                width="20"
                                src="/assets/img/calendar.svg"
                                alt=""
                            /></i>
                          </span>
                          <span class="requireds">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <label class="labelstyle pt-3">End Time <span>*</span></label>
                  <ValidationProvider name="end_time" rules="required">
                    <div slot-scope="{ errors }" class="position-relative">
                      <vue-timepicker
                        format="HH:mm:ss"
                        v-model="form.end_time"
                        name="end_time"
                        readonly
                      ></vue-timepicker>
                      <span class="requireds">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <label class="labelstyle pt-3">Participants <span>*</span></label>
              <div class="select-arrow">
                <ValidationProvider name="participant" rules="required">
                  <div slot-scope="{ errors }" class="position-relative">
                    <select
                      class="field-select"
                      v-model="form.participant"
                      name="participant"
                    >
                      <option value="">Choose who can join the event</option>
                      <option value="doctor">Doctors Only</option>
                      <option value="doctor_student">
                        Doctors and Students Only
                      </option>
                      <option value="connection">Connections Only</option>
                      <option value="public">Public</option>
                    </select>
                    <span class="requireds">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <label class="labelstyle pt-3">Description<span>*</span></label>
              <ValidationProvider name="description" rules="required">
                <div slot-scope="{ errors }" class="position-relative">
                  <textarea
                    class="textarea mb-3"
                    rows="4"
                    cols="50"
                    placeholder="Describe the event"
                    v-model="form.description"
                    name="description"
                  ></textarea>
                  <span class="requireds">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <div class="uploadpremain">
                <div
                  class="treedotdrop"
                  v-if="edit && form.imageUrl != null && form.image == ''"
                >
                  <div class="dropdown">
                    <button class="dropbtn" @click.prevent="openDeletePopUp">
                      ...
                    </button>
                    <div id="deleteimage" class="dropdown-content">
                      <a class="model_alerttbtn" @click.prevent="deleteImage">
                        <img
                          alt=""
                          width="19"
                          height="19"
                          src="/assets/img/delete.svg"
                        />
                        Delete image
                      </a>
                    </div>
                  </div>
                </div>
                <label class="uploadpre">
                  <p>
                    <img
                      alt=""
                      id="blah1"
                      width="72"
                      :src="form.imageUrl ? form.imageUrl : defaultImage"
                    />
                  </p>
                  <p><input id="Gallery" type="file" @change="readFile" /></p>
                  <h4 class="text-center greytext font-weight-normal">
                    Click here to upload cover image
                  </h4>
                </label>
              </div>
              <div class="card">
                <div>
                  <template v-if="loader.loading">
                    <img src="/assets/img/loader-btn.gif" alt="" />
                  </template>
                  <template v-else>
                    <button type="submit" class="btnfill my-3 mx-3 float-right">
                      {{ edit ? "Update Event" : "Create Event" }}
                    </button>
                  </template>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import { eventUrl } from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
export default {
  mixins: [mixinRequest, mixinLoader],
  components: {
    Datepicker,
    VueTimepicker,
  },
  data() {
    return {
      form: {
        title: "",
        timezone: "",
        start_date: "",
        start_time: "00:00:00",
        end_date: "",
        end_time: "00:00:00",
        participant: "",
        description: "",
        image: "",
        imageUrl: "",
      },
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      edit: 0,
      editEvent: "",
      defaultImage: "/assets/img/uploadimage.png",
      showdelete: false,
      timezonearray: [
        {
          value: "IST",
          name: "India - IST (indian standard time)",
        },
        {
          value: "AEST",
          name: "Australia - AEST (Australian Eastern Standard Time)",
        },
        {
          value: "CST",
          name: "China - CST (China Standard time)",
        },
        {
          value: "CET",
          name: "Germany - CET (Central European Time)",
        },
        {
          value: "JST",
          name: "Japan - JST (Japan Standard Time)",
        },
        {
          value: "NT",
          name: "Nepal - NT (Nepal Time)",
        },
        {
          value: "MST",
          name: "Russia - MST (Moscow Standard Time)",
        },
        {
          value: "SST",
          name: "Singapore - SST (Singapore Standard Time)",
        },
        {
          value: "SLST",
          name: "Sri Lanka - SLST (Shri Lanka Standard Time)",
        },
        {
          value: "EET",
          name: "Ukraine - EET (Eastern European time)",
        },
        {
          value: "EST",
          name: "United States - EST (Eastern Standard Time)",
        },
        {
          value: "BST",
          name: "United Kingdom - BST (British Summer Time)",
        },
      ],
    };
  },
  created() {
    if (this.$route.params) {
      if (this.$route.params.event_ref_no) {
        const event_ref_no = this.$route.params.event_ref_no;
        this.edit = 1;
        this.editEvent = event_ref_no;
        this.fetchEditEvent();
      }
    }
  },
  methods: {
    openDeletePopUp() {
      document.getElementById("deleteimage").classList.toggle("show");
    },
    readFile(e) {
      if (
        e.target.files[0]["type"] === "image/jpeg" ||
        e.target.files[0]["type"] === "image/jpg" ||
        e.target.files[0]["type"] === "image/png"
      ) {
        this.form.image = e.target.files[0];
        this.form.imageUrl = URL.createObjectURL(this.form.image);
      } else {
        this.form.image = "";
        this.form.imageUrl = "";
        this.$toast.error("Please select jpeg,jpg,png file !");
      }
    },
    onSubmit() {
      if (this.edit) {
        this.updateData();
      } else {
        this.saveData();
      }
    },
    async saveData() {
      let formData = new FormData(this.$refs.formHTML);
      formData.append("image", this.form.image);
      this.showProcessLoader(true);
      const data = await this.postRequest(
        eventUrl.addEventBackendUrl,
        formData
      );
      this.hideProcessLoader(true);
      if (data.event_data) {
        this.$toast.success("Event Successfully Created !");
        this.$router.push("/events");
      }
    },
    async updateData() {
      let formData = new FormData(this.$refs.formHTML);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }
      this.showProcessLoader(true);
      formData.append("event_ref_no", this.editEvent);
      const data = await this.postRequest(
        eventUrl.updateEventBackendUrl,
        formData
      );
      this.hideProcessLoader(true);
      if (data.event_data) {
        this.$toast.success("Event Successfully Updated !");
        this.$router.push("/events");
      }
    },
    async deleteImage() {
      let formData = new FormData();
      this.showProcessLoader(true);
      formData.append("_method", "delete");
      const data = await this.postRequest(
        eventUrl.deleteEventImageBackendUrl + "/" + this.editEvent,
        formData
      );
      this.hideProcessLoader(true);
      if (data.event_data) {
        this.form.image = "";
        this.form.imageUrl = null;
        this.$toast.success("Image Successfully Deleted !");
      }
    },
    async fetchEditEvent() {
      const data = await this.getRequest(
        eventUrl.fetchSingleEventBackendUrl + "/" + this.editEvent
      );
      if (data.event_data) {
        const eventData = data.event_data;
        this.form = {
          title: eventData.title,
          timezone: eventData.timezone,
          start_date: eventData.start_date,
          start_time: eventData.start_time,
          end_date: eventData.end_date,
          end_time: eventData.end_time,
          participant: eventData.participant,
          description: eventData.description,
          image: "",
          imageUrl: eventData.fullimage,
        };
      } else {
        this.editEvent = "";
        this.edit = 0;
      }
    },
  },
};
</script>

<style>
.vue__time-picker input.display-time {
  width: 10em !important;
}
.clear-btn {
  display: none !important;
}
.createfrom .vue__time-picker input.display-time {
  width: 150px !important;
}
.createfrom .vue__time-picker {
  width: 150px !important;
}
</style>