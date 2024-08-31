<template>
  <section>
    <!-- The Modal Popup createpostpopup Select the groups to post start -->
    <div class="modal show createpostpopup sharepost" id="createpostpopup3">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <div class="modal-header">
            <h6 class="modal-title text-left">Delete post from</h6>
            <button
              type="button"
              class="close"
              @click.prevent="closeDeleteListModal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <div class="scrollbarpan max-height200 my-2">
                  <div
                    class="listcheckbox"
                    v-for="list in listData"
                    :key="
                      list.group_ref_no ? list.group_ref_no : list.page_ref_no
                    "
                    @click.prevent="addToList(list)"
                  >
                    <label class="lablecheckbox"
                      >{{ list.name }}
                      <input
                        type="checkbox"
                        :id="list.name"
                        :name="list.name"
                      />
                      <span
                        :id="
                          list.group_ref_no
                            ? list.group_ref_no
                            : list.page_ref_no
                        "
                        class="chkboxspan"
                      ></span>
                    </label>
                  </div>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <a class="pl-2" @click.prevent="closeDeleteListModal"
                      ><strong>Back</strong></a
                    >
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btnfill m-0"
                      value="Submit"
                      @click.prevent="deletePostFromList"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal Popup createpostpopup Select the groups to post end -->
    <div class="modal-backdrop fade show"></div>
  </section>
</template>

<script>
import {
  fetchMultiplePageBackendUrl,
  groupUrl,
  deletePostFromMultiplePlaces,
} from "../../path";
import mixinRequest from "../../mixins/request";
export default {
  props: ["post"],
  mixins: [mixinRequest],
  created() {
    this.fetchListData();
  },
  data() {
    return {
      listData: [],
      selected_arry: [],
    };
  },
  methods: {
    closeDeleteListModal() {
      this.$emit("closeDeleteList");
    },
    addToList(list) {
      if (this.post.source == "group") {
        document
          .getElementById(list.group_ref_no)
          .classList.toggle("bluecheck");
      } else {
        document.getElementById(list.page_ref_no).classList.toggle("bluecheck");
      }
    },
    async fetchListData() {
      const postto_selected = this.post.source;
      let url = "";
      if (postto_selected == "group") {
        url =
          groupUrl.fetchMultipleGroupBackendUrl + "/" + this.post.source_ref_no;
      } else if (postto_selected == "page") {
        url = fetchMultiplePageBackendUrl + "/" + this.post.source_ref_no;
      }
      const data = await this.getRequest(url);
      if (postto_selected == "group") {
        this.listData = data.group_data;
      } else if (postto_selected == "page") {
        this.listData = data.page_data;
      }
    },
    async deletePostFromList() {
      let selectedList = document.querySelectorAll(".bluecheck");
      if (selectedList.length < 1) {
        this.$toast.error("Please select atleast one to delete!");
        return false;
      }
      for (var i = 0, len = selectedList.length; i < len; i++) {
        this.selected_arry.push(selectedList[i].getAttribute("id"));
      }
      let formData = new FormData();
      formData.append("_method", "delete");
      formData.append("ref_no_list", this.selected_arry);
      formData.append("post_ref_no", this.post.post_ref_no);
      const data = await this.postRequestWithCompleteData(
        deletePostFromMultiplePlaces,
        formData
      );
      if (data.message == "deleted") {
        this.$store.dispatch("post/deletePost", this.post);
      } else {
        if (this.$route.name == "dashboard") {
          this.$store.dispatch("post/updatePost", data.data.post_data);
        } else {
          this.$store.dispatch("post/deletePost", this.post);
        }
      }
      this.$toast.error("Post deleted from " + this.post.source + "!");

      this.closeDeleteListModal();
    },
  },
};
</script>

<style>
</style>