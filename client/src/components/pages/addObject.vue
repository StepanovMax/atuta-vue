<template>
  <div
    id="addObject"
    class="main add-object-page"
  >

    <ads />

    <div class="article">
      <h1
        class="
          title
          title_h3
          title_bold
        "
      >
        Подать объявление
      </h1>

      <div class="form form_add-object">
        <div class="form__row form__row_block-width form__row_block-width-half">
          <div class="form__block-width form__block-width-half">
            <div class="form__row">
              <h3 class="
                title
                title_h4
                form__title
                form__title_add-object
                title_bold
              ">
                Тип объекта*
              </h3>
              <radioButtons
                radioButtonsView="wrapAddObject"
                radioButtonsId="objectType"
                :items="filterDataDefaultClone.object"
                :value.sync="createdObject.object"
              />
            </div>

            <div class="form__row">
              <h3 class="
                title
                title_h4
                form__title
                form__title_add-object
                title_bold
              ">
                Тип сделки*
              </h3>
              <switcher
                class="add-object-page__switcher"
                switcherId="dealDesktop"
                :items="filterDataDefaultClone.deal"
                :value.sync="createdObject.deal"
              />
            </div>

            <div class="form__row">
              <h3 class="
                title
                title_h4
                form__title
                form__title_add-object
                title_bold
              ">
                Адрес*
              </h3>
              <input
                type="text"
                class="
                  input
                  form__input
                  form__input_add-object
                "
                v-model="currentAddress"
                @change="updateMapPosition($event)"
              >
            </div>
          </div>
          <div class="form__block-width form__block-width-half">
            <yandex-map 
              class="add-object-page__map"
              :settings="settings"
              :coords="coordsTaganrog"
              :zoom="15"
              :controls="controls"
              @click="onMapClick"
            >
              <ymap-marker 
                :coords="coordsTaganrog"
                marker-id="123"
                hint-content="some hint" 
              />
            </yandex-map>
          </div>
        </div>
        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h4
                form__title
                form__title_add-object
                title_bold
              ">
                Район*
              </h3>
              <multiselect
                v-model="createdObject.district"
                :options="filterDataDefaultClone.district"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="label"
                placeholder="Район"
              />
            </div>
          </div>
        </div>
      </div>

      <pre>
        {{ createdObject }}
      </pre>

    </div>

    <ads />

  </div>
</template>

<script>
import { mapState, store, commit } from 'vuex';
import ads from '../ads.vue';
import multiselect from 'vue-multiselect';
import switcher from '../common/switcher.vue';
import radioButtons from '../common/radioButtons.vue';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

export default {
  name: 'addObject',
  components: {
    ads,
    switcher,
    yandexMap,
    ymapMarker,
    multiselect,
    radioButtons,
  },
  data() {
    return {
      createdObject: {},
      settings: {
        lang: 'ru_RU',
        version: '2.1',
        coordorder: 'latlong',
        apiKey: '511c4fe7-bda5-4cea-b1e2-bdb28ea527c9',
      },
      coordsMoscow: [
        55.661574,
        37.573856,
      ],
      coordsTaganrog: [
        47.22064,
        38.914713,
      ],
      coordsTaganrogChekhova: [
        47.215266,
        38.908182,
      ],
      controls: [
        'zoomControl',
      ],
      currentAddress: ''
    }
  },
  watch: {
    currentAddress: {
      handler(value) {
        this.createdObject.address = value;
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'filterDataSelected',
    ]),
    atLeastOneFormItemIsFilled() {
      const value = true;
      return value;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
  created() {
    this.createdObject = JSON.parse(JSON.stringify(this.filterDataSelected));
    this.createdObject.address = null; 
  },
  methods: {
    onMapClick(e) {
      this.coordsTaganrog = e.get('coords');
      ymaps.geocode(this.coordsTaganrog).then(
        res => {
          // console.log('geoObjects', res.geoObjects.get(0));
          const firstGeoObject = res.geoObjects.get(0);
          // var firstGeoObjectStreet = firstGeoObject.properties.get('name');
          // const coords = firstGeoObject.geometry.getCoordinates();
          // const firstGeoObjectAddress = firstGeoObject.getLocalities();

          // Название населенного пункта или вышестоящее административно-территориальное образование.
          // console.log(firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas());
          const town = firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas();
          firstGeoObject.properties.getAll();
          this.currentAddress = firstGeoObject.properties.getAll().text;
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          // firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        },
        error => {
          console.log('Rejected [Geocode error] ::', error);
        }
      );
    },
    async getAddress(coords) {
      // await loadYmap({ ...settings, debug: true });
      // ymap.geocode(coords).then(function (res) {
      //   // const firstGeoObject = res.geoObjects.get(0);
      //   console.log('res', res);

      //   // myPlacemark.properties
      //   //   .set({
      //   //     // Формируем строку с данными об объекте.
      //   //     iconCaption: [
      //   //       // Название населенного пункта или вышестоящее административно-территориальное образование.
      //   //       firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
      //   //       // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
      //   //       firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      //   //     ].filter(Boolean).join(', '),
      //   //     // В качестве контента балуна задаем строку с адресом объекта.
      //   //     balloonContent: firstGeoObject.getAddressLine()
      //   //   });
      // });
    },
    updateMapPosition(event) {
      ymaps.geocode(event.target.value).then(
        res => {
          const firstGeoObject = res.geoObjects.get(0);
          const coords = firstGeoObject.geometry.getCoordinates();
          this.coordsTaganrog = coords;
          this.currentAddress = firstGeoObject.properties.getAll().text;
        },
        error => {
          console.log('Rejected [Geocode error] ::', error);
        }
      );
    },
  },
  // async mounted() {
  //   await loadYmap({
  //     ...this.settings,
  //     debug: true
  //   });
  // }
};
</script>