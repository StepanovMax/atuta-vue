<template>
  <div
    id="objectPage"
    class="object-page"
  >
    <div class="object-page__content">

      <div class="object-page__header">

        <div class="object-page__row">
          <div class="object-page__side-left">

            <getBackToPrevUrl />

            <div class="object-page__mobile-wrap">

              <div class="object-page__category">
                <p
                  v-if="objectData"
                  class="object-page__category-text"
                >
                  {{ objectData.object.label }} / {{ objectData.deal.label }}
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

        <div class="object-page__row">

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
              v-if="objectData"
              :propImages="objectData.photoGallery"
            />

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
              v-if="objectData && objectData.phoneNumber"
              propClass="object-card__btn object-card__btn_show-phone"
              :propPhoneNumber="objectData.phoneNumber"
              propPhoneView="big"
            />

            <moveToFavorites
              propIconView="big"
              propColor="default"
            />

            <!-- App -->
            <div
              v-if="objectData && objectData.object.slug === 'app'"
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.type"
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
                  {{ objectData.type.label }}
                </span>
              </p>

              <!-- View -->
              <p
                v-if="objectData.view"
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
                  {{ objectData.view.label }}
                </span>
              </p>

              <!-- Roomscount -->
              <p
                v-if="objectData.roomsCount"
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
                  {{ objectData.roomsCount.slug }}
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
                  {{ objectData.floor.slug }}
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
                  {{ objectData.floorAll.slug }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.area"
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
                    {{ objectData.area.slug }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area kitchen -->
              <p
                v-if="objectData.areaKitchen"
                class="object-page__characteristics-item"
              >
                <span
                  class="object-page__characteristics-item_left"
                >
                  Площадь кухни:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.areaKitchen.slug }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area living -->
              <p
                v-if="objectData.areaLiving"
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
                    {{ objectData.areaLiving.slug }}
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
                  {{ objectData.year.label }}&nbsp;г.
                </span>
              </p>
            </div>

            <!-- House -->
            <div
              v-if="objectData && objectData.object.slug === 'house'"
              class="object-page__characteristics"
            >
              <!-- View -->
              <p
                v-if="objectData.view"
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
                  {{ objectData.view.label }}
                </span>
              </p>

              <!-- Roomscount -->
              <p
                v-if="objectData.roomsCount"
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
                  {{ objectData.roomsCount.slug }}
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
                  {{ objectData.year.label }}&nbsp;г.
                </span>
              </p>

              <!-- Wall material -->
              <p
                v-if="objectData.wall"
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
                  {{ objectData.wall.label }}
                </span>
              </p>

              <!-- Area house -->
              <p
                v-if="objectData.areaHouse"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь дома:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.areaHouse.label }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Area sector -->
              <p
                v-if="objectData.areaSector"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь участка:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.areaSector.label }}
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
              v-if="objectData && objectData.object.slug === 'room'"
              class="object-page__characteristics"
            >
              <!-- Area -->
              <p
                v-if="objectData.area"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.area.label }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Rooms count -->
              <p
                v-if="objectData.roomsCount"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Комнат всего:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.roomsCount.label }}
                </span>
              </p>

              <!-- View -->
              <p
                v-if="objectData.view"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Вид дома:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.view.label }}
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
                  {{ objectData.year.label }}&nbsp;г.
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
                  {{ objectData.floor.slug }}
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
                  {{ objectData.floorAll.slug }}
                </span>
              </p>
            </div>

            <!-- Garage -->
            <div
              v-if="objectData && objectData.object.slug === 'garage'"
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.type"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.type.label }}
                </span>
              </p>

              <!-- Garage type -->
              <p
                v-if="objectData.garageType"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип гаража:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.garageType.label }}
                </span>
              </p>

              <!-- Parking type -->
              <p
                v-if="objectData.parkingType"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип парковочного места:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.parkingType.label }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.area"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.area.label }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Security -->
              <p
                v-if="objectData.security"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Охрана:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.security.label }}
                </span>
              </p>
            </div>

            <!-- Sector -->
            <div
              v-if="objectData && objectData.object.slug === 'sector'"
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.type"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.type.label }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.area"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.area.label }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meterSquare" />
                </span>
              </p>

              <!-- Facade -->
              <p
                v-if="objectData.facade"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Фасад:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.facade.value }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="meter" />
                </span>
              </p>

              <!-- Availability of buildings -->
              <p
                v-if="objectData.availabilityOfBuildings"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Наличие строений:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.availabilityOfBuildings.label }}
                </span>
              </p>
            </div>

            <!-- Commercial -->
            <div
              v-if="objectData && objectData.object.slug === 'commercial'"
              class="object-page__characteristics"
            >
              <!-- Type -->
              <p
                v-if="objectData.type"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Тип:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.type.label }}
                </span>
              </p>

              <!-- Area -->
              <p
                v-if="objectData.area"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Площадь:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.area.label }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit
                    v-if="objectData.type.slug === 'sector'"
                    propUnit="acr"
                  />
                  <unit
                    v-if="objectData.type.slug !== 'sector'"
                    propUnit="meterSquare"
                  />
                </span>
              </p>

              <!-- Class -->
              <p
                v-if="objectData.class"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Класс:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.class.label }}
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

              <!-- Floor all -->
              <p
                v-if="objectData.floorAll"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Этажей всего:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.floorAll.slug }}
                </span>
              </p>

              <!-- Tenant -->
              <p
                v-if="objectData.tenant"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  С арендатором:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.tenant.label }}
                </span>
              </p>

              <!-- Year -->
              <p
                v-if="objectData.year && objectData.type.slug !== 'sector'"
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
                  {{ objectData.year.label }}&nbsp;г.
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
                v-if="objectData.distance"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Расстояние до города:
                </span>
                <span class="object-page__characteristics-item_right">
                  <span>
                    {{ objectData.distance.value }}
                  </span>
                  <span>
                    &nbsp;
                  </span>
                  <unit propUnit="km" />
                </span>
              </p>

              <!-- Online show -->
              <p
                v-if="objectData.onlineShow"
                class="object-page__characteristics-item"
              >
                <span class="object-page__characteristics-item_left">
                  Онлайн показ:
                </span>
                <span class="object-page__characteristics-item_right">
                  {{ objectData.onlineShow.label }}
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
                  {{ gTimestampToDateConverter(objectData.date) }}
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

          </div>

        </div>

        <div class="object-page__row">

          <div
            v-if="objectData"
            class="object-page__side-left"
          >

            <p class="paragraph">
              {{ objectData.description }}
            </p>

          </div>

          <div class="object-page__side-right">

            <p class="object-page__address">
              {{ objectData.address }}
            </p>
            
            <yandex-map
              v-if="objectData"
              class="object-page__map"
              :settings="settings"
              :coords="objectData.coords"
              :zoom="15"
              :controls="controls"
              style="width: 100%; height: 300px;"
            >
              <ymap-marker 
                :coords="objectData.coords"
                marker-id="PointID"
              />
            </yandex-map>

            <p class="paragraph object-page__user">
              {{ objectData.user.type.label }}: {{ objectData.user.name }}
            </p>

            <lineChart
              v-if="objectData"
              style="
                width: 99%;
                height: 200px;
              "
            />

          </div>

        </div>

      </div>


      <div class="object-page__wrap">
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

    <ads2 />

  </div>
