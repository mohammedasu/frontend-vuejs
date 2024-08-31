<template>
  <section>
    <!-- The Modal Popup createpostpopup Select the groups to post start -->
    <div class="modal show createpostpopup sharepost" id="createpostpopup3">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <!-- <div class="pageloader">
            <span>Posting...</span>
            <img src="assets/img/loader.gif" alt="processing..." />
          </div> -->
          <!-- Modal Header -->
          <div class="modal-header">
            <h6 class="modal-title text-left">
              Select the
              {{ $store.state.post.postto === "group" ? "groups" : "pages" }} to
              post
            </h6>
            <button
              type="button"
              class="close"
              @click.prevent="closePostModal('postlist')"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <div class="searchbox searchboxsingle" id="search">
                  <form>
                    <input
                      type="search"
                      placeholder="Search here or select below"
                      @input="searchData"
                      v-model="search_txt"
                    />
                    <button class="search-btn" type="submit">
                      <img alt="" src="assets/img/searchicon.svg" />
                    </button>
                  </form>
                </div>
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
                    <a
                      class="pl-2"
                      href="#"
                      @click.prevent="backToPost('postto')"
                      ><strong>Back</strong></a
                    >
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btnfill m-0"
                      @click.prevent="saveList"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>

    <!-- The Modal Popup createpostpopup Select the groups to post end -->
  </section>
</template>

<script>
import {
  fetchPageBackendUrl,
  groupUrl,
  searchPageBackendUrl,
} from "../../../path";
import mixinRequest from "../../../mixins/request";
import mixinPost from "../../../mixins/publishpost";
export default {
  mixins: [mixinPost, mixinRequest],
  data() {
    return {
      listData: [],
      selected_arry: [],
      search_txt: "",
    };
  },
  created() {
    const postto_selected = this.$store.state.post.postto;
    if (postto_selected != "user") {
      this.fetchListData(postto_selected);
    }
  },
  methods: {
    async searchData() {
      const postto_selected = this.$store.state.post.postto;

      if (this.search_txt != "") {
        let url = "";
        if (postto_selected == "group") {
          url = groupUrl.searchGroupBackendUrl + "/" + this.search_txt;
        } else if (postto_selected == "page") {
          url = searchPageBackendUrl + "/" + this.search_txt;
        }
        const data = await this.getRequest(url, false);
        if (postto_selected == "group") {
          this.listData = data.group_data;
        } else if (postto_selected == "page") {
          this.listData = data.page_data;
        }
      } else {
        this.fetchListData(postto_selected);
      }
    },
    async fetchListData(postto_selected) {
      let url = "";
      if (postto_selected == "group") {
        url = groupUrl.fetchGroupBackendUrl;
      } else if (postto_selected == "page") {
        url = fetchPageBackendUrl;
      }
      const data = await this.getRequest(url);
      if (postto_selected == "group") {
        this.listData = data.group_data;
      } else if (postto_selected == "page") {
        this.listData = data.page_data;
      }
    },
    addToList(list) {
      const index = this.listData.indexOf(list);
      if (this.$store.state.post.postto == "group") {
        document
          .getElementById(list.group_ref_no)
          .classList.toggle("bluecheck");
      } else {
        document.getElementById(list.page_ref_no).classList.toggle("bluecheck");
      }
    },
    saveList() {
      let selectedList = document.querySelectorAll(".bluecheck");
      if (selectedList.length < 1) {
        this.$toast.error("Please select atleast one group/pages!");
        return false;
      }
      if (selectedList.length > 5) {
        this.$toast.error("Please select only five group/pages!");
        return false;
      }
      for (var i = 0, len = selectedList.length; i < len; i++) {
        this.selected_arry.push(selectedList[i].getAttribute("id"));
      }
      this.$store.commit("post/selectedListData", this.selected_arry);
      this.$store.commit("post/openPostModal", { txt: "post" });
    },
  },
};
</script>

<style>
</style>