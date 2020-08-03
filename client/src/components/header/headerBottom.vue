<template>
  <div class="header-bottom">
    <div class="header-bottom__container">
      <Logo location="header" />
      <p
        class="paragraph"
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 14px;
        "
      >
        Скоро здесь будет поле поиска.
      </p>
    </div>
  </div>
</template>

<script>
import Logo from '../logo.vue'

export default {
  name: 'HeaderBottom',
  components: {
    Logo,
  },
};
</script>