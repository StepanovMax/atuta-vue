<template>
  <Fragment>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-half">
        <div class="form__block-width form__block-width-half">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Вид объекта*
          </h3>
          <radioButtons
            radioButtonsView="wrapHalf"
            radioButtonsId="objectViewAddObject"
            :items="filterDataDefaultClone.houseTypes"
            :value.sync="propCreatedObjectHouse.type"
          />
        </div>
      </div>
    </div>

  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
// import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
// import switcher from '../../common/switcher.vue';
import radioButtons from '../../common/radioButtons.vue';

export default {
  name: 'addObjectHouse',
  components: {
    // switcher,
    Fragment,
    // multiselect,
    radioButtons,
  },
  props: {
    propCreatedObjectHouse: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      createdObject: {},
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
    ]),
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
  watch: {

  },
  methods: {

  },
};
</script>