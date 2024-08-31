<template>
  <div class="container">
    <div class="row">
      <DashLeft></DashLeft>
      <div class="col-lg-9 middlesec events pagediscover">
        <nav class="card mb-1">
          <div id="nav-tab" role="tablist" class="nav nav-tabs">
            <a
              id="nav-discover-tab"
              data-toggle="tab"
              href="#discover"
              role="tab"
              aria-controls="nav-discover"
              aria-selected="true"
              class="nav-item nav-link active"
              @click.prevent="fetchPages"
              >Discover
            </a>
            <a
              id="nav-followedpages-tab"
              data-toggle="tab"
              href="#followedpages"
              role="tab"
              aria-controls="nav-followedpages"
              aria-selected="false"
              class="nav-item nav-link"
              @click.prevent="userLikePages"
              >Followed Pages</a
            >
            <a
              id="nav-mypages-tab"
              data-toggle="tab"
              href="#mypages"
              role="tab"
              aria-controls="nav-mypages"
              aria-selected="false"
              class="nav-item nav-link"
              @click.prevent="userPages"
              >My Pages</a
            >
            <router-link to="/createpage" class="btnfill float-right"
              >Create Page</router-link
            >
          </div>
        </nav>
        <div id="nav-tabContent" class="tab-content">
          <div
            id="discover"
            role="tabpanel"
            aria-labelledby="nav-discover-tab"
            class="tab-pane fade show active"
          >
            <ul class="eventslistul">
              <p class="nofound-sm" v-if="allpages.length < 1 && loadingpages">
                No pages found
              </p>

              <li v-for="page in allpages" :key="page.page_ref_no">
                <router-link :to="'/page/' + page.page_ref_no">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="
                        page.fullcoverimage ? page.fullcoverimage : defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    <div class="profile-lg">
                      <img
                        :src="
                          page.fullimage
                            ? page.fullimage
                            : $store.state.imageShow
                        "
                        alt=""
                      />
                    </div>
                    {{ page.name }}
                  </h6>
                  <p class="greytext pxssmall">
                    <strong>{{
                      page.industrydata ? page.industrydata.name : ""
                    }}</strong>
                  </p>
                  <p class="greytext pxssmall">
                    {{ page.like_count | numberconvert }} followers
                  </p>
                </router-link>
                <template
                  v-if="
                    loader.loading && loader.loader_ref_no == page.page_ref_no
                  "
                >
                  <img
                    src="/assets/img/loader-btn.gif"
                    alt=""
                    width="70"
                    class="text-center mx-auto mt-4"
                  />
                </template>
                <template v-else>
                  <button
                    v-if="page.user_liked"
                    type="button"
                    class="btnfill btnfull"
                    @click.prevent="pageUnlike(page)"
                  >
                    Unfollow
                  </button>
                  <button
                    v-else
                    type="button"
                    @click.prevent="pageLike(page)"
                    class="btnfill btnfull"
                  >
                    Follow
                  </button>
                </template>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMorePages('all')"
            >
              Load more
            </button>
          </div>
          <div
            id="followedpages"
            role="tabpanel"
            aria-labelledby="nav-followedpages-tab"
            class="tab-pane fade"
          >
            <div
              class="text-center col-lg-8 col-12 mx-auto my-5"
              v-if="followpages.length < 1 && loadingpages"
            >
              <img src="/assets/img/likefill.png" alt="" />
              <p><strong>No followed pages</strong></p>
              <p>
                You have not followed any pages yet. Go to Discover section and
                like pages of your interest.
              </p>
            </div>
            <ul class="eventslistul">
              <li v-for="likepage in followpages" :key="likepage.page_ref_no">
                <router-link :to="'/page/' + likepage.page_ref_no">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="
                        likepage.fullcoverimage
                          ? likepage.fullcoverimage
                          : defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    <div class="profile-lg">
                      <img
                        :src="
                          likepage.fullimage
                            ? likepage.fullimage
                            : $store.state.defaultImage
                        "
                        alt=""
                      />
                    </div>
                    {{ likepage.name ? likepage.name : "" }}
                  </h6>
                  <p class="greytext pxssmall">
                    <strong>{{
                      likepage.industrydata ? likepage.industrydata.name : ""
                    }}</strong>
                  </p>
                  <p class="greytext pxssmall">
                    {{ likepage.like_count }} followers
                  </p>
                </router-link>
                <button type="button" class="btnfill btnfull active">
                  Following
                </button>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMorePages('follow')"
            >
              Load more
            </button>
          </div>
          <div
            id="mypages"
            role="tabpanel"
            aria-labelledby="nav-mypages-tab"
            class="tab-pane fade"
          >
            <div
              class="text-center col-lg-8 col-12 mx-auto my-5"
              v-if="userpages.length < 1 && loadingpages"
            >
              <img src="/assets/img/Journalsicon.png" alt="" />
              <p><strong>No page found</strong></p>
            </div>

            <ul class="eventslistul">
              <li v-for="page in userpages" :key="page.page_ref_no">
                <router-link :to="'/page/' + page.page_ref_no">
                  <div class="d-flex justify-content-center">
                    <img
                      :src="
                        page.fullcoverimage ? page.fullcoverimage : defaultImage
                      "
                      alt=""
                    />
                  </div>
                  <h6>
                    <div class="profile-lg">
                      <img
                        :src="
                          page.fullimage
                            ? page.fullimage
                            : $store.state.imageShow
                        "
                        alt=""
                      />
                    </div>
                    {{ page.name }}
                  </h6>
                  <p class="greytext pxssmall">
                    <strong>{{
                      page.industrydata ? page.industrydata.name : ""
                    }}</strong>
                  </p>
                  <p class="greytext pxssmall">
                    {{ page.like_count }} followers
                  </p>
                </router-link>
                <button
                  type="button"
                  class="btnfill btnfull share"
                  @click.prevent="
                    openShareModal(page.page_ref_no, page.name, 'page')
                  "
                >
                  <img src="/assets/img/share.svg" alt="" />Share Page
                </button>
              </li>
            </ul>
            <button
              v-if="next_page"
              class="btnfill mx-auto d-flex"
              @click.prevent="loadMorePages('user')"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashLeft from "../dashboard/DashLeft";
