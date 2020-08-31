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
      @sort="changeArrayOrder($event)"
      @end="dragging = false"
    >
      <div
        class="upload-images__list-item"
        v-for="(item, index) in filesArray"
        :key="item.id"
      >
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
            -
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
            +
          </button>
        </div>
      </div>
    </draggable>

    <pre>
      {{ filesArray }}
    </pre>

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import arrayMove from 'array-move';

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
      filesArray: [],
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
          const canvasID = 'canvas-' + i;

          this.filesArray.push({
            degrees: 0,
            id: canvasID,
            object: fileList[i],
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

          image.src = URL.createObjectURL(fileList[i]);

          image.onload = function() {
            const canvas = document.getElementById(canvasID);
            canvas.height = 1600;
            canvas.width = 2400;
            const context = canvas.getContext('2d');

            imageRatio = image.width / image.height;
            vm.filesArray[i].imageRatio = imageRatio;
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
          }

          const currentUrl = URL.createObjectURL(fileList[i]);
          this.dataUploadedImages.push({
            id: i,
            url: currentUrl,
          });

          URL.revokeObjectURL(fileList[i]);
        }
      }
    },
    rotateImage(way, index) {
      const image = new Image();
      image.src = URL.createObjectURL(this.filesArray[index].object);
      const imageRatio = this.filesArray[index].imageRatio;
      let currentDegree = this.calcDegree(way, index);
      let imageLWidth;
      let imageLHeight;
      let imagePWidth;
      let imagePHeight;

      image.onload = function() {
        const canvas = document.getElementById('canvas-' + index);
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
        context.restore();

        // window.location.href = canvas.toDataURL();
        // console.log('canvas ::', canvas.toDataURL());
      }
      // this.filesArray.forEach(
      //   item => {
      //     console.log(URL.createObjectURL(item.object));
      //   }
      // )
    },
    removeImage(index) {
      this.filesArray.splice(index, 1);
      console.log('after removing', index, this.filesArray);
    },
    rotateToRight(index) {
      console.log('rotateToRight');
      console.log('Image');
      const image = new Image();
      image.src = URL.createObjectURL(this.filesArray[index]);
      image.onload = function() {
        console.log('onload');
        const canvas = document.getElementById('canvas-' + index);
        const context = canvas.getContext('2d');
        const imgWidth = this.width;
        const imgHeight = this.height;
        const imgRatio = imgWidth / imgHeight;
        if (imgRatio >= 1) {
          canvas.height = 150 / imgRatio;
          canvas.width = 150;
        } else {
          canvas.height = 100;
          canvas.width = 100 * imgRatio;
        }
        // context.clearRect(0,0,canvas.width,canvas.height);
        // context.save();
        context.translate(canvas.height/2, canvas.width/2);
        context.rotate(90 * Math.PI/180);
        console.log('canvas ::', canvas.width, canvas.height);
        context.drawImage(this, -canvas.width/2, -canvas.height/3, canvas.height, canvas.width);
        // context.restore();

        // canvas.toBlob(function(blob) {
        //   const finalURL = URL.createObjectURL(blob);
        //   // console.log('finalURL ::', finalURL);
        // }, 'image/png');
      }
      // context.drawImage(this, 0, 0, canvas.width, canvas.height);
    },
    rotateToLeft(item, index) {
      console.log('rotateToLeft');
      const finalDegrees = item.degrees - 90;
      this.filesArray[index].degrees = finalDegrees;
      const image = new Image();
      image.src = URL.createObjectURL(item.object);
      image.onload = function() {
        const canvas = document.getElementById('canvas-' + index);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        // context(canvas.width/2, canvas.height/2);
        context.rotate(finalDegrees * Math.PI/180);
        context.drawImage(this, -this.width/2, -this.width/2);
        context.restore();
      }
    },
    changeArrayOrder(event) {
      this.dataUploadedImages = arrayMove(this.dataUploadedImages, event.oldIndex, event.newIndex);
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