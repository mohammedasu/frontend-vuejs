<template>
  <section class="footerfixbg greybglight pt-3 docs-details margin-top-16">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-12 middlesec">
          <div class="pb-5">
            <a class="back" href="#" @click.prevent="$router.go(-1)">
              <img src="/assets/img/balck-arrow.svg" alt="" />Back</a
            >
            <div id="divId">
              <iframe
                class="border-0 videht"
                :src="episode_data.video_url"
                width="100%"
                height="500"
                allowfullscreen
                allow="autoplay; encrypted-media"
                title="ba"
                id="iframeId"
              ></iframe>
            </div>
            <div class="pt-4">
              <h3 class="bluetext">
                <strong> {{ episode_data.name }} </strong>
              </h3>

              <div class="d-flex justify-content-between">
                <div>
                  <h2 class="mb-3">
                    {{ episode_data.title }}
                  </h2>
                  <p>
                    {{ episode_data.description }}
                  </p>
                  <div class="commentspost">
                    <div class="likescomment-md d-flex">
                      <div @click.prevent="openLikeModal(episode_data)">
                        <span> {{ episode_data.likes_count }} Likes </span>
                      </div>
                      <a href="#" @click.prevent="fetchEpisodeComments"
                        ><span>{{ episode_data.comments_count }}</span>
                        Comments</a
                      >
                    </div>
                    <div class="p-3 d-flex likecommntbtn justify-content-start">
                      <div
                        v-if="
                          loader.loading &&
                          loader.loader_ref_no == episode_data.episode_ref_no
                        "
                      >
                        <img src="/assets/img/loader-btn.gif" alt="" />
                      </div>
                      <div v-else>
                        <a
                          v-if="episode_data.user_liked"
                          class="like active"
                          @click="episodeUnLike(episode_data)"
                          ><strong>Liked</strong>
                        </a>
                        <a
                          v-else
                          @click.prevent="episodeLike(episode_data)"
                          class="like"
                          ><strong>Like</strong>
                        </a>
                      </div>
                      <div>
                        <a
                          class="comment"
                          href="#"
                          @click.prevent="fetchEpisodeComments"
                          ><strong>Comment</strong></a
                        >
                      </div>
                      <div>
                        <a
                          class="share"
                          href="#"
                          @click.prevent="
                            openShareModal(
                              episode_data.episode_ref_no,
                              episode_data.description,
                              'episode'
                            )
                          "
                          ><strong>Share</strong></a
                        >
                      </div>
                    </div>
                    <!---->
                    <!---->
                  </div>
                </div>
              </div>
              <EpisodeComments
                v-if="
                  showComments &&
                  showEpisodeComments == episode_data.episode_ref_no
                "
                :comments="episodeComments"
                :comment_next_page="commentNextPage"
                :episodeData="episode_data"
                @updateCommentCount="updateCommentCount"
              ></EpisodeComments>
              <a
                @click.prevent="loadMoreComments(episode_data)"
                v-if="
                  commentNextPage &&
                  showEpisodeComments == episode_data.episode_ref_no
                "
                class="viewmorecomments"
                >View more comments</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="$store.state.likeModal">
      <likeModal :likes="likes" whichmodal="episode"></likeModal>
    </template>
  </section>
</template>

<script>
import EpisodeComments from "./EpisodeComments";
import mixinRequest from "../../mixins/request";
import mixinEpisode from "../../mixins/episode";
import mixinLoader from "../../mixins/loader";
import mixinShare from "../../mixins/share";
import likeModal from "../common/likeModal";

import Player from "@vimeo/player";

export default {
  mixins: [mixinRequest, mixinShare, mixinEpisode, mixinLoader],
  data() {
    return {
      episode_data: {},
      showComments: false,
      showEpisodeComments: null,
      commentNextPage: null,
      episodeComments: [],
      likes: [],
    };
  },
  created() {
    this.fetchEpisode();
    window.scrollTo(0, 0);
  },
  components: {
    EpisodeComments,
    likeModal,
  },
  methods: {
    updateCommentCount(payload) {
      if (payload == "increment") {
        this.episode_data.comments_count = this.episode_data.comments_count + 1;
      } else {
        this.episode_data.comments_count = this.episode_data.comments_count - 1;
      }
    },

    /* launchPlayer() {
      var iframe = document.querySelector("#iframeId");
      const player = new Player(iframe);
      console.log(player);
      player.on("play", function () {
        console.log("Played the video");
      });
    }, */
  },
};
</script>

<style>
</style>