<template>
  <div
    class="show-phone-number"
  >
    <button
      v-if="!isShowPhoneNumber"
      class="btn show-phone-number__btn"
      :class="propClass"
      @click="togglePhoneNumber()"
    >
      Показать телефон
    </button>
    <p
      v-if="isShowPhoneNumber"
      class="show-phone-number__phone-number"
    >
      <a
        :href="'tel:' + propPhoneNumber"
        class="show-phone-number__phone-number-link"
      >
        {{ formatMobilePhone(propPhoneNumber) }}
      </a>
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
    propClass: {
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