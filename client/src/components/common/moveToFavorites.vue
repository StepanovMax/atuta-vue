<template>
  <div class="move-to-favorites">
    <button
      title="Добавить в избранное"
      class="btn move-to-favorites__btn"
      @click.stop.prevent="clickOnHeartIcon()"
    >
      <iconHeartStroke
        :propIsIconFilled="dataIsIconFilled"
        :propColor="propColor"
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
    propColor: {
      default: '',
      type: String,
      required: false
    },
  },
  data() {
    return {
      dataIsIconFilled: false
    }
  },
  methods: {
    clickOnHeartIcon() {
      this.dataIsIconFilled = !this.dataIsIconFilled;
    }
  },
};
</script>