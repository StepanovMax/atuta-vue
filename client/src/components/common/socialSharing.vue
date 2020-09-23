
<template>
  <div class="social-sharing">
    <p class="social-sharing__title">
      Поделиться:
    </p>
    <ul class="social-sharing__list">
      <li
      >
        <a
          href=""
          title="Поделиться Вконтакте"
          @click.prevent="share(
            'http://dev.atyta.ru/favorites',
            '2-к квартира в Таганроге',
            'Шарим фотку',
            'http://dev.atyta.ru/src/images/objects/8993850262.jpg'
          )"
        >
          <iconSocialVK />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Facebook"
          @click.stop.prevent
        >
          <iconSocialFB />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Twitter"
          @click.stop.prevent
        >
          <iconSocialTwitter />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Одноклассники"
          @click.stop.prevent
        >
          <iconSocialOK />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Mail"
          @click.stop.prevent
        >
          <iconSocialMail />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Whatsapp"
          @click.stop.prevent
        >
          <iconSocialWhatsapp />
        </a>
      </li>
      <li>
        <a
          href=""
          title="Поделиться в Viber"
          @click.stop.prevent
        >
          <iconSocialViber />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import iconSocialVK from '../icons/social/iconSocialVK.vue';
import iconSocialFB from '../icons/social/iconSocialFB.vue';
import iconSocialMail from '../icons/social/iconSocialMail.vue';
import iconSocialTwitter from '../icons/social/iconSocialTwitter.vue';
import iconSocialOK from '../icons/social/iconSocialOK.vue';
import iconSocialViber from '../icons/social/iconSocialViber.vue';
import iconSocialWhatsapp from '../icons/social/iconSocialWhatsapp.vue';

export default {
  name: 'socialSharing',
  components: {
    iconSocialVK,
    iconSocialFB,
    iconSocialMail,
    iconSocialTwitter,
    iconSocialOK,
    iconSocialViber,
    iconSocialWhatsapp,
  },
  props: {
    propObject: {
      default: null,
      type: Object,
      required: true
    },
  },
  data() {
    return {
      domain: window.location.hostname,
    }
  },
  computed: {
    objectDescription() {
      let description;
      description += this.propObject.metaTitle;
      return description;
    },
  },
  methods: {
    share(url, title, text, img) {
      let urlResult = 'http://vkontakte.ru/share.php?';
      urlResult += 'url='    + encodeURIComponent(url);
      urlResult += '&title=' + encodeURIComponent(this.propObject.metaTitle);
      urlResult += '&image=' + encodeURIComponent(img);
      console.log('urlResult', urlResult);
      this.popup(urlResult);
    },
    popup(url) {
      window.open(url,'','toolbar=0,status=0,width=626,height=436');
    },
  },
  mounted() {
    console.log('propObject ::', this.propObject);
  },
};
</script>