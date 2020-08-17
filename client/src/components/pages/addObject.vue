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
                @change="onInputEnter($event)"
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
                :options="localityDistricts"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="slug"
                placeholder="Район"
              />
            </div>
          </div>
        </div>

        <addObjectApp
          v-if="
            createdObject.deal
            && createdObject.object
            && createdObject.object.slug === 'app'
          "
          :propCreatedObjectApp="createdObject.app"
        />

        <addObjectHouse
          v-if="
            createdObject.deal
            && createdObject.object
            && createdObject.object.slug === 'house'
          "
          :propCreatedObjectHouse="createdObject.house"
        />

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

        <div
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3
                v-if="
                  !createdObject.deal
                "
                class="
                  form__title
                  form__title_add-object
                "
              >
                Цена
              </h3>
              <h3
                v-if="
                  createdObject.deal
                  && createdObject.deal.slug === 'buy'
                "
                class="
                  form__title
                  form__title_add-object
                "
              >
                Цена
              </h3>
              <h3
                v-if="
                  createdObject.deal
                  && createdObject.deal.slug === 'rent'
                "
                class="
                  form__title
                  form__title_add-object
                "
              >
                Цена в месяц
              </h3>
              <inputField
                :value.sync="createdObject.price"
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
import axios from 'axios';
import multiselect from 'vue-multiselect';
import uploadImage from 'vue-upload-image';
import { mapState, mapGetters, store, commit } from 'vuex';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

import ads from '../ads.vue';
import tarifs from '../tarifs.vue';
import iconCross from '../icons/iconCross.vue';
import switcher from '../common/switcher.vue';
import objectCard from '../common/objectCard.vue';
import inputField from '../common/inputField.vue';
import radioButtons from '../common/radioButtons.vue';
import addObjectApp from '../addObject/desktop/addObjectApp.vue';
import addObjectHouse from '../addObject/desktop/addObjectHouse.vue';

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
    addObjectApp,
    addObjectHouse,
    axios,
  },
  data() {
    return {
      localityDistricts: [],
      townObject: {},
      townLabel: {
        type: String,
        default: '',
      },
      createdObject: {},
      settings: {
        lang: 'ru_RU',
        version: '2.1',
        coordorder: 'latlong',
        apiKey: '6d871862-9fd6-4a24-b967-4a75bef3fdfd',
        apiKeyOld: '511c4fe7-bda5-4cea-b1e2-bdb28ea527c9',
      },
      coordsTaganrog: [
        47.22064,
        38.914713,
      ],
      controls: [
        'zoomControl',
      ],
      currentAddress: '',
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
      district: '',
    }
  },
  watch: {
    townLabel: {
      handler(value) {
        const localityObject = this.getLocalityByLabel(value);
        // this.townObject = localityObject;
        console.log('localityDistricts', this.localityDistricts);
        console.log('localityDistricts', this.localityDistricts);
        this.localityDistricts = localityObject.districts;
        // this.localityDistricts = [
        //   {
        //     label: 'Центр3',
        //     slug: 'center3',
        //   },
        //   {
        //     label: 'Центр4',
        //     slug: 'center4y',
        //   }
        // ];
        this.createdObject.town = localityObject;
        // this.createdObject.district = this.localityDistricts;
        console.log('localityDistricts', this.localityDistricts);
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters([
      'getFlatLocalitiesList',
    ]),
    ...mapState([
      'filterDataDefault',
      'objectDataSelected',
      'filterDataSelected',
    ]),
    atLeastOneFormItemIsFilled() {
      const value = true;
      return value;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
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
  },
  created() {
    this.createdObject = JSON.parse(JSON.stringify(this.objectDataSelected));
    this.createdObject.address = null; 
  },
  methods: {
    getLocalityByLabel(label) {
      const localityObjects = this.getFlatLocalitiesList;
      const foundedLocalityObject = localityObjects.filter(
        item => {
          return item.label === label
        }
      );
      return foundedLocalityObject[0];
    },
    onMapClick(e) {
      this.coordsTaganrog = e.get('coords');
      this.getAddress(this.coordsTaganrog);
    },
    onInputEnter(event) {
      ymaps.geocode(event.target.value).then(
        res => {
          const firstGeoObject = res.geoObjects.get(0);
          const coords = firstGeoObject.geometry.getCoordinates();
          this.coordsTaganrog = coords;
          this.getAddress(this.coordsTaganrog);
        },
        error => {
          console.error('Rejected [Geocode error] ::', error);
        }
      );
    },
    getAddress(coords) {
      ymaps.geocode(coords).then(
        res => {
          const firstGeoObject = res.geoObjects.get(0);
          const addressArray = firstGeoObject.properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
          let selectedAddressArray = [];
          let selectedAddress = '';

          addressArray.forEach(
            (item, index) => {
              if (index === 2 && item.kind === 'province') {
                selectedAddressArray.push(item.name);
              } else if (item.kind === 'locality') {
                selectedAddressArray.push(item.name);
                this.townLabel = item.name;
                this.createdObject.town = this.townObject;
              } else {
                if (item.kind === 'street' || item.kind === 'house') {
                  if (item.kind === 'street') {
                    selectedAddressArray.push(item.name);
                  } else if (item.kind === 'house') {
                    selectedAddressArray.push(item.name);
                  }
                } else if (item.kind === 'district') {
                  selectedAddressArray.push(item.name);
                }
              }
            }
          );

          selectedAddressArray.forEach(
            (item, index) => {
              if (index === 0) {
                selectedAddress = item;
              } else {
                selectedAddress += ', ' + item;
              }
            }
          );

          // console.log(
          //   '::',
          //   firstGeoObject.getLocalities()[0],
          //   firstGeoObject._xalEntities.administrativeAreas[0],
          //   firstGeoObject._xalEntities.thoroughfare,
          //   firstGeoObject._xalEntities.premiseNumber,
          //   firstGeoObject.getLocalities(),
          //   firstGeoObject.getAdministrativeAreas(),
          //   firstGeoObject.getPremise(),
          //   firstGeoObject.getThoroughfare(),
          //   firstGeoObject.properties.getAll().text
          // );

          this.currentAddress = selectedAddress;
        },
        error => {
          console.log('Rejected [getAddress error] ::', error);
        }
      );
    },
    getDistrict(cityName) {
      ymaps.geocode(cityName).then(
        res => {
          const coords = res.geoObjects.get(0).geometry.getCoordinates();
          const step = 0.001;
          // console.log('coords ::', coords[0], coords[1]);
          // console.log('coords 1 ::', coords[0] + step, coords[1] + step);
          // console.log('coords 2 ::', coords[0] + step * 2, coords[1] + step * 2);
          let changedCoords = [];

          // console.log('getDistrict res step ymapsGeocode 1 ::');
          function ymapsGeocode(coords) {
            // console.log('ymapsGeocode 2 ::');
            ymaps.geocode(
              coords,
              {
                kind: 'district'
              }
            ).then(
              res => {
                const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;

                addressArray.forEach(
                  (item, index) => {
                    if (item.kind === 'district') {
                      this.district = item.name;
                    }
                  }
                );
              },
              error => {
                console.log('Rejected [getDistrict error] ::', error);
              }
            );
          };

          for(let i = 0; i < 10; i++) {
            changedCoords = [coords[0] + (step * i), coords[1] + (step * i)];
            ymapsGeocode(changedCoords);
          }

        },
        error => {
          console.log('Rejected [getDistrict error] ::', error);
        }
      );
    },
    uploadImages(event) {
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
  async mounted() {

  }
};
</script>