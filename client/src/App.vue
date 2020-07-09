<template>
  <div
    id="app"
    class="app"
  >
    <Header />
    <router-view class="content"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Footer from './components/footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>