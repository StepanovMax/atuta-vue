<template>
  <div
    id="objectPage"
  >
    <div
      v-if="objectData"
      class="object-page__content"
    >

      <div class="object-page__header">

        <div class="object-page__row">
          <div class="object-page__side-left">

            <breadcrumbs
              :propPageName="backToPage"
            />

            <div class="object-page__mobile-wrap">

              <div class="object-page__category">
                <p
                  v-if="objectData"
                  class="object-page__category-text"
                >
                  {{ objectData.objectTypeLabel }} / {{ objectData.deal.label }}
                </p>
              </div>

              <div class="
                object-page__price
                object-page__price_mobile
              ">
                <priceWithUnit
                  v-if="objectData"
                  :propNumber="parseInt(objectData.price)"
                  propUnit="rouble"
                />
              </div>

            </div>

          </div>
        </div>

        <div
          class="object-page__row"
        >

          <div class="object-page__side-left">

            <h2
              v-if="objectData"
              class="
              title
              title_h3
              object-page__title
              "
            >
              {{ objectData.title }}
            </h2>

            <imagesCarousel
              v-if="
                objectData
                && objectData.photoGallery.length
              "
              :propImages="objectData.photoGallery"
            />

            <div
              v-else
              class="object-page__photo-gallery"
            >
              <img 
                :src="defaultImgSrc"
              class="object-page__photo-gallery-img"
              />
            </div>

            <p
              v-if="
                objectData
                && !objectData.photoGallery.length
              "
              class="
                paragraph
                object-page__description
              "
            >
              {{ objectData.description }}
            </p>

          </div>

          <div class="object-page__side-right">

            <div class="
              object-page__price
              object-page__price_desktop
            ">
              <priceWithUnit
                v-if="objectData"
                :propNumber="parseInt(objectData.price)"
                propUnit="rouble"
              />
            </div>

            <showPhoneNumber
              v-if="
                objectOwner
                && objectOwner.phone
              "
              propClass="object-card__btn object-card__btn_show-phone"
              :propPhoneNumber="objectOwner.phone"
              propPhoneView="big"
              :propObjectData="objectData"
              :propConnectionWay="objectData.connectionWay"
            />

            <moveToFavorites
              propIconView="big"
              propColor="default"
            />

            <!-- App -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'app'
              "
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.objectTypeLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Тип объекта:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.objectTypeLabel }}
                </span>
              </p>

              <!-- View -->
              <p
                v-if="objectData.appViewLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Вид дома:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.appViewLabel }}
                </span>
              </p>

              <!-- Roomscount -->
              <p
                v-if="objectData.roomsCountLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Количество комнат:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.roomsCountLabel }}
                </span>
              </p>

              <!-- Floor -->
              <p
                v-if="objectData.floor"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Этаж:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.floor }}
                </span>
              </p>

              <!-- Floor all -->
              <p
                v-if="objectData.floorAll"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Этажей в доме:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.floorAll }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.appArea"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Площадь квартиры:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  <span>
                    {{ objectData.appArea }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area kitchen -->
              <p
                v-if="objectData.appAreaKitchen"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Площадь кухни:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.appAreaKitchen }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area living -->
              <p
                v-if="objectData.appAreaLiving"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Жилая площадь:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  <span>
                    {{ objectData.appAreaLiving }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Year -->
              <p
                v-if="objectData.year"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Год постройки:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.year }}г.
                </span>
              </p>
            </div>

            <!-- House -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'house'
              "
              class="object-page__characteristics"
            >
              <!-- View -->
              <p
                v-if="objectData.houseTypeLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Вид дома:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.houseTypeLabel }}
                </span>
              </p>

              <!-- Roomscount -->
              <p
                v-if="objectData.roomsCountLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Количество комнат:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.roomsCountLabel }}
                </span>
              </p>

              <!-- Year -->
              <p
                v-if="objectData.year"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Год постройки:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.year }}г.
                </span>
              </p>

              <!-- Wall material -->
              <p
                v-if="objectData.houseWallLabel"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Материал стен:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.houseWallLabel }}
                </span>
              </p>

              <!-- Area house -->
              <p
                v-if="objectData.houseAreaHouse"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь дома:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.houseAreaHouse }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area sector -->
              <p
                v-if="objectData.houseAreaLand"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь участка:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.houseAreaLand }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="acr" />
                </span>
              </p>

              <!-- Floor -->
              <p
                v-if="objectData.floor"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Этаж:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.floor.slug }}
                </span>
              </p>
            </div>

            <!-- Room -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'room'
              "
              class="object-page__characteristics"
            >
              <!-- Area -->
              <p
                v-if="objectData.roomArea"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.roomArea }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Rooms count -->
              <p
                v-if="objectData.roomsCountLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Комнат всего:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.roomsCountLabel }}
                </span>
              </p>

              <!-- View -->
              <p
                v-if="objectData.rromViewLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Вид дома:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.rromViewLabel }}
                </span>
              </p>

              <!-- Year -->
              <p
                v-if="objectData.year"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Год постройки:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.year }}г.
                </span>
              </p>

              <!-- Floor -->
              <p
                v-if="objectData.floor"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Этаж:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.floor }}
                </span>
              </p>

              <!-- Floor all -->
              <p
                v-if="objectData.floorAll"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Этажей в доме:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.floorAll }}
                </span>
              </p>
            </div>

            <!-- Garage -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'garage'
              "
              class="object-page__characteristics"
            >
              <!-- Sub type -->
              <p
                v-if="objectData.garageTypeLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.garageTypeLabel }}
                </span>
              </p>

              <!-- Garage type -->
              <p
                v-if="objectData.garageSubTypeLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип гаража:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.garageSubTypeLabel }}
                </span>
              </p>

              <!-- Parking type -->
              <p
                v-if="objectData.parkingSubTypeLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип парковочного места:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.parkingSubTypeLabel }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.garageArea"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.garageArea }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Security -->
              <p
                v-if="objectData.garageSecurity"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Охрана:
                </span>
                <span
                  v-if="objectData.garageSecurity"
                  class="object-page__characteristics-item_right"
                >
                  Да
                </span>
                <span
                  v-else
                  class="object-page__characteristics-item_right"
                >
                  Нет
                </span>
              </p>
            </div>

            <!-- Sector -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'sector'
              "
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.sectorTypeLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.sectorTypeLabel }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.sectorArea"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.sectorArea }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Facade -->
              <p
                v-if="objectData.sectorFacade"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Фасад:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.sectorFacade }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meter" />
                </span>
              </p>

              <!-- Availability of buildings -->
              <p
                v-if="objectData.sectorAvailabilityOfBuildings"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Наличие строений:
                </span>
                <span
                  v-if="objectData.sectorAvailabilityOfBuildings"
                  class="object-page__characteristics-item_right"
                >
                  Да
                </span>
                <span
                  v-else
                  class="object-page__characteristics-item_right"
                >
                  Нет
                </span>
              </p>
            </div>

            <!-- Commercial -->
            <div
              v-if="
                objectData
                && objectData.objectTypeSlug === 'commercial'
              "
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.commercialTypeLabel"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.commercialTypeLabel }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.commercialArea"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.commercialArea }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit
                    v-if="objectData.objectTypeSlug === 'sector'"
                    propUnit="acr"
                  />
                  <unit
                    v-if="objectData.objectTypeSlug !== 'sector'"
                    propUnit="meterSquare"
                  />
                </span>
              </p>

              <!-- Class -->
              <p
                v-if="objectData.commercialClass"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Класс:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.commercialClass }}
                </span>
              </p>

              <!-- Floor -->
              <p
                v-if="objectData.floor"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Этаж:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.floor }}
                </span>
              </p>

              <!-- Floor all -->
              <p
                v-if="objectData.floorAll"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Этажей всего:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.floorAll }}
                </span>
              </p>

              <!-- Tenant -->
              <p
                v-if="
                  objectData
                  && objectData.objectTypeSlug === 'commercial'
                  && objectData.commercialTenant
                "
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  С арендатором:
                </span>
                <span
                  v-if="objectData.commercialTenant"
                  class="object-page__characteristics-item_right"
                >
                  Да
                </span>
                <span
                  v-else
                  class="object-page__characteristics-item_right"
                >
                  Нет
                </span>
              </p>

              <!-- Year -->
              <p
                v-if="objectData.year"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Год постройки:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.year }}г.
                </span>
              </p>
            </div>

            <!-- Common -->
            <div
              v-if="objectData"
              class="object-page__characteristics"
            >
              <!-- Distance -->
              <p
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Расстояние до города:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span
                    v-if="objectData.distanceSlug === 'into-city'"
                  >
                    В черте города
                  </span>
                  <span
                    v-else
                  >
                    {{ objectData.distanceLabel }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit
                    v-if="
                      objectData.distanceSlug
                      && objectData.distanceSlug !== 'into-city'
                    "
                    propUnit="km"
                  />
                  <span
                    v-if="!objectData.distanceSlug"
                  >
                    Не указано
                  </span>
                </span>
              </p>

              <!-- Online show -->
              <p
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Онлайн показ:
                </span>
                <span
                  v-if="objectData.onlineShow"
                  class="object-page__characteristics-item_right"
                >
                  Да
                </span>
                <span
                  v-else
                  class="object-page__characteristics-item_right"
                >
                  Нет
                </span>
              </p>

              <!-- Date -->
              <p
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Дата:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ gTimestampToDateConverter(objectData.createdDate) }}
                </span>
              </p>

              <!-- ID -->
              <p
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  №:
                </span>
                <span
                  class="object-page__characteristics-item_right"
                >
                  {{ objectData.id }}
                </span>
              </p>

              <!-- Viewings -->
              <p
                v-if="objectData.viewings"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Просмотров:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.viewings.value }}
                </span>
              </p>
            </div>

            <p
              v-if="this.objectOwner"
              class="paragraph object-page__user"
            >
              <span>
                {{ this.objectOwner.name }}
              </span>
            </p>

            <p
              v-if="
                this.objectOwner
                && (
                  objectData.companyRoleSlug === 'agency'
                  || objectData.companyRoleSlug === 'builder'
                )
              "
              class="paragraph object-page__user"
            >
              {{ this.objectData.companyRoleLabel }}
            </p>

          </div>

        </div>

        <div
          class="object-page__row"
        >

          <div
            v-if="objectData"
            class="object-page__side-left"
          >

            <p
              v-if="
                objectData
                && objectData.photoGallery.length
              "
              class="
                paragraph
                object-page__description
              "
            >
              {{ objectData.description }}
            </p>

            <div
              v-if="false"
              class="object-page__same-objects"
            >
              <h3 class="object-page__same-objects-title">
                Похожие объекты
              </h3>

              <grid
                v-if="storedObjects"
                propSortingTypeGrid="common"
                :propGridView="'net'"
                :propGridItems="storedObjects"
                :propGridSorting="false"
                propItemType="object"
              />
            </div>

          </div>

          <div
            class="object-page__side-right"
          >

            <p class="object-page__address">
              {{ objectData.address }}
            </p>
            
            <yandex-map
              v-if="false && objectData"
              class="object-page__map"
              :settings="settings"
              :coords="objectData.coords"
              :zoom="15"
              :controls="controls"
              style="width: 100%;"
            >
              <ymap-marker 
                :coords="objectData.coords"
                marker-id="PointID"
              />
            </yandex-map>

            <lineChart
              v-if="objectData"
              style="
                width: 280px;
                height: 200px;
              "
            />

          </div>

        </div>

      </div>


      <div
        class="object-page__wrap"
      >
        <div class="object-page__row">

          <div class="object-page__side-left">

            <p class="paragraph">
              {{ message.message }}
            </p>

          </div>

          <div class="object-page__side-right">

            <socialSharing
              v-if="objectData"
              class="object-page__social-sharing"
              :propObjectData="objectData"
            />

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import grid from '../grid.vue';
import adsRight from '../adsRight.vue';
import unit from '../common/unit.vue';
import lineChart from '../common/lineChart.vue';
import socialSharing from '../common/socialSharing.vue';
import priceWithUnit from '../common/priceWithUnit.vue';
import moveToFavorites from '../common/moveToFavorites.vue';
import showPhoneNumber from '../common/showPhoneNumber.vue';
import getBackToPrevUrl from '../common/getBackToPrevUrl.vue';
import imagesCarousel from '../common/imagesCarousel.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

