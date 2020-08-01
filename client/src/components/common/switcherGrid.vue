<template>
  <ul class="switcher-grid">
    <li class="switcher-grid__item">
      <button
        class="
          btn
          switcher-grid__btn
          switcher-grid__btn_squares
        "
        :class="[
          {
            'switcher-grid__btn_active': activeBtn === 'squares'
          }
        ]"
        @click="switchToNetView()"
      >
        <iconSquares />
      </button>
    </li>
    <li class="switcher-grid__item">
      <button
        class="
          btn
          switcher-grid__btn
          switcher-grid__btn_hamburger
        "
        :class="[
          {
            'switcher-grid__btn_active': activeBtn === 'hamburger'
          }
        ]"
        @click="switchToListView()"
      >
        <iconHamburger />
      </button>
    </li>
  </ul>
</template>

<script>
import iconSquares from '../icons/iconSquares.vue'
import iconHamburger from '../icons/iconHamburger.vue'

export default {
  name: 'switcherGrid',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    iconSquares,
    iconHamburger,
  },
  data() {
    return {
      activeBtn: 'squares',
    }
  },
  methods: {
    switchToNetView(data) {
      this.dataGridView = 'net';
      this.activeBtn = 'squares';
      this.$emit('update:value', 'net');
    },
    switchToListView() {
      this.dataGridView = 'list';
      this.activeBtn = 'hamburger';
      this.$emit('update:value', 'list');
    },
  },
};
</script>