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
        {'object-card__bg_vip-vertical': dataObjectData.tarif === 'vip' && propObjectView !== 'list'},
        {'object-card__bg_premium-vertical': dataObjectData.tarif === 'premium' && propObjectView !== 'list'},
        {'object-card__bg_vip-horizontal': dataObjectData.tarif === 'vip' && propObjectView === 'list'},
        {'object-card__bg_premium-horizontal': dataObjectData.tarif === 'premium' && propObjectView === 'list'},
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
            (
              dataObjectData.photoGallery &&
              dataObjectData.photoGallery.length === 0
            )
          }
        ]"
      >
        <router-link
          class="object-card__link"
          :to="{
            name: 'objectPage',
            params: {
              id: dataObjectData.id,
              objectData: dataObjectData,
            }
          }"
          title="Перейти подробнее 1"
        >
          <img
            v-if="dataObjectData.photoGallery && dataObjectData.photoGallery.length === 0"
            class="img object-card__img"
            :src="hostResulted"
            alt=""
          >
          <img
            v-else
            class="img object-card__img"
            :src="dataObjectData.photoGallery[0]"
            alt=""
          >
        </router-link>
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
              v-if="dataObjectData.price"
              class="object-card__price_number"
            >
              {{ gFormatNumbers(dataObjectData.price) }} ₽
            </span>
            <span
              v-if="dataObjectData.deal && (dataObjectData.deal === 'rent')"
              class="object-card__price_text"
            >
              в месяц
            </span>
          </p>
          <button class="btn object-card__btn object-card__btn_favorites">
            <moveToFavorites
              v-if="propObjectView !== 'list'"
              :propColor="moveToFavColor"
              propIconView="mini"
              :propIsSelected="propIsSelected"
              :value.sync="favValue"
            />
          </button>
        </div>

        <div
          class="object-card__wrap-info_bottom"
          :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
        >

          <router-link
            class="
              object-card__link
              object-card__link_details
            "
            :to="{
              name: 'objectPage',
              params: {
                id: dataObjectData.id,
                objectData: dataObjectData,
              }
            }"
            title="Перейти подробнее 3"
          >

            <!-- app -->
            <div
              v-if="
                dataObjectData.objectType &&
                dataObjectData.objectType === 'app'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.appRoomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="
                    dataObjectData.appRoomsCount.slug === 'studio'
                    || dataObjectData.appRoomsCount.slug === 'freePlan'
                  "
                >
                  {{ dataObjectData.appRoomsCount.label }}
                </span>
                <span
                  v-if="
                    dataObjectData.appRoomsCount.slug !== 'studio'
                    && dataObjectData.appRoomsCount.slug !== 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.objectType === 'app'
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.appArea"
                >
                  {{ dataObjectData.appArea }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_floor
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.appFloor"
                >
                  {{ dataObjectData.appFloor }}
                </span>/
                <span
                  v-if="dataObjectData.appFloorAll"
                >
                  {{ dataObjectData.appFloorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- house -->
            <div
              v-if="
                dataObjectData.objectType === 'house'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.houseRoomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.houseRoomsCount }}
                </span>
                <span
                  v-if="
                    dataObjectData.houseRoomsCount != 'studio'
                    && dataObjectData.houseRoomsCount != 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.houseAreaHouse
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.houseAreaHouse">
                  {{ dataObjectData.houseAreaHouse }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.houseAreaLand
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.houseAreaLand">
                  {{ dataObjectData.houseAreaLand }} 
                </span>
                <span>
                  &nbsp;сот.
                </span>
              </div>
            </div>

            <!-- room -->
            <div
              v-if="
                dataObjectData.objectType === 'room'
              "
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.appRoomsCount
                "
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.appRoomsCount }}
                </span>
                <span
                  v-if="
                    dataObjectData.appRoomsCount != 'studio'
                    && dataObjectData.appRoomsCount != 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.appArea"
                >
                  {{ dataObjectData.appArea }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_floor
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.appFloor"
                >
                  {{ dataObjectData.appFloor }}
                </span>/
                <span
                  v-if="dataObjectData.appFloorAll"
                >
                  {{ dataObjectData.appFloorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- garage -->
            <div
              v-if="dataObjectData.objectType === 'garage'"
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
                <span v-if="dataObjectData.garageTypeShort">
                  {{ dataObjectData.garageTypeShort }}
                </span>
                <span v-else>
                  {{ dataObjectData.garageType }}
                </span>
              </div>
              <div
                v-if="dataObjectData.garageArea"
                class="
                  object-card__wrap-info-details-item
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.garageArea }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                v-if="dataObjectData.garageSubTypeShort"
                class="
                  object-card__wrap-info-details-item
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.garageSubTypeShort }}
                </span>
              </div>
            </div>

            <!-- sector -->
            <div v-if="dataObjectData.objectType === 'sector'"
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="dataObjectData.objectTypeLabel"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.objectTypeLabel }}
                </span>
              </div>
              <div v-if="dataObjectData.sectorArea"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.sectorArea }} сот.
                </span>
              </div>
              <div
                v-if="dataObjectData.sectorTypeShort"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span
                  v-if="dataObjectData.sectorTypeShort"
                >
                  {{ dataObjectData.sectorTypeShort }}
                </span>
              </div>
            </div>

            <!-- commercial -->
            <div
              v-if="dataObjectData.objectType === 'commercial'"
              class="object-card__wrap-info-details"
              :class="[
                {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details_grid': dataObjectData.objectType === 'commercial'}
              ]"
            >
              <div v-if="dataObjectData.objectTypeLabelShort"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectType === 'commercial'}
                ]"
              >
                <span>
                  {{ dataObjectData.objectTypeLabelShort }}
                </span>
              </div>
              <div
                v-if="dataObjectData.commercialArea"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectType === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.objectType === 'sector'"
                >
                  <span>
                    {{ dataObjectData.commercialArea }}
                  </span>
                  <span>
                    &nbsp;сот.
                  </span>
                </span>
                <span
                  v-else
                >
                  <span>
                    {{ dataObjectData.commercialArea }}
                  </span>
                  <span>
                    &nbsp;м²
                  </span>
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.objectType === 'commercial'
                  && dataObjectData.objectType !== 'sector'
                  && dataObjectData.commercialTenant
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectType === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.commercialTenant === 'yes'"
                >
                  С арендатором: Да
                </span>
                <span
                  v-if="dataObjectData.commercialTenant === 'no'"
                >
                  С арендатором: Нет
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.commercialFloor
                  && dataObjectData.commercialFloorAll
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectType === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.commercialFloor"
                >
                  {{ dataObjectData.commercialFloor }}
                </span>/
                <span
                  v-if="dataObjectData.commercialFloorAll"
                >
                  {{ dataObjectData.commercialFloorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>


            <!-- last -->
            <div
              v-if="
                dataObjectData.objectType === 'commercial'
                && dataObjectData.objectType === 'sector'
              "
              class="object-card__wrap-info-details object-card__wrap-info-details_last"
              :class="[
                {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
              ]"
            >
              <div
                v-if="dataObjectData.tenant"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectType === 'commercial'}
                ]"
              >
                <span v-if="dataObjectData.tenant === 'yes'">
                  С арендатором: Да
                </span>
                <span v-if="dataObjectData.tenant === 'no'">
                  С арендатором: Нет
                </span>
              </div>
            </div>

            <!-- address, district, id, date, icon -->
            <div
              v-if="
                dataObjectData.tarif
                && (
                    dataObjectData.tarif === 'premium'
                    || dataObjectData.tarif === 'vip'
                    || dataObjectData.tarif === 'up'
                  )
              "
              class="object-card__icons-block"
            >
              <div
                class="
                  object-card__icons-block-item
                  object-card__icons-block-item_district
                "
              >
                <p
                  class="object-card__wrap-info__item object-card__address"
                  :class="{'object-card__address_list-view': propObjectView === 'list'}"
                >
                  <span v-if="dataObjectData.addressName">
                    {{ dataObjectData.addressName }}
                  </span>
                </p>
                <p class="object-card__wrap-info__item object-card__district">
                  <span>
                    р-н
                  </span>
                  <span v-if="dataObjectData.district">
                    {{ dataObjectData.district }}
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
                    && dataObjectData.tarif === 'vip'
                  "
                  class="object-card__icon"
                  propColor="blue"
                  title="Это VIP объявление"
                />
                <iconDiamond
                  v-if="
                    dataObjectData.tarif
                    && dataObjectData.tarif === 'premium'
                  "
                  class="object-card__icon"
                  propColor="orange"
                  title="Это премиум объявление"
                />
                <iconArrowUp
                  v-if="
                    dataObjectData.tarif
                    && dataObjectData.tarif === 'up'
                  "
                  class="object-card__icon"
                  propColor="green"
                  title="Это объявление было поднято в поиске"
                />
                <p
                  class="
                    object-card__wrap-info__item
                    object-card__date
                  "
                >
                  <span
                    v-if="dataObjectData.createdDate"
                  >
                    {{ gTimestampToDateConverter(dataObjectData.createdDate) }}
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
                <span v-if="dataObjectData.addressName">
                  {{ dataObjectData.addressName }}
                </span>
              </p>
              <p class="object-card__wrap-info__item object-card__district">
                <span>
                  р-н
                </span>
                <span v-if="dataObjectData.district">
                  {{ dataObjectData.district }}
                </span>
              </p>
              <p
                class="
                  object-card__wrap-info__item
                  object-card__date
                  object-card__date_number
                  object-card__date_free
                "
              >
                <span v-if="dataObjectData.id">
                  <span>
                    №
                  </span>
                  <span>
                    {{ dataObjectData.id }}
                  </span>
                </span>
                <span
                  v-if="dataObjectData.createdDate"
                >
                  {{ gTimestampToDateConverter(dataObjectData.createdDate) }}
                </span>
              </p>
            </div>

          </router-link>

          <a
            href="http://an1tag.ru"
            class="object-card__link"
            target="_blank"
            :title="'Перейти на страницу ' + `${dataObjectData.user}`"
          >
            <p
              class="object-card__agency"
              :class="[
                {'object-card__agency_list-view': propObjectView === 'list'},
                {'object-card__agency_premium': dataObjectData.tarif && dataObjectData.tarif === 'premium'},
                {'object-card__agency_vip': dataObjectData.tarif && dataObjectData.tarif === 'vip'},
                {'object-card__agency_up': dataObjectData.tarif && dataObjectData.tarif === 'up'},
              ]"
            >
              <span
                v-if="dataObjectData.user"
              >
                {{ dataObjectData.user.name }}
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
          <moveToFavorites
            v-if="propObjectView === 'list'"
            :propColor="moveToFavColor"
            propIconView="mini"
            :propIsSelected="propIsSelected"
            :value.sync="favValue"
          />
          <showPhoneNumber
            propClass="object-card__btn object-card__btn_show-phone"
            v-if="dataObjectData.phoneNumber"
            :propPhoneNumber="dataObjectData.phoneNumber"
            propPhoneView="mini"
            :propObjectData="dataObjectData"
          />
        </div>
        <div
          class="object-card__action-bottom"
        >
          <socialSharing
            :propObjectData="dataObjectData"
          />
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
import iconArrowUp from '../icons/iconArrowUp.vue'
import iconDiamond from '../icons/iconDiamond.vue'
import iconHeartStroke from '../icons/iconHeartStroke.vue';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
      dataIsShowPhoneNumber: false,
      host: this.getHost(),
      favValue: false,
    }
  },
  components: {
    unit,
    socialSharing,
    showPhoneNumber,
    moveToFavorites,
    iconCrown,
    iconArrowUp,
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
    propIsSelected: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  watch: {
    propObjectData: {
      handler(value) {
        if (!!value) {
          this.dataObjectData = value;
        }
      },
      deep: true
    },
    favValue: {
      handler(value) {
        if (value) {
          // console.log('Add to Fav ::', value);
          // console.log('Add to Fav ::', this.dataObjectData);
          this.addItemToFavourites(this.dataObjectData);
        } else {
          // console.log('Remove from Fav ::', value);
          this.removeItemFromFavourites(this.dataObjectData.id);
        }
      },
      deep: true
    },
  },
  methods: {
    addItemToFavourites(object) {
      const newFavArray = [...this.favouriteObjects];
      const itemAlreadyInFavs = this.favouriteObjects.some(
        item => {
          if (item.id === object.id) {
            // console.log('item.id', item.id);
            // console.log('object.id', object.id);
            return true;
          }
          return false;
        }
      )
      // console.log('itemAlreadyInFavs', itemAlreadyInFavs);
      if (!itemAlreadyInFavs) {
        newFavArray.push(object);
        this.$store.commit('updateFavouriteObjectsState', newFavArray);
      }
    },
    removeItemFromFavourites(id) {
      const newFavArray = [];
      const newFavArrayID = [];
      this.favouriteObjects.forEach(
        item => {
          if (item.id !== id) {
            newFavArray.push(item);
          }
        }
      )
      this.userData.favouriteObjectsListID.forEach(
        item => {
          if (item !== id) {
            newFavArrayID.push(item);
          }
        }
      )
      this.userData.favouriteObjectsListID = newFavArrayID;
      this.$store.commit('updateUserDataState', this.userData);
      this.$store.commit('updateFavouriteObjectsState', newFavArray);
    },
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
      'userData',
      'favouriteObjects',
      'filterDataSelected',
    ]),
    moveToFavColor() {
      let color;
      if (this.dataObjectData.tarif) {
        if (this.dataObjectData.tarif === 'premium') {
          color = 'orange';
        } else if (this.dataObjectData.tarif === 'vip') {
          color = 'blue';
        } else if (this.dataObjectData.tarif === 'up') {
          color = 'green';
        }
      } else {
        color = 'default';
      }
      return color;
    },
    hostResulted() {
      if (!this.dataObjectData.urlPreview || this.dataObjectData.urlPreview.length === 0) {
        this.dataObjectData.urlPreview = '/src/images/logo/logo_desktop.png';
      }
      return this.host.front + this.dataObjectData.urlPreview
    },
  },
};
</script>