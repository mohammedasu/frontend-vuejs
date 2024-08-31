<template>
  <!-- file is used for showing source data-->
  <span>
    <template v-if="post.is_upload_at_multiple_source">
      <span>
        posted in
        <span class="grouptag ml-1 mb-0"
          ><a @click.prevent="openPostingModal"
            >{{ post.sourcename ? post.sourcename : "" }} {{ post.source }}</a
          ></span
        >
      </span>
    </template>
    <template v-else>
      <template v-if="post.source == 'page'">
        <router-link :to="'/page/' + post.source_ref_no">
          <span :class="post.is_upload_at_multiple_source ? 'namest' : ''"
            ><strong>{{ post.sourcename ? post.sourcename : "" }}</strong></span
          ></router-link
        >
      </template>
      <template
        v-if="
          (post.source == 'group' && $route.name == 'dashboard') ||
          (post.source == 'group' && $route.name == 'singlepost')
        "
      >
        <router-link :to="'/group/' + post.source_ref_no">
          <span class="namest"
            ><strong>{{ post.sourcename ? post.sourcename : "" }}</strong></span
          ></router-link
        >
      </template>
    </template>
  </span>
</template>

<script>
export default {
  props: ["post"],

  methods: {
    openPostingModal() {
      this.$emit("openPostingModal", this.post);
    },
  },
};
</script>

<style>
</style>