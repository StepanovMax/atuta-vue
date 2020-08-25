<template>
  <div class="upload-images">
    <label
      for="uploadImagesInput"
    >
      <p>
        Загрузить изображение
      </p>
      <input
        type="file"
        id="uploadImagesInput"
        @change="uploadImages($event.target.files)"
        :multiple="propIsMultiple"
        ref="inputUploadFiles"
        accept=".jpg, .jpeg, .png"
      >
    </label>


    <draggable
      class="upload-images__list"
      ghost-class="ghost"
      @start="dragging = true"
      @sort="dragDetection($event)"
      @end="dragging = false"
    >
      <div
        class="upload-images__list-item"
        v-for="(item, index) in dataUploadedImages"
        :key="index"
      >
        <img
          :src="item.url"
          class="upload-images__list-item-img"
        >
        <button
          class="btn upload-images__btn upload-images__btn_close"
          @click="removeImage(index)"
        >
          <iconCross propColor="white" />
        </button>
      </div>
    </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import iconCross from '../icons/iconCross.vue';

export default {
  name: 'uploadImages',
  components: {
    iconCross,
    draggable,
  },
  props: {
    propIsMultiple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      files: [],
      images: [],
      dataUploadedImages: [],
    }
  },
  methods: {
    uploadImages(fileList) {
      if (fileList && fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          const currentUrl = URL.createObjectURL(fileList[i]);
          this.dataUploadedImages.push({
            url: currentUrl
          });
          URL.revokeObjectURL(fileList[i]);
        }
      }
      console.log('uploadImages ::', this.dataUploadedImages);
    },
    removeImage(index) {
      this.dataUploadedImages.splice(index, 1);
    },
    changeArrayOrder(event) {
      this.dataUploadedImages = [];
      event.from.children.forEach(
        item => {
          this.dataUploadedImages.push({
            url: item.childNodes[0].currentSrc
          });
        }
      )
      console.log('changeArrayOrder ::', this.dataUploadedImages);
    },
  },
};
</script>