<template>
  <div class="ads ads_right">
    <a
      class="link ads__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="host.front + '/src/images/ads/external-content.duckduckgo.com.jpeg'"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_vertical
        "
      >
      <img
        :src="host.front + '/src/images/ads/ads_horizontal.png'"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_horizontal
        "
      >
    </a>
  </div>
</template>

<script>

export default {
  name: 'adsRight',
  data() {
    return {
      host: this.getHost(),
    }
  },
};
</script>