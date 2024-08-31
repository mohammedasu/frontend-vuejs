<template>
  <!-- The Modal Popup profile pic start -->
  <div
    tabindex="-1"
    class="modal show profilepic d-block"
    id="myModal"
    role="dialog"
  >
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          @click.prevent="closeImageModal"
        >
          ×
        </button>
        <div class="modal-body">
          <img
            :src="user_image ? user_image : $store.state.defaultImage"
            alt=""
            class="thumbnail img-responsive profilepiclick"
          />
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show modal-backdrop2"></div>
  </div>
  <!-- The Modal Popup profile pic end -->
</template>

<script>
export default {
  props: ["user_image"],
  methods: {
    closeImageModal() {
      this.$store.commit("lightBoxModal", false);
      this.$store.commit("lightBoxModalProfile", false);
    },
  },
};
</script>

<style>
</style>