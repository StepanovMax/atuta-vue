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
    propIsSelected: {
      type: Boolean,
      default: false,
      required: false,
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
      if (this.dataIsIconFilled) {
        this.$emit('update:value', 1);
      } else {
        console.log('this.dataIsIconFilled', this.dataIsIconFilled);
        this.$emit('update:value', 0);
      }
    },
  },
  mounted() {
    if (this.propIsSelected) {
      this.dataIsIconFilled = this.propIsSelected;
    }
  },
};
</script>