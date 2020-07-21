<template>
  <div class="form">
    <div class="form__row">
      <multiselect
        v-model="garageValue"
        :options="garageTypeItems"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        label="label"
        track-by="label"
        placeholder="Вид гаража"
      />
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