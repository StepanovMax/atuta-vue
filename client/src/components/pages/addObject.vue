<template>
  <div
    id="addObject"
    class="main add-object-page"
  >

    <ads1 />

    <div class="article">
      <h1
        class="
          title
          title_h3
          title_bold
          form__title_add-object-main
        "
      >
        Подать объявление
      </h1>

      <div class="form form_add-object">
        <div class="form__row form__row_block-width form__row_block-width-half">
          <div class="form__block-width form__block-width-half">


            <div
              ref="object"
              class="form__row"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Тип объекта
                </span>
                <span v-if="createdObject.object.required">
                  *
                </span>
              </h3>
              <radioButtons
                radioButtonsView="wrapAddObject"
                radioButtonsId="objectTypeAddObject"
                :propErrorClass="errorsMain.includes('object')"
                :items="filterDataDefaultClone.object"
                :value.sync="createdObject.object.value"
                @change.native="clickOnMainFields()"
              />
              <p
                v-if="this.errorsMain.includes('object')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать тип объекта
              </p>
            </div>

            <div
              v-if="
                createdObject.object.value
                && createdObject.object.value.slug === 'commercial'
              "
              ref="type"
              class="form__row"
            >
              <div class="
                form__row
                form__row_block-width
              ">
                <div class="
                  form__block-width 
                ">
                  <h3 class="
                    form__title
                    form__title_add-object
                  ">
                    <span>
                      Вид коммерческого объекта
                    </span>
                    <span v-if="createdObject.commercial.type.required">
                      *
                    </span>
                  </h3>
                  <radioButtons
                    :propErrorClass="errorsMain.includes('type')"
                    key="objectCommercialTypeAddObject"
                    radioButtonsView="wrapHalf"
                    radioButtonsId="objectCommercialTypeAddObject"
                    :items="filterDataDefaultClone.commercialView"
                    :value.sync="commerceSubTypeVModel"
                  />
                  <p
                    v-if="this.errorsMain.includes('type')"
                    class="paragraph paragraph_invalid"
                  >
                    Необходимо указать вид коммерческого объекта
                  </p>
                </div>
              </div>
            </div>

            <div
              ref="deal"
              class="form__row"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Тип сделки
                </span>
                <span v-if="createdObject.deal.required">
                  *
                </span>
              </h3>
              <switcher
                class="add-object-page__switcher"
                :class="{
                  'switcher_error': this.errorsMain.includes('deal')
                }"
                switcherId="dealDesktop"
                :items="filterDataDefaultClone.deal"
                :value.sync="dealVModel"
                @change.native="clickOnMainFields()"
              />
              <p
                v-if="this.errorsMain.includes('deal')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать тип сделки
              </p>
            </div>

            <div
              ref="address"
              class="form__row"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Адрес
                </span>
                <span v-if="createdObject.address.required">
                  *
                </span>
              </h3>
              <div class="input-address">
                <input
                  type="text"
                  class="
                    input
                    form__input
                    form__input_add-object
                  "
                  :class="{
                    'input_error': this.errorsMain.includes('address')
                  }"
                  id="suggestAddress"
                  :value="currentAddress"
                  @input="currentAddressUpdate($event)"
                  @focus="addressSelected = false"
                >
                <ul
                  v-if="suggestList.length > 0"
                  class="input-address__suggest-list"
                  v-click-outside="hideSuggestionsList"
                >
                  <li
                    class="input-address__suggest-list-item"
                    v-for="(item, index) in suggestList"
                    :key="'key-' + index"
                    @click="selectSuggestedAddress($event)"
                  >
                    <p
                      class="input-address__suggest-list-item-text"
                    >
                      {{ item.value }}
                    </p>
                  </li>
                </ul>
              </div>
              <p
                v-if="this.errorsMain.includes('address')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать адрес
              </p>
            </div>
          </div>
          <div class="form__block-width form__block-width-half">
            <yandex-map
              class="add-object-page__map"
              :settings="settings"
              :coords="coordsTaganrog"
              :zoom="15"
              :controls="controls"
              @click="clickOnMap"
            >
              <ymap-marker 
                :coords="coordsTaganrog"
                marker-id="123"
                hint-content=""
              />
            </yandex-map>
          </div>
        </div>

          <div
            ref="district"
            class="form__row"
            v-if="
              objectTypeAndDealTypeIsSelected
            "
          >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Район
                </span>
                <span v-if="createdObject.district.required">
                  *
                </span>
              </h3>
              <multiselect
                :class="{
                  'multiselect_error': this.errorsMain.includes('district')
                }"
                v-model="createdObject.district.value"
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
              <p
                v-if="this.errorsMain.includes('district')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать район
              </p>
            </div>
          </div>
        </div>

        <addObjectApp
          ref="app"
          v-if="
            objectTypeAndDealTypeIsSelected
            && createdObject.object.value.slug === 'app'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <addObjectHouse
          ref="house"
          v-if="
            objectTypeAndDealTypeIsSelected
            && createdObject.object.value.slug === 'house'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <addObjectRoom
          ref="room"
          v-if="
            createdObject.deal.value
            && createdObject.object.value
            && createdObject.object.value.slug === 'room'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <addObjectGarage
          ref="garage"
          v-if="
            createdObject.deal.value
            && createdObject.object.value
            && createdObject.object.value.slug === 'garage'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <addObjectSector
          ref="sector"
          v-if="
            createdObject.deal.value
            && createdObject.object.value
            && createdObject.object.value.slug === 'sector'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <addObjectCommercial
          ref="commercial"
          v-if="
            createdObject.deal.value
            && createdObject.object.value
            && createdObject.object.value.slug === 'commercial'
          "
          :propCreatedObject="createdObject"
          :propValidateErrors="fieldsForValidating"
        />

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div
              ref="onlineShow"
              class="form__block-width form__block-width-third"
            >
              <h3 class="
                title
                title_h5
                title_bold
                form__title
                form__title_add-object
              ">
                <span>
                  Онлайн показ
                </span>
                <span v-if="createdObject.onlineShow.required">
                  *
                </span>
              </h3>
              <switcher
                class="add-object-page__switcher"
                switcherId="onlineShowAddObject"
                :items="filterDataDefaultClone.appOnlineShow"
                :value.sync="createdObject.onlineShow.value"
              />
            </div>
          </div>
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div
              ref="photoGallery"
              class="form__block-width"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Фотографии
                </span>
                <span v-if="createdObject.photoGallery.required">
                  *
                </span>
              </h3>
              <upload-images
                id="upload-images"
                :propIsMultiple="true"
                :value.sync="createdObject.photoGallery.value"
              />
            </div>
          </div>
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div
              ref="description"
              class="form__block-width"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Описание
                </span>
                <span v-if="createdObject.description.required">
                  *
                </span>
              </h3>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                class="textarea"
                v-model="createdObject.description.value"
              >
              </textarea>
            </div>
          </div>
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-half">
            <div
              ref="phone"
              class="form__block-width form__block-width-half"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Телефон
                </span>
                <span v-if="createdObject.phone.required">
                  *
                </span>
              </h3>
              <multiselect
                v-model="createdObject.phone.value"
                :options="phones"
                :custom-label="labelWithPhone"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="label"
                track-by="slug"
                placeholder="Телефон"
              />
            </div>
          </div>
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-half">
            <div
              ref="connectionWay"
              class="form__block-width form__block-width-half"
            >
              <h3 class="
                form__title
                form__title_add-object
              ">
                <span>
                  Способ связи
                </span>
                <span v-if="createdObject.connectionWay.required">
                  *
                </span>
              </h3>
              <checkboxes
                :propErrorClass="errorsMain.includes('connectionWay')"
                checkboxId="connectionWayAddObject"
                checkboxType="listVertical"
                :items="filterDataDefaultClone.connectionWay"
                :value.sync="createdObject.connectionWay.value"
              />
              <p
                v-if="errorsMain.includes('connectionWay')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать способ связи
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.deal.value.slug === 'rent'
            && createdObject.object.value
            && (
              createdObject.object.value.slug === 'app'
              || createdObject.object.value.slug === 'room'
              || createdObject.object.value.slug === 'house'
            )
          "
          class="form__row"
          ref="rentType"
        >
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Срок аренды
            </span>
            <span v-if="createdObject.rentType.required">
              *
            </span>
          </h3>
          <switcher
            class="add-object-page__switcher"
            switcherId="rentTypeDesktop"
            :items="filterDataDefaultClone.rentType"
            :value.sync="createdObject.rentType"
          />
        </div>

        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Цена
            </span>
            <span v-if="createdObject.price.required">
              *
            </span>
          </h3>
          <div
            ref="price"
            class="form__row form__row_block-width form__row_block-width-third"
          >
            <div
              class="form__block-width form__block-width-third"
            >
              <h4
                v-if="createdObject.deal.value.slug === 'rent'"
                class="
                  title
                  title_h6
                  title_bold
                  form__title
                  form__title_add-object
                "
              >
                <span>
                  {{ priceTitle }}
                </span>
                <span v-if="createdObject.price.required">
                  *
                </span>
              </h4>
              <inputWithUnit
                propType="number"
                propUnit="rouble"
                :propErrorClass="{
                  'input_error': this.errorsMain.includes('price')
                }"
                :value.sync="createdObject.price.value"
              />
              <p
                v-if="this.errorsMain.includes('price')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать цену
              </p>
            </div>
            <div
              v-if="
                createdObject.deal.value
                && createdObject.deal.value.slug === 'rent'
                && createdObject.object.value
                && createdObject.object.value.slug === 'commercial'
              "
              class="form__block-width form__block-width-third"
            >
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                <span>
                  Цена в год
                </span>
                <span v-if="createdObject.price.required">
                  *
                </span>
              </h4>
              <inputWithUnit
                propType="number"
                propUnit="rouble"
                :propErrorClass="{
                  'input_error': this.errorsMain.includes('price')
                }"
                :value.sync="createdObject.price.value"
              />
              <p
                v-if="this.errorsMain.includes('price')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать цену
              </p>
            </div>
            <div
              v-if="
                createdObject.deal.value
                && createdObject.deal.value.slug === 'rent'
              "
              class="form__block-width form__block-width-third"
              ref="deposit"
            >
              <h4 class="
                title
                title_h6
                title_bold
                form__title
                form__title_add-object
              ">
                <span>
                  Залог
                </span>
                <span v-if="createdObject.deposit.required">
                  *
                </span>
              </h4>
              <inputWithUnit
                propType="number"
                propUnit="rouble"
                :propErrorClass="{
                  'input_error': this.errorsMain.includes('deposit')
                }"
                :value.sync="createdObject.deposit.value"
              />
              <p
                v-if="this.errorsMain.includes('deposit')"
                class="paragraph paragraph_invalid"
              >
                Необходимо указать размер залога
              </p>
            </div>
          </div>
        </div>


        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
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
                Стоимость размещения объявления - <span class="paragraph_highlighted">30 ₽</span>
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


        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
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
                :value.sync="createdObject.tarif.value"
              />
            </div>
          </div>
        </div>


        <div
          v-if="
            createdObject.deal.value
            && createdObject.object.value
          "
          class="form__row"
        >
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


        <div
          class="form__row"
          v-if="formIsFilled"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div class="form__block-width form__block-width-third">
              <objectCardSample
                key="key-preview-add-object"
                class="object-card_fixed-width"
                :propObjectData="createdObject"
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
            </div>
          </div>
        </div>


        <div
          class="form__row"
        >
          <div class="form__row form__row_block-width form__row_block-width-third">
            <div
              class="
                form__block-width
                form__block-width-third
              "
            />
            <div class="
              form__block-width
              form__block-width-two-third
              form__block-width-third_to-bottom
            ">
              <button
                v-if="formIsFilled"
                class="
                  btn
                  btn_blue
                  btn_middle
                  add-object-page__btn
                "
              >
                Разместить объявление
              </button>
              <button
                v-else
                class="
                  btn
                  btn_blue
                  btn_middle
                  add-object-page__btn
                  btn_disabled
                "
                @click="clickOnNonSubmitButton()"
              >
                Не заполнены поля
              </button>
            </div>
          </div>
        </div>

      </div>


      <div
        v-local
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
        <pre>{{ suggestList }}</pre>
        <pre>{{ createdObject }}</pre>
      </div>


    </div>

    <ads2 />

  </div>
