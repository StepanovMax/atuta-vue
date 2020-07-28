<template>
  <div class="form">
    <div class="form__row">
      Фильтр для участков
    </div>
    <div class="form__row">
      
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'

export default {
  name: 'filterArea',
  components: {
    multiselect,
  },
  data() {
    return {
      garageValue: null,
      garageTypeItems: [
        {
          slug: 'garage',
          label: 'Гараж',
        },
        {
          slug: 'parkingPlace',
          label: 'Машиноместо',
        },
      ],
    }
  },
};
</script>