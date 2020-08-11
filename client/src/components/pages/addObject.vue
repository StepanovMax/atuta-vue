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
                v-model="floorAll"
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
                :options="filterDataDefaultClone.appFloorAllListCurrent"
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
            <div class="form__block-width">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Фотографии
              </h3>
              <upload-image
                is="upload-image"
                :url="'google.com'"
                button_html="Загрузить изображения"
              />


              <div class="input-file">
                <div
                  class="input-file-images"
                >
                  <ul
                    v-show="false"
                    class="input-file-images__list"
                  >
                    <li
                      class="input-file-images__list-item"
                      v-for="(item, index) in dataUploadedImages"
                      :key="index"
                    >
                      <img
                        :alt="item.name"
                        class="input-file-images__list-item-img"
                        :ref="'image'"
                      >
                      <button
                        class="btn input-file-images__btn_close"
                        @click="removeImage(index)"
                      >
                        <iconCross propColor="white" />
                      </button>
                    </li>
                  </ul>
                  <ul class="input-file-images__list">
                    <li
                      class="input-file-images__list-item"
                      v-for="(item, index) in images"
                      :key="index"
                    >
                      <img
                        :src="item.src"
                        class="input-file-images__list-item-img"
                      >
                      <button
                        class="btn input-file-images__btn_close"
                        @click="removeImage(index)"
                      >
                        <iconCross propColor="white" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Описание
              </h3>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                class="textarea"
                v-model="createdObject.description"
              >
              </textarea>
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
                Цена
              </h3>
              <inputField
                :value.sync="createdObject.app.price"
              />
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width">
            <div class="form__block-width">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Размещение объявления
              </h3>
              <p class="paragraph">
                Стоимость размещения объявления - 30 ₽
              </p>
              <p class="paragraph">
                Подача объявления стоит 30 рублей и в течение 30 дней Ваше объявление будет показываться на сайте.
              </p>
              <p class="paragraph">
                Чтобы поднять объявление в поиске - воспользуйтесь услугой “Поднять объявление”. Она обновляет дату размещения объявления, поэтому поднимается в поиске, как только что опубликованное. В итоге Ваше объявление видит больше потенциальных покупателей.
              </p>
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width">
            <div class="form__block-width">
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                Услуга “Поднять объявление”
              </h3>
              <tarifs 
                :value.sync="createdObject.tarif"
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
                add-object-page__text_price-total
              ">
                Итого: {{ totalPrice }}₽
              </h3>
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <objectCard
                class="object-card_fixed-width"
                :propObjectData="objectData"
                key="key-preview-add-object"
                propObjectView=""
              />
            </div>

            <div class="
              form__block-width
              form__block-width-two-third
              form__block-width-third_to-bottom
            ">
              <p class="paragraph paragraph_mini">
                Вот таким образом ваше объявление будет выглядеть после подачи.
              </p>
              <button
                class="
                  btn
                  btn_blue
                  btn_middle
                  add-object-page__btn
                "
              >
                Разместить объявление
              </button>
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
import ads from '../ads.vue';
import tarifs from '../tarifs.vue';
import multiselect from 'vue-multiselect';
import uploadImage from 'vue-upload-image';
import switcher from '../common/switcher.vue';
import iconCross from '../icons/iconCross.vue';
import { mapState, store, commit } from 'vuex';
import objectCard from '../common/objectCard.vue';
import inputField from '../common/inputField.vue';
import radioButtons from '../common/radioButtons.vue';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

export default {
  name: 'addObject',
  components: {
    ads,
    tarifs,
    switcher,
    yandexMap,
    iconCross,
    ymapMarker,
    inputField,
    objectCard,
    multiselect,
    uploadImage,
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
      dataUploadedImages: [],
      images: [],
      objectData: {
        price: '1630000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Чехова, 318',
        area: 60,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Западный',
        date: '1596317207',
        agency: '"Тандем" Реэлторская компания',
        id: 7125647174,
        urlPreview: 'objects/8993850241.jpg',
        phoneNumber: '79612701887',
      },
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
      'objectDataSelected',
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
    totalPrice() {
      let selectedTarifPrice = 0;
      if (this.createdObject.tarif) {
        selectedTarifPrice = this.createdObject.tarif.price;
      }
      const defaultPrice = 30;
      const sum = defaultPrice + selectedTarifPrice;
      return sum;
    },
    floorAll: {
      cache: false,
      get() {
        return this.createdObject.app.floorAll;
      },
      set(value) {
        // If a user select floorFull more than floorCurrent.
        if (this.createdObject.app.floor && value.slug < this.createdObject.app.floor.slug) {
          // Then floorCurrent will be a null.
          this.createdObject.app.floor = null;
        }
        // All floors that bigger than selected floorAll value will be disabled.
        this.filterDataDefaultClone.appFloorAllListCurrent.forEach(
          item => {
            // Convert slug string to number and add a value +1.
            const selectedNumber = +value.slug + 1;
            if (item.slug >= selectedNumber ) {
              item.$isDisabled = true;
            } else {
              item.$isDisabled = false;
            }
          }
        )
        this.createdObject.app.floorAll = value;
      }
    },
  },
  created() {
    this.createdObject = JSON.parse(JSON.stringify(this.objectDataSelected));
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
          console.error('Rejected [Geocode error] ::', error);
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
    uploadImages(event) {
      // console.log('uploadIMages files ::', event);
      // console.log('uploadIMages files ::', event.srcElement.files.length);
      if (!!event.srcElement.files.length) {
        // this.dataUploadedImages = event.srcElement.files;

        // URL.createObjectURL(event.srcElement.files[i];

        for (const i in event.srcElement.files) {
          if (event.srcElement.files.hasOwnProperty(i)) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.$refs.image[i].src = reader.result;
            };
            reader.readAsDataURL(this.dataUploadedImages[i]);

            // let object = event.srcElement.files[i];
            // object.name = window.URL.createObjectURL(object.name);
            // console.log('i ::', object);
            // console.log('object.name ::', object.name);
            // this.dataUploadedImages.push(object);
          }
        }
        // console.log('this.dataUploadedImages ::', this.dataUploadedImages);
      }
    },
    uploadImage(e) {
      let vm = this;
      const selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.dataUploadedImages.push(selectedFiles[i]);
      }

      for (let i = 0; i < this.dataUploadedImages.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
          this.images.push({
            'src': reader.result
          });
        };

        reader.readAsDataURL(this.dataUploadedImages[i]);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
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