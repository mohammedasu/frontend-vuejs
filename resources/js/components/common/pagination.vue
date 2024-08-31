<template>
  <section id="pagination">
    <ul class="pagination">
      <li class="page-item" v-if="paginationdata.previousPage">
        <button
          type="button"
          class="page-link border-0"
          @click="callPage(paginationdata.currentPage - 1)"
        >
          Previous
        </button>
      </li>
      <template v-if="pageloop">
        <li
          class="page-item"
          :id="current_page"
          :class="paginationdata.currentPage == current_page ? 'active' : ''"
          v-for="current_page in pageloop"
          :key="current_page"
        >
          <button
            @click.prevent="callPage(current_page)"
            type="button"
            class="page-link"
            :class="paginationdata.currentPage == current_page ? 'active' : ''"
          >
            {{ current_page }}
          </button>
        </li>
      </template>
      <li class="page-item" v-if="paginationdata.nextPage">
        <button
          type="button"
          class="page-link border-0"
          @click.prevent="callPage(paginationdata.currentPage + 1)"
        >
          Next
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["paginationdata"],
  data() {
    return {
      pagelooping: this.$props.paginationdata.pageloop,
      current_page: 1,
      offset: 8,
    };
  },
  methods: {
    callPage(i) {
      window.scrollTo(0, 0);
      this.$emit("callPage", i);
    },
  },
  computed: {
    pageloop: function () {
      this.current_page = this.paginationdata.currentPage;

      let pages = [];
      let from = this.paginationdata.currentPage - Math.floor(this.offset / 2);
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset - 1;
      if (to > this.paginationdata.lastPage) {
        to = this.paginationdata.lastPage;
      }

      while (from <= to) {
        pages.push(from);
        from++;
      }

      if (
        this.paginationdata.currentPage === this.paginationdata.lastPage &&
        to == 1
      ) {
        pages = [];
      }
      return pages;
    },
  },
};
</script>

<style>
</style>