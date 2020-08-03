<template>
  <div class="object-card">
    <div class="object-card__wrap">
      <div class="object-card__top">
        <div class="object-card__img-wrap">
          <img
            class="img object-card__img"
            :src="'src/images/' + dataObjectData.urlPreview"
            alt=""
          >
        </div>
      </div>
      <div class="object-card__middle">
        <p class="object-card__price">
          <span class="object-card__price_number">
            {{ formatNumbers(dataObjectData.price) }} ₽
          </span>
          <span
            v-if="filterDataSelected.deal && (filterDataSelected.deal.slug === 'rent')"
            class="object-card__price_text"
          >
            в месяц
          </span>
        </p>
      </div>
      <div class="object-card__bottom">
        <p class="object-card__item object-card__address">
          {{ dataObjectData.address }}
        </p>
        <p class="object-card__item object-card__district">
          р-н {{ dataObjectData.district }}
        </p>
        <div class="object-card__item object-card__info">
          <div class="object-card__info-item object-card__info-item_room">
            {{ dataObjectData.rooms }} ком.
          </div>
          <div class="object-card__info-item object-card__info-item_area">
            {{ dataObjectData.area }} м²
          </div>
          <div class="object-card__info-item object-card__info-item_floor">
            {{ dataObjectData.floorCurrent }}/{{ dataObjectData.floorFull }} этаж
          </div>
        </div>
        <p class="object-card__item object-card__date">
          <span>
            № {{ dataObjectData.id }}
          </span>
          <span>
            {{ timeConverter(dataObjectData.date) }}
          </span>
        </p>
        <p class="object-card__agency">
          {{ dataObjectData.agency }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
    }
  },
  props: {
    propObjectData: {
      type: Object,
      default: {},
      required: true,
    },
  },
  methods: {
    timeConverter(UNIX_timestamp){
      const a = new Date(UNIX_timestamp * 1000);
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая','Июня','Июля', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const time = date + ' ' + month + ' ' + year;
      return time;
    },
  },
  computed: {
    ...mapState([
      'filterDataSelected',
    ]),
  },
};
</script>