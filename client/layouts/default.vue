<template>
  <main>
    <!-- Nav bar -->
    <guest-nav />

    <!-- Load page here -->
    <Nuxt class="spacer" />

    <!-- Footer -->
    <guest-footer />
  </main>
</template>

<script>
export default {
  name: 'DefaultLayout',
  auth: 'guest'
}
</script>

<style>
.spacer {
  margin-top: 10vh;
}
</style>
