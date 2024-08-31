<template>
  <section>
    <!-- The Modal Popup createpostpopup Where do you to post start -->
    <div class="modal show createpostpopup sharepost" id="createpostpopup2">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <div class="modal-header">
            <h6 class="modal-title text-left">
              {{ source == "page" ? "Pages" : "Groups" }} List
            </h6>
            <button type="button" class="close" @click.prevent="closeListModal">
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <div v-for="(data, index) in passdata" :key="index">
                  <a
                    :href="
                      source === 'group'
                        ? '/group/' + data.group_ref_no
                        : '/page/' + data.page_ref_no
                    "
                  >
                    <div class="listcheckbox listradio">
                      <label class="lablecheckbox"
                        >{{ data.name }}
                        <!-- <img src="/assets/img/balck-arrow.svg" /> -->
                      </label>
                    </div>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </section>
  <!-- The Modal Popup createpostpopup Where do you to post end -->
</template>

<script>
export default {
  props: ["passdata", "source"],
  methods: {
    closeListModal() {
      this.$emit("closeListModal");
    },
  },
};
</script>

<style>
</style