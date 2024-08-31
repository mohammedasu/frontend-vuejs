<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-lg-8 col-sm-12 text-center notfound px-0">
        <img src="assets/img/not-found.svg" width="250" alt="" />
        <h1>Page Not Found!</h1>
        <p>
          Sorry, We can’t find page you are looking for Click
          <router-link class="anchor" to="/dashboard"
            ><strong>here</strong></router-link
          >
          to go back to the Dashboard Page
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>