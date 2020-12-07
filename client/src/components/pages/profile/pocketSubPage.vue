<template>
  <div
    id=""
    class="pocket-page"
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Мой кошелёк
      </h3>
    </header>

    <div class="template-page__content">
      <switcher
        class="add-object-page__switcher"
        switcherId="pocketSwitchSubPage"
        :items="subpagesArray"
        :value.sync="selectedSubpageComputed"
      />

      <router-view />
    </div>
  </div>
</template>

<script>
import switcher from '../../common/switcher.vue';

export default {
  name: 'pocketSubPage',
  components: {
    switcher,
  },
  data() {
    return {
      selectedSubpageValue: '',
      subpagesArray: [
        {
          label: 'Пополнить',
          slug: 'pocketAddMoneySubPage',
          checked: true,
        },
        {
          label: 'История',
          slug: 'pocketHistorySubPage',
          checked: false,
        },
        {
          label: 'Подписка',
          slug: 'pocketSubscriptionSubPage',
          checked: false,
        },
      ],
    }
  },
  computed: {
    selectedSubpageComputed: {
      cache: false,
      get() {
        return this.selectedSubpageValue;
      },
      set(value) {
        if (value) {
          this.selectedSubpageValue = value;
        }
        this.detectCheckedElement();
        this.moveToSubPage(value);
      }
    },
  },
  methods: {
    moveToSubPage(value) {
      // If this is not a current route.
      if (value.slug !== this.$route.name) {
        this.$router.push({
          name: value.slug
        });
      }
    },
    detectCheckedElement() {
      const arrayCopy = [...this.subpagesArray];
      this.subpagesArray = arrayCopy.map(
        item => {
          if (item.slug === this.selectedSubpageValue.slug) {
            let newItem = item;
            newItem.checked = true;
            return newItem;
          }
          return item;
        }
      );
    },
  },
};
</script>