<template>
  <section>
    <div class="modal show createpostpopup sharepost" id="createpostpopup">
      <div class="modal-dialog">
        <div class="modal-content modal-lg">
          <!-- Modal pageloader -->
          <div class="pageloader">
            <span>Posting...</span>
            <img src="assets/img/loader.gif" alt="processing..." />
          </div>
          <!-- Modal Header -->
          <div class="modal-header">
            <h6 class="modal-title text-left">Create a Post</h6>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              id="close_modal"
              @click.prevent="closePostModal('post')"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="scrollbarpan">
            <div class="modal-body">
              <form class="form" id="myform">
                <div class="d-flex align-items-start justify-content-between">
                  <div>
                    <p class="mb-1 greytext pxssmall">
                      <strong>Post as</strong>
                    </p>
                    <template
                      v-if="
                        $route.name == 'dashboard' || $route.name == 'groupview'
                      "
                    >
                      <a
                        class="selectbutton"
                        @click.prevent="openPostModal('postas')"
                        ><span
                          ><img
                            :src="
                              getUser.fullimage
                                ? getUser.fullimage
                                : $store.state.defaultImage
                            "
                            alt=""
                            v-if="$store.state.post.posting_as == 'user'"
                          />
                          <img
                            :src="
                              $store.state.post.posting_as_data.fullimage
                                ? $store.state.post.posting_as_data.fullimage
                                : $store.state.defaultImage
                            "
                            alt=""
                            v-if="$store.state.post.posting_as != 'user'"
                          />
                        </span>
                        <div v-if="$store.state.post.posting_as == 'user'">
                          {{ getUser.first_name + " " + getUser.last_name }}
                        </div>
                        <div v-else>
                          {{ $store.state.post.posting_as_data.name }}
                        </div>
                      </a>
                    </template>
                    <template v-else>
                      <a class="selectbutton selectbuttonarrnone">
                        <span
                          ><img
                            :src="
                              $store.state.post.posting_as_data.fullimage
                                ? $store.state.post.posting_as_data.fullimage
                                : $store.state.imageShow
                            "
                            alt=""
                        /></span>

                        <div>
                          {{ $store.state.post.posting_as_data.name }}
                        </div>
                      </a>
                    </template>
                  </div>
                  <div
                    v-if="
                      $route.name == 'dashboard' && $store.state.post.wantpost
                    "
                  >
                    <p class="mb-1 greytext pxssmall text-sm-right">
                      <strong>Where do you want to post?</strong>
                    </p>
                    <a
                      class="selectbutton pl-3"
                      @click.prevent="openPostModal('postto')"
                      ><template v-if="$store.state.post.postto == 'user'"
                        >Home Feed</template
                      >
                      <template v-else-if="$store.state.post.postto == 'group'"
                        >Groups</template
                      >
                      <template v-else-if="$store.state.post.postto == 'page'"
                        >Pages</template
                      >
                    </a>
                  </div>
                </div>
                <vue-editor
                  v-model="form.desc"
                  :editorToolbar="customToolbar"
                  class="post-textarea w-100"
                  placeholder="Create a Post....."
                ></vue-editor>

                <div class="d-flex flex-wrap" v-if="form.postImage">
                  <div class="post-img-prevmain">
                    <span class="remove" @click="removeImage"></span>
                    <img class="post-img-preview" :src="form.imageUrl" alt="" />
                  </div>
                </div>

                <div
                  class="
                    d-sm-flex
                    align-items-sm-center
                    justify-content-sm-between
                  "
                >
                  <div class="galleryposticon">
                    <label class="newbtn">
                      <img
                        alt=""
                        id="blah1"
                        width="22"
                        height="22"
                        src="/assets/img/gallery.svg"
                      />
                      <input
                        id="Gallery"
                        type="file"
                        ref="file"
                        @change="readFile"
                      />
                      <strong>Image</strong></label
                    >
                  </div>
                  <div class="d-flex">
                    <div
                      class="select-arrow mr-2"
                      v-if="$route.name == 'dashboard'"
                    >
                      <select
                        class="field-select w-100 mb-0"
                        v-model="form.visibleto"
                      >
                        <option value="any"><strong>Anyone</strong></option>
                        <option value="doctors">Doctors Only</option>
                        <option value="patients">Patients Only</option>
                        <option value="connections">Connections Only</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      :disabled="loading"
                      class="btnfill m-0"
                      @click.prevent="submitPost"
                    >
                      Post now
                      <img
                        v-if="loading"
                        class="ml-1"
                        width="18"
                        height="18"
                        src="/assets/img/loader-large.gif"
                        alt=""
                      />
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
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import mixinPost from "../../mixins/publishpost";
export default {
  mixins: [mixinPost],
  props: ["showCondition"],
  data() {
    return {
      form: {
        desc: "",
        postImage: "",
        visibleto: "any",
        imageUrl: "",
      },
      customToolbar: [[""]],
      loading: false,
    };
  },
  components: {
    VueEditor,
  },
  methods: {
    readFile(e) {
      this.form.postImage = e.target.files[0];
      this.form.imageUrl = URL.createObjectURL(this.form.postImage);
    },
    removeImage() {
      this.form.postImage = "";
      this.form.imageUrl = "";
    },
  },
};
</script>

<style>
.ql-toolbar.ql-snow {
  border-bottom: 1px solid #ccc;
}
</style>