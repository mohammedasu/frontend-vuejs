<template>
  <section>
    <!-- The Modal Popup createpostpopup Where do you to post start -->
    <div class="modal show createpostpopup sharepost" id="createpostpopup2">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <!-- <div class="pageloader">
            <span>Posting...</span>
            <img src="assets/img/loader.gif" alt="processing..." />
          </div> -->
          <!-- Modal Header -->
          <div class="modal-header">
            <h6 class="modal-title text-left">Posting from</h6>
            <button
              type="button"
              class="close"
              @click.prevent="closePostModal('postas')"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <div
                  class="listcheckbox listradio"
                  @click.prevent="changePostas('user', '')"
                >
                  <label class="lablecheckbox"
                    >{{ getUser.first_name }} {{ getUser.last_name }}
                    <input type="radio" id="GroupA" name="Postingfrom" />
                    <span
                      class="chkboxspan"
                      :class="
                        $store.state.post.posting_as == 'user' ? 'blueone' : ''
                      "
                    ></span>
                  </label>
                </div>
                <div
                  class="listcheckbox listradio"
                  v-for="page in pageData"
                  @click.prevent="changePostas('page', page)"
                  :key="page.page_ref_no"
                >
                  <label class="lablecheckbox"
                    >{{ page.name }}
                    <!-- <img src="/assets/img/balck-arrow.svg" /> -->
                    <input type="radio" id="GroupB" name="Postingfrom" />
                    <span
                      class="chkboxspan"
                      :class="
                        $store.state.post.posting_as == 'page' &&
                        $store.state.post.posting_as_ref_no == page.page_ref_no
                          ? 'blueone'
                          : ''
                      "
                    ></span>
                  </label>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between pt-5"
                >
                  <div>
                    <a class="pl-2" href="#" @click.prevent="backToPost('post')"
                      ><strong>Back</strong></a
                    >
                  </div>
                  <div>
                    <!-- <button
                      type="button"
                      class="btnfill m-0"
                    >
                      Save
                    </button> -->
                  </div>
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
import mixinPost from "../../../mixins/publishpost";
import { fetchPageBackendUrl } from "../../../path";
import mixinRequest from "../../../mixins/request";
export default {
  mixins: [mixinPost, mixinRequest],
  data() {
    return {
      pageData: [],
    };
  },
  created() {
    if (this.$route.name == "dashboard") {
      this.fetchPages();
    }
  },
  methods: {
    async fetchPages() {
      const data = await this.getRequest(fetchPageBackendUrl);
      this.pageData = data.page_data;
    },
  },
};
</script>

<style>
</style