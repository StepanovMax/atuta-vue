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
        <div class="form__row form__row_block-half-width">
          <div class="form__block-half-width">
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
                :value.sync="filterSelected.object"
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
                :value.sync="filterSelected.deal"
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
              >
            </div>
          </div>
          <div class="form__block-half-width">
            456
          </div>
        </div>
      </div>

    </div>

    <ads />

  </div>
</template>

<script>
import ads from '../ads.vue';
import switcher from '../common/switcher.vue';
import { mapState, store, commit } from 'vuex';
import radioButtons from '../common/radioButtons.vue';

export default {
  name: 'addObject',
  components: {
    ads,
    switcher,
    radioButtons,
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
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected));
  },
};
</script>