</template>

<script>
import ads2 from '../ads-2.vue';
import unit from '../common/unit.vue';
import lineChart from '../common/lineChart.vue';
import socialSharing from '../common/socialSharing.vue';
import priceWithUnit from '../common/priceWithUnit.vue';
import moveToFavorites from '../common/moveToFavorites.vue';
import showPhoneNumber from '../common/showPhoneNumber.vue';
import getBackToPrevUrl from '../common/getBackToPrevUrl.vue';
import imagesCarousel from '../common/imagesCarousel.vue';
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
    ads2,
    unit,
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
    }
  },
  created() {
    this.getObjectOnPageReload();
  },
  methods: {
    // Get an object when the page has been reload.
    getObjectOnPageReload() {
      // If it's a route transition then load an object through params.
      if (this.$route.params.objectData) {
        this.objectData = this.$route.params.objectData;
      } else {
        const url = 'http://localhost:9001/objects/get-object-by-id';
        fetch(
          url,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              id: this.objectID
            })
          }
        )
          .then(
            response => {
              if (response.status !== 200) {
                console.error('Looks like there was a problem. :: ' + 'Status Code ' + response.status);
                return;
              }
              response.json()
                .then(
                  response => {
                    this.objectData = response;
                  }
                )
                .catch(
                  err => {
                    console.error('Request failed ::', err)
                  }
                );
            }
          );
      }
    }
  },
};
</script>