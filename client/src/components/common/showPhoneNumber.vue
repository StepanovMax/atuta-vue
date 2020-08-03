<template>
  <div
    class="show-phone-number"
  >
    <button
      v-if="!isShowPhoneNumber"
      class="btn show-phone-number__btn"
      @click="togglePhoneNumber()"
    >
      Показать телефон
    </button>
    <p
      v-if="isShowPhoneNumber"
      class="show-phone-number__number"
    >
      {{ propPhoneNumber }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'showPhoneNumber',
  props: {
    propPhoneNumber: {
      type: String,
      default: '',
      required: true
    },
  },
  data() {
    return {
      isShowPhoneNumber: false,
    }
  },
  methods: {
    togglePhoneNumber() {
      this.isShowPhoneNumber = !this.isShowPhoneNumber;
    }
  },
};
</script>