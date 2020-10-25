<template>
  <div class="input-field">
    <input
      v-if="propType === 'symbolsWithNumbers'"
      type="text"
      class="input symbolsWithNumbers"
      :class="propClass"
      :key="propKey"
      :name="propKey"
      v-model="filteredValue"
      @input="handleInput($event)"
      @blur="blur($event)"
    >
    <input
      v-if="propType === 'numbers'"
      type="number"
      class="input numbers"
      :class="propClass"
      v-model="enteredValue"
      :key="propKey"
      :name="propKey"
    >
    <input
      v-if="propType === 'password'"
      :type="passwordType"
      class="input password"
      :class="propClass"
      v-model="filteredValue"
      @input="handleInput($event)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
    >
    <input
      v-if="propType === 'email'"
      type="email"
      class="input email"
      :class="propClass"
      :value="filteredValue"
      @input="handleEmail($event)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
    >
    <input
      v-if="propType === 'phone'"
      type="tel"
      class="input phone"
      :class="propClass"
      v-model="filteredValue"
      @input="handlePhone($event)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
      @focus="focusPhone($event)"
      placeholder="+7 (555) 555-5555"
    >
    <div
      v-if="propType === 'password' && filteredValue"
      class="input-field__eye"
      @click="switchShowingPassword"
    >
      <iconEyeOpened
        v-if="passwordType === 'text'"
      />
      <iconEyeClosed
        v-if="passwordType === 'password'"
      />
    </div>
  </div>
</template>

<script>
import iconEyeOpened from '../icons/iconEyeOpened.vue';
import iconEyeClosed from '../icons/iconEyeClosed.vue';

export default {
  name: 'inputField',
  components: {
    iconEyeOpened,
    iconEyeClosed,
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    propType: {
      type: String,
      default: '',
      required: true,
    },
    propClass: {
      type: String,
      default: '',
      required: false,
    },
    propKey: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      filteredValue: '',
      passwordType: 'password',
    }
  },
  computed: {
    enteredValue: {
      cache: false,
      get() {
        return this.filteredValue;
      },
      set(value) {
        if (this.propType === 'numbers') {
          this.filteredValue = this.gFormatPrice(value);
        }
        this.$emit('update:value', this.filteredValue);
      }
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      if (this.propType === 'symbolsWithNumbers') {
        this.filteredValue = value.replace(/[^\w\s]/gi, '') // /\W|_/g
      } else if (this.propType === 'password' || this.propType === 'email') {
        this.filteredValue = value;
      }
      this.$emit('update:value', this.filteredValue);
    },
    blur(event) {
      this.$root.$emit('blur', event.target.value, event.target.name);
    },
    switchShowingPassword() {
      if (this.passwordType === 'text') {
        this.passwordType = 'password';
      } else if (this.passwordType === 'password') {
        this.passwordType = 'text';
      }
    },
    handleEmail(event) {
      const email = event.target.value;
      this.$emit('update:value', email);
    },
    handlePhone(event) {
      const phoneNumber = event.target.value;
      this.filteredValue = this.gFormatPhone(phoneNumber);
      this.$emit('update:value', this.filteredValue);
    },
    focusPhone() {
      if (!this.filteredValue.length) {
        this.filteredValue = '+7 ';
      }
    }
  },
  mounted() {
    // console.log('filteredValue ::', this.filteredValue);
  },
};
</script>