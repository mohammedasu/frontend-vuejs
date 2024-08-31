<template>
  <div class="col-lg-8 col-md-8 middlesec appbookingright pr-sm-0">
    <div class="card p-3">
      <div class="loginrightinner">
        <h3 class="pb-4 text-center">Please provide patient details</h3>
        <!--- Form start --->
        <form
          class="form"
          id="patient_details_form"
          @submit.prevent="processForm"
        >
          <label class="labelstyle pt-2">First Name <span>*</span> </label>
          <input
            type="text"
            id="first_name"
            placeholder="Enter your first name"
            v-model="first_name"
            required
          />

          <label class="labelstyle pt-2">Last Name <span>*</span> </label>
          <input
            type="text"
            id="last_name"
            placeholder="Enter your last name"
            v-model="last_name"
            required
          />
          <label class="labelstyle pt-2">Email Id <span>*</span> </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email Id"
            v-model="email"
            required
          />
          <label class="labelstyle pt-2">Mobile No <span>*</span> </label>
          <input
            type="text"
            id="mobile"
            placeholder="Mobile No"
            v-model="mobile"
            required
          />
          <div class="row">
            <div class="col-sm-6 gender">
              <label class="labelstyle pt-2">Gender <span>*</span></label>
              <div class="select-arrow">
                <select
                  class="field-select"
                  id="gender"
                  v-model="gender"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <label class="labelstyle pt-2">Dob</label>
              <div class="form-group">
                <div
                  class="input-group date"
                  id="datetimepicker1"
                  data-date="1-01-1995"
                >
                  <input
                    type="text"
                    id="dob"
                    placeholder="dd/mm/yyyy"
                    v-model="dob"
                    required
                  />
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-calendar"
                      ><img width="20" src="assets/img/calendar.svg"
                    /></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="loaderbtn btnfill btnfull mt-2">
            Proceed to payment
          </button>
          <p class="termspara">
            By booking this appointment, you agree to healwell24
            <a class="anchor" target="_blank" href="terms-conditions.html"
              >Terms &amp; Conditions.</a
            >
          </p>
        </form>
        <!--- Form end l --->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["appointmentDetails"],
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      gender: "",
      dob: "",
    };
  },
  processForm() {
    this.$emit("processForm");
  },
};
</script>
