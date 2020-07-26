<template>
  <div class="form">
    <div class="form__row">
      Фильтр для квартиры
    </div>
    <div class="form__row">
      <h3 class="title title_h6">
        Вид объекта*
      </h3>
      <multiselect
        v-model="isGarageOrParking"
        :options="garageParkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        :searchable="false"
        label="label"
        track-by="label"
        placeholder="Гараж или машиноместо? *"
      />
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