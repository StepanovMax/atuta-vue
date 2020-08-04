<template>
  <div class="move-to-favorites">
    <button
      title="Добавить в избранное"
      class="btn move-to-favorites__btn"
      @click.stop.prevent="clickOnHeartIcon()"
    >
      <iconHeartStroke
        :propIsIconFilled="dataIsIconFilled"
      />
    </button>
  </div>
</template>

<script>
import iconHeartStroke from '../icons/iconHeartStroke.vue'

export default {
  name: 'checkbox',
  components: {
    iconHeartStroke
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // item: {
    //   default: {},
    //   type: Object,
    //   required: true
    // },
  },
  data() {
    return {
      dataIsIconFilled: false
    }
  },
  methods: {
    clickOnHeartIcon() {
      console.log('dataIsIconFilled', this.dataIsIconFilled);
      this.dataIsIconFilled = !this.dataIsIconFilled;
    }
  },
};
</script>