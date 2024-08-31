<template>
  <section>
    <div class="modal show createpostpopup" id="confirmdelete">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Please Wait...</span>
            <img src="assets/img/loader.gif" alt="Please Wait..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Note</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="closeModal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form class="form" id="myform">
              <div class="text-center py-5">
                <img
                  class="text-center mx-auto mb-3"
                  width="100"
                  src="assets/img/shield.svg"
                  alt=""
                />
                <h6 class="fnormal greytext px-sm-5 pb-4">
                  We’re currently reviewing your profile. We’re always looking
                  out for the Security of our community, so until then you won’t
                  be able to use <strong>Docs Campus.</strong> You will receive
                  confirmation on email once your profile is verified
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$store.commit("verifiedLoader", false);
    },
  },
};
</script>

<style>
</style>