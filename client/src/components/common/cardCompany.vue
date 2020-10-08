<template>
  <div class="card-company">

    <div class="card-company__wrap">
      <div class="card-company__wrap-image">

        <img
          v-if="propCompanyData.urlPreview"
          class="img card-company__img"
          :src="propCompanyData.urlPreview"
          alt=""
        >

        <img
          v-else
          class="img card-company__img"
          src="src/images/logo/logo_desktop.png"
          alt=""
        >

      </div>
      <div class="card-company__wrap-info">

        <div class="card-company__wrap-info-header">
          <h3 class="card-company__wrap-info-header-title">
            {{ propCompanyData.name.label }}
          </h3>
        </div>

        <div class="card-company__wrap-info-description">
          <p class="card-company__wrap-info-description-text">
            {{ propCompanyData.description.label }}
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'cardCompany',
  data() {
    return {
      // dataIsShowPhoneNumber: false,
    }
  },
  components: {
    // iconHeartStroke,
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