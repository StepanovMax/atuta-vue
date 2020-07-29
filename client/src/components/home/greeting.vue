<template>
  <div
    id="greeting"
    class="greeting"
  >
    <h1 class="title title_h1">
      Главная
    </h1>



    <br />


    <div class="">
      <pre>
        {{ filterData }}
      </pre>
    </div>




    <p class="paragraph">
      Разнообразный и богатый опыт консультация с широким активом позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. С другой стороны укрепление и развитие структуры требуют от нас анализа соответствующий условий активизации. Равным образом постоянный количественный рост и сфера нашей активности в значительной степени обуславливает создание новых предложений. Товарищи! новая модель организационной деятельности влечет за собой процесс внедрения и модернизации систем массового участия. Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности позволяет оценить значение системы обучения кадров, соответствует насущным потребностям. С другой стороны консультация с широким активом играет важную роль в формировании соответствующий условий активизации.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'greeting',
  data() {
    return {
      message: null
    }
  },
  methods: {
    fetchMessage() {
      fetch('http://127.0.0.1:9001/test')
        /*
          Converting to json
        */
        .then(response => response.json())
        /*
          Output the result of the executing response.json() to the console.
        */
        .then(data => {
          // console.log('Data ::', data)
          this.message = data.message
        })
        .catch(
          error => console.log('Error ::', error)
        )
    }
  },
  mounted() {
    // console.log('NODE_ENV ::', process.env.NODE_ENV);
    // console.log('VUE_APP_DOMAIN ::', process.env.VUE_APP_DOMAIN);
    // console.log('env ::', process.env);
  },
  computed: {
    ...mapState([
      'filterData',
      'isFilterOpen',
    ]),
  },
};
</script>