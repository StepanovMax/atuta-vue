<template>
  <div
    id="addObject"
    class="main add-object-page"
  >

    <adsLeft />

    <errorPage403
      v-if="!isLoggedIn"
    />

    <div
      v-if="isLoggedIn"
      class="article article_add"
    >
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
                :value.sync="blobImage"
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
                v-if="
                  userData.role
                  && (
                    userData.role.slug === 'agency'
                    || userData.role.slug === 'builder'
                  )
                "
                v-model="createdObject.phone.value"
                :options="userEmployees"
                :custom-label="labelWithPhone"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="true"
                label="name"
                track-by="phone"
                placeholder="Телефон"
              />
              <p
                v-else
                class="paragraph"
              >
                {{ gFormatPhone(userData.phone) }}
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
              || createdObject.object.value.slug === 'garage'
              || createdObject.object.value.slug === 'sector'
              || createdObject.object.value.slug === 'commercial'
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
                <span v-if="createdObject.priceYear.required">
                  *
                </span>
              </h4>
              <inputWithUnit
                propType="number"
                propUnit="rouble"
                :propErrorClass="{
                  'input_error': this.errorsMain.includes('price')
                }"
                :value.sync="createdObject.priceYear.value"
              />
              <p
                v-if="this.errorsMain.includes('priceYear')"
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
                @click="sendObject"
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

          <p
            v-if="showSuccessMessageOnObjectCreating"
            class="
              paragraph
              paragraph_success
              paragraph_align-right
            "
          >
            Объект был успешно опубликован.
          </p>

          <p
            v-if="showErrorMessageOnObjectCreating"
            class="
              paragraph
              paragraph_success
              paragraph_align-right
            "
          >
            При публикации объекта произошла ошибка.
            <br>Пожалуйста, повторите публикацию ещё раз.
          </p>
        </div>

      </div>

      <div
        v-local
        v-if="true && finalObjectData"
        class="local-output-data"
      >
        <h6 class="
          title
          title_h6
          title_bold
        ">
          finalObjectData
        </h6>
        <pre>
          {{ finalObjectData }}
        </pre>
      </div>

      <div
        v-local
        v-if="true && finalObjectData"
        class="local-output-data"
      >
        <h6 class="
          title
          title_h6
          title_bold
        ">
          finalObjectData
        </h6>
        <pre>
          {{ finalObjectData }}
        </pre>
      </div>

      <div
        v-local
        v-if="true && createdObject"
        class="local-output-data"
      >
        <h6 class="
          title
          title_h6
          title_bold
        ">
          createdObject
        </h6>
        <pre>
          {{ createdObject }}
        </pre>
      </div>


    </div>

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';
import multiselect from 'vue-multiselect';
// import uploadImage from 'vue-upload-image';
import { mapState, mapGetters, store, commit } from 'vuex';
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';

