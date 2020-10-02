<template>
  <div class="move-to-favorites">
    <button
      title="Добавить в избранное"
      class="
        btn
        move-to-favorites__btn
      "
      :class="[
        {'move-to-favorites__btn_big': propIconView === 'big'},
        {'move-to-favorites__btn_mini': propIconView === 'mini'},
      ]"
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
    propIconView: {
      type: String,
      default: '',
      required: true
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