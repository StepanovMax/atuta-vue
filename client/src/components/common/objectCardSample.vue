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
          <div
            v-if="
              dataObjectData.object.value.slug === 'room'
            "
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
          >
            <div
              v-if="
                dataObjectData.room.roomsCount.value
              "
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span>
                {{ dataObjectData.room.roomsCount.value.label }}
              </span>
              <span
                v-if="
                  dataObjectData.room.roomsCount.value.slug != 'studio'
                  && dataObjectData.room.roomsCount.value.slug != 'freePlan'
                "
              >
                &nbsp;к.кв
              </span>
            </div>
            <div
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span v-if="dataObjectData.room.area.value">
                {{ dataObjectData.room.area.value }} 
              </span>
              <span>
                &nbsp;м²
              </span>
            </div>
            <div
              class="object-card__wrap-info-details-item object-card__wrap-info-details-item_floor"
              :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
            >
              <span
                v-if="dataObjectData.room.floor.value"
              >
                {{ dataObjectData.room.floor.value.slug }}
              </span>/
              <span
                v-if="dataObjectData.room.floorAll.value"
              >
                {{ dataObjectData.room.floorAll.value.slug }}
              </span>
              <span>
                &nbsp;этаж
              </span>
            </div>
          </div>
          <div
            v-if="
              dataObjectData.object.value.slug === 'garage'
            "
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
          >
            <div
              v-if="
                dataObjectData.garage.type.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
                object-card__wrap-info-details-item_garage
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
              ]"
            >
              <span
                v-if="
                  dataObjectData.garage.type.value.slug === 'garage'
                  && dataObjectData.garage.garageType.value
                "
              >
                {{ dataObjectData.garage.garageType.value.label }}
              </span>
              <span
                v-if="
                  dataObjectData.garage.type.value.slug === 'parking'
                  && dataObjectData.garage.parkingType.value
                "
              >
                {{ dataObjectData.garage.parkingType.value.label }}
              </span>
            </div>
            <div
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
                object-card__wrap-info-details-item_garage
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
              ]"
            >
              <span v-if="dataObjectData.garage.area.value">
                {{ dataObjectData.garage.area.value }} 
              </span>
              <span>
                &nbsp;м²
              </span>
            </div>
          </div>
          <div
            v-if="
              dataObjectData.object.value.slug === 'sector'
            "
            class="object-card__wrap-info-details"
            :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
          >
            <div
              v-if="
                dataObjectData.sector.type.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
                object-card__wrap-info-details-item_garage
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
              ]"
            >
              <span
                v-if="dataObjectData.sector.type.value.labelShort"
              >
                {{ dataObjectData.sector.type.value.labelShort }}
              </span>
              <span
                v-else
              >
                {{ dataObjectData.sector.type.value.label }}
              </span>
            </div>
            <div
              v-if="
                dataObjectData.sector.area.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
                object-card__wrap-info-details-item_garage
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
              ]"
            >
              <span>
                {{ dataObjectData.sector.area.value }} сот.
              </span>
            </div>
          </div>
          <div
            v-if="
              dataObjectData.object.value.slug === 'commercial'
            "
            class="object-card__wrap-info-details"
            :class="[
              {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
              {'object-card__wrap-info-details_grid': dataObjectData.object.value.slug === 'commercial'}
            ]"
          >
            <div
              v-if="
                dataObjectData.commercial.type.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details-item_grid': dataObjectData.object.value.slug === 'commercial'}
              ]"
            >
              <span>
                {{ dataObjectData.commercial.type.value.label }}
              </span>
            </div>
            <div
              v-if="
                dataObjectData.commercial.area.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details-item_grid': dataObjectData.object.value.slug === 'commercial'}
              ]"
            >
              <span
                v-if="dataObjectData.commercial.type.value.slug === 'sector'"
              >
                <span>
                  {{ dataObjectData.commercial.area.value }}
                </span>
                <span>
                  &nbsp;сот.
                </span>
              </span>
              <span
                v-else
              >
                <span>
                  {{ dataObjectData.commercial.area.value }}
                </span>
                <span>
                  &nbsp;м²
                </span>
              </span>
            </div>
            <div
              v-if="
                dataObjectData.commercial.class.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details-item_grid': dataObjectData.object.value.slug === 'commercial'}
              ]"
            >
              <span>
                Класс {{ dataObjectData.commercial.class.value.label }}
              </span>
            </div>
            <div
              v-if="
                dataObjectData.commercial.floor.value
                && dataObjectData.commercial.floorAll.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details-item_grid': dataObjectData.object.value.slug === 'commercial'}
              ]"
            >
              <span
                v-if="dataObjectData.commercial.floor.value"
              >
                {{ dataObjectData.commercial.floor.value.slug }}
              </span>/
              <span
                v-if="dataObjectData.commercial.floorAll.value"
              >
                {{ dataObjectData.commercial.floorAll.value.slug }}
              </span>
              <span>
                &nbsp;этаж
              </span>
            </div>
          </div>
          <div
            v-if="
              dataObjectData.object.value.slug === 'commercial'
            "
            class="object-card__wrap-info-details object-card__wrap-info-details_last"
            :class="[
              {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
            ]"
          >
            <div
              v-if="
                dataObjectData.commercial.tenant.value
              "
              class="
                object-card__wrap-info-details-item
                object-card__wrap-info-details-item_area
              "
              :class="[
                {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details-item_grid': dataObjectData.object.value.slug === 'commercial'}
              ]"
            >
              <span
                v-if="dataObjectData.commercial.tenant.value.slug === 'yes'"
              >
                С арендатором
              </span>
              <span
                v-if="dataObjectData.commercial.tenant.value.slug === 'no'"
              >
                Без арендатора
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