import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
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
import errorPage403 from '../pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'addObject',
  components: {
    adsLeft,
    adsRight,
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
    errorPage403,
  },
  data() {
    return {
      showSuccessMessageOnObjectCreating: false,
      showErrorMessageOnObjectCreating: false,
      blobImage: {},
      changedObject: [],
      fieldsForValidating: [],
      openChildComponent: false,
      isClicked: false,
      errorsOther: [],
      errorsMain: [],
      suggestList: [],
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
      addressSelected: false,
      formIsFilled: false,
      formIsFilledArray: [],
    }
  },
  watch: {
    'blobImage'(value) {
      console.log('value ::', value);
      if (value) {
        let newArray = [];
        value.forEach(
          item => {
            newArray.push(item.object);
          }
        );
        this.createdObject.photoGallery.value = newArray;
      }
    },
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
        // console.log('createdObject ::', this.userData);
        this.objectDataForSending(value);
        this.objectData = value;
        // TODO: Why?
        this.createdObject = value;
        console.log('this.userData ::', this.userData);
        if (this.userData.role.slug === 'personal') {
          this.createdObject.phone.required = false;
          this.objectData.phone.value = this.userData.phone;
          this.objectData.agency.name = this.objectData.companyName = this.userRoles[0].label;
        } else if (this.userData.role.slug === 'agent') {
          this.createdObject.phone.required = false;
          this.objectData.phone.value = this.userData.phone;
          this.objectData.agency.name = this.objectData.companyName = this.userRoles[1].label;
        } else {
          this.createdObject.phone.required = true;
          this.objectData.agency.name = this.objectData.companyName = this.userData.name;
        }
        // console.log('>> this.objectData.phone', this.objectData.phone);

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
          // console.log('formIsFilledArray ::', this.formIsFilledArray);
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
    ...mapState([
      'userData',
      'userRoles',
      'isLoggedIn',
      'userEmployees',
      'filterDataDefault',
      'objectDataSelected',
      'filterDataSelected',
      'federalRegionsAlphabetical',
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
          // console.log('test', indexFloor, indexFloorAll);
          if (indexFloor > -1) {
            // console.log('test 1');
            // this.formIsFilledArray.splice(indexFloor, 1);
            this.createdObject.commercial.floor.required = false;
          }
          if (indexFloorAll > -1) {
            // console.log('test 2');
            // this.formIsFilledArray.splice(indexFloorAll, 1);
            this.createdObject.commercial.floorAll.required = false;
          }
        } else {
          this.createdObject.commercial.floor.required = true;
          this.createdObject.commercial.floorAll.required = true;
        }
      }
    },
    finalObjectData() {
      let data = {};
      if (this.changedObject) {
        // console.log('this.userData ::', this.userData);
        data.title = this.createdObject.metaTitle;
        data.userId = this.userData.id;
        data.companyName = this.userData.name;
        data.companyRoleLabel = this.userData.role.label;
        data.companyRoleSlug = this.userData.role.slug;
        data.cardName = this.objectData.agency.name;
        const timestampNow = new Date().getTime() / 1000 | 0;
        data.status = 'active';
        data.createdDate = timestampNow;
        if (this.changedObject.object && this.changedObject.object.value && this.changedObject.object.value.slug) {
          data.objectTypeSlug = this.changedObject.object.value.slug;
          data.objectTypeLabel = this.changedObject.object.value.label;
          data.objectTypeLabelShort = this.changedObject.object.value.labelShort;
        }
        if (this.changedObject.deal && this.changedObject.deal.value && this.changedObject.deal.value.slug) {
          data.deal = this.changedObject.deal.value.slug;
        }
        if (this.changedObject.address && this.changedObject.address.value && this.changedObject.address.coords) {
          data.addressCoords = this.changedObject.address.coords;
          data.addressName = this.changedObject.address.value;
        }
        if (this.changedObject.district && this.changedObject.district.value && this.changedObject.district.value.slug) {
          data.districtSlug = this.changedObject.district.value.slug;
          data.districtLabel = this.changedObject.district.value.label;
        }
        if (this.changedObject.onlineShow && this.changedObject.onlineShow.value && this.changedObject.onlineShow.value.slug) {
          data.onlineShow = this.changedObject.onlineShow.value.slug;
        }
        if (this.changedObject.description && this.changedObject.description.value) {
          data.description = this.changedObject.description.value;
        }
        if (this.changedObject.photoGallery && this.changedObject.photoGallery.value) {
          data.photoGallery = this.createdObject.photoGallery.value;
        }
        if (this.changedObject.price && this.changedObject.price.value) {
          data.price = this.createdObject.price.value;
        }
        if (this.changedObject.tarif && this.changedObject.tarif.value) {
          data.tarif = this.createdObject.tarif.value.slug;
        }
        if (this.changedObject.deposit && this.changedObject.deposit.value) {
          data.deposit = this.createdObject.deposit.value;
        }
        if (this.changedObject.rentType && this.changedObject.rentType.value) {
          data.rentType = this.changedObject.rentType.value.slug;
        }
        if (this.changedObject.connectionWay && this.changedObject.connectionWay.value) {
          if (this.createdObject.connectionWay.value.length === 2) {
            data.connectionWay = 'both';
          } else if (this.createdObject.connectionWay.value.length === 1) {
            data.connectionWay = this.createdObject.connectionWay.value[0].slug;
          }
        }
        if (this.changedObject.phone && this.changedObject.phone.value) {
          data.phone = this.createdObject.phone.value.phone;
        }

        console.log('this.changedObject ::', this.changedObject);
        if (data.objectTypeSlug === 'app') {
          if (this.changedObject.app.roomsCount && this.changedObject.app.roomsCount.value) {
            data.roomsCountLabel = this.changedObject.app.roomsCount.value.label;
            data.roomsCountSlug = this.changedObject.app.roomsCount.value.slug;
          }
          if (this.changedObject.app.year && this.changedObject.app.year.value) {
            data.year = this.changedObject.app.year.value.slug;
          }
          if (this.changedObject.app.floor && this.changedObject.app.floor.value) {
            data.floor = this.changedObject.app.floor.value.slug;
          }
          if (this.changedObject.app.floorAll && this.changedObject.app.floorAll.value) {
            data.floorAll = this.changedObject.app.floorAll.value.slug;
          }
        } else if (data.objectTypeSlug === 'house') {
          if (this.changedObject.house.roomsCount && this.changedObject.house.roomsCount.value) {
            data.roomsCountLabel = this.changedObject.house.roomsCount.value.label;
            data.roomsCountSlug = this.changedObject.house.roomsCount.value.slug;
          }
          if (this.changedObject.house.distance && this.changedObject.house.distance.value) {
            data.distanceLabel = this.changedObject.house.distance.value.label;
            data.distanceSlug = this.changedObject.house.distance.value.slug;
          }
          if (this.changedObject.house.year && this.changedObject.house.year.value) {
            data.year = this.changedObject.house.year.value.slug;
          }
          if (this.changedObject.house.floorAll && this.changedObject.house.floorAll.value) {
            data.floorAll = this.changedObject.house.floorAll.value.slug;
          }
        } else if (data.objectTypeSlug === 'room') {
          if (this.changedObject.room.roomsCount && this.changedObject.room.roomsCount.value) {
            data.roomsCountLabel = this.changedObject.room.roomsCount.value.label;
            data.roomsCountSlug = this.changedObject.room.roomsCount.value.slug;
          }
          if (this.changedObject.room.year && this.changedObject.room.year.value) {
            data.year = this.changedObject.room.year.value.slug;
          }
          if (this.changedObject.room.floor && this.changedObject.room.floor.value) {
            data.floor = this.changedObject.room.floor.value.slug;
          }
          if (this.changedObject.room.floorAll && this.changedObject.room.floorAll.value) {
            data.floorAll = this.changedObject.room.floorAll.value.slug;
          }
        } else if (data.objectTypeSlug === 'garage') {

        } else if (data.objectTypeSlug === 'commercial') {
          if (this.changedObject.commercial.distance.value && this.changedObject.commercial.distance.value.slug) {
            data.distanceLabel = this.changedObject.commercial.distance.value.label;
            data.distanceSlug = this.changedObject.commercial.distance.value.slug;
          }
          if (this.changedObject.commercial.year && this.changedObject.commercial.year.slug) {
            data.year = this.changedObject.commercial.year.slug;
          }
          if (this.changedObject.commercial.floor && this.changedObject.commercial.floor.value) {
            data.floor = this.changedObject.commercial.floor.value.slug;
          }
          if (this.changedObject.commercial.floorAll && this.changedObject.commercial.floorAll.value) {
            data.floorAll = this.changedObject.commercial.floorAll.value.slug;
          }
        } else if (data.objectTypeSlug === 'sector') {
          if (this.changedObject.sector.distance && this.changedObject.sector.distance.value) {
            data.distanceLabel = this.changedObject.sector.distance.value.slug;
            data.distanceSlug = this.changedObject.sector.distance.value.slug;
          }
        }


        // App
        if (this.changedObject.app) {
          if (this.changedObject.app.type && this.changedObject.app.type.value) {
            data.appTypeSlug = this.changedObject.app.type.value.slug;
            data.appTypeLabel = this.changedObject.app.type.value.label;
          }
          if (this.changedObject.app.view && this.changedObject.app.view.value) {
            data.appViewSlug = this.changedObject.app.view.value.slug;
            data.appViewLabel = this.changedObject.app.view.value.label;
          }
          if (this.changedObject.app.area && this.changedObject.app.area.value) {
            data.appArea = this.changedObject.app.area.value;
          }
          if (this.changedObject.app.areaLiving && this.changedObject.app.areaLiving.value) {
            data.appAreaLiving = this.changedObject.app.areaLiving.value;
          }
          if (this.changedObject.app.areaKitchen && this.changedObject.app.areaKitchen.value) {
            data.appAreaKitchen = this.changedObject.app.areaKitchen.value;
          }
        }
        // House
        if (this.changedObject.house) {
          if (this.changedObject.house.type && this.changedObject.house.type.value) {
            data.houseTypeSlug = this.changedObject.house.type.value.slug;
            data.houseTypeLabel = this.changedObject.house.type.value.label;
          }
          if (this.changedObject.house.view && this.changedObject.house.view.value) {
            data.houseViewSlug = this.changedObject.house.view.value.slug;
            data.houseViewLabel = this.changedObject.house.view.value.label;
          }
          if (this.changedObject.house.wall && this.changedObject.house.wall.value) {
            data.houseWallSlug = this.changedObject.house.wall.value.slug;
            data.houseWallLabel = this.changedObject.house.wall.value.label;
          }
          if (this.changedObject.house.areaLand && this.changedObject.house.areaLand.value) {
            data.houseAreaLand = this.changedObject.house.areaLand.value;
          }
          if (this.changedObject.house.areaHouse && this.changedObject.house.areaHouse.value) {
            data.houseAreaHouse = this.changedObject.house.areaHouse.value;
          }
        }
        // Room
        if (this.changedObject.room) {
          if (this.changedObject.room.view && this.changedObject.room.view.value) {
            data.roomViewSlug = this.changedObject.room.view.value.slug;
            data.roomViewLabel = this.changedObject.room.view.value.label;
          }
          if (this.changedObject.room.area && this.changedObject.room.area.value) {
            data.roomArea = this.changedObject.room.area.value;
          }
        }
        // Garage
        if (this.changedObject.garage) {
          if (this.changedObject.garage.type && this.changedObject.garage.type.value) {
            data.garageTypeSlug = this.changedObject.garage.type.value.slug;
            data.garageTypeLabel = this.changedObject.garage.type.value.label;
            if (this.changedObject.garage.type.value.labelShort) {
              data.garageTypeLabelShort = this.changedObject.garage.type.value.labelShort;
            }
          }
          if (
              this.changedObject.garage.type
              && this.changedObject.garage.type.value
              && this.changedObject.garage.type.value.slug === 'garage'
              && this.changedObject.garage.garageType
              && this.changedObject.garage.garageType.value
          ) {
            data.garageSubTypeSlug = this.changedObject.garage.garageType.value.label;
            data.garageSubTypeLabel = this.changedObject.garage.garageType.value.label;
            data.garageSubTypeLabelShort = this.changedObject.garage.garageType.value.labelShort;
          } else if (
            this.changedObject.garage.type
            && this.changedObject.garage.type.value
            && this.changedObject.garage.type.value.slug === 'parking'
            && this.changedObject.garage.parkingType
            && this.changedObject.garage.parkingType.value
          ) {
            data.garageSubTypeSlug = this.changedObject.garage.parkingType.value.label;
            data.garageSubTypeLabel = this.changedObject.garage.parkingType.value.label;
            data.garageSubTypeLabelShort = this.changedObject.garage.parkingType.value.labelShort;
          }
          console.log('  ! ', this.changedObject.garage.area);
          if (this.changedObject.garage.area) {
            data.garageArea = this.changedObject.garage.area;
          }
          if (this.changedObject.garage.security && this.changedObject.garage.security.slug) {
            if (this.changedObject.garage.security.slug) {
              data.garageSecurity = this.changedObject.garage.security.slug;
            } else {
              data.garageSecurity = 'no';
            }
          }
        }
        // Sector
        if (this.changedObject.sector) {
          if (this.changedObject.sector.area && this.changedObject.sector.area.value) {
            data.sectorArea = this.changedObject.sector.area.value;
            if (this.changedObject.sector.type.value.labelShort) {
              data.sectorTypeShort = this.changedObject.sector.type.value.labelShort;
            }
          }
          if (this.changedObject.sector.type && this.changedObject.sector.type.value) {
            data.sectorTypeLabel = this.changedObject.sector.type.value.label;
            data.sectorTypeSlug = this.changedObject.sector.type.value.slug;
            data.sectorTypeLabelShort = this.changedObject.sector.type.value.labelShort;
          }
          if (this.changedObject.sector.facade && this.changedObject.sector.facade.value) {
            data.sectorFacade = this.changedObject.sector.facade.value;
          }
          if (this.changedObject.sector.availabilityOfBuildings && this.changedObject.sector.availabilityOfBuildings.slug) {
            data.sectorAvailabilityOfBuildings = this.changedObject.sector.availabilityOfBuildings.slug;
          }
        }
        // Commercial
        if (this.changedObject.commercial) {
          if (this.changedObject.commercial.type && this.changedObject.commercial.type.value) {
            data.commercialTypeSlug = this.changedObject.commercial.type.value.slug;
            data.commercialTypeLabel = this.changedObject.commercial.type.value.label;
          }
          if (this.changedObject.commercial.area && this.changedObject.commercial.area.value) {
            data.commercialArea = this.changedObject.commercial.area.value;
          }
          if (this.changedObject.commercial.class && this.changedObject.commercial.class.value) {
            data.commercialClass = this.changedObject.commercial.class.value.slug;
          }
          if (this.changedObject.commercial.tenant && this.changedObject.commercial.tenant.value) {
            data.commercialTenant = this.changedObject.commercial.tenant.value.slug;
          }
          if (this.changedObject.commercial.facade && this.changedObject.commercial.facade.value) {
            data.commercialFacade = this.changedObject.commercial.facade.value;
          }
        }
        // Comfort
        if (this.changedObject.comfortType && this.changedObject.comfortType.value) {
          data.comfortType = this.changedObject.comfortType.value.slug;
        }
        if (this.changedObject.bedCount && this.changedObject.bedCount.value) {
          data.comfortBedCount = this.changedObject.bedCount.value.slug;
        }
        if (this.changedObject.sleepingPlacesCount && this.changedObject.sleepingPlacesCount.value) {
          data.comfortSleepingPlacesCount = this.changedObject.sleepingPlacesCount.value.slug;
        }
        if (this.changedObject.roomMultimedia && this.changedObject.roomMultimedia.value) {
          data.comfortRoomMultimedia = [];
          this.changedObject.roomMultimedia.value.forEach(
            item => {
              data.comfortRoomMultimedia.push(item.slug);
            }
          );
        }
        if (this.changedObject.roomEquipment && this.changedObject.roomEquipment.value) {
          data.comfortRoomEquipment = [];
          this.changedObject.roomEquipment.value.forEach(
            item => {
              data.comfortRoomEquipment.push(item.slug);
            }
          );
        }
        if (this.changedObject.roomComfort && this.changedObject.roomComfort.value) {
          data.comfortRoom = [];
          this.changedObject.roomComfort.value.forEach(
            item => {
              data.comfortRoom.push(item.slug);
            }
          );
        }
        if (this.changedObject.roomAdditional && this.changedObject.roomAdditional.value) {
          data.comfortRoomAdditional = [];
          this.changedObject.roomAdditional.value.forEach(
            item => {
              data.comfortRoomAdditional.push(item.slug);
            }
          );
        }
      }
      // console.log('data ::', data);
      return data;
    },
  },
  created() {
    console.log('userData ::', this.userData);
    this.createdObject = JSON.parse(JSON.stringify(this.objectDataSelected));
    this.createdObject.address.value = null;
    const toDayDate = this.gConvertDate(new Date());
    // this.createdObject.date = toDayDate;
    // this.createdObject.date = new Date();
  },
  methods: {
    objectDataForSending(value) {
      this.changedObject = JSON.parse(JSON.stringify(value));
      if (this.changedObject.object && this.changedObject.object.value && this.changedObject.object.value.slug) {
        this.filterDataDefaultClone.object.forEach(
          item => {
            // console.log('>> item', item.slug, this.changedObject.object.value.slug);
            if (item.slug !== this.changedObject.object.value.slug) {
              delete this.changedObject[item.slug];
            }
          }
        );
      }
      // console.log('>> this 2', this.changedObject.object.value.slug);
      // console.log('>> this 3', this.changedObject[this.changedObject.object.value.slug]);
    },
    createMetaTitle() {
      let part1;
      let rentType;
      let rentSubType;
      let part2;
      const typeSlug = this.createdObject.object.value.slug;
      const deal = this.createdObject.deal.value.slug;

      let metaTitle = '';
      let dealAction = '';

      if (deal === 'buy') {
        dealAction = 'Продам';
        rentType = '';
        part2 = this.gFormatPrice(this.createdObject.price.value) + '₽';
      } else if (deal === 'rent') {
        dealAction = 'Сдам в аренду';
        if (this.createdObject.rentType.slug === 'per-day') {
          rentType = ' посуточно';
          rentSubType = 'в день';
        } else if (this.createdObject.rentType.slug === 'long-term') {
          rentType = ' на длительный срок';
          rentSubType = 'в месяц';
        }
        if (typeSlug === 'commercial') {
          part2 = this.gFormatPrice(this.createdObject.deposit.value) + '₽(залог)/'
                  + this.gFormatPrice(this.createdObject.price.value) + '₽' + '(' + rentSubType + ')/'
                  + this.gFormatPrice(this.createdObject.priceYear.value) + '₽(в год)';
        } else {
          part2 = this.gFormatPrice(this.createdObject.deposit.value) + '₽(залог)/'
                  + this.gFormatPrice(this.createdObject.price.value) + '₽'
                  + '(' + rentSubType + ')';
        }
      }

      if (typeSlug === 'app') {
        const typeLabel = 'квартиру';
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
        part1 = dealAction + ' ' + typeLabel + rentType;
        const floor = 'этаж ' + this.createdObject.app.floor.value.slug + '/' +  this.createdObject.app.floorAll.value.slug;
        const part3 = rooms + ', ' + this.createdObject.app.area.value + 'м²' + ', ' + floor;
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      } else if (typeSlug === 'house') {
        let typeLabel;
        if (this.createdObject.house.type.value.slug === 'house') {
          typeLabel = 'дом';
        } else if (this.createdObject.house.type.value.slug === 'summerCottage') {
          typeLabel = 'дачу';
        } else if (this.createdObject.house.type.value.slug === 'cottage') {
          typeLabel = 'коттедж';
        } else if (this.createdObject.house.type.value.slug === 'townhouse') {
          typeLabel = 'таунхаус';
        }
        let roomsCount = '';
        let roomsLabel = '';
        let rooms = '';

        if (
          this.createdObject.house.roomsCount.value.slug === 'studio'
          || this.createdObject.house.roomsCount.value.slug === 'freePlan'
        ) {
          roomsCount = this.createdObject.house.roomsCount.value.label;
          rooms = roomsCount;
        } else {
          roomsLabel = 'комн.';
          rooms = this.createdObject.house.roomsCount.value.slug + roomsLabel;
        }
        part1 = dealAction + ' ' + typeLabel + rentType;

        const part3 = rooms + ', ' + this.createdObject.house.areaHouse.value + 'м²' + ', ' + this.createdObject.house.areaLand.value + 'сот.' + ', ' + this.createdObject.house.floorAll.value.label + 'эт.';
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      } else if (typeSlug === 'room') {
        const typeLabel = 'комнату';
        const roomsCountAll = this.createdObject.room.floor.value.slug  + 'комн.';
        const floor = 'этаж ' + this.createdObject.room.floor.value.slug + '/' +  this.createdObject.room.floorAll.value.slug;
        part1 = dealAction + ' ' + typeLabel + rentType;

        const part3 = roomsCountAll + ', ' + this.createdObject.room.area.value + 'м²' + ', ' + floor;
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      } else if (typeSlug === 'garage') {
        let subTypeLabel;
        let typeLabel = this.createdObject.garage.type.value.label.toLowerCase();
        if (this.createdObject.garage.type.value.slug === 'garage') {
          subTypeLabel = this.createdObject.garage.garageType.value.labelShort.toLowerCase();
        } else if (this.createdObject.garage.type.value.slug === 'parking') {
          subTypeLabel = this.createdObject.garage.parkingType.value.labelShort.toLowerCase();
        }
        const garageArea = this.createdObject.garage.area.value + 'м²';
        part1 = dealAction + ' ' + typeLabel + '(' + subTypeLabel + ')' + rentType;

        const part3 = garageArea;
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      } else if (typeSlug === 'sector') {
        const typeLabel = 'участок';
        const subTypeLabel = '(' + this.createdObject.sector.type.value.labelShort.toLowerCase() + ')';
        const area = this.createdObject.sector.area.value + 'сот.';
        part1 = dealAction + ' ' + typeLabel + subTypeLabel + rentType;

        const part3 = area;
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      } else if (typeSlug === 'commercial') {
        let area;
        let floor;
        let part3;
        let tenant;
        let typeLabel;
        if (this.createdObject.commercial.type.value.slug === 'public-catering') {
          typeLabel = 'помещение под общепит';
        } else if (this.createdObject.commercial.type.value.slug === 'production') {
          typeLabel = 'производ.помещение';
        } else if (this.createdObject.commercial.type.value.slug === 'trading-area') {
          typeLabel = 'торговую площадь';
        } else if (this.createdObject.commercial.type.value.slug === 'hotel') {
          typeLabel = 'гостиницу';
        } else if (this.createdObject.commercial.type.value.slug === 'free-purpose') {
          typeLabel = 'помещение свободного назначения';
        } else {
          typeLabel = this.createdObject.commercial.type.value.label.toLowerCase();
        }
        if (this.createdObject.commercial.tenant.value.slug === 'yes') {
          tenant = 'с арендатором'
        } else {
          tenant = 'без арендатора'
        }
        if (this.createdObject.commercial.type.value.slug === 'sector') {
          area = this.createdObject.commercial.area.value + 'сот.';
        } else {
          area = this.createdObject.commercial.area.value + 'м²';
          floor = 'этаж ' + this.createdObject.commercial.floor.value.slug + '/' +  this.createdObject.commercial.floorAll.value.slug;
        }

        part1 = dealAction + ' ' + typeLabel + rentType;
        if (floor) {
          part3 = area + ', ' + floor + ', ' + tenant;
        } else {
          part3 = area + ', ' + tenant;
        }
        metaTitle = part1 + ' ' + part2 + ' [' + part3 + ']';
      }
      console.log('metaTitle ::', metaTitle);
      this.createdObject.metaTitle = metaTitle;
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
    labelWithPhone ({ name, phone }) {
      return `${name}: ${this.gFormatPhone(phone)}`
    },
    getLocalityByLabel(label) {
      const localityObjects = this.federalRegionsAlphabetical;
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
    async sendObject() {
      // Trying to send user info.
      try {
        this.showSuccessMessageOnObjectCreating = false;
        this.showErrorMessageOnObjectCreating = false;
        const formData = new FormData();
        const data = JSON.parse(JSON.stringify(this.finalObjectData));
        // console.log('this.userData ::', this.userData);
        if (this.finalObjectData.photoGallery && this.finalObjectData.photoGallery.length) {
          this.finalObjectData.photoGallery.forEach(
            item => {
              formData.append('file', item);
            }
          );
        }
        delete data.photoGallery;
        formData.append('object', JSON.stringify(data));

        const transport = axios.create({
          withCredentials: true
        });
        const objectDataResult = await transport.post(
          process.env.host_api + '/object/create',
          formData
        )
          .then(
            response => {
              return response.data;
            }
          )
            .catch(
              error => {
                console.error('Error [Object creation] ::', error);
                return false;
              }
            );
        if (objectDataResult) {
          this.showSuccessMessageOnObjectCreating = true;
          this.showErrorMessageOnObjectCreating = false;
        } else {
          this.showSuccessMessageOnObjectCreating = false;
          this.showErrorMessageOnObjectCreating = true;
        }
      } catch(error) {
        console.error('Something went wrong with object creation ::', error);
      }
    },
  },
  beforeMount() {
    console.log('beforeMount this.userData ::', this.userData);
    if (this.userData) {
      this.userData.role = {
        slug: this.userData.roleSlug,
        label: this.userData.roleLabel,
      };
    }
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