<template>
  <div
    class="object-card"
  >
    <div
      class="object-card__wrap"
      :class="{'object-card__wrap_list-view': propObjectView === 'list'}"
    >
      <div
        class="object-card__wrap-img-sample"
        :class="{'object-card__wrap-img_list-view': propObjectView === 'list'}"
      >
        <img
          v-if="
            dataObjectData.photoGallery.value
            && dataObjectData.photoGallery.value.length
            && dataObjectData.photoGallery.value[0].object
          "
          class="img object-card__img"
          :src="dataObjectData.photoGallery.value[0].object.url"
          alt=""
        >
        <span v-else>
          Картинка не загружена
        </span>

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
            <span
              v-if="dataObjectData.price.value"
              class="object-card__price_number"
            >
              {{ gFormatNumbers(dataObjectData.price.value) }} ₽
            </span>
            <span
              v-if="dataObjectData.deal.value && (dataObjectData.deal.slug === 'rent')"
              class="object-card__price_text"
            >
              в месяц
            </span>
          </p>
        </div>
        <div
          class="object-card__wrap-info_bottom"
          :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
        >
          <div
            v-if="
              dataObjectData.object.value.slug === 'app'
            "
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
          >
            <div
              v-if="
                dataObjectData.app.roomsCount.value
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span>
                {{ dataObjectData.app.roomsCount.value.label }}
              </span>
              <span
                v-if="
                  dataObjectData.app.roomsCount.value.slug != 'studio'
                  && dataObjectData.app.roomsCount.value.slug != 'freePlan'
                "
              >
                &nbsp;к.кв
              </span>
            </div>
            <div
              v-if="
                dataObjectData.object.value.slug === 'app'
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span v-if="dataObjectData.app.area.value">
                {{ dataObjectData.app.area.value }} 
              </span>
              <span>
                &nbsp;м²
              </span>
            </div>
            <div
              v-if="
                dataObjectData.object.value.slug === 'app'
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_floor"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span
                v-if="dataObjectData.app.floor.value"
              >
                {{ dataObjectData.app.floor.value.slug }}
              </span>/
              <span
                v-if="dataObjectData.app.floorAll.value"
              >
                {{ dataObjectData.app.floorAll.value.slug }}
              </span>
              <span>
                &nbsp;этаж
              </span>
            </div>
          </div>
          <div
            v-if="
              dataObjectData.object.value.slug === 'house'
            "
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
          >
            <div
              v-if="
                dataObjectData.house.roomsCount.value
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span>
                {{ dataObjectData.house.roomsCount.value.label }}
              </span>
              <span
                v-if="
                  dataObjectData.house.roomsCount.value.slug != 'studio'
                  && dataObjectData.house.roomsCount.value.slug != 'freePlan'
                "
              >
                &nbsp;комн.
              </span>
            </div>
            <div
              v-if="
                dataObjectData.house.areaHouse.value
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span v-if="dataObjectData.house.areaHouse.value">
                {{ dataObjectData.house.areaHouse.value }} 
              </span>
              <span>
                &nbsp;м²
              </span>
            </div>
            <div
              v-if="
                dataObjectData.house.areaLand.value
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span v-if="dataObjectData.house.areaLand.value">
                {{ dataObjectData.house.areaLand.value }} 
              </span>
              <span>
                &nbsp;сот.
              </span>
            </div>
          </div>
          <p
            class="object-card__wrap-info__item object-card__address"
            :class="{'object-card__address_list-view': propObjectView === 'list'}"
          >
            <span
              v-if="dataObjectData.address.value"
            >
              {{ dataObjectData.address.value }}
            </span>
          </p>
          <p class="object-card__wrap-info__item object-card__district">
            <span>
              р-н
            </span>
            <span
              v-if="dataObjectData.district.value"
            >
              {{ dataObjectData.district.value.label }}
            </span>
          </p>
          <p class="object-card__wrap-info__item object-card__date">
            <span
              v-if="dataObjectData.id"
            >
              <span>
                №
              </span>
              <span>
                {{ dataObjectData.id }}
              </span>
            </span>
            <span
              v-if="dataObjectData.date"
            >
              {{ dataObjectData.date }}
            </span>
          </p>
          <p
            class="object-card__agency"
            :class="{'object-card__agency_list-view': propObjectView === 'list'}"
          >
            <span
              v-if="dataObjectData.agency.name"
            >
              {{ dataObjectData.agency.name }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import iconHeartStroke from '../icons/iconHeartStroke.vue';
import showPhoneNumber from './showPhoneNumber.vue';
import moveToFavorites from './moveToFavorites.vue';
import socialSharing from './socialSharing.vue';

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
    moveToFavorites,
    socialSharing,
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
  watch: {
    propObjectData: {
      handler(value) {
        this.dataObjectData = value;
      },
      deep: true
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