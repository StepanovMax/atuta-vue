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
        <button
          v-if="isMyOwnObjectOnMyObjectsPage"
          class="object-card__btn_remove object-card__remove-object"
          title="Удалить объект"
          @click="removeObjectFromDb(dataObjectData.id)"
        >
          Удалить
        </button>
        <router-link
          class="
            object-card__link
            object-card__link_top
          "
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
            :src="hostFront + dataObjectData.photoGallery[0]"
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
                dataObjectData.objectTypeSlug &&
                dataObjectData.objectTypeSlug === 'app'
              "
              class="
                object-card__wrap-info-details
                object-card__wrap-info-details_grid
              "
              :class="[
                {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
              ]"
            >
              <div
                v-if="
                  dataObjectData.objectTypeLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_room
                  object-card__wrap-info-details-item_grid
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.objectTypeLabel }}
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.roomsCountLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_room
                  object-card__wrap-info-details-item_grid
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.roomsCountLabel }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCountSlug !== 'studio'
                    && dataObjectData.roomsCountSlug !== 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.objectTypeSlug === 'app'
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                  object-card__wrap-info-details-item_grid
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
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
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_floor
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- house -->
            <div
              v-if="
                dataObjectData.objectTypeSlug === 'house'
              "
              class="
                object-card__wrap-info-details
                object-card__wrap-info-details_grid
              "
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.houseTypeLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_room
                  object-card__wrap-info-details-item_grid
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.houseTypeLabel }}
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.roomsCountLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_room
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.roomsCountLabel }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCountSlug != 'studio'
                    && dataObjectData.roomsCountSlug != 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.houseAreaHouse
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_area
                "
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
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_area
                "
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
                dataObjectData.objectTypeSlug === 'room'
              "
              class="
                object-card__wrap-info-details
                object-card__wrap-info-details_grid
              "
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                v-if="
                  dataObjectData.objectTypeLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_room
                  object-card__wrap-info-details-item_grid
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                ]"
              >
                <span>
                  {{ dataObjectData.objectTypeLabel }}
                </span>
              </div>
              <div
                v-if="
                  dataObjectData.roomsCountLabel
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_room
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.roomsCountLabel }}
                </span>
                <span
                  v-if="
                    dataObjectData.roomsCountSlug != 'studio'
                    && dataObjectData.roomsCountSlug != 'freePlan'
                  "
                >
                  &nbsp;комн.
                </span>
              </div>
              <div
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_area
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.roomArea"
                >
                  {{ dataObjectData.roomArea }} 
                </span>
                <span>
                  &nbsp;м²
                </span>
              </div>
              <div
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_grid
                  object-card__wrap-info-details-item_floor
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>

            <!-- garage -->
            <div
              v-if="dataObjectData.objectTypeSlug === 'garage'"
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                class="object-card__wrap-info-details-item"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span v-if="dataObjectData.garageTypeLabelShort">
                  {{ dataObjectData.garageTypeLabelShort }}
                </span>
                <span v-else>
                  {{ dataObjectData.garageTypeLabel }}
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
                v-if="dataObjectData.garageSubTypeLabelShort"
                class="object-card__wrap-info-details-item"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span>
                  {{ dataObjectData.garageSubTypeLabelShort }}
                </span>
              </div>
            </div>

            <!-- sector -->
            <div v-if="dataObjectData.objectTypeSlug === 'sector'"
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
                v-if="dataObjectData.sectorTypeLabelShort"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_width-half
                "
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.sectorTypeLabelShort"
                >
                  {{ dataObjectData.sectorTypeLabelShort }}
                </span>
              </div>
            </div>

            <!-- commercial -->
            <div
              v-if="dataObjectData.objectTypeSlug === 'commercial'"
              class="object-card__wrap-info-details"
              :class="[
                {'object-card__wrap-info-details_list-view': propObjectView === 'list'},
                {'object-card__wrap-info-details_grid': dataObjectData.objectTypeSlug === 'commercial'}
              ]"
            >
              <div v-if="dataObjectData.objectTypeLabelShort"
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectTypeSlug === 'commercial'}
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
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectTypeSlug === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.objectTypeSlug === 'sector'"
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
                  dataObjectData.objectTypeSlug === 'commercial'
                  && dataObjectData.objectType !== 'sector'
                  && dataObjectData.commercialTenant
                "
                class="
                  object-card__wrap-info-details-item
                  object-card__wrap-info-details-item_area
                "
                :class="[
                  {'object-card__wrap-info-details-item_list-view': propObjectView === 'list'},
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectTypeSlug === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.commercialTenant === 'yes'"
                >
                  С арендатором
                </span>
                <span
                  v-if="dataObjectData.commercialTenant === 'no'"
                >
                  Без арендатора
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
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectTypeSlug === 'commercial'}
                ]"
              >
                <span
                  v-if="dataObjectData.floor"
                >
                  {{ dataObjectData.floor }}
                </span>/
                <span
                  v-if="dataObjectData.floorAll"
                >
                  {{ dataObjectData.floorAll }}
                </span>
                <span>
                  &nbsp;этаж
                </span>
              </div>
            </div>


            <!-- last -->
            <div
              v-if="
                dataObjectData.objectTypeSlug === 'commercial'
                && dataObjectData.objectTypeSlug === 'sector'
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
                  {'object-card__wrap-info-details-item_grid': dataObjectData.objectTypeSlug === 'commercial'}
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
                  <span v-if="dataObjectData.districtLabel">
                    {{ dataObjectData.districtLabel }}
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
                <span v-if="dataObjectData.districtLabel">
                  {{ dataObjectData.districtLabel }}
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


          <router-link
            v-if="$route.name === 'myObjectsSubPage'"
            class="object-card__link"
            :to="{
              name: 'editObject',
              params: {
                id: dataObjectData.id,
                objectData: dataObjectData,
              }
            }"
            title="Редактировать объект"
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
              <span>
                Редактировать
              </span>
            </p>
          </router-link>

          <router-link
            v-else
            class="object-card__link"
            :to="{
              name: 'companyPage',
              params: {
                id: dataObjectData.id,
              }
            }"
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
              <span>
                {{ dataObjectData.cardName }}
              </span>
            </p>
          </router-link>
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
import axios from 'axios';
import { mapState } from 'vuex';
import showPhoneNumber from './showPhoneNumber.vue';
import moveToFavorites from './moveToFavorites.vue';
import socialSharing from './socialSharing.vue';
import unit from './unit.vue';
import iconCrown from '../icons/iconCrown.vue'
import iconArrowUp from '../icons/iconArrowUp.vue'
import iconDiamond from '../icons/iconDiamond.vue'
import iconHeartStroke from '../icons/iconHeartStroke.vue';
import logoCard from '@src/images/logo/logo_card.jpg';

