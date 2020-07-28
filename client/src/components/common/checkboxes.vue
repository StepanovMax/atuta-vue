<template>
  <div class="checkboxes">
    <ul
      class="checkboxes__list"
    >
      <li
        class="checkboxes__list-item"
        :class="[
          { 'checkboxes__list-item_active': item.checked }
        ]"
        v-for="(item, index) in itemsCopy"
        :key="index"
      >
        <iconChecked
          v-if="item.checked"
          class="checkboxes__icon checkboxes__icon_checked"
        />
        <div
          v-else
          class="checkboxes__icon checkboxes__icon_active"
        />
        <input
          :id="'id-' + checkboxId + '-' + index"
          class="checkboxes__input"
          type="checkbox"
          :value="item"
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
  },
  data() {
    return {
      picked: [],
      itemsCopy: [...this.items].map(function(item) {
        item.checked = false;
        return item;
      }),
    }
  },
  watch: {
    picked: {
      handler() {
        let itemsCopy = [...this.itemsCopy];
        let pickedCopy = [...this.picked];
        itemsCopy.forEach(function(item, index) {
          const catchedElement = pickedCopy.some(
            itemPicked => {
              if (item.slug === itemPicked.slug) {
                return item;
              }
              return null;
            }
          );
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
      this.$emit('update:value', data);
    },
  },
};
</script>