<template>
  <section class="footerfixbg margin-top-16">
    <div class="whitebg docshangout py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 middlesec">
            <div class="d-flex justify-content-center py-3">
              <div class="text-center col-lg-7">
                <h1 class="bluetext letter-spacing16">
                  <img
                    width="280"
                    :src="series_data.logoimage ? series_data.logoimage : ''"
                    alt=""
                  />
                </h1>
                <h3 class="mt-3">{{ series_data.tagline }}</h3>
                <p class="mt-4 mb-2">
                  {{ series_data.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="greybglight pt-3 pb-5 docs-socializing"
      v-if="single_season.season_ref_no"
    >
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-10 middlesec">
            <div class="whitebg py-5 border-radius8">
              <div class="select-arrow ml-3">
                <select
                  class="field-select"
                  @change.prevent="fetchEpisodes"
                  v-model="form.season"
                >
                  <option
                    v-for="season in series_data.seasons"
                    :key="season.season_ref_no"
                    :value="season.season_ref_no"
                  >
                    {{ season.name }}
                  </option>
                </select>
              </div>
              <div class="d-sm-flex justify-content-sm-between px-3">
                <div class="order-2 text-center">
                  <img
                    v-if="single_season.fullimage"
                    class="w150 mr-sm-5"
                    :src="
                      single_season.fullimage ? single_season.fullimage : ''
                    "
                    alt=""
                  />
                </div>
                <div class="order-1">
                  <p class="mb-2">
                    {{ single_season.description }}
                  </p>
                  <div class="d-flex playbtns">
                    <router-link
                      class="btnfill"
                      :to="'/season/' + single_season.season_ref_no"
                    >
                      <img src="/assets/img/playbutton.svg" alt="" />Watch
                      now</router-link
                    >
                    <a
                      class="outlinebtn btnfillnone"
                      href="#"
                      @click.prevent="
                        openShareModal(
                          single_season.season_ref_no,
                          single_season.description,
                          'season'
                        )
                      "
                    >
                      <img src="/assets/img/share-b.svg" alt="" />Share</a
                    >
                  </div>
                </div>
              </div>
              <div class="title-sm mx-3 py-4"></div>
              <template v-if="episodes.length > 0">
                <div
                  class="pt-4 px-3"
                  v-for="episode in episodes"
                  :key="episode.episode_ref_no"
                >
                  <p class="bluetext">
                    <strong>{{ episode.name }}</strong>
                  </p>
                  <div class="d-md-flex justify-content-md-between">
                    <router-link
                      :to="'/episode/' + episode.episode_ref_no"
                      class="videothumbnailbg order-2"
                    >
                      <img
                        :src="episode.fullimage ? episode.fullimage : ''"
                        alt=""
                      />
                      <span>
                        <img
                          width="24"
                          src="/assets/img/playbutton.svg"
                          alt=""
                        />
                      </span>
                    </router-link>
                    <div class="order-1">
                      <h3 class="mb-3">
                        <router-link :to="'/episode/' + episode.episode_ref_no">
                          {{ episode.title }}
                        </router-link>
                      </h3>
                      <p>
                        {{ episode.description }}
                      </p>
                      <div class="commentspost">
                        <div class="likescomment-md d-flex">
                          <div>
                            <span>{{ episode.likes_count }} Likes </span>
                          </div>
                          <a
                            ><span>{{ episode.comments_count }}</span>
                            Comments</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="title-sm mx-3"></div>
                </div>
              </template>
              <template v-else> No episodes found! </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import { StudioSeries, Episode, Season } from "../../path";
export default {
  mixins: [mixinRequest, mixinShare],
  data() {
    return {
      series_data: {},
      form: {
        season: null,
      },
      single_season: {},
      episodes: [],
    };
  },
  created() {
    this.fetchSeries();
  },
  methods: {
    async fetchSeries() {
      const series_ref_no = this.$route.params.series_ref_no;
      const data = await this.getRequest(
        StudioSeries.singleSeries + "/" + series_ref_no
      );
      this.series_data = data.series_data;
      if (data.series_data) {
        const seasons = data.series_data.seasons;
        if (seasons.length > 0) {
          const first_season = seasons[0];
          this.single_season = first_season;
          this.form.season = first_season.season_ref_no;
          this.fetchEpisodes(first_season.season_ref_no);
        }
      }
    },
    async fetchEpisodes() {
      const season_ref_no = this.form.season;
      this.fetchSeason(season_ref_no);
      const data = await this.getRequest(
        Episode.fetchEpisodes + "/" + season_ref_no,
        false
      );
      if (data.episode_data) {
        this.episodes = data.episode_data;
      }
    },
    async fetchSeason(season_ref_no) {
      const data = await this.getRequest(
        Season.fetchSeason + "/" + season_ref_no,
        false
      );
      if (data.season_data) {
        this.single_season = data.season_data;
      }
    },
  },
};
</script>

<style>
</style>