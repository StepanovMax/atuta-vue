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
      @click="moveToDialog"
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
import { mapState } from 'vuex';

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
    propObjectData: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  data() {
    return {
      isShowPhoneNumber: false,
      dialogID: null,
    }
  },
  computed: {
    ...mapState([
      'userData',
    ]),
  },
  methods: {
    togglePhoneNumber() {
      this.isShowPhoneNumber = !this.isShowPhoneNumber;
    },
    async detectDialogID() {
      let data;
      let dialogID = null;
      // Trying to catch matching with already created dialogs.
      this.propObjectData.dialogsList.some(
        item => {
          if (item.clientID === this.userData.id) {
            dialogID = item.dialogID;
            return true;
          }
        }
      );
      // If there is no matching, then trying to get full length of the dialogs array.
      if (!dialogID) {
        data = await this.getAllDialogsLength();
      }
      if (data && data.data && data.data.length) {
        dialogID = data.data.length;
      }
      return dialogID;
    },
    setObjectToCookie(object) {
      // then update cookie with the TRUE value.
      this.setCookie('objectForDialog', JSON.stringify(object), {secure: true, 'max-age': 3600});
      console.log('getCookie objectForDialog ::', this.getCookie('objectForDialog'));
    },
    async moveToDialog() {
      this.dialogID = await this.detectDialogID();
      this.dialogID += 1;
      this.setObjectToCookie(this.propObjectData);
      console.log('test', this.propObjectData);
      this.$router.push({
        name: 'dialogSubPageSingle',
        params: {
          id: this.dialogID,
          objectData: this.propObjectData,
        },
      });
    },
  },
};
</script>