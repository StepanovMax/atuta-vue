<template>
  <div class="upload-images">
    <label
      class="btn btn_blue upload-images__btn-upload"
      for="uploadImagesInput"
    >
      <p>
        Загрузить изображение
      </p>
      <input
        type="file"
        class="upload-images__input-file"
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
      @sort="changeArrayOrder($event)"
      @start="dragging = true"
      @end="dragging = false"
      handle=".upload-images__handle"
    >
      <div
        class="upload-images__list-item"
        v-for="(item, index) in filesArray"
        :key="item.id"
      >
        <div class="upload-images__handle" />
        <canvas
          :key="item.id"
          :id="item.id"
          class="upload-images__image"
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <div class="upload-images__image-controls">
          <button
            class="
              btn
              upload-images__btn
              upload-images__btn_close
            "
            @click="removeImage(index)"
          >
            <iconCross propColor="white" />
          </button>
          <button
            class="
              btn
              upload-images__btn
              upload-images__btn_rotate
              upload-images__btn_rotate-left
            "
            title="Rotate to left"
            @click="rotateImage('left', index)"
          >
            <iconArrowRotateLeft />
          </button>
          <button
            class="
              btn
              upload-images__btn
              upload-images__btn_rotate
              upload-images__btn_rotate-right
            "
            title="Rotate to right"
            @click="rotateImage('right', index)"
          >
            <iconArrowRotateRight />
          </button>
        </div>
      </div>
    </draggable>

  </div>
</template>

<script>
import arrayMove from 'array-move';
import draggable from 'vuedraggable';

import iconCross from '../icons/iconCross.vue';
import iconArrowRotateLeft from '../icons/iconArrowRotateLeft.vue';
import iconArrowRotateRight from '../icons/iconArrowRotateRight.vue';


