<template>
  <section>
    <div class="modal show createpostpopup" id="confirmdelete">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Please Wait...</span>
            <img src="assets/img/loader.gif" alt="Please Wait..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Confirm</h5>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <form class="form" id="myform">
              <div class="d-sm-flex align-items-center justify-content-between">
                <p>Are you sure you want to delete this ?</p>
              </div>
              <div class="d-flex align-items-center justify-content-end mt-3">
                <button
                  type="button"
                  class="nobtn m-0"
                  value="No"
                  data-dismiss="modal"
                  @click.prevent="closeConfirm"
                >
                  No
                </button>
                <button
                  type="button"
                  class="yesbtn m-0"
                  value="Yes"
                  data-dismiss="modal"
                  @click.prevent="deleteConfirm"
                >
                  Yes
                </button>
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
  props: ["post"],
  methods: {
    closeConfirm() {
      this.$emit("closeConfirm", false);
    },
    deleteConfirm() {
      this.$emit("deleteConfirm", false);
    },
  },
};
</script>

<style>
</style>