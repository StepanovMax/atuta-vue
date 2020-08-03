<template>
  <div
    class="object-card"
  >
    <div
      class="object-card__wrap"
      :class="{'object-card__wrap_list': propObjectView === 'list'}"
    >
      <div
        class="object-card__img-wrap"
        :class="{'object-card__img_list': propObjectView === 'list'}"
      >
        <img
          class="img object-card__img"
          :src="'src/images/' + dataObjectData.urlPreview"
          alt=""
        >
      </div>
      <div class="object-card__info-wrap">
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
          <button class="btn object-card__btn object-card__btn_favorites">
            <iconHeartStroke />
          </button>
        </div>
        <div class="object-card__bottom">
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
          <p class="object-card__item object-card__address">
            {{ dataObjectData.address }}
          </p>
          <p class="object-card__item object-card__district">
            р-н {{ dataObjectData.district }}
          </p>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import iconHeartStroke from '../icons/iconHeartStroke.vue';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
    }
  },
  components: {
    iconHeartStroke,
  },
  props: {
    propObjectData: {
      type: Object,
      default: {},
      required: true,
    },
    propObjectView: {
      type: String,
      default: 'net',
      required: true,
    },
  },
  methods: {
    timeConverter(UNIX_timestamp){
      const a = new Date(UNIX_timestamp * 1000);
      const year = a.getFullYear();
      let month = a.getMonth();
      if (month < 10) {
        month = '0' + month;
      }
      let day = a.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      const time = day + '.' + month + '.' + year;
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