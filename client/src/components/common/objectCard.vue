<template>
  <div
    class="object-card"
  >
    <div
      class="object-card__wrap"
      :class="{'object-card__wrap_list-view': propObjectView === 'list'}"
    >
      <div
        class="object-card__wrap-img"
        :class="{'object-card__wrap-img_list-view': propObjectView === 'list'}"
      >
        <img
          class="img object-card__img"
          :src="'src/images/' + dataObjectData.urlPreview"
          alt=""
        >
      </div>
      <div
        class="object-card__wrap-info"
        :class="{'object-card__wrap-info_list-view': propObjectView === 'list'}"
      >
        <div
          class="object-card__wrap-info_top"
          :class="{'object-card__wrap-info_top_list-view': propObjectView === 'list'}"
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
          class="object-card__wrap-info_bottom"
          :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
        >
          <div
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list': propObjectView === 'list'}"
          >
            <div
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              {{ dataObjectData.rooms }} к.кв
            </div>
            <div
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              {{ dataObjectData.area }} м²
            </div>
            <div
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_floor"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              {{ dataObjectData.floorCurrent }}/{{ dataObjectData.floorFull }} этаж
            </div>
          </div>
          <p
            class="object-card__wrap-info__item object-card__address"
            :class="{'object-card__address_list-view': propObjectView === 'list'}"
          >
            {{ dataObjectData.address }}
          </p>
          <p class="object-card__wrap-info__item object-card__district">
            р-н {{ dataObjectData.district }}
          </p>
          <p class="object-card__wrap-info__item object-card__date">
            <span>
              № {{ dataObjectData.id }}
            </span>
            <span>
              {{ timeConverter(dataObjectData.date) }}
            </span>
          </p>
          <p
            class="object-card__agency"
            :class="{'object-card__agency_list-view': propObjectView === 'list'}"
          >
            {{ dataObjectData.agency }}
          </p>
        </div>
      </div>
      <div
        class="object-card__action"
        :class="{'object-card__action_list-view': propObjectView === 'list'}"
      >
        <div
          class=""
        >
          <showPhoneNumber
            propClass="object-card__btn_show-phone"
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