</template>

<script>
import axios from 'axios';
import multiselect from 'vue-multiselect';
// import uploadImage from 'vue-upload-image';
import { mapState, mapGetters, store, commit } from 'vuex';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

import ads1 from '../ads-1.vue';
import ads2 from '../ads-2.vue';
import tarifs from '../tarifs.vue';
import iconCross from '../icons/iconCross.vue';
import switcher from '../common/switcher.vue';
import checkboxes from '../common/checkboxes.vue';
import uploadImages from '../common/uploadImages.vue';
import radioButtons from '../common/radioButtons.vue';
import inputWithUnit from '../common/inputWithUnit.vue';
import objectCardSample from '../common/objectCardSample.vue';
import addObjectApp from '../addObject/desktop/addObjectApp.vue';
import addObjectRoom from '../addObject/desktop/addObjectRoom.vue';
import addObjectHouse from '../addObject/desktop/addObjectHouse.vue';
import addObjectSector from '../addObject/desktop/addObjectSector.vue';
import addObjectGarage from '../addObject/desktop/addObjectGarage.vue';
import addObjectCommercial from '../addObject/desktop/addObjectCommercial.vue';

export default {
  name: 'addObject',
  components: {
    ads1,
    ads2,
    tarifs,
    switcher,
    yandexMap,
    iconCross,
    ymapMarker,
    checkboxes,
    objectCardSample,
    multiselect,
    // uploadImage,
    uploadImages,
    radioButtons,
    addObjectApp,
    addObjectRoom,
    inputWithUnit,
    addObjectHouse,
    addObjectSector,
    addObjectGarage,
    addObjectCommercial,
    axios,
  },
  data() {
    return {
      fieldsForValidating: [],
      openChildComponent: false,
      isClicked: false,
      errorsOther: [],
      errorsMain: [],
      suggestList: [],
      userData: {
        name: 'Агентство недвижимости №1',
        type: 'agency',
      },
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
      currentAddressValue: '',
      errors: [],
      objectData: {
        price: 0,
        deal: 'buy',
        address: '',
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
      phones: [
        {
          label: 'Максим Степанов',
          slug: 'maxim-stepanov',
          phone: '+7 (961) 270-18-87',
        },
        {
          label: 'Артур Тавадян',
          slug: 'artur-tavadyan',
          phone: '+7 (928) 112-20-80',
        },
      ],
      addressSelected: false,
      formIsFilled: false,
      formIsFilledArray: [],
    }
  },
  watch: {
    currentAddress: {
      handler(value) {
        if (value === '') {
          this.createdObject.address.value = null;
          this.createdObject.address.coords = null;
          this.addressSelected = false;
        }
        if (!this.addressSelected) {
          this.onInputType();
        }
      },
      deep: true
    },
    townLabel: {
      handler(value) {
        this.createdObject.address.town = value;
        const localityObject = this.getLocalityByLabel(value);
        if (localityObject) {
          this.localityDistricts = localityObject.districts;
        }
      },
      deep: true
    },
    createdObject: {
      handler(value) {
        // console.log('createdObject WATCH ::', value);
        this.objectData = value;
        // TODO: Why?
        this.createdObject = value;
        // console.log('createdObject WATCH this.createdObject ::', this.createdObject);
        this.objectData.agency.name = this.userData.name;
        this.objectData.agency.type = this.userData.type;

        this.formIsFilledArray = [];
        const obj1 = this.createdObject;
        for (const key1 in obj1) {
          if (!obj1.hasOwnProperty(key1)) continue;
            const type = obj1.object.value;
            const obj2 = obj1[key1];
            if (obj2.hasOwnProperty('required')) {
              if (obj2.required === true) {
                if (obj2.value === null || obj2.value === '') {
                  this.formIsFilledArray.push(key1);
                }
              }
            } else {
              if (type && type.slug === key1) {
                for (const key2 in obj2) {
                  const obj3 = obj2[key2];
                  if (obj3 && obj3.required) {
                    if (obj3.required === true) {
                      if (obj3.value === null || obj3.value === '') {
                        this.formIsFilledArray.push(key2);
                      }
                    }
                  }
                }
              }
            }
        }

        if (this.formIsFilledArray.length) {
          this.formIsFilled = false;
          // TODO
          console.log('formIsFilledArray ::', this.formIsFilledArray);
        } else {
          this.formIsFilled = true;
        }

        // console.log('isClicked watch createdObject::', this.isClicked);

        // While a user doesn't click to button at first time.
        if (this.isClicked) {
          this.errorsMain = [];
          this.formIsFilledArray.forEach(
            item => {
              if (this.$refs[item]) {
                this.errorsMain.push(item);
              }
            }
          );
        }

        // this.openChildComponent = false;

        if (this.objectTypeAndDealTypeIsSelected && this.isClicked) {
          // console.log('nextTick openChildComponent ::', this.openChildComponent);
          this.$nextTick(
            () => {
              this.errorsOther = [];
              const selectedObject = this.createdObject.object.value.slug;
              this.formIsFilledArray.forEach(
                item => {
                  if (this.$refs[selectedObject].$refs[item]) {
                    this.errorsOther.push(item);
                  }
                }
              );
              if (this.openChildComponent) {
                this.showOtherErrors();
              }
            }
          )
        }

        // if (this.createdObject.photoGallery.value) {
        //   const url = URL.createObjectURL(this.createdObject.photoGallery.value[0].object.value);
        //   console.log('url 2 ::', url);
        // }

        if (this.formIsFilled === true) {
          this.createMetaTitle();
        }
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
    // currentAddress: {
    //   cache: false,
    //   get() {
    //     // alert('get currentAddress');
    //     return this.currentAddressValue;
    //   },
    //   set(value) {
    //     this.onInputType();
    //     if (value === '') {
    //       this.createdObject.address.value = null;
    //       this.createdObject.address.coords = null;
    //     }
    //     this.currentAddressValue = value;
    //   }
    // },
    dealVModel: {
      cache: false,
      get() {
        return this.createdObject.deal.value;
      },
      set(value) {
        this.createdObject.deal.value = value;
        if (this.createdObject.deal.value.slug === 'buy') {
          this.createdObject.rentType.required = false;
          this.createdObject.deposit.required = false;
        } else if (this.createdObject.deal.value.slug === 'rent') {
          this.createdObject.rentType.required = true;
          this.createdObject.deposit.required = true;
        }
      }
    },
    objectPrice: {
      cache: false,
      get() {
        return this.objectData.price.value;
      },
      set(value) {
        this.objectData.price.value = value;
        this.createdObject.price.value = value;
      }
    },
    priceTitle() {
      let titleLabel = 'Цена';
      if (this.createdObject.deal.value && this.createdObject.deal.value.slug === 'buy') {
        titleLabel = 'Цена';
      } else if (this.createdObject.deal.value && this.createdObject.deal.value.slug === 'rent') {
        titleLabel = 'Цена в месяц';
      }
      if (this.createdObject.rentType && this.createdObject.rentType.slug === 'per-day') {
        titleLabel = 'Цена в день';
      } else if (this.createdObject.rentType && this.createdObject.rentType.slug === 'long-term') {
        titleLabel = 'Цена в месяц';
      }
      return titleLabel;
    },
    atLeastOneFormItemIsFilled() {
      const value = true;
      return value;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    totalPrice() {
      let selectedTarifPrice = 0;
      if (this.createdObject.tarif.value) {
        selectedTarifPrice = this.createdObject.tarif.value.price;
      }
      const defaultPrice = 30;
      const sum = defaultPrice + selectedTarifPrice;
      return sum;
    },
    objectTypeAndDealTypeIsSelected() {
      return Boolean(
        this.createdObject.object.value
        && this.createdObject.object.value.slug
        && this.createdObject.deal.value
        && this.createdObject.deal.value.slug
      );
    },
    commerceSubTypeVModel: {
      cache: false,
      get() {
        return this.createdObject.commercial.type.value;
      },
      set(value) {
        this.createdObject.commercial.type.value = value;
        const indexFloor = this.formIsFilledArray.indexOf('floor');
        const indexFloorAll = this.formIsFilledArray.indexOf('floorAll');
        if (this.createdObject.commercial.type.value.slug === 'sector') {
          console.log('test', indexFloor, indexFloorAll);
          if (indexFloor > -1) {
            console.log('test 1');
            // this.formIsFilledArray.splice(indexFloor, 1);
            this.createdObject.commercial.floor.required = false;
          }
          if (indexFloorAll > -1) {
            console.log('test 2');
            // this.formIsFilledArray.splice(indexFloorAll, 1);
            this.createdObject.commercial.floorAll.required = false;
          }
        } else {
          this.createdObject.commercial.floor.required = true;
          this.createdObject.commercial.floorAll.required = true;
        }
      }
    },
  },
  created() {
    this.createdObject = JSON.parse(JSON.stringify(this.objectDataSelected));
    this.createdObject.address.value = null;
    const toDayDate = this.gConvertDate(new Date());
    this.createdObject.date = toDayDate;
  },
  methods: {
    createMetaTitle() {
      const typeSlug = this.createdObject.object.value.slug;
      const deal = this.createdObject.deal.value.slug;
      if (typeSlug === 'app') {
        let metaTitle = '';
        const typeLabel = 'квартиру';
        let dealAction = '';
        const objectPrice = this.gFormatPrice(this.createdObject.price.value) + '₽';
        if (deal === 'buy') {
          dealAction = 'Продам';
        } else if (deal === 'rent') {
          dealAction = 'Сдам в аренду';
        }
        let roomsCount = '';
        let roomsLabel = '';
        let rooms = '';
        if (
          this.createdObject.app.roomsCount.value.slug === 'studio'
          || this.createdObject.app.roomsCount.value.slug === 'freePlan'
        ) {
          roomsCount = this.createdObject.app.roomsCount.value.label;
          rooms = roomsCount;
        } else {
          roomsLabel = 'комн.';
          rooms = this.createdObject.app.roomsCount.value.slug + roomsLabel;
        }
        const floor = 'этаж ' + this.createdObject.app.floor.value.slug + '/' +  this.createdObject.app.floorAll.value.slug;
        const objectData = rooms + ', ' + this.createdObject.app.area.value + 'м²' + ', ' + floor;
        metaTitle = dealAction + ' ' + typeLabel + ' ' + objectPrice + ' [' + objectData + ']';
        console.log('metaTitle ::', metaTitle);
        this.createdObject.metaTitle = metaTitle;
      }
    },
    currentAddressUpdate(event) {
      this.currentAddress = event.target.value;
    },
    clickOnMainFields() {
      if (this.objectTypeAndDealTypeIsSelected) {
        this.openChildComponent = false;
      }
    },
    clickOnNonSubmitButton() {
      if (this.objectTypeAndDealTypeIsSelected) {
        this.openChildComponent = true;
      } else {
        this.openChildComponent = false;
      }
      this.isClicked = true;
      this.showMainErrors();
      if (this.objectTypeAndDealTypeIsSelected) {
        this.showOtherErrors();
      }

      this.scrollTo();
    },
    scrollTo() {
      const position = this.detectHighestElement();
      window.scrollTo(0, position - 50);
    },
    detectHighestElement() {
      let arrayMin = [];
      this.formIsFilledArray.forEach(
        item => {
          let position;
          let selectedObject;
          if (this.createdObject.object.value) {
            selectedObject = this.createdObject.object.value.slug;
          }
          let element = this.$refs[item];

          if (this.objectTypeAndDealTypeIsSelected && this.$refs[item]) {
            element = this.$refs[item];
          } else if (this.objectTypeAndDealTypeIsSelected && this.$refs[selectedObject].$refs[item]) {
            element = this.$refs[selectedObject].$refs[item];
          }

          if (element) {
            position = element.offsetTop;
            arrayMin.push(position);
          }
        }
      )

      const min = Math.min( ...arrayMin );
      return min;
    },
    showOtherErrors() {
      const selectedObject = this.createdObject.object.value.slug;
      this.formIsFilledArray.forEach(
        item => {
          if (this.$refs[selectedObject].$refs[item]) {
            this.errorsOther.push(item);
          }
        }
      );
      this.fieldsForValidating = this.errorsOther;
    },
    showMainErrors() {
      this.formIsFilledArray.forEach(
        item => {
          if (this.$refs[item]) {
            this.errorsMain.push(item);
          }
        }
      );
    },
    hideSuggestionsList() {
      this.suggestList = [];
    },
    selectSuggestedAddress(event) {
      // this.currentAddress = event.target.innerText;
      this.convertAddress(event.target.innerText);
      this.createdObject.address.value = event.target.innerText;
      this.createdObject.address.coords = this.coordsTaganrog;
      this.addressSelected = true;
      this.hideSuggestionsList();
    },
    labelWithPhone ({ label, phone }) {
      return `${label}: ${phone}`
    },
    getLocalityByLabel(label) {
      const localityObjects = this.getFlatLocalitiesList;
      const foundedLocalityObject = localityObjects.filter(
        item => {
          return item.label === label
        }
      );
      return foundedLocalityObject[0];
    },
    clickOnMap(e) {
      this.coordsTaganrog = e.get('coords');
      // this.getAddress(this.coordsTaganrog);
    },
    onInputEnter(event) {
      this.convertAddress(event.target.value);
      // console.log('event.target.value ::', event.target.value);
    },
    convertAddress(address) {
      ymaps.geocode(address).then(
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
    onInputType(event) {
      ymaps.suggest(this.currentAddress).then(
        res => {
          this.suggestList = res;
        },
        error => {
          console.error('Rejected [Suggest error] ::', error);
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
                this.createdObject.address.town = this.townObject;
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
  },
  // mounted() {
  //   const suggestView1 = ymaps.SuggestView('currentAddress');
  //   const suggestView = ymaps.SuggestView('suggestAddress', {results: 5}).events.add('select', handler.bind(event));
  // },
  // mounted() {
  //   ymaps.ready(this.yaMapInit());
  // },
  // async mounted() {
  //   await loadYmap({
  //     ...this.settings,
  //     debug: true
  //   });
  //   const suggestView1 = ymaps.SuggestView('suggestAddress');
  // }
};
</script>