<template>
  <div
    class="show-phone-number"
    :class="[
      {'show-phone-number_big': propPhoneView === 'big'},
    ]"
  >
    <div
      class="show-phone-number__phone"
      :class="[
        {'show-phone-number__phone_big': propPhoneView === 'big'},
        {'show-phone-number__phone_mini': propPhoneView === 'mini'},
      ]"
    >
      <button
        v-if="!isShowPhoneNumber"
        class="
          btn
          show-phone-number__btn
          show-phone-number__btn_phone-number
        "
        :class="[
          propClass,
          {'show-phone-number__btn_big': propPhoneView === 'big'},
          {'show-phone-number__btn_mini': propPhoneView === 'mini'},
        ]"
        @click.stop.prevent="togglePhoneNumber()"
      >
        Показать телефон
      </button>
      <p
        v-if="isShowPhoneNumber"
        class="show-phone-number__phone-number"
        :class="[
          {'show-phone-number__phone-number_big': propPhoneView === 'big'},
          {'show-phone-number__phone-number_mini': propPhoneView === 'mini'},
        ]"
      >
        <a
          :href="'tel:' + propPhoneNumber"
          class="show-phone-number__phone-number-link"
        >
          {{ formatMobilePhone(propPhoneNumber) }}
        </a>
      </p>
    </div>
    <button
      @click.stop.prevent
      class="
        btn
        show-phone-number__btn
        show-phone-number__btn_message
      "
      :class="[
        {'show-phone-number__btn_big': propPhoneView === 'big'},
        {'show-phone-number__btn_mini': propPhoneView === 'mini'},
      ]"
    >
      Написать сообщение
    </button>
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
    propPhoneView: {
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