export default {
  name: 'uploadImages',
  components: {
    draggable,
    iconCross,
    iconArrowRotateLeft,
    iconArrowRotateRight,
  },
  props: {
    propIsMultiple: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      files: [],
      images: [],
      dataUploadedImages: [],
      filesArray: [],
      urlArray: [],
    }
  },
  methods: {
    calcDegree(way, index) {
      let currentDegree;
      let currentAngle;

      this.filesArray.forEach(
        (item, i) => {
          if (i === index) {
            currentDegree = item.degrees;
          }
        }
      )

      if (way === 'left') {
        currentDegree -= 90;
      } else if (way === 'right') {
        currentDegree += 90;
      }

      if (currentDegree === -360 || currentDegree === 360) {
        currentAngle = 0;
      } else {
        currentAngle = currentDegree;
      }
      this.filesArray[index].degrees = currentAngle;
      return currentAngle;
    },
    uploadImages(fileList) {
      if (fileList && fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          let canvasID = 'canvas-' + i;
          let index = i;

          this.filesArray.forEach(
            item => {
              if (item.id === canvasID) {
                console.log('canvasID catch ::', this.filesArray.length, i);
                index = this.filesArray.length;
                canvasID = 'canvas-' + index;
              }
            }
          )

          this.filesArray.push({
            id: canvasID,
            object: fileList[i],
            degrees: 0,
            imageRatio: 0,
          });

          let currentDegree = 0;
          const image = new Image();
          let vm = this;
          let imageRatio;
          let imageLWidth;
          let imageLHeight;
          let imagePWidth;
          let imagePHeight;
          let imageWidth = image.width;
          let imageHeight = image.height;

          const currentUrl = image.src = URL.createObjectURL(fileList[i]);

          image.onload = function() {
            const canvas = document.getElementById(canvasID);
            canvas.height = 1600;
            canvas.width = 2400;
            const context = canvas.getContext('2d');

            imageRatio = image.width / image.height;
            vm.filesArray[index].imageRatio = imageRatio;
            imageLWidth = canvas.width;
            imageLHeight = canvas.width / imageRatio;
            imagePWidth = canvas.height * imageRatio;
            imagePHeight = canvas.height;

            // Landscape view
            if (imageRatio >= 1.5) {
              imageWidth = imageLWidth;
              imageHeight = imageLHeight;
              canvas.width = imageLWidth;
              canvas.height = imageLHeight;
            }
            // Portrait view
            else {
              imageWidth = imagePWidth;
              imageHeight = imagePHeight;
              canvas.width = imagePWidth;
              canvas.height = imagePHeight;
            }
            context.drawImage(this, 0, 0, imageWidth, imageHeight);

            // const newURL = canvas.toDataURL('image/jpeg', 0.2);
            // vm.urlArray.push(newURL);
            vm.filesArray[index].canvas = canvas;
            // console.log('vm.urlArray ::', vm.urlArray);
            vm.$emit('update:value', vm.filesArray);
          }

          // const currentUrl = URL.createObjectURL(fileList[index]);
          // this.dataUploadedImages.push({
          //   id: i,
          //   url: currentUrl,
          // });

          URL.revokeObjectURL(fileList[index]);
        }
      }
    },
    rotateImage(way, index) {
      const image = new Image();
      const currentUrl = image.src = URL.createObjectURL(this.filesArray[index].object);
      const imageRatio = this.filesArray[index].imageRatio;
      const imageID = this.filesArray[index].id;
      let currentDegree = this.calcDegree(way, index);
      let imageLWidth;
      let imageLHeight;
      let imagePWidth;
      let imagePHeight;
      let vm = this;

      image.onload = function() {
        const canvas = document.getElementById(imageID);
        canvas.height = 1600;
        canvas.width = 2400;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();

        let translateX = 0;
        let translateY = 0;
        let imageWidth = image.width;
        let imageHeight = image.height;

        // Landscape view
        if (imageRatio >= 1.5) {
          imageLWidth = canvas.width;
          imageLHeight = canvas.width / imageRatio;
          imagePWidth = canvas.height / imageRatio;
          imagePHeight = canvas.height;

          if (currentDegree === -270) {
            translateX = imageLHeight;
            translateY = 0;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLHeight;
            canvas.height = imageLWidth;
          } else if (currentDegree === -180) {
            translateX = imageLWidth;
            translateY = imageLHeight;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === -90) {
            translateX = 0;
            translateY = imageLWidth;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLHeight;
            canvas.height = imageLWidth;
          } else if (currentDegree === 0) {
            translateX = 0;
            translateY = 0;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === 90) {
            translateX = imageLHeight;
            translateY = 0;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLHeight;
            canvas.height = imageLWidth;
          } else if (currentDegree === 180) {
            translateX = imageLWidth;
            translateY = imageLHeight;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === 270) {
            translateX = 0;
            translateY = imageLWidth;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLHeight;
            canvas.height = imageLWidth;
          }
        // Portrait view
        } else {
          imageLWidth = canvas.width;
          imageLHeight = canvas.width / imageRatio;
          imagePWidth = canvas.height / imageRatio;
          imagePHeight = canvas.height;

          if (currentDegree === -270) {
            translateX = imagePWidth;
            translateY = 0;
            imageWidth = imagePHeight;
            imageHeight = imagePWidth;
            canvas.width = imagePWidth;
            canvas.height = imagePHeight;
          } else if (currentDegree === -180) {
            translateX = canvas.width;
            translateY = imageLHeight;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === -90) {
            translateX = 0;
            translateY = canvas.height;
            imageWidth = imagePHeight;
            imageHeight = imagePWidth;
            canvas.width = imagePWidth;
            canvas.height = imagePHeight;
          } else if (currentDegree === 0) {
            translateX = 0;
            translateY = 0;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === 90) {
            translateX = imageLHeight;
            translateY = 0;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLHeight;
            canvas.height = imageLWidth;
          } else if (currentDegree === 180) {
            translateX = canvas.width;
            translateY = imageLHeight;
            imageWidth = imageLWidth;
            imageHeight = imageLHeight;
            canvas.width = imageLWidth;
            canvas.height = imageLHeight;
          } else if (currentDegree === 270) {
            translateX = 0;
            translateY = imageLHeight/2 + imagePHeight/2;
            translateY = imagePHeight;
            imageWidth = imagePHeight;
            imageHeight = imagePWidth;
            canvas.width = imagePWidth;
            canvas.height = imagePHeight;
          }
        }
        context.translate(translateX, translateY);
        context.rotate(currentDegree * Math.PI/180);
        context.drawImage(image, 0, 0, imageWidth, imageHeight);
        const newURL = canvas.toDataURL('image/jpeg', 0.2);
        // const newURL2 = URL.createObjectURL(value[0].object);
        // vm.filesArray[index].object = canvas;
        vm.filesArray[index].canvas = canvas;
        // vm.urlArray[index] = newURL;
        // console.log('newURL ::', newURL);
        // const win = window.open(newURL, '_blank');
        // win.focus();
        context.restore();
        // vm.$emit('update:value', vm.filesArray);
        vm.$emit('update:value', vm.filesArray);
      }
    },
    removeImage(index) {
      this.filesArray.splice(index, 1);
    },
    updateValue() {
      vm.$emit('update:value', vm.filesArray);
    },
    changeArrayOrder(event) {
      this.filesArray = arrayMove(this.filesArray, event.oldIndex, event.newIndex);
      this.$emit('update:value', this.filesArray);
    },
    drawRotated(image, degrees) {
      context.clearRect(0,0,canvas.width,canvas.height);
      context.save();
      context(canvas.width/2,canvas.height/2);
      context.rotate(degrees*Math.PI/180);
      context.drawImage(image,-image.width/2,-image.width/2);
      context.restore();
    },
  },
};
</script>