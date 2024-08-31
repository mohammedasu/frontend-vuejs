<template>
  <section>
    <div class="modal show createpostpopup Share" id="Share">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <!--  <div class="pageloader">
          <span>Please Wait...</span>
          <img src="assets/img/loader.gif" alt="Please Wait..." />
        </div> -->
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title text-left">Share</h5>
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
              <div class="pathcopys">
                <p ref="mylink">{{ shareData.url }}</p>
                <span @click.prevent="copyURL">Copy</span>
              </div>
              <p class="mt-5 text-center mb-3"><strong>Share Link</strong></p>
              <div class="d-flex justify-content-center">
                <!-- quote work-->
                <ShareNetwork
                  network="facebook"
                  class="text-center"
                  :url="shareData.url"
                  :title="shareData.title"
                  :description="shareData.description"
                  :quote="shareData.title + ' ' + shareData.description"
                >
                  <img height="50" src="/assets/img/facebook-c.svg" alt="" />
                  <p class="my-2">Facebook</p>
                </ShareNetwork>
                <!-- title work-->
                <ShareNetwork
                  network="twitter"
                  class="text-center"
                  :url="shareData.url"
                  :title="shareData.title + ' ' + shareData.description"
                  :description="shareData.description"
                >
                  <img height="50" src="/assets/img/twitter-c.svg" alt="" />
                  <p class="my-2">Twitter</p>
                </ShareNetwork>
                <ShareNetwork
                  network="linkedin"
                  class="text-center"
                  :url="shareData.url"
                  :title="shareData.title + ' ' + shareData.description"
                  :description="shareData.title + ' ' + shareData.description"
                >
                  <img height="50" src="/assets/img/linkedin-c.svg" alt="" />
                  <p class="my-2">Linkedin</p>
                </ShareNetwork>
                <ShareNetwork
                  network="WhatsApp"
                  class="text-center"
                  title=""
                  :description="
                    shareData.title +
                    ' ' +
                    shareData.description +
                    ' ' +
                    shareData.url
                  "
                  url=""
                >
                  <img height="50" src="/assets/img/whatsapp.png" alt="" />
                  <p class="my-2">WhatsApp</p>
                </ShareNetwork>
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
import { mapGetters } from "vuex";
export default {
  computed: mapGetters({
    shareData: "getShareModalData",
  }),

  methods: {
    closeModal() {
      this.$store.commit("shareModal", false);
    },
    copyURL() {
      var Url = this.$refs.mylink;
      var input = document
        .getElementById("Share")
        .appendChild(document.createElement("input"));
      input.value = Url.innerHTML;
      input.focus();
      input.select();
      document.execCommand("copy");
      input.style.display = "none";
      this.$toast.success("Link copied!");
      // navigator.clipboard.writeText(Url.innerHTML);
    },
  },
};
</script>

<style>
</style>