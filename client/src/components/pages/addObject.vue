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
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Тип объекта*
              </h3>
              <radioButtons
                radioButtonsView="wrapAddObject"
                radioButtonsId="objectTypeAddObject"
                :items="filterDataDefaultClone.object"
                :value.sync="createdObject.object"
              />
            </div>

            <div class="form__row">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
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
                title_h5
                title_bold
                form__title
                form__title_add-object
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
                title_h5
                title_bold
                form__title
                form__title_add-object
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

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Тип объекта*
              </h3>
              <switcher
                class="add-object-page__switcher"
                switcherId="typeAddObject"
                :items="filterDataDefaultClone.appTypes"
                :value.sync="createdObject.app.type"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Вид дома
              </h3>
              <radioButtons
                radioButtonsView="wrapHalf"
                radioButtonsId="appViewAddObject"
                :items="filterDataDefaultClone.appView"
                :value.sync="createdObject.app.view"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Количество комнат*
              </h3>
              <multiselect
                v-model="createdObject.app.roomsCount"
                :options="filterDataDefaultClone.appRooms"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="label"
                placeholder="Количество комнат"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Этажи
          </h3>
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                Этажей всего*
              </h4>
              <multiselect
                v-model="createdObject.app.floorAll"
                :options="filterDataDefaultClone.appFloorAllList"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="label"
                placeholder="Этажей всего"
              />
            </div>
            <div class="form__block-width form__block-width-third">
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                Этаж*
              </h4>
              <multiselect
                v-model="createdObject.app.floor"
                :options="filterDataDefaultClone.appFloorAllList"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="label"
                placeholder="Этаж"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Год постройки
          </h3>
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <multiselect
                v-model="createdObject.app.year"
                :options="appYearsList"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="label"
                placeholder="Год постройки"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Площадь
          </h3>
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                Общая площадь
              </h4>
              <input
                type="number"
                class="input"
                v-model="appAreaFull"
                :class="{
                  'input_error': this.errors.includes('appAreaFull')
                }"
              >
            </div>
            <div class="form__block-width form__block-width-third">
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                Площадь кухни
              </h4>
              <input
                type="number"
                class="input"
                v-model="appAreaKitchen"
                :class="{
                  'input_error': this.errors.includes('appAreaKitchen')
                }"
              >
            </div>
            <div class="form__block-width form__block-width-third">
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                Жилая площадь
              </h4>
              <input
                type="number"
                class="input"
                :class="{
                  'input_error': this.errors.includes('appAreaLiving')
                }"
                v-model="appAreaLiving"
              >
            </div>
          </div>
          <p
            v-if="this.errors.includes('appAreaFull')"
            class="paragraph paragraph_invalid"
          >
            Сумма жилой площади и площади кухни не может быть больше или равна общей площади
          </p>
          <p
            v-if="this.errors.includes('appAreaLiving')"
            class="paragraph paragraph_invalid"
          >
            Жилая площадь не может быть больше или равна общей площади
          </p>
          <p
            v-if="this.errors.includes('appAreaKitchen')"
            class="paragraph paragraph_invalid"
          >
            Площадь кухни не может быть больше или равна общей площади
          </p>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Онлайн показ
              </h3>
              <switcher
                class="add-object-page__switcher"
                switcherId="onlineShowAddObject"
                :items="filterDataDefaultClone.appOnlineShow"
                :value.sync="createdObject.app.onlineShow"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Фотографии
              </h3>
              
            </div>
          </div>
        </div>

      </div>

      <div
        style="
          color: #444;
          font-size: 13px;
          line-height: 110%;
        "
      >
        <h3
          class="
            title
            title_h6
            title_bold
          "
        >
          Данные созданного объекта:
        </h3>
        <pre>{{ createdObject }}</pre>
      </div>

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
      currentAddress: '',
      numberYear: null,
      appAreaFullData: null,
      appAreaKitchenData: null,
      appAreaLivingData: null,
      errors: [],
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
    appYearsList() {
      const currentYear = new Date().getFullYear();
      const startYear = this.filterDataDefaultClone.appYearsStartPosition;
      let yearsArray = [];
      for (let i = startYear; i <= currentYear; i++) {
        yearsArray.push(
          {
            'slug': i,
            'label': i
          }
        );
      }
      return yearsArray.reverse()
    },
    appArea: {
      cache: false,
      get() {
        return this.inputValueFrom;
      },
      set(value) {
        console.log(value);
      }
    },
    appAreaFull: {
      cache: false,
      get() {
        return this.appAreaFullData;
      },
      set(value) {
        this.appAreaFullData = this.validateNumbers(value);
        this.validateArea();
      }
    },
    appAreaKitchen: {
      cache: false,
      get() {
        return this.appAreaKitchenData;
      },
      set(value) {
        this.appAreaKitchenData = this.validateNumbers(value);
        this.validateArea();
      }
    },
    appAreaLiving: {
      cache: false,
      get() {
        return this.appAreaLivingData;
      },
      set(value) {
        console.log('value ::', value);
        if (value === '0') {
          this.errors.push('appAreaLiving');
        } else {
          const index = this.errors.indexOf('appAreaLiving');
          this.errors.splice(index, 1);
        }
        this.appAreaLivingData = this.validateNumbers(value);
        this.validateArea();
      }
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
    numberYearValidate(event) {
      const currentYear = new Date().getFullYear();
      const value = event.target.value;
      if (value.length === 4) {
        if (value > 1800 && value <= currentYear) {
          console.log('value  year correct ::', value);
        }
      }
    },
    validateArea() {
      // console.log(' ');
      // console.log('this.appAreaFull', this.appAreaFull);
      // console.log('this.appAreaKitchen', this.appAreaKitchen);
      // console.log('this.appAreaLiving', this.appAreaLiving);
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen)) {
        if (this.appAreaFull <= this.appAreaKitchen) {
          this.errors.push('appAreaKitchen');
        } else {
          const indexAppAreaKitchen = this.errors.indexOf('appAreaKitchen');
          this.errors.splice(indexAppAreaKitchen, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaLiving)) {
        if (this.appAreaFull <= this.appAreaLiving) {
          this.errors.push('appAreaLiving');
        } else {
          const indexAppAreaLiving = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen) && Boolean(this.appAreaLiving)) {
        const sumKitchenWithLiving = +this.appAreaKitchen + +this.appAreaLiving;
        if (this.appAreaFull <= sumKitchenWithLiving) {
          this.errors.push('appAreaFull');
        } else {
          const indexAppAreaKitchen = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaKitchen, 1);
          const indexAppAreaLiving = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
    },
    validateNumbers(value) {
      const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
      return trimmedValue;
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