export default {
  name: 'grid',
  data() {
    return {
      logoCard: logoCard,
      dataObjectData: this.propObjectData,
      dataIsShowPhoneNumber: false,
      favValue: false,
      hostFront: process.env.host_front,
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
          this.addItemToFavourites(this.dataObjectData.id);
        } else {
          // console.log('Remove from Fav ::', value);
          this.removeItemFromFavourites(this.dataObjectData.id);
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'userData',
      'myObjects',
      'favouriteObjects',
      'filterDataSelected',
    ]),
    // Detect if it's a 'My Objects' page and if it's my own object.
    isMyOwnObjectOnMyObjectsPage() {
      let isMyOwnObjectOnMyObjectsPage = true;
      let isMyOwnObject;
      let isMyObjectsPage;
      if (this.isFavorite) {
        isMyOwnObject = true;
      } else {
        isMyOwnObject = false;
      }
      if (this.isMyObjectsPage) {
        isMyObjectsPage = true;
      } else {
        isMyObjectsPage = false;
      }
      if (isMyOwnObject && isMyObjectsPage) {
        isMyOwnObjectOnMyObjectsPage = true;
      } else {
        isMyOwnObjectOnMyObjectsPage = false;
      }
      // console.log('  >> ', this.userData.favouriteObjects);
      return isMyOwnObjectOnMyObjectsPage;
    },
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
        this.dataObjectData.urlPreview = this.hostFront + logoCard;
      }
      return this.dataObjectData.urlPreview
    },
    // Detect whether current page is 'My Objects' page.
    isMyObjectsPage() {
      let result;
      if(this.$route.name === 'myObjectsSubPage') {
        result = true;
      } else {
        result = false;
      }
      return result;
    },
    // Detect whether the object is a favorite object.
    isFavorite() {
      const result = this.myObjects.some(
        item => item.id === this.dataObjectData.id
      );
      return result;
    },
  },
  methods: {
    async removeObjectFromFavorites(id) {
      const filteredArray = this.myObjects.filter(
        item => {
          if (item.id !== id) {
            console.log('item.id ::', item.id);
            return item;
          }
        }
      );
      if (filteredArray) {
        this.$store.commit('updateMyObjectsState', filteredArray);
      }
    },
    async removeObjectFromDb(id) {
      console.log('myObjects ::', this.myObjects);
      console.log('id ::', id);
      const transport = axios.create({
        withCredentials: true
      });

      // const objectRemoved = true;
      const objectRemoved = await transport.post(
        process.env.host_api + '/object/remove',
        {
          id: parseInt(id)
        }
      )
        .then(
          response => {
            console.log('Remove data result ::', response.data.result);
            return response.data.result;
          }
        )
          .catch(
            error => {
              console.error('Error [My objects removing] ::', error);
              return false;
            }
          );
      if (objectRemoved) {
        const filteredArray = this.myObjects.filter(
          item => {
            if (item.id !== id) {
              return item;
            } else {
              console.log('item.id ::', item.id);
            }
          }
        );
        if (filteredArray) {
          this.$store.commit('updateMyObjectsState', filteredArray);
        }
      }
    },
    async addItemToFavourites(id) {
      console.log('id ::', id);


      // Trying to add favorite objects.
      try {
        const transport = axios.create({
          withCredentials: true
        });

        const sendUserFavoritesDataResult = await transport.post(
          process.env.host_api + '/user/addUserFavorites',
          {
            id: parseInt(id)
          }
        )
          .then(
            response => {
              console.log('response.data ::', response.data);
              return response.data;
            }
          )
            .catch(
              error => {
                console.error('Error [Favs updating] ::', error);
                return false;
              }
            );
        if (sendUserFavoritesDataResult) {
          this.$store.commit('updateFavouriteObjectsState', sendUserFavoritesDataResult);
          console.log('favouriteObjects ::', this.favouriteObjects);
        }
      } catch(error) {
        console.error('Something went wrong with user editing ::', error);
      }


      // const newFavArray = [...this.favouriteObjects];
      // const itemAlreadyInFavs = this.favouriteObjects.some(
      //   item => {
      //     if (item.id === object.id) {
      //       // console.log('item.id', item.id);
      //       // console.log('object.id', object.id);
      //       return true;
      //     }
      //     return false;
      //   }
      // )
      // // console.log('itemAlreadyInFavs', itemAlreadyInFavs);
      // if (!itemAlreadyInFavs) {
      //   newFavArray.push(object);
      //   this.$store.commit('updateFavouriteObjectsState', newFavArray);
      // }
    },
    async removeItemFromFavourites(id) {
      // Trying to add favorite objects.
      try {
        const transport = axios.create({
          withCredentials: true
        });

        const sendUserFavoritesDataResult = await transport.post(
          process.env.host_api + '/user/removeUserFavorites',
          {
            id: parseInt(id)
          }
        )
          .then(
            response => {
              console.log('response.data ::', response.data);
              return response.data;
            }
          )
            .catch(
              error => {
                console.error('Error [Favs updating] ::', error);
                return false;
              }
            );
        if (sendUserFavoritesDataResult) {
          this.$store.commit('updateFavouriteObjectsState', sendUserFavoritesDataResult);
          console.log('favouriteObjects 2 ::', this.favouriteObjects);
        }
      } catch(error) {
        console.error('Something went wrong with user editing ::', error);
      }
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
};
</script>