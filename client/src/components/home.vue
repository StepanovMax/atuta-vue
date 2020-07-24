<template>
  <div id="home">
    <div class="filter">
      <filterDesktop />
    </div>
    <div class="article">
      <Greeting />
    </div>
    <ads />
  </div>
</template>

<script>
import Greeting from './home/greeting.vue';
import filterDesktop from './filters/filterDesktop.vue';
import ads from './ads.vue';

export default {
  name: 'home',
  components: {
    Greeting,
    filterDesktop,
    ads,
  },
};
</script>