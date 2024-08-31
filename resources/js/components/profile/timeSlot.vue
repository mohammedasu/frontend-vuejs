<template>
  <div>
    <div class="position-relative">
      <h6><img alt="" width="32" src="assets/img/morning.png" /> Morning</h6>
      <button
        type="button"
        class="addmoretxt"
        :id="day + '_btn_add_more_morning'"
        @click="addRow($event)"
      >
        Add More
      </button>
      <div
        class="d-flex1"
        v-for="(row, index) in rows"
        :key="index"
        :id="day + '_morning_sec_' + index"
        :style="index == 0 ? '' : 'display:none'"
      >
        <div class="select-arrow">
          <select
            class="morning-from-time field-select"
            :id="day + '_morning_from_time_' + index"
            @change="validateTimeRange($event)"
          >
            <option value="">Select</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
          </select>
        </div>
        <div class="to" :id="day + '_morning_to_lbl_' + index">To</div>
        <div class="select-arrow">
          <select
            class="morning-to-time field-select"
            :id="day + '_morning_to_time_' + index"
            @change="validateToTime($event, 1)"
          >
            <option value="">Select</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
          </select>
        </div>
        <div v-if="index != 0">
          <a
            class="remove"
            title="remove"
            :id="day + '_remove_row_morning_' + index"
            @click="removeRow($event, index)"
            href="javascript: void (0); "
          ></a>
        </div>
      </div>
    </div>

    <div class="position-relative">
      <h6>
        <img alt="" width="32" src="assets/img/afternoon.png" /> Afternoon
      </h6>
      <button
        type="button"
        class="addmoretxt"
        :id="day + '_btn_add_more_afternoon'"
        @click="addRow($event)"
      >
        Add More
      </button>
      <div
        class="d-flex1"
        v-for="(row, index) in rows"
        :key="index"
        :id="day + '_afternoon_sec_' + index"
        :style="index == 0 ? '' : 'display:none'"
      >
        <div class="select-arrow">
          <select
            class="afternoon-from-time field-select"
            :id="day + '_afternoon_from_time_' + index"
            @change="validateTimeRange($event)"
          >
            <option value="">Select</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>
        <div class="to" :id="day + '_afternoon_to_lbl_' + index">To</div>
        <div class="select-arrow">
          <select
            class="afternoon-to-time field-select"
            :id="day + '_afternoon_to_time_' + index"
            @change="validateToTime($event, 1)"
          >
            <option value="">Select</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
        </div>
        <div v-if="index != 0">
          <a
            class="remove"
            title="remove"
            :id="day + '_remove_row_afternoon_' + index"
            @click="removeRow($event, index)"
            href="javascript: void (0); "
          ></a>
        </div>
      </div>
    </div>

    <div class="position-relative">
      <h6>
        <img alt="" width="32" src="assets/img/evening.png" /> Evening
      </h6>
      <button
        type="button"
        class="addmoretxt"
        :id="day + '_btn_add_more_evening'"
        @click="addRow($event)"
      >
        Add More
      </button>
      <div
        class="d-flex1"
        v-for="(row, index) in rows"
        :key="index"
        :id="day + '_evening_sec_' + index"
        :style="index == 0 ? '' : 'display:none'"
      >
        <div class="select-arrow">
          <select
            class="evening-from-time field-select"
            :id="day + '_evening_from_time_' + index"
            @change="validateTimeRange($event)"
          >
            <option value="">Select</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>
        </div>
        <div class="to" :id="day + '_evening_to_lbl_' + index">To</div>
        <div class="select-arrow">
          <select
            class="evening-to-time field-select"
            :id="day + '_evening_to_time_' + index"
            @change="validateToTime($event, 1)"
          >
            <option value="">Select</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="8:00 PM">8:00 PM</option>
          </select>
        </div>
        <div v-if="index != 0">
          <a
            class="remove"
            title="remove"
            :id="day + '_remove_row_evening_' + index"
            @click="removeRow($event, index)"
            href="javascript: void (0); "
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../../mixins/services";
export default {
  mixins: [mixin],
  props: ["day"],
  data() {
    return {
      rows: [0, 1, 2],
    };
  },
};
</script>