<template>
  <div id="styleguide" class="styleguide">
    <h1 class="title title_h1" style="text-align: center;">
      Стиль общих элементов
    </h1>
    <div class="list">
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Значения диапазона
        </h2>
        <div class="styleguide__block">
          <range
            rangeType="area"
          />
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Параграфы / текст
        </h2>
        <div class="styleguide__block">
          <p class="paragraph">
            Идейные соображения высшего порядка, а также консультация с широким активом позволяет выполнять важные задания по разработке новых предложений. Повседневная практика показывает, что рамки и место обучения кадров влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также новая модель организационной деятельности в значительной степени обуславливает создание новых предложений. С другой стороны консультация с широким активом способствует подготовки и реализации модели развития. Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач.
          </p>
          <p class="paragraph">
            Равным образом консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности влечет за собой процесс внедрения и модернизации дальнейших направлений развития. Повседневная практика показывает, что начало повседневной работы по формированию позиции в значительной степени обуславливает создание форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.
          </p>
          <p class="paragraph">
            Разнообразный и богатый опыт консультация с широким активом играет важную роль в формировании дальнейших направлений развития. С другой стороны новая модель организационной деятельности требуют определения и уточнения существенных финансовых и административных условий.
          </p>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Заголовки
        </h2>
        <div class="styleguide__block">
          <h1 class="title title_h1">
            Заголовок H1
          </h1>
          <h2 class="title title_h2">
            Заголовок H2
          </h2>
          <h3 class="title title_h3">
            Заголовок H3
          </h3>
          <h4 class="title title_h4">
            Заголовок H4
          </h4>
          <h5 class="title title_h5">
            Заголовок H5
          </h5>
          <h6 class="title title_h6">
            Заголовок H6
          </h6>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Кнопки
        </h2>
        <div class="styleguide__block">
          <ul class="list">
            <li class="list__item list__item_vertical">
              <button class="btn btn_blue btn_middle">
                Показать объявление
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="btn btn_blue btn_middle btn_disabled">
                Показать объявление
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="btn btn_blue btn_mini">
                Показать объявление
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="btn btn_blue btn_mini btn_disabled">
                Показать объявление
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Картинки
        </h2>
        <div class="styleguide__block">
          <img
            src="src/images/example-images/trees-in-park-257360.jpg"
            alt=""
            class="img"
          >
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Выпадашки
        </h2>
        <div class="styleguide__block">
          <Multiselect
            v-model="value"
            :options="towns"
            :show-labels="false"
            :allow-empty="true"
            :close-on-select="true"
            :multiple="true"
            label="name"
            track-by="name"
            placeholder="Выберите нужное"
          />
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Поля ввода
        </h2>
        <div class="styleguide__block">
          <ul class="list">
            <li class="list__item list__item_vertical">
              <input
                type="text"
                class="input"
                placeholder="Введите своё имя"
              >
            </li>
            <li class="list__item list__item_vertical">
              <input
                type="text"
                class="input input_disabled"
                placeholder="Введите своё имя"
                disabled
              >
            </li>
            <li class="list__item list__item_vertical">
              <input
                type="text"
                class="input input_invalid"
                value="Максим Степанов"
              >
              <p class="paragraph paragraph_invalid">
                Пожалуйста, заполните поле "Тип объекта".
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Переключатели
        </h2>
        <div class="styleguide__block">
          <switcher
            switcherId="switcher-1"
            :items="[
              {
                label: 'Купить',
                slug: 'buy',
                checked: true
              },
              {
                label: 'Снять',
                slug: 'rent',
                checked: false
              }
            ]"
            v-model="switcherValue1"
          />
          <pre>
            Выбрано: {{ switcherValue1 }}
          </pre>
          <switcher
            switcherId="switcher-2"
            :items="[
              {
                label: 'Собственник',
                slug: 'personal',
                checked: false
              },
              {
                label: 'Агент',
                slug: 'agent',
                checked: true
              },
              {
                label: 'Агентство',
                slug: 'agency',
                checked: false
              },
              {
                label: 'Застройщик',
                slug: 'builder',
                checked: false
              }
            ]"
            v-model="switcherValue2"
          />
          <pre>
            Выбрано: {{ switcherValue2 }}
          </pre>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Иконки
        </h2>
        <div class="styleguide__block">
          <ul class="list">
            <li class="list__item list__item_vertical">
              <iconArrowUp />
            </li>
            <li class="list__item list__item_vertical">
              <iconCrown />
            </li>
            <li class="list__item list__item_vertical">
              <iconDiamond />
            </li>
            <li class="list__item list__item_vertical">
              <iconAsterisk />
            </li>
            <li class="list__item list__item_vertical">
              <iconCross />
            </li>
            <li class="list__item list__item_vertical">
              <iconPlus />
            </li>
            <li class="list__item list__item_vertical">
              <iconEdit />
            </li>
            <li class="list__item list__item_vertical">
              <iconRemove />
            </li>
          </ul>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Чекбоксы
        </h2>
        <div class="styleguide__block">
          <checkbox
            switcherId="checkbox-1"
            :item="{
              label: 'Квартира',
              slug: 'appartment',
              checked: true
            }"
            v-model="checkboxValue1"
          />
          <pre>
            Выбрано: {{ checkboxValue1 }}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import switcher from './common/switcher.vue'
import iconArrowUp from './icons/iconArrowUp.vue'
import iconDiamond from './icons/iconDiamond.vue'
import iconCrown from './icons/iconCrown.vue'
import iconAsterisk from './icons/iconAsterisk.vue'
import iconCross from './icons/iconCross.vue'
import iconPlus from './icons/iconPlus.vue'
import iconEdit from './icons/iconEdit.vue'
import iconRemove from './icons/iconRemove.vue'
import checkbox from './common/checkbox.vue'
import range from './common/range.vue'
import Multiselect from 'vue-multiselect'

export default {
  name: 'blog',
  components: {
    switcher,
    iconArrowUp,
    iconAsterisk,
    iconCross,
    iconPlus,
    iconEdit,
    iconCrown,
    iconRemove,
    iconDiamond,
    checkbox,
    range,
    Multiselect,
  },
  data() {
    return {
      switcherValue1: '',
      switcherValue2: '',
      checkboxValue1: '',
      value: null,
      towns: [
        { name: 'Таганрог' },
        { name: 'Ростов-на-Дону' },
        { name: 'Шахты' },
        { name: 'Азов', $isDisabled: true },
        { name: 'Сальск' },
        { name: 'Батайск' },
        { name: 'Новошахтинск' },
      ]
    }
  },
};
</script>