import axios from 'axios';
import { mapState, store, commit } from 'vuex';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

export default {
  metaInfo: {
    title: 'My Example App',
    meta: [
      {
        vmid: 'description',
        property: 'description',
        content: 'Vue App'
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Vue App'
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Vue App'
      },
    ],
  },
  name: 'objectPage',
  components: {
    breadcrumbs,
    adsRight,
    unit,
    grid,
    yandexMap,
    ymapMarker,
    lineChart,
    socialSharing,
    priceWithUnit,
    imagesCarousel,
    showPhoneNumber,
    moveToFavorites,
    getBackToPrevUrl,
  },
  data() {
    return {
      // backToPage: '',
      objectOwner: null,
      objectData: null,
      message: {},
      objectID: this.$route.params.id,
      // Yandex map
      controls: [
        'zoomControl',
      ],
      settings: {
        lang: 'ru_RU',
        version: '2.1',
        coordorder: 'latlong',
        apiKey: '6d871862-9fd6-4a24-b967-4a75bef3fdfd',
        apiKeyOld: '511c4fe7-bda5-4cea-b1e2-bdb28ea527c9',
      },
      data: {},
      storedObjects: false,
      defaultImgSrc: process.env.host_front + '/src/images/logo/logo_page.jpg',
      // objectDataProp: {
      //   title: this.objectData.title,
      // },
    }
  },
  watch: {
    backToPage: {
      handler() {
        if (this.previousPage) {
          console.log('previousPage ::', this.previousPage);
          // this.companiesPage
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'previousPage',
    ]),
    backToPage() {
      if (this.previousPage) {
        // console.log('previousPage ->', this.previousPage.name);
        return this.previousPage.name;
        // this.companiesPage
      }
      return '';
    },
  },
  methods: {
    async getUserById(id) {
      console.log('getUserById ::', id);

      const transport = axios.create({
        withCredentials: true
      });

      await transport.post(
        process.env.host_api + '/user/get-user-by-id',
        {
          id: id
        }
      )
        .then(
          response => {
            // console.log('response ::', response);
            this.objectOwner = response.data;
            console.log('this.objectOwner ::', this.objectOwner);
          }
        )
          .catch(
            error => {
              this.userData = null;
              console.error(error);
            }
          );
    },
    // Get an object when the page has been reload.
    async getObjectOnPageReload() {
      console.log('this.objectID ::', this.objectID);

      const transport = axios.create({
        withCredentials: true
      });

      await transport.post(
        process.env.host_api + '/object/get-object-by-id',
        {
          id: this.objectID
        }
      )
        .then(
          response => {
            console.log('response ::', response.data);
            this.objectData = response.data;
            if (this.objectData.objectType === 'house') {
              this.objectData.distance = this.objectData.houseDistance;
              this.objectData.year = this.objectData.houseYear;
              this.objectData.floorAll = this.objectData.houseFloorAll;
              this.objectData.floor = this.objectData.houseFloor;
              this.objectData.roomsCount = this.objectData.houseRoomsCount;
            } else if (this.objectData.objectType === 'commercial') {
              this.objectData.distance = this.objectData.commercialDistance;
              this.objectData.year = this.objectData.commercialYear;
              this.objectData.floorAll = this.objectData.commercialFloorAll;
              this.objectData.floor = this.objectData.commercialFloor;
            } else if (this.objectData.objectType === 'sector') {
              this.objectData.distance = this.objectData.sectorDistance;
            } else if (this.objectData.objectType === 'room') {
              this.objectData.year = this.objectData.roomYear;
              this.objectData.floorAll = this.objectData.roomFloorAll;
              this.objectData.floor = this.objectData.roomFloor;
              this.objectData.roomsCount = this.objectData.roomRoomsCount;
            } else if (this.objectData.objectType === 'app') {
              this.objectData.year = this.objectData.appYear;
              this.objectData.floorAll = this.objectData.appFloorAll;
              this.objectData.floor = this.objectData.appFloor;
              this.objectData.roomsCount = this.objectData.appRoomsCount;
            }
            console.log('objectData ::', this.objectData);
            this.getUserById(this.objectData.userId);
          }
        )
          .catch(
            error => {
              this.objectData = null;
              console.error(error);
            }
          );
    },
    // Get an object when the page has been reload.
    async getSameObjects() {
      // const url = '//127.0.0.1:9001/objects/get-objects';
      const result = await axios.get(process.env.host_api + '/objects/get-objects')
        .then(function (response) {
          return response;
        })
          .catch(function (error) {
            console.error(error);
          });
      if (result) {
        this.storedObjects = result.data;
      }
    },
  },
  beforeMount() {
    // this.getSameObjects();
    // If it's a route transition then load an object through params.
    if (this.$route.params.objectData) {
      this.objectData = this.$route.params.objectData;
      this.getUserById(this.objectData.userId);
    } else {
      this.getObjectOnPageReload();
    }
    console.log('objectData.photoGallery ::', this.objectData);
    // if (this.objectData && !this.objectData.photoGallery.length) {
    //   this.objectData.photoGallery.push('/src/images/logo/logo_page.jpg');
    // }
  },
};
</script>