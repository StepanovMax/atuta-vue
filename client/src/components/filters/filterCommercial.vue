<template>
  <div class="form">
    <div class="form__row">
      Фильтр для коммерции
    </div>
    <div class="form__row">
      
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'

export default {
  name: 'filterGarage',
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