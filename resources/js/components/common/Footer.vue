<template>
  <div class="footerfixed">
    <ul class="navbar-nav ml-auto">
      <li>
        <a
          href="/dashboard"
          class="nav-link home"
          :class="$route.name === 'dashboard' ? 'active' : ''"
        >
          <p>Home</p>
        </a>
      </li>
      <li>
        <router-link
          to="/networks"
          class="nav-link network"
          :class="$route.name === 'networks' ? 'active' : ''"
        >
          <p>Network</p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/docsstudio"
          class="nav-link docsoriginals"
          :class="$route.name === 'docsstudio' ? 'active' : ''"
        >
          <p>Docs Studio</p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/messages"
          class="nav-link messages"
          :class="$route.name === 'messages' ? 'active' : ''"
        >
          <p>Messages</p>
        </router-link>
      </li>
      <li>
        <router-link
          to="/basicdetails"
          class="nav-link myaccount"
          :class="$route.name === 'basicdetails' ? 'active' : ''"
        >
          <p>My Account</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>