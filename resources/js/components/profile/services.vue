<template>
  <div
    class="tab-pane fade"
    id="yourservices"
    role="tabpanel"
    aria-labelledby="nav-yourservices-tab"
  >
    <!--- Form start --->
    <form class="form select-services">
      <div
        class="checkmain"
        v-for="(service, index) in service_master_list"
        :key="index"
        @click="
          addTimeSlots(service.service_master_ref_no, service.service_name)
        "
      >
        <label :for="service.service_master_ref_no">
          <img alt="" src="assets/img/clock.svg" />{{
            service.service_name
          }}</label
        >
      </div>
    </form>
    <!--- Form end --->

    <!-- The Modal Popup start -->
    <div class="modal fade timeslotpage">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">
              <span id="service_name"></span>
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
            </h4>
            <button type="button" class="close" @click="closeModal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form select-timeicon">
                <div class="d-flex">
                  <div>
                    <label class="labelstyle inlinelable fees">Fees</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="fees"
                      id="fees"
                      class="w100"
                      placeholder="Enter Fees"
                      required
                    />
                  </div>
                </div>
                <h6>Select Week</h6>
                <div id="weekmain">
                  <button
                    v-for="(day, index) in weekDays"
                    :key="index"
                    type="button"
                    :id="day"
                    :name="day"
                    :class="index == 0 ? 'week active' : 'week'"
                    @click="selectDay($event)"
                  >
                    {{ day }}
                  </button>
                </div>
                <div
                  v-for="(day, index) in weekDays"
                  :key="index"
                  :id="'div' + day"
                  :style="index == 0 ? 'display:block' : 'display:none'"
                >
                  <TimeSlots :day="day"></TimeSlots>
                </div>
                <input id="service_master_ref_no" type="hidden" />

                <label class="lablecheckbox" style="margin: 0px">
                  <input
                    type="checkbox"
                    name="chk_apply"
                    id="chk_apply"
                    @click="applyTimeSlots"
                  />
                  <span class="chkboxspan"></span> Do you want to use same time
                  slots for all days?</label
                >
                <button
                  type="button"
                  name="btnSaveService"
                  id="btnSaveService"
                  class="loaderbtn btnfill btnfull mt-3 mb-1"
                  @click="saveServices()"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import mixin from "../../mixins/services";
import TimeSlots from "../profile/timeSlot";
export default {
  mixins: [mixin],
  components: {
    TimeSlots,
  },
};
</script>
