<template>
  <div
    class="tab-pane fade"
    id="youraddress"
    role="tabpanel"
    aria-labelledby="nav-youraddress-tab"
  >
    <!--- Form start --->
    <form
      class="form"
      id="address_details_form"
      @submit.prevent="saveAddressDetails"
    >
      <label class="labelstyle pt-2">Address Line 1 <span>*</span> </label>
      <input
        type="text"
        id="address_1"
        :value="address_details.address_1"
        ref="address_1"
        placeholder="Enter Address Line 1"
        required
      />
      <label class="labelstyle pt-2">Address Line 2 <span>*</span> </label>
      <input
        type="text"
        id="address_2"
        :value="address_details.address_2"
        ref="address_2"
        placeholder="Enter Address Line 2"
        required
      />
      <label class="labelstyle pt-2">Landmark <span>*</span> </label>
      <input
        type="text"
        id="landmark"
        :value="address_details.landmark"
        ref="landmark"
        placeholder="Enter Landmark"
        required
      />
      <div class="row">
        <div class="col-sm-6">
          <label class="labelstyle pt-2">Pincode<span>*</span> </label>
          <input
            type="text"
            id="pincode"
            :value="address_details.pincode"
            ref="pincode"
            placeholder="Enter Pincode"
            @blur="fetchCity"
            required
          />
        </div>
        <div class="col-sm-6">
          <label class="labelstyle pt-2">City<span>*</span> </label>
          <input
            type="text"
            id="city"
            :value="address_details.city"
            ref="city"
            placeholder="Enter City"
            required
          />
        </div>
      </div>
      <button type="submit" class="loaderbtn btnfill btnfull mt-2">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["address_details"],
  created() {
    this.fetchAddressDetails();
  },
  methods: {
    saveAddressDetails() {
      this.$emit("saveAddressDetails", this.$refs, this.address_details);
    },
    fetchAddressDetails() {
      this.$emit("fetchAddressDetails");
    },
    fetchCity() {
      this.$emit("fetchCity", this.$refs.pincode.value);
    },
  },
};
</script>