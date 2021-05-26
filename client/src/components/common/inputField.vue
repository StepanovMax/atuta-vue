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
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
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
      @input="handlePhone($event.target.value)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
      @focus="focusPhone($event)"
      placeholder="+7 (555) 555-5555"
    >
    <input
      v-if="propType === 'website'"
      type="text"
      class="input website"
      :class="propClass"
      :value="filteredValue"
      @input="handleEmail($event)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
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
    propValue: {
      type: String,
      default: '',
      required: false,
    },
    propFilterPhoneNumber: {
      type: Boolean,
      default: true,
      required: false,
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
        this.filteredValue = this.gFilterSpecialSymbols(value);
      } else if (this.propType === 'password' || this.propType === 'email' || this.propType === 'website') {
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
    handlePhone(number) {
      if (this.propType === 'phone') {
        this.filteredValue = this.gFormatPhone(number);
      }
      if (number.length) {
        this.$emit('update:value', this.gFormatPhoneRevert(number));
      } else {
        this.$emit('update:value', null);
      }
    },
    focusPhone() {
      if (!this.filteredValue.length) {
        this.filteredValue = '+7 ';
      }
    }
  },
  beforeMount() {
    if (this.propValue) {
      // For the phone default value we should add a mask before enter into the input field.
      if (this.propType === 'phone') {
        this.handlePhone(this.propValue);
      } else {
        // For another fields we've got no mask.
        this.filteredValue = this.propValue;
      }
    }
  },
};
</script>