<template>
  <div>
    <!-- Nav bar -->
    <header role="navigation">
      <guest-nav />
    </header>
    <main>
      <transition name="fade" mode="in-out">
        <!-- Load page here -->
        <Nuxt class="spacer" />
      </transition>
    </main>

    <!-- Footer -->
    <guest-footer />

    <!-- Cookie law consent -->
    <client-only>
      <footer>
        <cookie-law
          theme="dark-lime"
          message="Questa pagina utilizza i cookie per garantire la migliore esperienza sul nostro sito web."
          button-text="Accetta"
        />
      </footer>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style>
body {
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: normal;
  font-feature-settings: "ss01" off;
  font-family: 'system-ui', sans-serif;
  overflow-x: hidden !important;
}

.title {
  font-family: 'Libre Baskerville', 'system-ui', serif;
}

.spacer {
  margin-top: 15vh;
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

@media only screen and (max-width: 600px) {
  .spacer {
    margin-top: 20vh !important;
  }
}
</style>
