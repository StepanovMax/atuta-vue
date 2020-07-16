<template>
  <div class="range">
    <input
      type="number"
      class="input range__item range__input"
      placeholder="От"
    >
    <input
      type="number"
      class="input range__item range__input"
      placeholder="До"
    >
    <p
      class="range__text"
    >
      ₽
    </p>
  </div>
</template>

<script>
export default {
  name: 'range'
};
</script>