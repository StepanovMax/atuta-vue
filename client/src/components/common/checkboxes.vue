<template>
  <div class="checkboxes">
    <ul
      class="checkboxes__list"
      :class="[
        { 'checkboxes__list_list-vertical': checkboxType === 'listVertical' },
      ]"
    >
      <li
        class="checkboxes__list-item"
        :class="[
          { 'checkboxes__list-item_active': item.checked },
          { 'checkboxes__list-item-rooms-count': checkboxType === 'roomsCount' },
          { 'checkboxes__list-item-house-type': checkboxId === 'houseType' },
          { 'checkboxes__list-item-vertical': checkboxType === 'listVertical' },
        ]"
        v-for="(item, index) in itemsCopy"
        :key="index"
      >
        <div
          class="checkboxes__icon-wrap"
          @click="trigger(index)"
        >
          <iconChecked
            v-if="item.checked"
            class="checkboxes__icon checkboxes__icon_checked"
          />
          <div
            v-else
            class="checkboxes__icon checkboxes__icon_active"
            :class="{
              'checkboxes__icon_error': propErrorClass
            }"
          />
        </div>
        <input
          ref="checkboxinput"
          :id="'id-' + checkboxId + '-' + index"
          class="checkboxes__input"
          type="checkbox"
          :value="item"
          :key="'key-' + checkboxId + '-' + index"
          v-model="picked"
        >
        <label
          :for="'id-' + checkboxId + '-' + index"
          class="checkboxes__label"
        >
          {{ item.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import iconChecked from '../icons/iconChecked.vue'

export default {
  name: 'checkbox',
  components: {
    iconChecked
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      default: [],
      required: true
    },
    checkboxId: {
      type: String,
      default: '',
      required: true
    },
    checkboxType: {
      type: String,
      default: 'default',
      required: false
    },
    propErrorClass: false,
  },
  data() {
    return {
      picked: [...this.items].filter(function(item) {
        if (item.checked === true) {
          return item;
        }
      }),
    }
  },
  watch: {
    picked: {
      handler(value) {
        // The copy of all items.
        let itemsCopy = [...this.itemsCopy];
        // The copy of selected items.
        let pickedCopy = [...this.picked];
        // Iteration of all the items.
        itemsCopy.forEach(function(item, index) {
          // If an iterated item is the same as a picked item.
          const catchedElement = pickedCopy.some(
            itemPicked => {
              if (item.slug === itemPicked.slug) {
                return item;
              }
            }
          );
          // If an iterated item is the same as a picked item, then switch it tio checked.
          if (catchedElement) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        this.updateValue(pickedCopy);
      },
      deep: true
    },
  },
  methods: {
    removeCheckedAttribute(checkedElements) {
      let valueArray = [...checkedElements];
      valueArray.forEach(
        item => {
          delete item.checked;
        }
      );
      this.updateValue(valueArray);
    },
    updateValue(data) {
      if (data.length === 0) {
        data = null;
      }
      this.$emit('update:value', data);
    },
    trigger(i) {
      this.$refs.checkboxinput[i].click();
    },
  },
  computed: {
    itemsCopy() {
      return [...this.items].map(function(item) {
        if (!(item.checked === true || item.checked === false)) {
          item.checked = false;
        }
        return item;
      });
    },
  },
  mounted() {
    if (this.picked.length) {
      this.$emit('update:value', this.picked);
    }
  },
};
</script>