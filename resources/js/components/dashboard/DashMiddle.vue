<template>
  <div class="col-lg-6 middlesec">
    <VerificationAlert />
    <createPost></createPost>
    <Post posttxt="home"></Post>
  </div>
</template>

<script>
import VerificationAlert from "../common/Verification";
import createPost from "../common/CreatePost";
import Post from "./Post";
export default {
  components: {
    createPost,
    Post,
    VerificationAlert,
  },
};
</script>

<style>
</style>