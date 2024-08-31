<template>
  <div id="pageloader">
    <span>Loading...</span>
    <img src="/assets/img/loader-large.gif" alt="processing..." />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#pageloader {
  background: rgba(255, 255, 255, 0.76);
  display: block;
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 9999999999;
  top: 0px;
}
#pageloader span {
  left: 50%;
  font-weight: 600;
  font-size: 1rem;
  margin-left: -30px;
  margin-top: -10px;
  position: absolute;
  top: 48%;
}
#pageloader img {
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;
  position: absolute;
  top: 56%;
}
</style>