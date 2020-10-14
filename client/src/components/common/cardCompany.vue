<template>
  <router-link
    class="object-card__link"
    :to="{
      name: 'companyPage',
      params: {
        id: propCompanyData.id,
        companyData: propCompanyData,
      }
    }"
    :title="`Перейти подробнее ${propCompanyData.name.label}`"
  >
    <div class="card-company">

      <div class="card-company__wrap">

        <div class="card-company__image">
          <div
            class="card-company__image-wrap"
            :class="{'card-company__image-wrap_white': !propCompanyData.urlPreview}"
          >

            <img
              v-if="propCompanyData.urlPreview"
              class="img card-company__image-wrap-img"
              :src="propCompanyData.urlPreview"
              alt=""
            >

            <img
              v-else
              class="img card-company__image-wrap-img"
              src="src/images/logo/logo_desktop.png"
              alt=""
            >

          </div>
        </div>

        <div class="card-company__wrap-info">

          <div class="card-company__wrap-info-header">
            <h3 class="card-company__title">
              {{ propCompanyData.name.label }}
            </h3>
          </div>

          <div class="card-company__wrap-info-content">
            <p class="card-company__description">
              {{ propCompanyData.description.label }}
            </p>

            <p class="card-company__objects">
              Объявлений: {{ propCompanyData.objectsCount }}
            </p>
          </div>

        </div>

      </div>

    </div>
  </router-link>
</template>

<script>

export default {
  name: 'cardCompany',
  data() {
    return {
      // dataIsShowPhoneNumber: false,
    }
  },
  props: {
    propCompanyData: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>