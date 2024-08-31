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
            <h6 class="modal-title text-left">Where do you want to post?</h6>
            <button
              type="button"
              class="close"
              @click.prevent="closePostModal('postto')"
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
                  @click.prevent="changePostto('user')"
                >
                  <label class="lablecheckbox"
                    >Home Feed
                    <input type="radio" id="GroupA" name="Postingfrom" />
                    <span
                      class="chkboxspan"
                      :class="
                        $store.state.post.postto == 'user' ? 'blueone' : ''
                      "
                    ></span>
                  </label>
                </div>
                <div
                  class="listcheckbox listradio"
                  @click.prevent="changePostto('group')"
                >
                  <label class="lablecheckbox"
                    >Groups <img src="assets/img/balck-arrow.svg" />
                    <input type="radio" id="GroupB" name="Postingfrom" />
                    <span
                      class="chkboxspan"
                      :class="
                        $store.state.post.postto == 'group' ? 'blueone' : ''
                      "
                    ></span>
                  </label>
                </div>
                <div
                  class="listcheckbox listradio"
                  @click.prevent="changePostto('page')"
                >
                  <label class="lablecheckbox"
                    >Pages <img src="assets/img/balck-arrow.svg" />
                    <input type="radio" id="Groupc" name="Postingfrom" />
                    <span
                      class="chkboxspan"
                      :class="
                        $store.state.post.postto == 'page' ? 'blueone' : ''
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
                   <!--  <button
                      type="submit"
                      class="btnfill disabled m-0"
                      value="Submit"
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
export default {
  mixins: [mixinPost],
};
</script>

<style>
</style