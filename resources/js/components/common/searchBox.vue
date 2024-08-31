<template>
  <div class="searchbox" id="search">
    <div class="select-arrow">
      <select class="field-select" v-model="form.searchType">
        <option value="doctors">Doctor</option>
        <option value="patients">Patient</option>
        <option value="medical">Medical student</option>
      </select>
    </div>
    <button type="button" class="close" id="close_id">
      <span
        ><img alt="" width="16" src="assets/img/left-arrow-blue.svg"
      /></span>
      Back
    </button>
    <form>
      <input
        type="search"
        placeholder="Search here"
        v-model="form.searchText"
        @input="keyUpSearch"
      />
      <button class="search-btn" type="submit">
        <img alt="" src="assets/img/searchicon.svg" />
      </button>
    </form>

    <div
      class="searchlist-main"
      v-if="$store.state.searchBox"
      v-click-outside="resetSearch"
    >
      <div class="scrollbar">
        <p class="searchlist" v-if="searchDataChange.length < 1">
          No result found!
        </p>
        <div
          class="searchlist"
          v-for="user in searchDataChange"
          :key="user.user_ref_no"
          @click.prevent="selectUser(user)"
        >
          <div class="profile-md">
            <img
              :src="user.fullimage ? user.fullimage : $store.state.defaultImage"
              alt=""
            />
          </div>
          <div>
            <p>
              <strong>{{ user.first_name + " " + user.last_name }}</strong>
              <template v-if="user.doctor">
                <span
                  v-if="user.doctor.is_kol"
                  :class="
                    user.user_type == 'doctor' && user.doctor.is_kol
                      ? 'kol'
                      : ''
                  "
                  >KOL</span
                >
              </template>
            </p>
            <displayData :userData="user"></displayData>
          </div>
        </div>
      </div>
      <a
        class="anchor seeall"
        @click.prevent="redirectToDoctors"
        v-if="searchData.length > 0"
        >See All
      </a>
    </div>
  </div>
</template>

<script>
import mixinRequest from "../../mixins/request";
import mixinSearch from "../../mixins/search";
import displayData from "../common/DisplayData";
export default {
  mixins: [mixinRequest, mixinSearch],
  data() {
    return {
      form: {
        searchText: "",
        searchType: "doctors",
      },
      searchBox: false,
      searchData: [],
    };
  },
  components: {
    displayData,
  },
  computed: {
    searchDataChange: function () {
      return this.searchData.slice(0, 3);
    },
  },
  methods: {
    keyUpSearch() {
      this.$store.commit("setSearchParams", {
        searchText: this.form.searchText,
        searchType: this.form.searchType,
      });
      this.searchDoctors(0);
    },
    redirectToDoctors() {
      this.$store.commit("hideSearchBox", false);
      var checkbutton = document.getElementById("close_id").offsetLeft;
      if (checkbutton) {
        document.getElementById("close_id").click();
      }
      if (this.$route.name != "searchdoctors") {
        this.$router.push("/searchdoctors");
      }
    },
    selectUser(user) {
      document.getElementById("close_id").click();
      this.$store.commit("emptySearchData");
      this.$store.commit("setSingleSearchData", user);
      this.$store.commit("hideSearchBox", false);
      if (this.$route.name != "searchdoctors") {
        this.$router.push("/searchdoctors");
      }
    },
  },
};
</script>

<style>
</style>