<template>
  <div
    class="object-card"
  >
    <div
      v-if="
        dataObjectData.tarif
      "
      class="object-card__bg"
      :class="[
        {'object-card__bg_premium': dataObjectData.tarif.slug === 'premium'},
        {'object-card__bg_vip': dataObjectData.tarif.slug === 'vip'},
      ]"
    />

    <div
      class="object-card__wrap"
      :class="{'object-card__wrap_list-view': propObjectView === 'list'}"
    >

      <div
        class="object-card__wrap-img"
        :class="[
          {'object-card__wrap-img_list-view': propObjectView === 'list'},
          {'object-card__wrap-img-sample_default':
            !(dataObjectData.urlPreview)
          }
        ]"
      >
        <router-link
          class="object-card__link"
          :to="{ name: 'objectPage' }"
          title="Перейти подробнее"
        >
          <img
            v-if="
              dataObjectData.urlPreview
            "
            class="img object-card__img"
            :src="'src/images/' + dataObjectData.urlPreview"
            alt=""
          >
          <img
            v-else
            class="img object-card__img"
            src="src/images/logo/logo_desktop.png"
            alt=""
          >
        </router-link>
      </div>


      <div
        class="object-card__wrap-info"
        :class="{'object-card__wrap-info_list-view': propObjectView === 'list'}"
      >

        <router-link
          class="object-card__link"
          :to="{ name: 'objectPage' }"
          title="Перейти подробнее"
        >
          <div
            class="object-card__wrap-info_top"
            :class="{'object-card__wrap-info_top_list-view': propObjectView === 'list'}"
          >
            <p class="object-card__price">
              <span
                v-if="dataObjectData.price"
                class="object-card__price_number"
              >
                {{ gFormatNumbers(dataObjectData.price) }} ₽
              </span>
              <span
                v-if="dataObjectData.deal && (dataObjectData.deal.slug === 'rent')"
                class="object-card__price_text"
              >
                в месяц
              </span>
            </p>
          </div>
        </router-link>

        <div
          class="object-card__wrap-info_bottom"
          :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
        >

          <router-link
            class="object-card__link"
            :to="{ name: 'objectPage' }"
            title="Перейти подробнее"
          >

            <!-- app -->
            <div
              v-if="
                dataObjectData.object.slug === 'app'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.roomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.roomsCount.label }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCount.slug != 'studio'
                    && dataObjectData.roomsCount.slug != 'freePlan'
                  "
                >
                  &nbsp;к.кв
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.object.slug === 'app'
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.area">
                  {{ dataObjectData.area.slug }} 
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
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor.slug }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll.slug }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- house -->
            <div
              v-if="
                dataObjectData.object.slug === 'house'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.roomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.roomsCount.label }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCount.slug != 'studio'
                    && dataObjectData.roomsCount.slug != 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.areaHouse
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.areaHouse">
                  {{ dataObjectData.areaHouse.slug }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.areaSector
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.areaSector">
                  {{ dataObjectData.areaSector.slug }} 
                </span>
                <span>
                  &nbsp;сот.
                </span>
              </div>
            </div>

            <!-- room -->
            <div
              v-if="
                dataObjectData.object.slug === 'room'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.roomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.roomsCount.label }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCount.slug != 'studio'
                    && dataObjectData.roomsCount.slug != 'freePlan'
                  "
                >
                  &nbsp;к.кв
                </span>
              </div>
              <div
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.area">
                  {{ dataObjectData.area.slug }} 
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
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor.slug }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll.slug }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- garage -->
            <div
              v-if="dataObjectData.object.slug === 'garage'"
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                class="
                  object-card__wrap-info-details-item
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span v-if="dataObjectData.type">
                  {{ dataObjectData.type.label }}
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.type
                  && (dataObjectData.garageType || dataObjectData.parkingType)
                "
                class="
                  object-card__wrap-info-details-item
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span v-if="dataObjectData.type.slug === 'garage'">
                  <span v-if="dataObjectData.garageType.labelShort">
                    {{ dataObjectData.garageType.labelShort }}
                  </span>
                </span>
                <span v-if="dataObjectData.type.slug === 'parking'">
                  <span v-if="dataObjectData.parkingType.labelShort">
                    {{ dataObjectData.parkingType.label }}
                  </span>
                </span>
              </div>
              <div
                v-if="dataObjectData.area"
                class="
                  object-card__wrap-info-details-item
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.area.slug }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
            </div>

            <!-- sector -->
            <div v-if="dataObjectData.object.slug === 'sector'"
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="dataObjectData.type"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span v-if="dataObjectData.type.labelShort">
                  {{ dataObjectData.type.labelShort }}
                </span>
                <span v-else>
                  {{ dataObjectData.type.label }}
                </span>
              </div>
              <div v-if="dataObjectData.area"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.area.label }} сот.
                </span>
              </div>
            </div>

            <!-- commercial -->
            <div
              v-if="dataObjectData.object.slug === 'commercial'"
              class="object-card__wrap-info-details"
              :class="[
                {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details_grid': dataObjectData.object.slug === 'commercial'}
              ]"
            >
              <div v-if="dataObjectData.type"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.object.slug === 'commercial'}
                ]"
              >
                <span>
                  {{ dataObjectData.type.label }}
                </span>
              </div>
              <div
                v-if="dataObjectData.area"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.object.slug === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.type.slug === 'sector'"
                >
                  <span>
                    {{ dataObjectData.area.label }}
                  </span>
                  <span>
                    &nbsp;сот.
                  </span>
                </span>
                <span
                  v-else
                >
                  <span>
                    {{ dataObjectData.area.label }}
                  </span>
                  <span>
                    &nbsp;м²
                  </span>
                </span>
              </div>
              <div
                v-if="dataObjectData.class"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.object.slug === 'commercial'}
                ]"
              >
                <span>
                  Класс {{ dataObjectData.class.label }}
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.floor
                  && dataObjectData.floorAll
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.object.slug === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor.label }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll.label }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- address, district, id, date, icon -->
            <div
              v-if="
                dataObjectData.tarif
                && (dataObjectData.tarif.slug === 'premium' || dataObjectData.tarif.slug === 'vip')
              "
              class="object-card__icons-block"
            >
              <div class="object-card__icons-block-item">
                <p
                  class="object-card__wrap-info__item object-card__address"
                  :class="{'object-card__address_list-view': propObjectView === 'list'}"
                >
                  <span v-if="dataObjectData.address">
                    {{ dataObjectData.address }}
                  </span>
                </p>
                <p class="object-card__wrap-info__item object-card__district">
                  <span>
                    р-н
                  </span>
                  <span v-if="dataObjectData.district">
                    {{ dataObjectData.district.label }}
                  </span>
                </p>
                <p class="object-card__wrap-info__item object-card__date object-card__date_number">
                  <span v-if="dataObjectData.id">
                    <span>
                      №
                    </span>
                    <span>
                      {{ dataObjectData.id }}
                    </span>
                  </span>
                </p>
              </div>
              <div
                class="
                  object-card__icons-block-item
                  object-card__icons-block-item_icon
                "
              >
                <iconCrown
                  v-if="
                    dataObjectData.tarif
                    && dataObjectData.tarif.slug === 'vip'
                  "
                  class="object-card__icon"
                  propColor="blue"
                />
                <iconDiamond
                  v-if="
                    dataObjectData.tarif
                    && dataObjectData.tarif.slug === 'premium'
                  "
                  class="object-card__icon"
                  propColor="orange"
                />
                <p class="object-card__wrap-info__item object-card__date">
                  <span
                    v-if="dataObjectData.date"
                  >
                    {{ gTimestampToDateConverter(dataObjectData.date) }}
                  </span>
                </p>
              </div>
            </div>

            <div
              v-if="!dataObjectData.tarif"
              class="
                object-card__icons-block
                object-card__icons-block_no
              "
            >
              <p
                class="object-card__wrap-info__item object-card__address"
                :class="{'object-card__address_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.address">
                  {{ dataObjectData.address }}
                </span>
              </p>
              <p class="object-card__wrap-info__item object-card__district">
                <span>
                  р-н
                </span>
                <span v-if="dataObjectData.district">
                  {{ dataObjectData.district.label }}
                </span>
              </p>
              <p class="object-card__wrap-info__item object-card__date object-card__date_number">
                <span v-if="dataObjectData.id">
                  <span>
                    №
                  </span>
                  <span>
                    {{ dataObjectData.id }}
                  </span>
                </span>
                <span v-if="dataObjectData.date">
                  {{ gTimestampToDateConverter(dataObjectData.date) }}
                </span>
              </p>
            </div>

          </router-link>

          <a
            href="http://an1tag.ru"
            class="object-card__link"
            target="_blank"
            :title="'Перейти на сайт ' + `${dataObjectData.agency}`"
          >
            <p
              class="object-card__agency"
              :class="[
                {'object-card__agency_list-view': propObjectView === 'list'},
                {'object-card__agency_premium': dataObjectData.tarif && dataObjectData.tarif.slug === 'premium'},
                {'object-card__agency_vip': dataObjectData.tarif && dataObjectData.tarif.slug === 'vip'},
              ]"
            >
              <span
                v-if="dataObjectData.agency"
              >
                {{ dataObjectData.agency }}
              </span>
            </p>
          </a>
        </div>


        <div
          v-if="false"
          class="object-card__wrap-info_bottom"
          :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
        >
        </div>
      </div>


      <div
        v-if="!propIsSample"
        class="object-card__action"
        :class="{'object-card__action_list-view': propObjectView === 'list'}"
      >
        <div
          class="object-card__action-top"
        >
          <showPhoneNumber
            propClass="object-card__btn_show-phone"
            v-if="dataObjectData.phoneNumber"
            :propPhoneNumber="dataObjectData.phoneNumber"
          />
          <button
            class="btn object-card__btn_write-message"
            @click.stop.prevent
          >
            Написать сообщение
          </button>
        </div>
        <div
          class="object-card__action-bottom"
        >
          <socialSharing />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import showPhoneNumber from './showPhoneNumber.vue';
import moveToFavorites from './moveToFavorites.vue';
import socialSharing from './socialSharing.vue';
import unit from './unit.vue';
import iconCrown from '../icons/iconCrown.vue'
import iconDiamond from '../icons/iconDiamond.vue'
import iconHeartStroke from '../icons/iconHeartStroke.vue';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
      dataIsShowPhoneNumber: false,
    }
  },
  components: {
    unit,
    socialSharing,
    showPhoneNumber,
    moveToFavorites,
    iconCrown,
    iconDiamond,
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
    propObjectType: {
      type: String,
      default: 'app',
      required: false,
    },
    propIsSample: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  watch: {
    propObjectData: {
      handler(value) {
        if (!!value) {
          // console.log('2 ::', value);
          this.dataObjectData = value;
        }
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