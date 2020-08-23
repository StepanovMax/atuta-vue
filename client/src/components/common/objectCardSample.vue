<template>
  <div
    class="object-card"
  >
    <router-link
      class="object-card__link"
      :to="{ name: 'objectPage' }"
    >
      <div
        class="object-card__wrap"
        :class="{'object-card__wrap_list-view': propObjectView === 'list'}"
      >
        <div
          class="object-card__wrap-img"
          :class="{'object-card__wrap-img_list-view': propObjectView === 'list'}"
        >
          <img
            class="img object-card__img"
            :src="'src/images/' + dataObjectData.urlPreview"
            alt=""
          >
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
                {{ formatNumbers(dataObjectData.price) }} ₽
              </span>
              <span
                v-if="dataObjectData.deal && (dataObjectData.deal.slug === 'rent')"
                class="object-card__price_text"
              >
                в месяц
              </span>
            </p>
            <button class="btn object-card__btn object-card__btn_favorites">
              <moveToFavorites />
            </button>
          </div>
          <div
            class="object-card__wrap-info_bottom"
            :class="{'object-card__wrap-info_bottom_list-view': propObjectView === 'list'}"
          >
            <div
              class="object-card__wrap-info-details"
              :class="{'object-card__wrap-info-details_list-view': propObjectView === 'list'}"
            >
              <div
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_room"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.rooms"
                >
                  {{ dataObjectData.rooms }}
                </span>
                <span>
                  к.кв
                </span>
              </div>
              <div
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_area"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.area"
                >
                  {{ dataObjectData.area }} 
                </span>
                <span>
                  м²
                </span>
              </div>
              <div
                class="object-card__wrap-info-details-item object-card__wrap-info-details-item_floor"
                :class="{'object-card__wrap-info-details-item_list-view': propObjectView === 'list'}"
              >
                <span
                  v-if="dataObjectData.floorCurrent"
                >
                  {{ dataObjectData.floorCurrent }}
                </span>/
                <span
                  v-if="dataObjectData.floorFull"
                >
                  {{ dataObjectData.floorFull }}
                </span>
                <span>
                  этаж
                </span>
              </div>
            </div>
            <p
              class="object-card__wrap-info__item object-card__address"
              :class="{'object-card__address_list-view': propObjectView === 'list'}"
            >
              <span
                v-if="dataObjectData.address"
              >
                {{ dataObjectData.address }}
              </span>
            </p>
            <p class="object-card__wrap-info__item object-card__district">
              <span>
                р-н
              </span>
              <span
                v-if="dataObjectData.district"
              >
                {{ dataObjectData.district }}
              </span>
            </p>
            <p class="object-card__wrap-info__item object-card__date">
              <span>
                №
              </span>
              <span
                v-if="dataObjectData.id"
              >
                {{ dataObjectData.id }}
              </span>
              <span
                v-if="dataObjectData.date"
              >
                {{ timeConverter(dataObjectData.date) }}
              </span>
            </p>
            <p
              class="object-card__agency"
              :class="{'object-card__agency_list-view': propObjectView === 'list'}"
            >
              <span
                v-if="dataObjectData.agency"
              >
                {{ dataObjectData.agency }}
              </span>
            </p>
          </div>
        </div>
        <div
          class="object-card__action"
          :class="{'object-card__action_list-view': propObjectView === 'list'}"
        >
          <div
            class="object-card__action-top"
          >
            <showPhoneNumber
              propClass="object-card__btn_show-phone"
              v-if="dataObjectData.phoneNumber"
              :propPhoneNumber="dataObjectData.phoneNumber"
            />
            <button
              class="btn object-card__btn_write-message"
              @click.stop.prevent
            >
              Написать сообщение
            </button>
          </div>
          <div
            class="object-card__action-bottom"
          >
            <socialSharing />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import iconHeartStroke from '../icons/iconHeartStroke.vue';
import showPhoneNumber from './showPhoneNumber.vue';
import moveToFavorites from './moveToFavorites.vue';
import socialSharing from './socialSharing.vue';

export default {
  name: 'grid',
  data() {
    return {
      dataObjectData: this.propObjectData,
      dataIsShowPhoneNumber: false,
    }
  },
  components: {
    iconHeartStroke,
    showPhoneNumber,
    moveToFavorites,
    socialSharing,
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
      required: true,
    },
  },
  watch: {
    propObjectData: {
      handler(value) {
        // console.log('1 ::', value);
        this.dataObjectData = value;
      },
      deep: true
    },
  },
  methods: {
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
      'filterDataSelected',
    ]),
  },
};
</script>