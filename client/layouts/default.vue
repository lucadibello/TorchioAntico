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
body {
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: normal;
  font-feature-settings: "ss01" off;
  font-family: 'system-ui', sans-serif;
}

.title {
  font-family: 'Libre Baskerville', 'system-ui', serif;
}

.spacer {
  margin-top: 10vh;
}

@keyframes shake-animation {
   0% { transform:translate(0,0) }
  1.78571% { transform:translate(5px,0) }
  3.57143% { transform:translate(0,0) }
  5.35714% { transform:translate(5px,0) }
  7.14286% { transform:translate(0,0) }
  8.92857% { transform:translate(5px,0) }
  10.71429% { transform:translate(0,0) }
  100% { transform:translate(0,0) }
}
</style>
