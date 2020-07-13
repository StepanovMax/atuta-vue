<template>
  <div id="styleguide" class="styleguide">
    <h1 class="title title_h1" style="text-align: center;">
      Common elements style
    </h1>
    <div class="list">
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Text
        </h2>
        <div class="styleguide__block">
          <p class="paragraph">
            Aliquam erat volutpat. In ut quam vitae odio lacinia tincidunt. Vestibulum suscipit nulla quis orci. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Suspendisse eu ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus nec sem in justo pellentesque facilisis. Nam commodo suscipit quam. Vivamus elementum semper nisi.
          </p>
          <p class="paragraph">
            Sed a libero. Quisque id odio. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Vivamus aliquet elit ac nisl. Praesent egestas neque eu enim. Etiam imperdiet imperdiet orci. Ut a nisl id ante tempus hendrerit. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Sed in libero ut nibh placerat accumsan. Nulla sit amet est. Phasellus viverra nulla ut metus varius laoreet. Nullam sagittis. Etiam iaculis nunc ac metus. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.
          </p>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Titles
        </h2>
        <div class="styleguide__block">
          <h1 class="title title_h1">
            Title H1
          </h1>
          <h2 class="title title_h2">
            Title H2
          </h2>
          <h3 class="title title_h3">
            Title H3
          </h3>
          <h4 class="title title_h4">
            Title H4
          </h4>
          <h5 class="title title_h5">
            Title H5
          </h5>
          <h6 class="title title_h6">
            Title H6
          </h6>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Buttons
        </h2>
        <div class="styleguide__block">
          <ul class="list">
            <li class="list__item list__item_vertical">
              <button class="button button_middle">
                Show advert
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="button button_middle button_disabled">
                Show advert
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="button button_mini">
                Show advert
              </button>
            </li>
            <li class="list__item list__item_vertical">
              <button class="button button_mini button_disabled">
                Show advert
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Images
        </h2>
        <div class="styleguide__block">
          <img
            src="src/images/example-images/trees-in-park-257360.jpg"
            alt=""
            class="image"
          >
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Inputs
        </h2>
        <div class="styleguide__block">
          <ul class="list">
            <li class="list__item list__item_vertical">
              <input type="text" class="input" placeholder="Enter your name">
            </li>
            <li class="list__item list__item_vertical">
              <input
                type="text"
                class="input input_disabled"
                placeholder="Enter your name"
                disabled
              >
            </li>
            <li class="list__item list__item_vertical">
              <input
                type="text"
                class="input input_invalid"
                value="Maxim Stepanov"
              >
              <p class="paragraph paragraph_invalid">
                Field "Object type" is necessary for filling.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Switchers
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Icons
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Checkboxes
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Radio buttons
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Selects
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Tabs
        </h2>
      </div>
      <div class="list__item list__item_styleguide">
        <h2 class="title title_h2">
          Range sliders
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
};
</script>