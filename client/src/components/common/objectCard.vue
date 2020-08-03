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
        :class="{'object-card__img-wrap_list': propObjectView === 'list'}"
      >
        <img
          class="img object-card__img"
          :src="'src/images/' + dataObjectData.urlPreview"
          alt=""
        >
      </div>
      <div
        class="object-card__info-wrap"
        :class="{'object-card__info-wrap_list': propObjectView === 'list'}"
      >
        <div
          class="object-card__middle"
          :class="{'object-card__middle_list': propObjectView === 'list'}"
        >
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
        <div
          class="object-card__bottom"
          :class="{'object-card__bottom_list': propObjectView === 'list'}"
        >
          <div
            class="object-card__item object-card__info"
            :class="{'object-card__info_list': propObjectView === 'list'}"
          >
            <div
              class="object-card__info-item object-card__info-item_room"
              :class="{'object-card__info-item_list': propObjectView === 'list'}"
            >
              {{ dataObjectData.rooms }} к.кв
            </div>
            <div
              class="object-card__info-item object-card__info-item_area"
              :class="{'object-card__info-item_list': propObjectView === 'list'}"
            >
              {{ dataObjectData.area }} м²
            </div>
            <div
              class="object-card__info-item object-card__info-item_floor"
              :class="{'object-card__info-item_list': propObjectView === 'list'}"
            >
              {{ dataObjectData.floorCurrent }}/{{ dataObjectData.floorFull }} этаж
            </div>
          </div>
          <p
            class="object-card__item object-card__address"
            :class="{'object-card__address_list': propObjectView === 'list'}"
          >
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
          <p
            class="object-card__agency"
            :class="{'object-card__agency_list': propObjectView === 'list'}"
          >
            {{ dataObjectData.agency }}
          </p>
        </div>
      </div>
      <div
        class="object-card__right"
        :class="{'object-card__right_list': propObjectView === 'list'}"
      >
        <div
          class=""
        >
          <showPhoneNumber
            v-if="dataObjectData.phoneNumber"
            :propPhoneNumber="dataObjectData.phoneNumber"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import iconHeartStroke from '../icons/iconHeartStroke.vue';
import showPhoneNumber from './showPhoneNumber.vue';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
      dataIsShowPhoneNumber: false,
    }
  },
  components: {
    iconHeartStroke,
    showPhoneNumber,
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