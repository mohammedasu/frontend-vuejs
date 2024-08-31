<template>
  <div class="card p-3">

    <div class="create-post mb-0">
      <div class="profile-lg mt-2">
        <img
          :src="
            getUser.fullimage ? getUser.fullimage : $store.state.defaultImage
          "
          alt=""
          v-if="$store.state.post.posting_as == 'user'"
        />
        <img
          :src="
            $store.state.post.posting_as_data.fullimage
              ? $store.state.post.posting_as_data.fullimage
              : $store.state.imageShow
          "
          v-if="$store.state.post.posting_as != 'user'"
          alt=""
        />
      </div>
      <div class="create-postpic ml-2">
        <button
          class="create-postbtn"
          type="button"
          @click.prevent="openPostModal('post')"
        >
          <p>Create Post</p>
          <p>Share your thoughts....</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mixinPost from "../../mixins/publishpost";
export default {
  mixins: [mixinPost],
};
</script>

<style>
</style>