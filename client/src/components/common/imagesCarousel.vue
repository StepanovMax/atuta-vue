<template>
  <div class="images-carousel">
    <lingallery
      v-if="items"
      :iid.sync="currentId"
      :width="width"
      :height="height"
      :items="items"
      :mobileHeight="mobileHeight"
      :mobileHeightBreakpoint="mobileBreakPoint"
    />
  </div>
</template>
 
<script>
import Lingallery from 'lingallery';

export default {
  name: 'imagesCarousel',
  components: {
    Lingallery,
  },
  props: {
    propImages: {
      type: Array,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      width: 600,
      height: 400,
      mobileHeight: 200,
      mobileBreakPoint: 768,
      items: null,
      currentId: 'imagesGallery',
    };
  },
  mounted() {
    const items = this.propImages.map(
      (item, index) => {
        const imageObject = {
          src: item,
          thumbnail: item,
        }
        return imageObject;
      }
    )
    this.items = items;
  }
}
</script> 