import {
  fetchPageBackendUrl,
  fetchAllPageBackendUrl,
  PageLikeBackendUrl,
  fetchLikePagesBackendUrl,
} from "../../path";
import mixinRequest from "../../mixins/request";
import mixinLoader from "../../mixins/loader";
import mixinShare from "../../mixins/share";
export default {
  mixins: [mixinRequest, mixinLoader, mixinShare],
  components: {
    DashLeft,
  },
  data() {
    return {
      allpages: [],
      next_page: null,
      userpages: [],
      followpages: [],
      defaultImage: "/assets/img/uploadimage.png",
      loadingpages: false,
    };
  },
  created() {
    this.fetchPages();
  },
  methods: {
    async fetchPages() {
      this.loadingpages = false;
      this.next_page = null;
      const dataAll = await this.getRequest(fetchAllPageBackendUrl);
      this.allpages = dataAll.page_data;
      this.next_page = dataAll.next_page;
      this.loadingpages = true;
    },
    async userPages() {
      this.loadingpages = false;
      this.next_page = null;
      const dataUserPage = await this.getRequest(fetchPageBackendUrl);
      this.userpages = dataUserPage.page_data;
      this.next_page = dataUserPage.next_page;
      this.loadingpages = true;
    },
    async userLikePages() {
      this.loadingpages = false;
      this.next_page = null;
      const data = await this.getRequest(fetchLikePagesBackendUrl);
      this.followpages = data.page_data;
      this.next_page = data.next_page;
      this.loadingpages = true;
    },
    async loadMorePages(txt) {
      let callUrl = this.next_page;
      const data = await this.getRequest(callUrl);
      if (data.page_data) {
        const moreData = data.page_data;
        if (txt == "all") {
          moreData.map((item) => {
            this.allpages.push(item);
          });
        } else if (txt == "user") {
          moreData.map((item) => {
            this.userpages.push(item);
          });
        } else {
          const moreData = data.page_data;
          // this block is for page_like_data(follow pages)
          moreData.map((item) => {
            this.followpages.push(item);
          });
        }
      }
      this.next_page = data.next_page;
    },
    async pageLike(page) {
      const page_ref_no = page.page_ref_no;
      this.showProcessLoader(page_ref_no);
      let formData = new FormData();
      const data = await this.postRequest(
        PageLikeBackendUrl + "/" + page_ref_no + "/like",
        formData
      );
      if (data.page_data) {
        this.hideProcessLoader(page_ref_no);
        const responsePage = data.page_data;
        this.allpages = this.allpages.map((pagedata) => {
          if (pagedata.page_ref_no === responsePage.page_ref_no) {
            return responsePage;
          }
          return pagedata;
        });
      }
    },
    async pageUnlike(page) {
      const page_ref_no = page.page_ref_no;
      const page_like_ref_no = page.liked_page
        ? page.liked_page.page_like_ref_no
        : null;
      this.showProcessLoader(page_ref_no);
      let formData = new FormData();
      formData.append("_method", "delete");
      const data = await this.postRequest(
        PageLikeBackendUrl + "/" + page_ref_no + "/like/" + page_like_ref_no,
        formData
      );
      if (data.page_data) {
        this.hideProcessLoader(page_ref_no);
        const responsePage = data.page_data;
        this.allpages = this.allpages.map((pagedata) => {
          if (pagedata.page_ref_no === responsePage.page_ref_no) {
            return responsePage;
          }
          return pagedata;
        });
      }
    },
  },
};
</script>

<style>
</style>