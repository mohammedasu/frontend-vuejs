<template>
  <section>
    <div class="bannersliders owl-carousel owl-theme">
      <div
        class="d-flex justify-content-center align-items-center item"
        style="
          background-image: url('/assets/img/docsstudiobg.jpg');
          height: 460px;
          background-size: cover;
          background-repeat: no-repeat;
        "
      >
        <div>
          <h1 class="bluetext letter-spacing16 pb-sm-5 pt-4">DocS STUDIO</h1>
          <h3 class="fnormal">
            Specially curated content from the field of medicine.
          </h3>
        </div>
      </div>
    </div>
    <!--  <template v-if="slidershow">
      <div class="bannersliders owl-carousel owl-theme">
        <div
          class="item"
          v-for="slider in slider_data"
          :key="slider.slider_ref_no"
        >
          <img :src="slider.fullimage ? slider.fullimage : ''" alt="" />
        </div>
      </div>
    </template> -->
    <div class="whitebg docshangout py-sm-5">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-12 middlesec"
            v-for="series in series_data"
            :key="series.series_ref_no"
          >
            <div class="d-sm-flex justify-content-around py-3">
              <div class="order-2 text-center">
                <img
                  :src="series.coverimage ? series.coverimage : ''"
                  alt=""
                  class="w250 mr-sm-5"
                />
              </div>
              <div class="order-1">
                <h1 class="bluetext letter-spacing16">
                  <img
                    width="280"
                    :src="series.logoimage ? series.logoimage : ''"
                    alt=""
                  />
                </h1>
                <h3 class="mt-3">{{ series.tagline }}</h3>
                <p class="docshangoutpar mt-4 mb-2">
                  {{ series.description }}
                </p>
                <div class="d-flex playbtns">
                  <router-link
                    class="btnfill"
                    :to="'/series/' + series.series_ref_no"
                  >
                    <img
                      src="/assets/img/playbutton.svg"
                      alt=""
                    />Watch now</router-link
                  >
                  <a
                    class="outlinebtn btnfillnone"
                    href="#"
                    @click.prevent="
                      openShareModal(
                        series.series_ref_no,
                        series.description,
                        'series'
                      )
                    "
                  >
                    <img src="/assets/img/share-b.svg" alt="" />Share</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixinCarsaul from "../../mixins/dashboard";
import mixinRequest from "../../mixins/request";
import mixinShare from "../../mixins/share";
import { StudioSeries, StudioSlider } from "../../path";

export default {
  mixins: [mixinCarsaul, mixinRequest, mixinShare],
  data() {
    return {
      series_data: [],
      slider_data: [],
      slidershow: false,
    };
  },
  created() {
    this.fetchSeries();
  },
  mounted() {
    this.fetchSlider();
  },
  methods: {
    async fetchSlider() {
      this.loadCarsaul();
      /* const data = await this.getRequest(StudioSlider.fetchSlider, false);
      if (data.slider_data) {
        this.slider_data = data.slider_data;
        if (this.slider_data.length > 0) {
          this.slidershow = true;
          this.loadCarsaul();
        }
      } */
    },
    async fetchSeries() {
      const data = await this.getRequest(StudioSeries.fetchSeries);
      if (data.series_data) {
        this.series_data = data.series_data;
      }
    },
  },
};
</script>

<style>
</style>