<template>
  <div
    id="getDistricts"
    class="main get-districts"
  >
    <l-map
      v-if="false"
      ref="myMap"
      class="lmap"
      id="mapid"
      :zoom="zoom"
      :options="mapOptions"
      :center="center"
      @click="onMapClick"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="coordsMarker">
      </l-marker>
    </l-map>


    <div class="button-wrap">
      <button
        class="button"
        @click="modifyTownsList()"
      >
        Изменить список городов
      </button>
    </div>

    <pre>
      {{ newArray }}
    </pre>

  </div>
</template>

<script>
import axios from 'axios';
import { Icon } from 'leaflet';
import { latLng } from "leaflet";
import { LMarker, LTileLayer, LMap } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapState, mapGetters, store, commit } from 'vuex';
import { transliterate as tr, slugify } from 'transliteration';


export default {
  name: 'addObject',
  components: {
    LMap,
    LMarker,
    LTileLayer,
  },
  data() {
    return {
      district: '',
      fullArrayCoords: [],
      i: 0,
      j: 0,
      fullArrayAddresses: [],
      federalRegionsArray: [],
      federalRegionsArrayOldNew: [],
      federalRegionsArrayOld: [
        {
          "label": "Москва и Московская обл.",
          "slug": "moskva-i-moskovskaya-obl."
        },
        {
          "label": "Санкт-Петербург и область",
          "slug": "sankt-peterburg-i-oblast"
        },
        {
          "label": "Адыгея",
          "slug": "adygeya"
        },
        {
          "label": "Алтайский край",
          "slug": "altayskiy-kray"
        },
        {
          "label": "Амурская обл.",
          "slug": "amurskaya-obl."
        },
        {
          "label": "Архангельская обл.",
          "slug": "arhangelskaya-obl."
        },
        {
          "label": "Астраханская обл.",
          "slug": "astrahanskaya-obl."
        },
        {
          "label": "Башкортостан(Башкирия)",
          "slug": "bashkortostan-bashkiriya"
        },
        {
          "label": "Белгородская обл.",
          "slug": "belgorodskaya-obl."
        },
        {
          "label": "Брянская обл.",
          "slug": "bryanskaya-obl."
        },
        {
          "label": "Бурятия",
          "slug": "buryatiya"
        },
        {
          "label": "Владимирская обл.",
          "slug": "vladimirskaya-obl."
        },
        {
          "label": "Волгоградская обл.",
          "slug": "volgogradskaya-obl."
        },
        {
          "label": "Вологодская обл.",
          "slug": "vologodskaya-obl."
        },
        {
          "label": "Воронежская обл.",
          "slug": "voronezhskaya-obl."
        },
        {
          "label": "Дагестан",
          "slug": "dagestan"
        },
        {
          "label": "Еврейская обл.",
          "slug": "evreyskaya-obl."
        },
        {
          "label": "Ивановская обл.",
          "slug": "ivanovskaya-obl."
        },
        {
          "label": "Иркутская обл.",
          "slug": "irkutskaya-obl."
        },
        {
          "label": "Кабардино-Балкария",
          "slug": "kabardino-balkariya"
        },
        {
          "label": "Калининградская обл.",
          "slug": "kaliningradskaya-obl."
        },
        {
          "label": "Калмыкия",
          "slug": "kalmykiya"
        },
        {
          "label": "Калужская обл.",
          "slug": "kaluzhskaya-obl."
        },
        {
          "label": "Камчатская обл.",
          "slug": "kamchatskaya-obl."
        },
        {
          "label": "Карелия",
          "slug": "kareliya"
        },
        {
          "label": "Кемеровская обл.",
          "slug": "kemerovskaya-obl."
        },
        {
          "label": "Кировская обл.",
          "slug": "kirovskaya-obl."
        },
        {
          "label": "Коми",
          "slug": "komi"
        },
        {
          "label": "Костромская обл.",
          "slug": "kostromskaya-obl."
        },
        {
          "label": "Краснодарский край",
          "slug": "krasnodarskiy-kray"
        },
        {
          "label": "Красноярский край",
          "slug": "krasnoyarskiy-kray"
        },
        {
          "label": "Курганская обл.",
          "slug": "kurganskaya-obl."
        },
        {
          "label": "Курская обл.",
          "slug": "kurskaya-obl."
        },
        {
          "label": "Липецкая обл.",
          "slug": "lipeckaya-obl."
        },
        {
          "label": "Магаданская обл.",
          "slug": "magadanskaya-obl."
        },
        {
          "label": "Марий Эл",
          "slug": "mariy-el"
        },
        {
          "label": "Мордовия",
          "slug": "mordoviya"
        },
        {
          "label": "Мурманская обл.",
          "slug": "murmanskaya-obl."
        },
        {
          "label": "Нижегородская (Горьковская)",
          "slug": "nizhegorodskaya-gorkovskaya"
        },
        {
          "label": "Новгородская обл.",
          "slug": "novgorodskaya-obl."
        },
        {
          "label": "Новосибирская обл.",
          "slug": "novosibirskaya-obl."
        },
        {
          "label": "Омская обл.",
          "slug": "omskaya-obl."
        },
        {
          "label": "Оренбургская обл.",
          "slug": "orenburgskaya-obl."
        },
        {
          "label": "Орловская обл.",
          "slug": "orlovskaya-obl."
        },
        {
          "label": "Пензенская обл.",
          "slug": "penzenskaya-obl."
        },
        {
          "label": "Пермская обл.",
          "slug": "permskaya-obl."
        },
        {
          "label": "Приморский край",
          "slug": "primorskiy-kray"
        },
        {
          "label": "Псковская обл.",
          "slug": "pskovskaya-obl."
        },
        {
          "label": "Ростовская обл.",
          "slug": "rostovskaya-obl."
        },
        {
          "label": "Рязанская обл.",
          "slug": "ryazanskaya-obl."
        },
        {
          "label": "Самарская обл.",
          "slug": "samarskaya-obl."
        },
        {
          "label": "Саратовская обл.",
          "slug": "saratovskaya-obl."
        },
        {
          "label": "Саха (Якутия)",
          "slug": "saha-yakutiya"
        },
        {
          "label": "Сахалин",
          "slug": "sahalin"
        },
        {
          "label": "Свердловская обл.",
          "slug": "sverdlovskaya-obl."
        },
        {
          "label": "Северная Осетия",
          "slug": "severnaya-osetiya"
        },
        {
          "label": "Смоленская обл.",
          "slug": "smolenskaya-obl."
        },
        {
          "label": "Ставропольский край",
          "slug": "stavropolskiy-kray"
        },
        {
          "label": "Тамбовская обл.",
          "slug": "tambovskaya-obl."
        },
        {
          "label": "Татарстан",
          "slug": "tatarstan"
        },
        {
          "label": "Тверская обл.",
          "slug": "tverskaya-obl."
        },
        {
          "label": "Томская обл.",
          "slug": "tomskaya-obl."
        },
        {
          "label": "Тува (Тувинская Респ.)",
          "slug": "tuva-tuvinskaya-resp."
        },
        {
          "label": "Тульская обл.",
          "slug": "tulskaya-obl."
        },
        {
          "label": "Тюменская обл.",
          "slug": "tyumenskaya-obl."
        },
        {
          "label": "Удмуртия",
          "slug": "udmurtiya"
        },
        {
          "label": "Ульяновская обл.",
          "slug": "ulyanovskaya-obl."
        },
        {
          "label": "Уральская обл.",
          "slug": "uralskaya-obl."
        },
        {
          "label": "Хабаровский край",
          "slug": "habarovskiy-kray"
        },
        {
          "label": "Хакасия",
          "slug": "hakasiya"
        },
        {
          "label": "Ханты-Мансийский АО",
          "slug": "hanty-mansiyskiy-ao"
        },
        {
          "label": "Челябинская обл.",
          "slug": "chelyabinskaya-obl."
        },
        {
          "label": "Чечено-Ингушетия",
          "slug": "checheno-ingushetiya"
        },
        {
          "label": "Читинская обл.",
          "slug": "chitinskaya-obl."
        },
        {
          "label": "Чувашия",
          "slug": "chuvashiya"
        },
        {
          "label": "Чукотский АО",
          "slug": "chukotskiy-ao"
        },
        {
          "label": "Ямало-Ненецкий АО",
          "slug": "yamalo-neneckiy-ao"
        },
        {
          "label": "Ярославская обл.",
          "slug": "yaroslavskaya-obl."
        }
      ],
      wow: [
        {
          "label": "Москва и Московская обл.",
          "slug": "moskva-i-moskovskaya-obl.",
          "cities": [
            {
              "label": "Москва",
              "slug": "moskva"
            },
            {
              "label": "Абрамцево",
              "slug": "abramcevo"
            },
            {
              "label": "Алабино",
              "slug": "alabino"
            },
            {
              "label": "Апрелевка",
              "slug": "aprelevka"
            },
            {
              "label": "Архангельское",
              "slug": "arhangelskoe"
            },
            {
              "label": "Ашитково",
              "slug": "ashitkovo"
            },
            {
              "label": "Байконур",
              "slug": "baykonur"
            },
            {
              "label": "Бакшеево",
              "slug": "baksheevo"
            },
            {
              "label": "Балашиха",
              "slug": "balashiha"
            },
            {
              "label": "Барыбино",
              "slug": "barybino"
            },
            {
              "label": "Белоомут",
              "slug": "beloomut"
            },
            {
              "label": "Белые Столбы",
              "slug": "belye-stolby"
            },
            {
              "label": "Бородино",
              "slug": "borodino"
            },
            {
              "label": "Бронницы",
              "slug": "bronnicy"
            },
            {
              "label": "Быково",
              "slug": "bykovo"
            },
            {
              "label": "Валуево",
              "slug": "valuevo"
            },
            {
              "label": "Вербилки",
              "slug": "verbilki"
            },
            {
              "label": "Верея",
              "slug": "vereya"
            },
            {
              "label": "Видное",
              "slug": "vidnoe"
            },
            {
              "label": "Внуково",
              "slug": "vnukovo"
            },
            {
              "label": "Вождь Пролетариата",
              "slug": "vozhd-proletariata"
            },
            {
              "label": "Волоколамск",
              "slug": "volokolamsk"
            },
            {
              "label": "Вороново",
              "slug": "voronovo"
            },
            {
              "label": "Воскресенск",
              "slug": "voskresensk"
            },
            {
              "label": "Восточный",
              "slug": "vostochnyy"
            },
            {
              "label": "Востряково",
              "slug": "vostryakovo"
            },
            {
              "label": "Высоковск",
              "slug": "vysokovsk"
            },
            {
              "label": "Голицино",
              "slug": "golicino"
            },
            {
              "label": "Деденево",
              "slug": "dedenevo"
            },
            {
              "label": "Дедовск",
              "slug": "dedovsk"
            },
            {
              "label": "Джержинский",
              "slug": "dzherzhinskiy"
            },
            {
              "label": "Дмитров",
              "slug": "dmitrov"
            },
            {
              "label": "Долгопрудный",
              "slug": "dolgoprudnyy"
            },
            {
              "label": "Домодедово",
              "slug": "domodedovo"
            },
            {
              "label": "Дорохово",
              "slug": "dorohovo"
            },
            {
              "label": "Дрезна",
              "slug": "drezna"
            },
            {
              "label": "Дубки",
              "slug": "dubki"
            },
            {
              "label": "Дубна",
              "slug": "dubna"
            },
            {
              "label": "Егорьевск",
              "slug": "egorevsk"
            },
            {
              "label": "Железнодорожный",
              "slug": "zheleznodorozhnyy"
            },
            {
              "label": "Жилево",
              "slug": "zhilevo"
            },
            {
              "label": "Жуковский",
              "slug": "zhukovskiy"
            },
            {
              "label": "Загорск",
              "slug": "zagorsk"
            },
            {
              "label": "Загорянский",
              "slug": "zagoryanskiy"
            },
            {
              "label": "Запрудная",
              "slug": "zaprudnaya"
            },
            {
              "label": "Зарайск",
              "slug": "zaraysk"
            },
            {
              "label": "Звенигород",
              "slug": "zvenigorod"
            },
            {
              "label": "Зеленоград",
              "slug": "zelenograd"
            },
            {
              "label": "Ивантеевка",
              "slug": "ivanteevka"
            },
            {
              "label": "Икша",
              "slug": "iksha"
            },
            {
              "label": "Ильинский",
              "slug": "ilinskiy"
            },
            {
              "label": "Истра",
              "slug": "istra"
            },
            {
              "label": "Калининград",
              "slug": "kaliningrad"
            },
            {
              "label": "Кашира",
              "slug": "kashira"
            },
            {
              "label": "Керва",
              "slug": "kerva"
            },
            {
              "label": "Климовск",
              "slug": "klimovsk"
            },
            {
              "label": "Клин",
              "slug": "klin"
            },
            {
              "label": "Клязьма",
              "slug": "klyazma"
            },
            {
              "label": "Кожино",
              "slug": "kozhino"
            },
            {
              "label": "Кокошкино",
              "slug": "kokoshkino"
            },
            {
              "label": "Коломна",
              "slug": "kolomna"
            },
            {
              "label": "Колюбакино",
              "slug": "kolyubakino"
            },
            {
              "label": "Королев",
              "slug": "korolev"
            },
            {
              "label": "Косино",
              "slug": "kosino"
            },
            {
              "label": "Котельники",
              "slug": "kotelniki"
            },
            {
              "label": "Красково",
              "slug": "kraskovo"
            },
            {
              "label": "Красноармейск",
              "slug": "krasnoarmeysk"
            },
            {
              "label": "Красногорск",
              "slug": "krasnogorsk"
            },
            {
              "label": "Краснозаводск",
              "slug": "krasnozavodsk"
            },
            {
              "label": "Краснознаменск",
              "slug": "krasnoznamensk"
            },
            {
              "label": "Красный Ткач",
              "slug": "krasnyy-tkach"
            },
            {
              "label": "Крюково",
              "slug": "kryukovo"
            },
            {
              "label": "Кубинка",
              "slug": "kubinka"
            },
            {
              "label": "Купавна",
              "slug": "kupavna"
            },
            {
              "label": "Куровское",
              "slug": "kurovskoe"
            },
            {
              "label": "Лесной Городок",
              "slug": "lesnoy-gorodok"
            },
            {
              "label": "Ликино-Дулево",
              "slug": "likino-dulevo"
            },
            {
              "label": "Лобня",
              "slug": "lobnya"
            },
            {
              "label": "Лопатинский",
              "slug": "lopatinskiy"
            },
            {
              "label": "Лосино-Петровский",
              "slug": "losino-petrovskiy"
            },
            {
              "label": "Лотошино",
              "slug": "lotoshino"
            },
            {
              "label": "Лукино",
              "slug": "lukino"
            },
            {
              "label": "Луховицы",
              "slug": "luhovicy"
            },
            {
              "label": "Лыткарино",
              "slug": "lytkarino"
            },
            {
              "label": "Львовский",
              "slug": "lvovskiy"
            },
            {
              "label": "Люберцы",
              "slug": "lyubercy"
            },
            {
              "label": "Малаховка",
              "slug": "malahovka"
            },
            {
              "label": "Михайловское",
              "slug": "mihaylovskoe"
            },
            {
              "label": "Михнево",
              "slug": "mihnevo"
            },
            {
              "label": "Можайск",
              "slug": "mozhaysk"
            },
            {
              "label": "Монино",
              "slug": "monino"
            },
            {
              "label": "Муханово",
              "slug": "muhanovo"
            },
            {
              "label": "Мытищи",
              "slug": "mytishchi"
            },
            {
              "label": "Нарофоминск",
              "slug": "narofominsk"
            },
            {
              "label": "Нахабино",
              "slug": "nahabino"
            },
            {
              "label": "Некрасовка",
              "slug": "nekrasovka"
            },
            {
              "label": "Немчиновка",
              "slug": "nemchinovka"
            },
            {
              "label": "Новобратцевский",
              "slug": "novobratcevskiy"
            },
            {
              "label": "Новоподрезково",
              "slug": "novopodrezkovo"
            },
            {
              "label": "Ногинск",
              "slug": "noginsk"
            },
            {
              "label": "Обухово",
              "slug": "obuhovo"
            },
            {
              "label": "Одинцово",
              "slug": "odincovo"
            },
            {
              "label": "Ожерелье",
              "slug": "ozherele"
            },
            {
              "label": "Озеры",
              "slug": "ozery"
            },
            {
              "label": "Октябрьский",
              "slug": "oktyabrskiy"
            },
            {
              "label": "Опалиха",
              "slug": "opaliha"
            },
            {
              "label": "Орехово-Зуево",
              "slug": "orehovo-zuevo"
            },
            {
              "label": "Павловский Посад",
              "slug": "pavlovskiy-posad"
            },
            {
              "label": "Первомайский",
              "slug": "pervomayskiy"
            },
            {
              "label": "Пески",
              "slug": "peski"
            },
            {
              "label": "Пироговский",
              "slug": "pirogovskiy"
            },
            {
              "label": "Подольск",
              "slug": "podolsk"
            },
            {
              "label": "Полушкино",
              "slug": "polushkino"
            },
            {
              "label": "Правдинский",
              "slug": "pravdinskiy"
            },
            {
              "label": "Привокзальный",
              "slug": "privokzalnyy"
            },
            {
              "label": "Пролетарский",
              "slug": "proletarskiy"
            },
            {
              "label": "Протвино",
              "slug": "protvino"
            },
            {
              "label": "Пушкино",
              "slug": "pushkino"
            },
            {
              "label": "Пущино",
              "slug": "pushchino"
            },
            {
              "label": "Радовицкий",
              "slug": "radovickiy"
            },
            {
              "label": "Раменское",
              "slug": "ramenskoe"
            },
            {
              "label": "Реутов",
              "slug": "reutov"
            },
            {
              "label": "Решетниково",
              "slug": "reshetnikovo"
            },
            {
              "label": "Родники",
              "slug": "rodniki"
            },
            {
              "label": "Рошаль",
              "slug": "roshal"
            },
            {
              "label": "Рублево",
              "slug": "rublevo"
            },
            {
              "label": "Руза",
              "slug": "ruza"
            },
            {
              "label": "Салтыковка",
              "slug": "saltykovka"
            },
            {
              "label": "Северный",
              "slug": "severnyy"
            },
            {
              "label": "Сергиев Посад",
              "slug": "sergiev-posad"
            },
            {
              "label": "Серебряные Пруды",
              "slug": "serebryanye-prudy"
            },
            {
              "label": "Серпухов",
              "slug": "serpuhov"
            },
            {
              "label": "Солнечногорск",
              "slug": "solnechnogorsk"
            },
            {
              "label": "Солнцево",
              "slug": "solncevo"
            },
            {
              "label": "Софрино",
              "slug": "sofrino"
            },
            {
              "label": "Старая Купавна",
              "slug": "staraya-kupavna"
            },
            {
              "label": "Старбеево",
              "slug": "starbeevo"
            },
            {
              "label": "Ступино",
              "slug": "stupino"
            },
            {
              "label": "Сходня",
              "slug": "shodnya"
            },
            {
              "label": "Талдом",
              "slug": "taldom"
            },
            {
              "label": "Текстильщик",
              "slug": "tekstilshchik"
            },
            {
              "label": "Темпы",
              "slug": "tempy"
            },
            {
              "label": "Тишково",
              "slug": "tishkovo"
            },
            {
              "label": "Томилино",
              "slug": "tomilino"
            },
            {
              "label": "Троицк",
              "slug": "troick"
            },
            {
              "label": "Туголесский Бор",
              "slug": "tugolesskiy-bor"
            },
            {
              "label": "Тучково",
              "slug": "tuchkovo"
            },
            {
              "label": "Уваровка",
              "slug": "uvarovka"
            },
            {
              "label": "Удельная",
              "slug": "udelnaya"
            },
            {
              "label": "Успенское",
              "slug": "uspenskoe"
            },
            {
              "label": "Фирсановка",
              "slug": "firsanovka"
            },
            {
              "label": "Фосфоритный",
              "slug": "fosforitnyy"
            },
            {
              "label": "Фрязино",
              "slug": "fryazino"
            },
            {
              "label": "Фряново",
              "slug": "fryanovo"
            },
            {
              "label": "Химки",
              "slug": "himki"
            },
            {
              "label": "Хорлово",
              "slug": "horlovo"
            },
            {
              "label": "Хотьково",
              "slug": "hotkovo"
            },
            {
              "label": "Черкизово",
              "slug": "cherkizovo"
            },
            {
              "label": "Черноголовка",
              "slug": "chernogolovka"
            },
            {
              "label": "Черусти",
              "slug": "cherusti"
            },
            {
              "label": "Чехов",
              "slug": "chehov"
            },
            {
              "label": "Шарапово",
              "slug": "sharapovo"
            },
            {
              "label": "Шатура",
              "slug": "shatura"
            },
            {
              "label": "Шатурторф",
              "slug": "shaturtorf"
            },
            {
              "label": "Шаховская",
              "slug": "shahovskaya"
            },
            {
              "label": "Шереметьевский",
              "slug": "sheremetevskiy"
            },
            {
              "label": "Щелково",
              "slug": "shchelkovo"
            },
            {
              "label": "Щербинка",
              "slug": "shcherbinka"
            },
            {
              "label": "Электрогорск",
              "slug": "elektrogorsk"
            },
            {
              "label": "Электросталь",
              "slug": "elektrostal"
            },
            {
              "label": "Электроугли",
              "slug": "elektrougli"
            },
            {
              "label": "Яхрома",
              "slug": "yahroma"
            }
          ]
        },
        {
          "label": "Санкт-Петербург и область",
          "slug": "sankt-peterburg-i-oblast",
          "cities": [
            {
              "label": "Санкт-Петербург",
              "slug": "sankt-peterburg"
            },
            {
              "label": "Александровская",
              "slug": "aleksandrovskaya"
            },
            {
              "label": "Бокситогорск",
              "slug": "boksitogorsk"
            },
            {
              "label": "Большая Ижора",
              "slug": "bolshaya-izhora"
            },
            {
              "label": "Будогощь",
              "slug": "budogoshch"
            },
            {
              "label": "Вознесенье",
              "slug": "voznesene"
            },
            {
              "label": "Волосово",
              "slug": "volosovo"
            },
            {
              "label": "Волхов",
              "slug": "volhov"
            },
            {
              "label": "Всеволожск",
              "slug": "vsevolozhsk"
            },
            {
              "label": "Выборг",
              "slug": "vyborg"
            },
            {
              "label": "Вырица",
              "slug": "vyrica"
            },
            {
              "label": "Высоцк",
              "slug": "vysock"
            },
            {
              "label": "Гатчина",
              "slug": "gatchina"
            },
            {
              "label": "Дружная Горка",
              "slug": "druzhnaya-gorka"
            },
            {
              "label": "Дубровка",
              "slug": "dubrovka"
            },
            {
              "label": "Ефимовский",
              "slug": "efimovskiy"
            },
            {
              "label": "Зеленогорск",
              "slug": "zelenogorsk"
            },
            {
              "label": "Ивангород",
              "slug": "ivangorod"
            },
            {
              "label": "Каменногорск",
              "slug": "kamennogorsk"
            },
            {
              "label": "Кикерино",
              "slug": "kikerino"
            },
            {
              "label": "Кингисепп",
              "slug": "kingisepp"
            },
            {
              "label": "Кириши",
              "slug": "kirishi"
            },
            {
              "label": "Кировск",
              "slug": "kirovsk"
            },
            {
              "label": "Кобринское",
              "slug": "kobrinskoe"
            },
            {
              "label": "Колпино",
              "slug": "kolpino"
            },
            {
              "label": "Коммунар",
              "slug": "kommunar"
            },
            {
              "label": "Кронштадт",
              "slug": "kronshtadt"
            },
            {
              "label": "Лисий Нос",
              "slug": "lisiy-nos"
            },
            {
              "label": "Лодейное Поле",
              "slug": "lodeynoe-pole"
            },
            {
              "label": "Ломоносов",
              "slug": "lomonosov"
            },
            {
              "label": "Луга",
              "slug": "luga"
            },
            {
              "label": "Павловск",
              "slug": "pavlovsk"
            },
            {
              "label": "Парголово",
              "slug": "pargolovo"
            },
            {
              "label": "Петродворец",
              "slug": "petrodvorec"
            },
            {
              "label": "Пикалёво",
              "slug": "pikalyovo"
            },
            {
              "label": "Подпорожье",
              "slug": "podporozhe"
            },
            {
              "label": "Приозерск",
              "slug": "priozersk"
            },
            {
              "label": "Пушкин",
              "slug": "pushkin"
            },
            {
              "label": "Сестрорецк",
              "slug": "sestroreck"
            },
            {
              "label": "Сланцы",
              "slug": "slancy"
            },
            {
              "label": "Сосновый Бор",
              "slug": "sosnovyy-bor"
            },
            {
              "label": "Тихвин",
              "slug": "tihvin"
            },
            {
              "label": "Тосно",
              "slug": "tosno"
            },
            {
              "label": "Шлиссельбург",
              "slug": "shlisselburg"
            }
          ]
        },
        {
          "label": "Адыгея",
          "slug": "adygeya",
          "cities": [
            {
              "label": "Адыгейск",
              "slug": "adygeysk"
            },
            {
              "label": "Майкоп",
              "slug": "maykop"
            }
          ]
        },
        {
          "label": "Алтайский край",
          "slug": "altayskiy-kray",
          "cities": [
            {
              "label": "Акташ",
              "slug": "aktash"
            },
            {
              "label": "Акутиха",
              "slug": "akutiha"
            },
            {
              "label": "Алейск",
              "slug": "aleysk"
            },
            {
              "label": "Алтайский",
              "slug": "altayskiy"
            },
            {
              "label": "Баево",
              "slug": "baevo"
            },
            {
              "label": "Барнаул",
              "slug": "barnaul"
            },
            {
              "label": "Белово",
              "slug": "belovo"
            },
            {
              "label": "Белокуриха",
              "slug": "belokuriha"
            },
            {
              "label": "Белоярск",
              "slug": "beloyarsk"
            },
            {
              "label": "Бийск",
              "slug": "biysk"
            },
            {
              "label": "Благовещенск",
              "slug": "blagoveshchensk"
            },
            {
              "label": "Боровлянка",
              "slug": "borovlyanka"
            },
            {
              "label": "Бурла",
              "slug": "burla"
            },
            {
              "label": "Бурсоль",
              "slug": "bursol"
            },
            {
              "label": "Волчиха",
              "slug": "volchiha"
            },
            {
              "label": "Горно-Алтайск",
              "slug": "gorno-altaysk"
            },
            {
              "label": "Горняк",
              "slug": "gornyak"
            },
            {
              "label": "Ельцовка",
              "slug": "elcovka"
            },
            {
              "label": "Залесово",
              "slug": "zalesovo"
            },
            {
              "label": "Заринск",
              "slug": "zarinsk"
            },
            {
              "label": "Заток",
              "slug": "zatok"
            },
            {
              "label": "Змеиногорск",
              "slug": "zmeinogorsk"
            },
            {
              "label": "Камень-на-Оби",
              "slug": "kamen-na-obi"
            },
            {
              "label": "Ключи",
              "slug": "klyuchi"
            },
            {
              "label": "Кош-Агач",
              "slug": "kosh-agach"
            },
            {
              "label": "Красногорское",
              "slug": "krasnogorskoe"
            },
            {
              "label": "Краснощеково",
              "slug": "krasnoshchekovo"
            },
            {
              "label": "Кулунда",
              "slug": "kulunda"
            },
            {
              "label": "Кытманово",
              "slug": "kytmanovo"
            },
            {
              "label": "Мамонтово",
              "slug": "mamontovo"
            },
            {
              "label": "Новичиха",
              "slug": "novichiha"
            },
            {
              "label": "Новоалтайск",
              "slug": "novoaltaysk"
            },
            {
              "label": "Онгудай",
              "slug": "onguday"
            },
            {
              "label": "Павловск",
              "slug": "pavlovsk"
            },
            {
              "label": "Петропавловское",
              "slug": "petropavlovskoe"
            },
            {
              "label": "Поспелиха",
              "slug": "pospeliha"
            },
            {
              "label": "Ребриха",
              "slug": "rebriha"
            },
            {
              "label": "Родино",
              "slug": "rodino"
            },
            {
              "label": "Рубцовск",
              "slug": "rubcovsk"
            },
            {
              "label": "Славгород",
              "slug": "slavgorod"
            },
            {
              "label": "Смоленское",
              "slug": "smolenskoe"
            },
            {
              "label": "Солонешное",
              "slug": "soloneshnoe"
            },
            {
              "label": "Солтон",
              "slug": "solton"
            },
            {
              "label": "Староаллейское",
              "slug": "staroalleyskoe"
            },
            {
              "label": "Табуны",
              "slug": "tabuny"
            },
            {
              "label": "Тальменка",
              "slug": "talmenka"
            },
            {
              "label": "Топчиха",
              "slug": "topchiha"
            },
            {
              "label": "Троицкое",
              "slug": "troickoe"
            },
            {
              "label": "Турочак",
              "slug": "turochak"
            },
            {
              "label": "Тюменцево",
              "slug": "tyumencevo"
            },
            {
              "label": "Угловское",
              "slug": "uglovskoe"
            },
            {
              "label": "Усть-Калманка",
              "slug": "ust-kalmanka"
            },
            {
              "label": "Усть-Кан",
              "slug": "ust-kan"
            },
            {
              "label": "Усть-Кокса",
              "slug": "ust-koksa"
            },
            {
              "label": "Усть-Улаган",
              "slug": "ust-ulagan"
            },
            {
              "label": "Усть-Чарышская Пристань",
              "slug": "ust-charyshskaya-pristan"
            },
            {
              "label": "Хабары",
              "slug": "habary"
            },
            {
              "label": "Целинное",
              "slug": "celinnoe"
            },
            {
              "label": "Чарышское",
              "slug": "charyshskoe"
            },
            {
              "label": "Шебалино",
              "slug": "shebalino"
            },
            {
              "label": "Шелаболиха",
              "slug": "shelaboliha"
            },
            {
              "label": "Шипуново",
              "slug": "shipunovo"
            }
          ]
        },
        {
          "label": "Амурская обл.",
          "slug": "amurskaya-obl.",
          "cities": [
            {
              "label": "Айгунь",
              "slug": "aygun"
            },
            {
              "label": "Архара",
              "slug": "arhara"
            },
            {
              "label": "Белогорск",
              "slug": "belogorsk"
            },
            {
              "label": "Благовещенск (Амурская обл.)",
              "slug": "blagoveshchensk-amurskaya-obl."
            },
            {
              "label": "Бурея",
              "slug": "bureya"
            },
            {
              "label": "Возжаевка",
              "slug": "vozzhaevka"
            },
            {
              "label": "Екатеринославка",
              "slug": "ekaterinoslavka"
            },
            {
              "label": "Ерофей Павлович",
              "slug": "erofey-pavlovich"
            },
            {
              "label": "Завитинск",
              "slug": "zavitinsk"
            },
            {
              "label": "Зея",
              "slug": "zeya"
            },
            {
              "label": "Златоустовск",
              "slug": "zlatoustovsk"
            },
            {
              "label": "Ивановка",
              "slug": "ivanovka"
            },
            {
              "label": "Коболдо",
              "slug": "koboldo"
            },
            {
              "label": "Магдагачи",
              "slug": "magdagachi"
            },
            {
              "label": "Новобурейский",
              "slug": "novobureyskiy"
            },
            {
              "label": "Поярково",
              "slug": "poyarkovo"
            },
            {
              "label": "Райчихинск",
              "slug": "raychihinsk"
            },
            {
              "label": "Ромны",
              "slug": "romny"
            },
            {
              "label": "Свободный",
              "slug": "svobodnyy"
            },
            {
              "label": "Серышево",
              "slug": "seryshevo"
            },
            {
              "label": "Сковородино",
              "slug": "skovorodino"
            },
            {
              "label": "Стойба",
              "slug": "stoyba"
            },
            {
              "label": "Тамбовка",
              "slug": "tambovka"
            },
            {
              "label": "Тында",
              "slug": "tynda"
            },
            {
              "label": "Шимановск",
              "slug": "shimanovsk"
            },
            {
              "label": "Экимчан",
              "slug": "ekimchan"
            },
            {
              "label": "Ядрино",
              "slug": "yadrino"
            }
          ]
        },
        {
          "label": "Архангельская обл.",
          "slug": "arhangelskaya-obl.",
          "cities": [
            {
              "label": "Амдерма",
              "slug": "amderma"
            },
            {
              "label": "Архангельск",
              "slug": "arhangelsk"
            },
            {
              "label": "Березник",
              "slug": "bereznik"
            },
            {
              "label": "Вельск",
              "slug": "velsk"
            },
            {
              "label": "Верхняя Тойма",
              "slug": "verhnyaya-toyma"
            },
            {
              "label": "Волошка",
              "slug": "voloshka"
            },
            {
              "label": "Вычегодский",
              "slug": "vychegodskiy"
            },
            {
              "label": "Емца",
              "slug": "emca"
            },
            {
              "label": "Илеза",
              "slug": "ileza"
            },
            {
              "label": "Ильинско-Подомское",
              "slug": "ilinsko-podomskoe"
            },
            {
              "label": "Каргополь",
              "slug": "kargopol"
            },
            {
              "label": "Карпогоры",
              "slug": "karpogory"
            },
            {
              "label": "Кодино",
              "slug": "kodino"
            },
            {
              "label": "Коноша",
              "slug": "konosha"
            },
            {
              "label": "Коряжма",
              "slug": "koryazhma"
            },
            {
              "label": "Котлас",
              "slug": "kotlas"
            },
            {
              "label": "Красноборск",
              "slug": "krasnoborsk"
            },
            {
              "label": "Лешуконское",
              "slug": "leshukonskoe"
            },
            {
              "label": "Мезень",
              "slug": "mezen"
            },
            {
              "label": "Мирный",
              "slug": "mirnyy"
            },
            {
              "label": "Нарьян-Мар",
              "slug": "naryan-mar"
            },
            {
              "label": "Новодвинск",
              "slug": "novodvinsk"
            },
            {
              "label": "Няндома",
              "slug": "nyandoma"
            },
            {
              "label": "Онега",
              "slug": "onega"
            },
            {
              "label": "Пинега",
              "slug": "pinega"
            },
            {
              "label": "Плесецк",
              "slug": "pleseck"
            },
            {
              "label": "Северодвинск",
              "slug": "severodvinsk"
            },
            {
              "label": "Сольвычегодск",
              "slug": "solvychegodsk"
            },
            {
              "label": "Холмогоры",
              "slug": "holmogory"
            },
            {
              "label": "Шенкурск",
              "slug": "shenkursk"
            },
            {
              "label": "Яренск",
              "slug": "yarensk"
            }
          ]
        },
        {
          "label": "Астраханская обл.",
          "slug": "astrahanskaya-obl.",
          "cities": [
            {
              "label": "Астрахань",
              "slug": "astrahan"
            },
            {
              "label": "Ахтубинск",
              "slug": "ahtubinsk"
            },
            {
              "label": "Верхний Баскунчак",
              "slug": "verhniy-baskunchak"
            },
            {
              "label": "Володарский",
              "slug": "volodarskiy"
            },
            {
              "label": "Енотаевка",
              "slug": "enotaevka"
            },
            {
              "label": "Икряное",
              "slug": "ikryanoe"
            },
            {
              "label": "Камызяк",
              "slug": "kamyzyak"
            },
            {
              "label": "Капустин Яр",
              "slug": "kapustin-yar"
            },
            {
              "label": "Красный Яр",
              "slug": "krasnyy-yar"
            },
            {
              "label": "Лиман",
              "slug": "liman"
            },
            {
              "label": "Началово",
              "slug": "nachalovo"
            },
            {
              "label": "Харабали",
              "slug": "harabali"
            },
            {
              "label": "Черный Яр",
              "slug": "chernyy-yar"
            }
          ]
        },
        {
          "label": "Башкортостан(Башкирия)",
          "slug": "bashkortostan-bashkiriya",
          "cities": [
            {
              "label": "Аксаково",
              "slug": "aksakovo"
            },
            {
              "label": "Амзя",
              "slug": "amzya"
            },
            {
              "label": "Аскино",
              "slug": "askino"
            },
            {
              "label": "Баймак",
              "slug": "baymak"
            },
            {
              "label": "Бакалы",
              "slug": "bakaly"
            },
            {
              "label": "Белебей",
              "slug": "belebey"
            },
            {
              "label": "Белорецк",
              "slug": "beloreck"
            },
            {
              "label": "Бижбуляк",
              "slug": "bizhbulyak"
            },
            {
              "label": "Бирск",
              "slug": "birsk"
            },
            {
              "label": "Благовещенск",
              "slug": "blagoveshchensk"
            },
            {
              "label": "Большеустьикинское",
              "slug": "bolsheustikinskoe"
            },
            {
              "label": "Бураево",
              "slug": "buraevo"
            },
            {
              "label": "Верхнеяркеево",
              "slug": "verhneyarkeevo"
            },
            {
              "label": "Верхние Киги",
              "slug": "verhnie-kigi"
            },
            {
              "label": "Верхние Татышлы",
              "slug": "verhnie-tatyshly"
            },
            {
              "label": "Верхний Авзян",
              "slug": "verhniy-avzyan"
            },
            {
              "label": "Давлеканово",
              "slug": "davlekanovo"
            },
            {
              "label": "Дуван",
              "slug": "duvan"
            },
            {
              "label": "Дюртюли",
              "slug": "dyurtyuli"
            },
            {
              "label": "Ермекеево",
              "slug": "ermekeevo"
            },
            {
              "label": "Ермолаево",
              "slug": "ermolaevo"
            },
            {
              "label": "Зилаир",
              "slug": "zilair"
            },
            {
              "label": "Зирган",
              "slug": "zirgan"
            },
            {
              "label": "Иглино",
              "slug": "iglino"
            },
            {
              "label": "Инзер",
              "slug": "inzer"
            },
            {
              "label": "Исянгулово",
              "slug": "isyangulovo"
            },
            {
              "label": "Ишимбай",
              "slug": "ishimbay"
            },
            {
              "label": "Кананикольское",
              "slug": "kananikolskoe"
            },
            {
              "label": "Кандры",
              "slug": "kandry"
            },
            {
              "label": "Караидель",
              "slug": "karaidel"
            },
            {
              "label": "Караидельский",
              "slug": "karaidelskiy"
            },
            {
              "label": "Киргиз-Мияки",
              "slug": "kirgiz-miyaki"
            },
            {
              "label": "Красноусольский",
              "slug": "krasnousolskiy"
            },
            {
              "label": "Кумертау",
              "slug": "kumertau"
            },
            {
              "label": "Кушнаренково",
              "slug": "kushnarenkovo"
            },
            {
              "label": "Малояз",
              "slug": "maloyaz"
            },
            {
              "label": "Мелеуз",
              "slug": "meleuz"
            },
            {
              "label": "Месягутово",
              "slug": "mesyagutovo"
            },
            {
              "label": "Мраково",
              "slug": "mrakovo"
            },
            {
              "label": "Нефтекамск",
              "slug": "neftekamsk"
            },
            {
              "label": "Октябрьский",
              "slug": "oktyabrskiy"
            },
            {
              "label": "Раевский",
              "slug": "raevskiy"
            },
            {
              "label": "Салават",
              "slug": "salavat"
            },
            {
              "label": "Сибай",
              "slug": "sibay"
            },
            {
              "label": "Старобалтачево",
              "slug": "starobaltachevo"
            },
            {
              "label": "Старосубхангулово",
              "slug": "starosubhangulovo"
            },
            {
              "label": "Стерлибашево",
              "slug": "sterlibashevo"
            },
            {
              "label": "Стерлитамак",
              "slug": "sterlitamak"
            },
            {
              "label": "Туймазы",
              "slug": "tuymazy"
            },
            {
              "label": "Уфа",
              "slug": "ufa"
            },
            {
              "label": "Учалы",
              "slug": "uchaly"
            },
            {
              "label": "Федоровка",
              "slug": "fedorovka"
            },
            {
              "label": "Чекмагуш",
              "slug": "chekmagush"
            },
            {
              "label": "Чишмы",
              "slug": "chishmy"
            },
            {
              "label": "Шаран",
              "slug": "sharan"
            },
            {
              "label": "Янаул",
              "slug": "yanaul"
            }
          ]
        },
        {
          "label": "Белгородская обл.",
          "slug": "belgorodskaya-obl.",
          "cities": [
            {
              "label": "Алексеевка",
              "slug": "alekseevka"
            },
            {
              "label": "Белгород",
              "slug": "belgorod"
            },
            {
              "label": "Борисовка",
              "slug": "borisovka"
            },
            {
              "label": "Валуйки",
              "slug": "valuyki"
            },
            {
              "label": "Вейделевка",
              "slug": "veydelevka"
            },
            {
              "label": "Волоконовка",
              "slug": "volokonovka"
            },
            {
              "label": "Грайворон",
              "slug": "grayvoron"
            },
            {
              "label": "Губкин",
              "slug": "gubkin"
            },
            {
              "label": "Ивня",
              "slug": "ivnya"
            },
            {
              "label": "Короча",
              "slug": "korocha"
            },
            {
              "label": "Красногвардейское",
              "slug": "krasnogvardeyskoe"
            },
            {
              "label": "Новый Оскол",
              "slug": "novyy-oskol"
            },
            {
              "label": "Ракитное",
              "slug": "rakitnoe"
            },
            {
              "label": "Ровеньки",
              "slug": "rovenki"
            },
            {
              "label": "Старый Оскол",
              "slug": "staryy-oskol"
            },
            {
              "label": "Строитель",
              "slug": "stroitel"
            },
            {
              "label": "Чернянка",
              "slug": "chernyanka"
            },
            {
              "label": "Шебекино",
              "slug": "shebekino"
            }
          ]
        },
        {
          "label": "Брянская обл.",
          "slug": "bryanskaya-obl.",
          "cities": [
            {
              "label": "Алтухово",
              "slug": "altuhovo"
            },
            {
              "label": "Белая Березка",
              "slug": "belaya-berezka"
            },
            {
              "label": "Белые Берега",
              "slug": "belye-berega"
            },
            {
              "label": "Большое Полпино",
              "slug": "bolshoe-polpino"
            },
            {
              "label": "Брянск",
              "slug": "bryansk"
            },
            {
              "label": "Бытошь",
              "slug": "bytosh"
            },
            {
              "label": "Выгоничи",
              "slug": "vygonichi"
            },
            {
              "label": "Вышков",
              "slug": "vyshkov"
            },
            {
              "label": "Гордеевка",
              "slug": "gordeevka"
            },
            {
              "label": "Дубровка",
              "slug": "dubrovka"
            },
            {
              "label": "Дятьково",
              "slug": "dyatkovo"
            },
            {
              "label": "Жирятино",
              "slug": "zhiryatino"
            },
            {
              "label": "Жуковка",
              "slug": "zhukovka"
            },
            {
              "label": "Злынка",
              "slug": "zlynka"
            },
            {
              "label": "Ивот",
              "slug": "ivot"
            },
            {
              "label": "Карачев",
              "slug": "karachev"
            },
            {
              "label": "Клетня",
              "slug": "kletnya"
            },
            {
              "label": "Климово",
              "slug": "klimovo"
            },
            {
              "label": "Клинцы",
              "slug": "klincy"
            },
            {
              "label": "Кокаревка",
              "slug": "kokarevka"
            },
            {
              "label": "Комаричи",
              "slug": "komarichi"
            },
            {
              "label": "Красная Гора",
              "slug": "krasnaya-gora"
            },
            {
              "label": "Локоть",
              "slug": "lokot"
            },
            {
              "label": "Мглин",
              "slug": "mglin"
            },
            {
              "label": "Навля",
              "slug": "navlya"
            },
            {
              "label": "Новозыбков",
              "slug": "novozybkov"
            },
            {
              "label": "Погар",
              "slug": "pogar"
            },
            {
              "label": "Почеп",
              "slug": "pochep"
            },
            {
              "label": "Ржаница",
              "slug": "rzhanica"
            },
            {
              "label": "Рогнедино",
              "slug": "rognedino"
            },
            {
              "label": "Севск",
              "slug": "sevsk"
            },
            {
              "label": "Стародуб",
              "slug": "starodub"
            },
            {
              "label": "Суземка",
              "slug": "suzemka"
            },
            {
              "label": "Сураж",
              "slug": "surazh"
            },
            {
              "label": "Трубчевск",
              "slug": "trubchevsk"
            },
            {
              "label": "Унеча",
              "slug": "unecha"
            }
          ]
        },
        {
          "label": "Бурятия",
          "slug": "buryatiya",
          "cities": [
            {
              "label": "Бабушкин",
              "slug": "babushkin"
            },
            {
              "label": "Багдарин",
              "slug": "bagdarin"
            },
            {
              "label": "Баргузин",
              "slug": "barguzin"
            },
            {
              "label": "Баянгол",
              "slug": "bayangol"
            },
            {
              "label": "Бичура",
              "slug": "bichura"
            },
            {
              "label": "Выдрино",
              "slug": "vydrino"
            },
            {
              "label": "Гусиное Озеро",
              "slug": "gusinoe-ozero"
            },
            {
              "label": "Гусиноозерск",
              "slug": "gusinoozersk"
            },
            {
              "label": "Заиграево",
              "slug": "zaigraevo"
            },
            {
              "label": "Закаменск",
              "slug": "zakamensk"
            },
            {
              "label": "Иволгинск",
              "slug": "ivolginsk"
            },
            {
              "label": "Илька",
              "slug": "ilka"
            },
            {
              "label": "Кабанск",
              "slug": "kabansk"
            },
            {
              "label": "Каменск",
              "slug": "kamensk"
            },
            {
              "label": "Кижинга",
              "slug": "kizhinga"
            },
            {
              "label": "Курумкан",
              "slug": "kurumkan"
            },
            {
              "label": "Кырен",
              "slug": "kyren"
            },
            {
              "label": "Кяхта",
              "slug": "kyahta"
            },
            {
              "label": "Монды",
              "slug": "mondy"
            },
            {
              "label": "Мухоршибирь",
              "slug": "muhorshibir"
            },
            {
              "label": "Нижнеангарск",
              "slug": "nizhneangarsk"
            },
            {
              "label": "Орлик",
              "slug": "orlik"
            },
            {
              "label": "Петропавловка",
              "slug": "petropavlovka"
            },
            {
              "label": "Романовка",
              "slug": "romanovka"
            },
            {
              "label": "Северобайкальск",
              "slug": "severobaykalsk"
            },
            {
              "label": "Селенгинск",
              "slug": "selenginsk"
            },
            {
              "label": "Сосново-Озерское",
              "slug": "sosnovo-ozerskoe"
            },
            {
              "label": "Такси��о",
              "slug": "taksio"
            },
            {
              "label": "Турунтаево",
              "slug": "turuntaevo"
            },
            {
              "label": "Улан-Удэ",
              "slug": "ulan-ude"
            },
            {
              "label": "Хоринск",
              "slug": "horinsk"
            }
          ]
        },
        {
          "label": "Владимирская обл.",
          "slug": "vladimirskaya-obl.",
          "cities": [
            {
              "label": "Александров",
              "slug": "aleksandrov"
            },
            {
              "label": "Андреево",
              "slug": "andreevo"
            },
            {
              "label": "Анопино",
              "slug": "anopino"
            },
            {
              "label": "Бавлены",
              "slug": "bavleny"
            },
            {
              "label": "Балакирево",
              "slug": "balakirevo"
            },
            {
              "label": "Боголюбово",
              "slug": "bogolyubovo"
            },
            {
              "label": "Великодворский",
              "slug": "velikodvorskiy"
            },
            {
              "label": "Вербовский",
              "slug": "verbovskiy"
            },
            {
              "label": "Владимир",
              "slug": "vladimir"
            },
            {
              "label": "Вязники",
              "slug": "vyazniki"
            },
            {
              "label": "Городищи",
              "slug": "gorodishchi"
            },
            {
              "label": "Гороховец",
              "slug": "gorohovec"
            },
            {
              "label": "Гусевский",
              "slug": "gusevskiy"
            },
            {
              "label": "Гусь Хрустальный",
              "slug": "gus-hrustalnyy"
            },
            {
              "label": "Золотково",
              "slug": "zolotkovo"
            },
            {
              "label": "Иванищи",
              "slug": "ivanishchi"
            },
            {
              "label": "Камешково",
              "slug": "kameshkovo"
            },
            {
              "label": "Карабаново",
              "slug": "karabanovo"
            },
            {
              "label": "Киржач",
              "slug": "kirzhach"
            },
            {
              "label": "Ковров",
              "slug": "kovrov"
            },
            {
              "label": "Кольчугино",
              "slug": "kolchugino"
            },
            {
              "label": "Красная Горбатка",
              "slug": "krasnaya-gorbatka"
            },
            {
              "label": "Меленки",
              "slug": "melenki"
            },
            {
              "label": "Муром",
              "slug": "murom"
            },
            {
              "label": "Петушки",
              "slug": "petushki"
            },
            {
              "label": "Покров",
              "slug": "pokrov"
            },
            {
              "label": "Собинка",
              "slug": "sobinka"
            },
            {
              "label": "Судогда",
              "slug": "sudogda"
            },
            {
              "label": "Суздаль",
              "slug": "suzdal"
            },
            {
              "label": "Юрьев-Польский",
              "slug": "yurev-polskiy"
            }
          ]
        },
        {
          "label": "Волгоградская обл.",
          "slug": "volgogradskaya-obl.",
          "cities": [
            {
              "label": "Алексеевская",
              "slug": "alekseevskaya"
            },
            {
              "label": "Алущевск",
              "slug": "alushchevsk"
            },
            {
              "label": "Быково",
              "slug": "bykovo"
            },
            {
              "label": "Волгоград",
              "slug": "volgograd"
            },
            {
              "label": "Волжский",
              "slug": "volzhskiy"
            },
            {
              "label": "Городище",
              "slug": "gorodishche"
            },
            {
              "label": "Дубовка",
              "slug": "dubovka"
            },
            {
              "label": "Елань",
              "slug": "elan"
            },
            {
              "label": "Жирновск",
              "slug": "zhirnovsk"
            },
            {
              "label": "Иловля",
              "slug": "ilovlya"
            },
            {
              "label": "Калач-на-Дону",
              "slug": "kalach-na-donu"
            },
            {
              "label": "Камышин",
              "slug": "kamyshin"
            },
            {
              "label": "Кириллов",
              "slug": "kirillov"
            },
            {
              "label": "Клетский",
              "slug": "kletskiy"
            },
            {
              "label": "Котельниково",
              "slug": "kotelnikovo"
            },
            {
              "label": "Котово",
              "slug": "kotovo"
            },
            {
              "label": "Кумылженская",
              "slug": "kumylzhenskaya"
            },
            {
              "label": "Ленинск",
              "slug": "leninsk"
            },
            {
              "label": "Михайловка",
              "slug": "mihaylovka"
            },
            {
              "label": "Нехаевский",
              "slug": "nehaevskiy"
            },
            {
              "label": "Николаевск",
              "slug": "nikolaevsk"
            },
            {
              "label": "Новоаннинский",
              "slug": "novoanninskiy"
            },
            {
              "label": "Новониколаевский",
              "slug": "novonikolaevskiy"
            },
            {
              "label": "Ольховка",
              "slug": "olhovka"
            },
            {
              "label": "Палласовка",
              "slug": "pallasovka"
            },
            {
              "label": "Рудня",
              "slug": "rudnya"
            },
            {
              "label": "Светлый Яр",
              "slug": "svetlyy-yar"
            },
            {
              "label": "Серафимович",
              "slug": "serafimovich"
            },
            {
              "label": "Средняя Ахтуба",
              "slug": "srednyaya-ahtuba"
            },
            {
              "label": "Сталинград",
              "slug": "stalingrad"
            },
            {
              "label": "Старая Полтавка",
              "slug": "staraya-poltavka"
            },
            {
              "label": "Суровикино",
              "slug": "surovikino"
            },
            {
              "label": "Урюпинск",
              "slug": "uryupinsk"
            },
            {
              "label": "Фролово",
              "slug": "frolovo"
            },
            {
              "label": "Чернышковский",
              "slug": "chernyshkovskiy"
            }
          ]
        },
        {
          "label": "Вологодская обл.",
          "slug": "vologodskaya-obl.",
          "cities": [
            {
              "label": "Бабаево",
              "slug": "babaevo"
            },
            {
              "label": "Белозерск",
              "slug": "belozersk"
            },
            {
              "label": "Великий Устюг",
              "slug": "velikiy-ustyug"
            },
            {
              "label": "Верховажье",
              "slug": "verhovazhe"
            },
            {
              "label": "Вожега",
              "slug": "vozhega"
            },
            {
              "label": "Вологда",
              "slug": "vologda"
            },
            {
              "label": "Вохтога",
              "slug": "vohtoga"
            },
            {
              "label": "Вытегра",
              "slug": "vytegra"
            },
            {
              "label": "Грязовец",
              "slug": "gryazovec"
            },
            {
              "label": "Кадников",
              "slug": "kadnikov"
            },
            {
              "label": "Кадуй",
              "slug": "kaduy"
            },
            {
              "label": "Кичменгский Городок",
              "slug": "kichmengskiy-gorodok"
            },
            {
              "label": "Липин Бор",
              "slug": "lipin-bor"
            },
            {
              "label": "Никольск",
              "slug": "nikolsk"
            },
            {
              "label": "Нюксеница",
              "slug": "nyuksenica"
            },
            {
              "label": "Сокол",
              "slug": "sokol"
            },
            {
              "label": "Сямжа",
              "slug": "syamzha"
            },
            {
              "label": "Тарногский Городок",
              "slug": "tarnogskiy-gorodok"
            },
            {
              "label": "Тотьма",
              "slug": "totma"
            },
            {
              "label": "Устюжна",
              "slug": "ustyuzhna"
            },
            {
              "label": "Харовск",
              "slug": "harovsk"
            },
            {
              "label": "Чагода",
              "slug": "chagoda"
            },
            {
              "label": "Череповец",
              "slug": "cherepovec"
            },
            {
              "label": "Шексна",
              "slug": "sheksna"
            },
            {
              "label": "Шуйское",
              "slug": "shuyskoe"
            }
          ]
        },
        {
          "label": "Воронежская обл.",
          "slug": "voronezhskaya-obl.",
          "cities": [
            {
              "label": "Анна",
              "slug": "anna"
            },
            {
              "label": "Бобров",
              "slug": "bobrov"
            },
            {
              "label": "Богучар",
              "slug": "boguchar"
            },
            {
              "label": "Борисоглебск",
              "slug": "borisoglebsk"
            },
            {
              "label": "Бутурлиновка",
              "slug": "buturlinovka"
            },
            {
              "label": "Верхний Мамон",
              "slug": "verhniy-mamon"
            },
            {
              "label": "Верхняя Хава",
              "slug": "verhnyaya-hava"
            },
            {
              "label": "Воробьевка",
              "slug": "vorobevka"
            },
            {
              "label": "Воронеж",
              "slug": "voronezh"
            },
            {
              "label": "Грибановский",
              "slug": "gribanovskiy"
            },
            {
              "label": "Давыдовка",
              "slug": "davydovka"
            },
            {
              "label": "Елань-Коленовский",
              "slug": "elan-kolenovskiy"
            },
            {
              "label": "Калач",
              "slug": "kalach"
            },
            {
              "label": "Кантемировка",
              "slug": "kantemirovka"
            },
            {
              "label": "Лиски",
              "slug": "liski"
            },
            {
              "label": "Нижнедевицк",
              "slug": "nizhnedevick"
            },
            {
              "label": "Новая Усмань",
              "slug": "novaya-usman"
            },
            {
              "label": "Новохоперск",
              "slug": "novohopersk"
            },
            {
              "label": "Ольховатка",
              "slug": "olhovatka"
            },
            {
              "label": "Острогожск",
              "slug": "ostrogozhsk"
            },
            {
              "label": "Павловск",
              "slug": "pavlovsk"
            },
            {
              "label": "Панино",
              "slug": "panino"
            },
            {
              "label": "Петропавловка",
              "slug": "petropavlovka"
            },
            {
              "label": "Поворино",
              "slug": "povorino"
            },
            {
              "label": "Подгоренский",
              "slug": "podgorenskiy"
            },
            {
              "label": "Рамонь",
              "slug": "ramon"
            },
            {
              "label": "Репьевка",
              "slug": "repevka"
            },
            {
              "label": "Россошь",
              "slug": "rossosh"
            },
            {
              "label": "Семилуки",
              "slug": "semiluki"
            },
            {
              "label": "Таловая",
              "slug": "talovaya"
            },
            {
              "label": "Терновка",
              "slug": "ternovka"
            },
            {
              "label": "Хохольский",
              "slug": "hoholskiy"
            },
            {
              "label": "Эртиль",
              "slug": "ertil"
            },
            {
              "label": "нововоронеж",
              "slug": "novovoronezh"
            }
          ]
        },
        {
          "label": "Дагестан",
          "slug": "dagestan",
          "cities": [
            {
              "label": "Агвали",
              "slug": "agvali"
            },
            {
              "label": "Акуша",
              "slug": "akusha"
            },
            {
              "label": "Ахты",
              "slug": "ahty"
            },
            {
              "label": "Ачису",
              "slug": "achisu"
            },
            {
              "label": "Бабаюрт",
              "slug": "babayurt"
            },
            {
              "label": "Бежта",
              "slug": "bezhta"
            },
            {
              "label": "Ботлих",
              "slug": "botlih"
            },
            {
              "label": "Буйнакск",
              "slug": "buynaksk"
            },
            {
              "label": "Вачи",
              "slug": "vachi"
            },
            {
              "label": "Гергебиль",
              "slug": "gergebil"
            },
            {
              "label": "Гуниб",
              "slug": "gunib"
            },
            {
              "label": "Дагестанские Огни",
              "slug": "dagestanskie-ogni"
            },
            {
              "label": "Дербент",
              "slug": "derbent"
            },
            {
              "label": "Дылым",
              "slug": "dylym"
            },
            {
              "label": "Ершовка",
              "slug": "ershovka"
            },
            {
              "label": "Избербаш",
              "slug": "izberbash"
            },
            {
              "label": "Карабудахкент",
              "slug": "karabudahkent"
            },
            {
              "label": "Карата",
              "slug": "karata"
            },
            {
              "label": "Каспийск",
              "slug": "kaspiysk"
            },
            {
              "label": "Касумкент",
              "slug": "kasumkent"
            },
            {
              "label": "Кизилюрт",
              "slug": "kizilyurt"
            },
            {
              "label": "Кизляр",
              "slug": "kizlyar"
            },
            {
              "label": "Кочубей",
              "slug": "kochubey"
            },
            {
              "label": "Кумух",
              "slug": "kumuh"
            },
            {
              "label": "Курах",
              "slug": "kurah"
            },
            {
              "label": "Магарамкент",
              "slug": "magaramkent"
            },
            {
              "label": "Маджалис",
              "slug": "madzhalis"
            },
            {
              "label": "Махачкала",
              "slug": "mahachkala"
            },
            {
              "label": "Мехельта",
              "slug": "mehelta"
            },
            {
              "label": "Новолакское",
              "slug": "novolakskoe"
            },
            {
              "label": "Рутул",
              "slug": "rutul"
            },
            {
              "label": "Советское",
              "slug": "sovetskoe"
            },
            {
              "label": "Тарумовка",
              "slug": "tarumovka"
            },
            {
              "label": "Терекли-Мектеб",
              "slug": "terekli-mekteb"
            },
            {
              "label": "Тлярата",
              "slug": "tlyarata"
            },
            {
              "label": "Тпиг",
              "slug": "tpig"
            },
            {
              "label": "Уркарах",
              "slug": "urkarah"
            },
            {
              "label": "Хасавюрт",
              "slug": "hasavyurt"
            },
            {
              "label": "Хив",
              "slug": "hiv"
            },
            {
              "label": "Хунзах",
              "slug": "hunzah"
            },
            {
              "label": "Цуриб",
              "slug": "curib"
            },
            {
              "label": "Южно-Сухокумск",
              "slug": "yuzhno-suhokumsk"
            }
          ]
        },
        {
          "label": "Еврейская обл.",
          "slug": "evreyskaya-obl.",
          "cities": [
            {
              "label": "Биробиджан",
              "slug": "birobidzhan"
            }
          ]
        },
        {
          "label": "Ивановская обл.",
          "slug": "ivanovskaya-obl.",
          "cities": [
            {
              "label": "Архиповка",
              "slug": "arhipovka"
            },
            {
              "label": "Верхний Ландех",
              "slug": "verhniy-landeh"
            },
            {
              "label": "Вичуга",
              "slug": "vichuga"
            },
            {
              "label": "Гаврилов Посад",
              "slug": "gavrilov-posad"
            },
            {
              "label": "Долматовский",
              "slug": "dolmatovskiy"
            },
            {
              "label": "Дуляпино",
              "slug": "dulyapino"
            },
            {
              "label": "Заволжск",
              "slug": "zavolzhsk"
            },
            {
              "label": "Заречный",
              "slug": "zarechnyy"
            },
            {
              "label": "Иваново",
              "slug": "ivanovo"
            },
            {
              "label": "Иваньковский",
              "slug": "ivankovskiy"
            },
            {
              "label": "Ильинское-Хованское",
              "slug": "ilinskoe-hovanskoe"
            },
            {
              "label": "Каминский",
              "slug": "kaminskiy"
            },
            {
              "label": "Кинешма",
              "slug": "kineshma"
            },
            {
              "label": "Комсомольск",
              "slug": "komsomolsk"
            },
            {
              "label": "Кохма",
              "slug": "kohma"
            },
            {
              "label": "Лух",
              "slug": "luh"
            },
            {
              "label": "Палех",
              "slug": "paleh"
            },
            {
              "label": "Пестяки",
              "slug": "pestyaki"
            },
            {
              "label": "Приволжск",
              "slug": "privolzhsk"
            },
            {
              "label": "Пучеж",
              "slug": "puchezh"
            },
            {
              "label": "Родники",
              "slug": "rodniki"
            },
            {
              "label": "Савино",
              "slug": "savino"
            },
            {
              "label": "Сокольское",
              "slug": "sokolskoe"
            },
            {
              "label": "Тейково",
              "slug": "teykovo"
            },
            {
              "label": "Фурманов",
              "slug": "furmanov"
            },
            {
              "label": "Шуя",
              "slug": "shuya"
            },
            {
              "label": "Южа",
              "slug": "yuzha"
            },
            {
              "label": "Юрьевец",
              "slug": "yurevec"
            }
          ]
        },
        {
          "label": "Иркутская обл.",
          "slug": "irkutskaya-obl.",
          "cities": [
            {
              "label": "Алексеевск",
              "slug": "alekseevsk"
            },
            {
              "label": "Алзамай",
              "slug": "alzamay"
            },
            {
              "label": "Алыгжер",
              "slug": "alygzher"
            },
            {
              "label": "Ангарск",
              "slug": "angarsk"
            },
            {
              "label": "Артемовский",
              "slug": "artemovskiy"
            },
            {
              "label": "Атагай",
              "slug": "atagay"
            },
            {
              "label": "Байкал",
              "slug": "baykal"
            },
            {
              "label": "Байкальск",
              "slug": "baykalsk"
            },
            {
              "label": "Балаганск",
              "slug": "balagansk"
            },
            {
              "label": "Баяндай",
              "slug": "bayanday"
            },
            {
              "label": "Бирюсинск",
              "slug": "biryusinsk"
            },
            {
              "label": "Бодайбо",
              "slug": "bodaybo"
            },
            {
              "label": "Большая Речка",
              "slug": "bolshaya-rechka"
            },
            {
              "label": "Большой Луг",
              "slug": "bolshoy-lug"
            },
            {
              "label": "Бохан",
              "slug": "bohan"
            },
            {
              "label": "Братск",
              "slug": "bratsk"
            },
            {
              "label": "Видим",
              "slug": "vidim"
            },
            {
              "label": "Витимский",
              "slug": "vitimskiy"
            },
            {
              "label": "Вихоревка",
              "slug": "vihorevka"
            },
            {
              "label": "Еланцы",
              "slug": "elancy"
            },
            {
              "label": "Ербогачен",
              "slug": "erbogachen"
            },
            {
              "label": "Железногорск-Илимский",
              "slug": "zheleznogorsk-ilimskiy"
            },
            {
              "label": "Жигалово",
              "slug": "zhigalovo"
            },
            {
              "label": "Забитуй",
              "slug": "zabituy"
            },
            {
              "label": "Залари",
              "slug": "zalari"
            },
            {
              "label": "Звездный",
              "slug": "zvezdnyy"
            },
            {
              "label": "Зима",
              "slug": "zima"
            },
            {
              "label": "Иркутск",
              "slug": "irkutsk"
            },
            {
              "label": "Казачинское",
              "slug": "kazachinskoe"
            },
            {
              "label": "Качуг",
              "slug": "kachug"
            },
            {
              "label": "Квиток",
              "slug": "kvitok"
            },
            {
              "label": "Киренск",
              "slug": "kirensk"
            },
            {
              "label": "Куйтун",
              "slug": "kuytun"
            },
            {
              "label": "Култук",
              "slug": "kultuk"
            },
            {
              "label": "Кутулик",
              "slug": "kutulik"
            },
            {
              "label": "Мама",
              "slug": "mama"
            },
            {
              "label": "Нижнеудинск",
              "slug": "nizhneudinsk"
            },
            {
              "label": "Оса",
              "slug": "osa"
            },
            {
              "label": "Саянск",
              "slug": "sayansk"
            },
            {
              "label": "Слюдянка",
              "slug": "slyudyanka"
            },
            {
              "label": "Тайшет",
              "slug": "tayshet"
            },
            {
              "label": "Тулун",
              "slug": "tulun"
            },
            {
              "label": "Усолье-Сибирское",
              "slug": "usole-sibirskoe"
            },
            {
              "label": "Усть-Илимск",
              "slug": "ust-ilimsk"
            },
            {
              "label": "Усть-Кут",
              "slug": "ust-kut"
            },
            {
              "label": "Усть-Ордынский",
              "slug": "ust-ordynskiy"
            },
            {
              "label": "Усть-Уда",
              "slug": "ust-uda"
            },
            {
              "label": "Черемхово",
              "slug": "cheremhovo"
            },
            {
              "label": "Чунский",
              "slug": "chunskiy"
            },
            {
              "label": "Шелехов",
              "slug": "shelehov"
            }
          ]
        },
        {
          "label": "Кабардино-Балкария",
          "slug": "kabardino-balkariya",
          "cities": [
            {
              "label": "Баксан",
              "slug": "baksan"
            },
            {
              "label": "Майский",
              "slug": "mayskiy"
            },
            {
              "label": "Нальчик",
              "slug": "nalchik"
            },
            {
              "label": "Нарткала",
              "slug": "nartkala"
            },
            {
              "label": "Прохладный",
              "slug": "prohladnyy"
            },
            {
              "label": "Советское",
              "slug": "sovetskoe"
            },
            {
              "label": "Терек",
              "slug": "terek"
            },
            {
              "label": "Тырныауз",
              "slug": "tyrnyauz"
            },
            {
              "label": "Чегем-Первый",
              "slug": "chegem-pervyy"
            }
          ]
        },
        {
          "label": "Калининградская обл.",
          "slug": "kaliningradskaya-obl.",
          "cities": [
            {
              "label": "Багратионовск",
              "slug": "bagrationovsk"
            },
            {
              "label": "Балтийск",
              "slug": "baltiysk"
            },
            {
              "label": "Гвардейск",
              "slug": "gvardeysk"
            },
            {
              "label": "Гурьевск",
              "slug": "gurevsk"
            },
            {
              "label": "Гусев",
              "slug": "gusev"
            },
            {
              "label": "Железнодорожный",
              "slug": "zheleznodorozhnyy"
            },
            {
              "label": "Зеленоградск",
              "slug": "zelenogradsk"
            },
            {
              "label": "Знаменск",
              "slug": "znamensk"
            },
            {
              "label": "Кёнигсберг",
              "slug": "kyonigsberg"
            },
            {
              "label": "Калининград",
              "slug": "kaliningrad"
            },
            {
              "label": "Кенисберг",
              "slug": "kenisberg"
            },
            {
              "label": "Краснознаменск",
              "slug": "krasnoznamensk"
            },
            {
              "label": "Мамоново",
              "slug": "mamonovo"
            },
            {
              "label": "Неман",
              "slug": "neman"
            },
            {
              "label": "Нестеров",
              "slug": "nesterov"
            },
            {
              "label": "Озерск",
              "slug": "ozersk"
            },
            {
              "label": "Полесск",
              "slug": "polessk"
            },
            {
              "label": "Правдинск",
              "slug": "pravdinsk"
            },
            {
              "label": "Светлогорск",
              "slug": "svetlogorsk"
            },
            {
              "label": "Светлый",
              "slug": "svetlyy"
            },
            {
              "label": "Славск",
              "slug": "slavsk"
            },
            {
              "label": "Советск",
              "slug": "sovetsk"
            },
            {
              "label": "Черняховск",
              "slug": "chernyahovsk"
            }
          ]
        },
        {
          "label": "Калмыкия",
          "slug": "kalmykiya",
          "cities": [
            {
              "label": "Аршань",
              "slug": "arshan"
            },
            {
              "label": "Каспийский",
              "slug": "kaspiyskiy"
            },
            {
              "label": "Комсомольский",
              "slug": "komsomolskiy"
            },
            {
              "label": "Малые Дербеты",
              "slug": "malye-derbety"
            },
            {
              "label": "Приютное",
              "slug": "priyutnoe"
            },
            {
              "label": "Советское",
              "slug": "sovetskoe"
            },
            {
              "label": "Троицкое",
              "slug": "troickoe"
            },
            {
              "label": "Утта",
              "slug": "utta"
            },
            {
              "label": "Цаган-Аман",
              "slug": "cagan-aman"
            },
            {
              "label": "Элиста",
              "slug": "elista"
            },
            {
              "label": "Юста",
              "slug": "yusta"
            },
            {
              "label": "Яшалта",
              "slug": "yashalta"
            },
            {
              "label": "Яшкуль",
              "slug": "yashkul"
            }
          ]
        },
        {
          "label": "Калужская обл.",
          "slug": "kaluzhskaya-obl.",
          "cities": [
            {
              "label": "Бабынино",
              "slug": "babynino"
            },
            {
              "label": "Балабаново",
              "slug": "balabanovo"
            },
            {
              "label": "Барятино",
              "slug": "baryatino"
            },
            {
              "label": "Белоусово",
              "slug": "belousovo"
            },
            {
              "label": "Бетлица",
              "slug": "betlica"
            },
            {
              "label": "Боровск",
              "slug": "borovsk"
            },
            {
              "label": "Дугна",
              "slug": "dugna"
            },
            {
              "label": "Дудоровский",
              "slug": "dudorovskiy"
            },
            {
              "label": "Думиничи",
              "slug": "duminichi"
            },
            {
              "label": "Еленский",
              "slug": "elenskiy"
            },
            {
              "label": "Жиздра",
              "slug": "zhizdra"
            },
            {
              "label": "Износки",
              "slug": "iznoski"
            },
            {
              "label": "Калуга",
              "slug": "kaluga"
            },
            {
              "label": "Киров",
              "slug": "kirov"
            },
            {
              "label": "Козельск",
              "slug": "kozelsk"
            },
            {
              "label": "Кондрово",
              "slug": "kondrovo"
            },
            {
              "label": "Людиново",
              "slug": "lyudinovo"
            },
            {
              "label": "Малоярославец",
              "slug": "maloyaroslavec"
            },
            {
              "label": "Медынь",
              "slug": "medyn"
            },
            {
              "label": "Мещовск",
              "slug": "meshchovsk"
            },
            {
              "label": "Мосальск",
              "slug": "mosalsk"
            },
            {
              "label": "Обнинск",
              "slug": "obninsk"
            },
            {
              "label": "Перемышль",
              "slug": "peremyshl"
            },
            {
              "label": "Спас-Деменск",
              "slug": "spas-demensk"
            },
            {
              "label": "Сухиничи",
              "slug": "suhinichi"
            },
            {
              "label": "Таруса",
              "slug": "tarusa"
            },
            {
              "label": "Ульяново",
              "slug": "ulyanovo"
            },
            {
              "label": "Ферзиково",
              "slug": "ferzikovo"
            },
            {
              "label": "Хвастовичи",
              "slug": "hvastovichi"
            },
            {
              "label": "Юхнов",
              "slug": "yuhnov"
            }
          ]
        },
        {
          "label": "Камчатская обл.",
          "slug": "kamchatskaya-obl.",
          "cities": [
            {
              "label": "Атласово",
              "slug": "atlasovo"
            },
            {
              "label": "Аянка",
              "slug": "ayanka"
            },
            {
              "label": "Большерецк",
              "slug": "bolshereck"
            },
            {
              "label": "Вилючинск",
              "slug": "vilyuchinsk"
            },
            {
              "label": "Елизово",
              "slug": "elizovo"
            },
            {
              "label": "Ильпырский",
              "slug": "ilpyrskiy"
            },
            {
              "label": "Каменское",
              "slug": "kamenskoe"
            },
            {
              "label": "Кировский",
              "slug": "kirovskiy"
            },
            {
              "label": "Ключи",
              "slug": "klyuchi"
            },
            {
              "label": "Крапивная",
              "slug": "krapivnaya"
            },
            {
              "label": "Мильково",
              "slug": "milkovo"
            },
            {
              "label": "Никольское",
              "slug": "nikolskoe"
            },
            {
              "label": "Озерновский",
              "slug": "ozernovskiy"
            },
            {
              "label": "Оссора",
              "slug": "ossora"
            },
            {
              "label": "Палана",
              "slug": "palana"
            },
            {
              "label": "Парень",
              "slug": "paren"
            },
            {
              "label": "Пахачи",
              "slug": "pahachi"
            },
            {
              "label": "Петропавловск-Камчатский",
              "slug": "petropavlovsk-kamchatskiy"
            },
            {
              "label": "Тигиль",
              "slug": "tigil"
            },
            {
              "label": "Тиличики",
              "slug": "tilichiki"
            },
            {
              "label": "Усть-Большерецк",
              "slug": "ust-bolshereck"
            },
            {
              "label": "Усть-Камчатск",
              "slug": "ust-kamchatsk"
            }
          ]
        },
        {
          "label": "Карелия",
          "slug": "kareliya",
          "cities": [
            {
              "label": "Амбарный",
              "slug": "ambarnyy"
            },
            {
              "label": "Беломорск",
              "slug": "belomorsk"
            },
            {
              "label": "Валаам",
              "slug": "valaam"
            },
            {
              "label": "Вирандозеро",
              "slug": "virandozero"
            },
            {
              "label": "Гирвас",
              "slug": "girvas"
            },
            {
              "label": "Деревянка",
              "slug": "derevyanka"
            },
            {
              "label": "Идель",
              "slug": "idel"
            },
            {
              "label": "Ильинский",
              "slug": "ilinskiy"
            },
            {
              "label": "Импалахти",
              "slug": "impalahti"
            },
            {
              "label": "Калевала",
              "slug": "kalevala"
            },
            {
              "label": "Кемь",
              "slug": "kem"
            },
            {
              "label": "Кестеньга",
              "slug": "kestenga"
            },
            {
              "label": "Кондопога",
              "slug": "kondopoga"
            },
            {
              "label": "Костомукша",
              "slug": "kostomuksha"
            },
            {
              "label": "Лахденпохья",
              "slug": "lahdenpohya"
            },
            {
              "label": "Лоухи",
              "slug": "louhi"
            },
            {
              "label": "Медвежьегорск",
              "slug": "medvezhegorsk"
            },
            {
              "label": "Муезерский",
              "slug": "muezerskiy"
            },
            {
              "label": "Олонец",
              "slug": "olonec"
            },
            {
              "label": "Петрозаводск",
              "slug": "petrozavodsk"
            },
            {
              "label": "Питкяранта",
              "slug": "pitkyaranta"
            },
            {
              "label": "Повенец",
              "slug": "povenec"
            },
            {
              "label": "Пряжа",
              "slug": "pryazha"
            },
            {
              "label": "Пудож",
              "slug": "pudozh"
            },
            {
              "label": "Сегежа",
              "slug": "segezha"
            },
            {
              "label": "Сортавала",
              "slug": "sortavala"
            },
            {
              "label": "Софпорог",
              "slug": "sofporog"
            },
            {
              "label": "Суоярви",
              "slug": "suoyarvi"
            }
          ]
        },
        {
          "label": "Кемеровская обл.",
          "slug": "kemerovskaya-obl.",
          "cities": [
            {
              "label": "Анжеро-Судженск",
              "slug": "anzhero-sudzhensk"
            },
            {
              "label": "Барзас",
              "slug": "barzas"
            },
            {
              "label": "Белово",
              "slug": "belovo"
            },
            {
              "label": "Белогорск",
              "slug": "belogorsk"
            },
            {
              "label": "Березовский",
              "slug": "berezovskiy"
            },
            {
              "label": "Грамотеино",
              "slug": "gramoteino"
            },
            {
              "label": "Гурьевск",
              "slug": "gurevsk"
            },
            {
              "label": "Ижморский",
              "slug": "izhmorskiy"
            },
            {
              "label": "Итатский",
              "slug": "itatskiy"
            },
            {
              "label": "Калтан",
              "slug": "kaltan"
            },
            {
              "label": "Кедровка",
              "slug": "kedrovka"
            },
            {
              "label": "Кемерово",
              "slug": "kemerovo"
            },
            {
              "label": "Киселевск",
              "slug": "kiselevsk"
            },
            {
              "label": "Крапивинский",
              "slug": "krapivinskiy"
            },
            {
              "label": "Ленинск-Кузнецкий",
              "slug": "leninsk-kuzneckiy"
            },
            {
              "label": "Мариинск",
              "slug": "mariinsk"
            },
            {
              "label": "Междуреченск",
              "slug": "mezhdurechensk"
            },
            {
              "label": "Мыски",
              "slug": "myski"
            },
            {
              "label": "Новокузнецк",
              "slug": "novokuzneck"
            },
            {
              "label": "Осинники",
              "slug": "osinniki"
            },
            {
              "label": "Прокопьевск",
              "slug": "prokopevsk"
            },
            {
              "label": "Промышленная",
              "slug": "promyshlennaya"
            },
            {
              "label": "Тайга",
              "slug": "tayga"
            },
            {
              "label": "Таштагол",
              "slug": "tashtagol"
            },
            {
              "label": "Тисуль",
              "slug": "tisul"
            },
            {
              "label": "Топки",
              "slug": "topki"
            },
            {
              "label": "Тяжинский",
              "slug": "tyazhinskiy"
            },
            {
              "label": "Юрга",
              "slug": "yurga"
            },
            {
              "label": "Яшкино",
              "slug": "yashkino"
            },
            {
              "label": "Яя",
              "slug": "yaya"
            }
          ]
        },
        {
          "label": "Кировская обл.",
          "slug": "kirovskaya-obl.",
          "cities": [
            {
              "label": "Арбаж",
              "slug": "arbazh"
            },
            {
              "label": "Аркуль",
              "slug": "arkul"
            },
            {
              "label": "Белая Холуница",
              "slug": "belaya-holunica"
            },
            {
              "label": "Богородское",
              "slug": "bogorodskoe"
            },
            {
              "label": "Боровой",
              "slug": "borovoy"
            },
            {
              "label": "Верхошижемье",
              "slug": "verhoshizheme"
            },
            {
              "label": "Вятские Поляны",
              "slug": "vyatskie-polyany"
            },
            {
              "label": "Зуевка",
              "slug": "zuevka"
            },
            {
              "label": "Каринторф",
              "slug": "karintorf"
            },
            {
              "label": "Кикнур",
              "slug": "kiknur"
            },
            {
              "label": "Кильмезь",
              "slug": "kilmez"
            },
            {
              "label": "Киров",
              "slug": "kirov"
            },
            {
              "label": "Кирово-Чепецк",
              "slug": "kirovo-chepeck"
            },
            {
              "label": "Кирс",
              "slug": "kirs"
            },
            {
              "label": "Кобра",
              "slug": "kobra"
            },
            {
              "label": "Котельнич",
              "slug": "kotelnich"
            },
            {
              "label": "Кумены",
              "slug": "kumeny"
            },
            {
              "label": "Ленинское",
              "slug": "leninskoe"
            },
            {
              "label": "Луза",
              "slug": "luza"
            },
            {
              "label": "Малмыж",
              "slug": "malmyzh"
            },
            {
              "label": "Мураши",
              "slug": "murashi"
            },
            {
              "label": "Нагорск",
              "slug": "nagorsk"
            },
            {
              "label": "Нема",
              "slug": "nema"
            },
            {
              "label": "Нововятск",
              "slug": "novovyatsk"
            },
            {
              "label": "Нолинск",
              "slug": "nolinsk"
            },
            {
              "label": "Омутнинск",
              "slug": "omutninsk"
            },
            {
              "label": "Опарино",
              "slug": "oparino"
            },
            {
              "label": "Оричи",
              "slug": "orichi"
            },
            {
              "label": "Пижанка",
              "slug": "pizhanka"
            },
            {
              "label": "Подосиновец",
              "slug": "podosinovec"
            },
            {
              "label": "Санчурск",
              "slug": "sanchursk"
            },
            {
              "label": "Свеча",
              "slug": "svecha"
            },
            {
              "label": "Слободской",
              "slug": "slobodskoy"
            },
            {
              "label": "Советск",
              "slug": "sovetsk"
            },
            {
              "label": "Суна",
              "slug": "suna"
            },
            {
              "label": "Тужа",
              "slug": "tuzha"
            },
            {
              "label": "Уни",
              "slug": "uni"
            },
            {
              "label": "Уржум",
              "slug": "urzhum"
            },
            {
              "label": "Фаленки",
              "slug": "falenki"
            },
            {
              "label": "Халтурин",
              "slug": "halturin"
            },
            {
              "label": "Юрья",
              "slug": "yurya"
            },
            {
              "label": "Яранск",
              "slug": "yaransk"
            }
          ]
        },
        {
          "label": "Коми",
          "slug": "komi",
          "cities": [
            {
              "label": "Абезь",
              "slug": "abez"
            },
            {
              "label": "Айкино",
              "slug": "aykino"
            },
            {
              "label": "Верхняя Инта",
              "slug": "verhnyaya-inta"
            },
            {
              "label": "Визинга",
              "slug": "vizinga"
            },
            {
              "label": "Водный",
              "slug": "vodnyy"
            },
            {
              "label": "Вожаель",
              "slug": "vozhael"
            },
            {
              "label": "Воркута",
              "slug": "vorkuta"
            },
            {
              "label": "Вуктыл",
              "slug": "vuktyl"
            },
            {
              "label": "Гешарт",
              "slug": "geshart"
            },
            {
              "label": "Елецкий",
              "slug": "eleckiy"
            },
            {
              "label": "Емва",
              "slug": "emva"
            },
            {
              "label": "Заполярный",
              "slug": "zapolyarnyy"
            },
            {
              "label": "Ижма",
              "slug": "izhma"
            },
            {
              "label": "Инта",
              "slug": "inta"
            },
            {
              "label": "Ираель",
              "slug": "irael"
            },
            {
              "label": "Каджером",
              "slug": "kadzherom"
            },
            {
              "label": "Кажым",
              "slug": "kazhym"
            },
            {
              "label": "Кожым",
              "slug": "kozhym"
            },
            {
              "label": "Койгородок",
              "slug": "koygorodok"
            },
            {
              "label": "Корткерос",
              "slug": "kortkeros"
            },
            {
              "label": "Кослан",
              "slug": "koslan"
            },
            {
              "label": "Объячево",
              "slug": "obyachevo"
            },
            {
              "label": "Печора",
              "slug": "pechora"
            },
            {
              "label": "Сосногорск",
              "slug": "sosnogorsk"
            },
            {
              "label": "Сыктывкар",
              "slug": "syktyvkar"
            },
            {
              "label": "Троицко-Печерск",
              "slug": "troicko-pechersk"
            },
            {
              "label": "Усинск",
              "slug": "usinsk"
            },
            {
              "label": "Усогорск",
              "slug": "usogorsk"
            },
            {
              "label": "Усть-Кулом",
              "slug": "ust-kulom"
            },
            {
              "label": "Усть-Цильма",
              "slug": "ust-cilma"
            },
            {
              "label": "Ухта",
              "slug": "uhta"
            }
          ]
        },
        {
          "label": "Костромская обл.",
          "slug": "kostromskaya-obl.",
          "cities": [
            {
              "label": "Антропово",
              "slug": "antropovo"
            },
            {
              "label": "Боговарово",
              "slug": "bogovarovo"
            },
            {
              "label": "Буй",
              "slug": "buy"
            },
            {
              "label": "Волгореченск",
              "slug": "volgorechensk"
            },
            {
              "label": "Галич",
              "slug": "galich"
            },
            {
              "label": "Горчуха",
              "slug": "gorchuha"
            },
            {
              "label": "Зебляки",
              "slug": "zeblyaki"
            },
            {
              "label": "Кадый",
              "slug": "kadyy"
            },
            {
              "label": "Кологрив",
              "slug": "kologriv"
            },
            {
              "label": "Кострома",
              "slug": "kostroma"
            },
            {
              "label": "Красное-на-Волге",
              "slug": "krasnoe-na-volge"
            },
            {
              "label": "Макарьев",
              "slug": "makarev"
            },
            {
              "label": "Мантурово",
              "slug": "manturovo"
            },
            {
              "label": "Нерехта",
              "slug": "nerehta"
            },
            {
              "label": "Нея",
              "slug": "neya"
            },
            {
              "label": "Островское",
              "slug": "ostrovskoe"
            },
            {
              "label": "Павино",
              "slug": "pavino"
            },
            {
              "label": "Парфентьево",
              "slug": "parfentevo"
            },
            {
              "label": "Поназырево",
              "slug": "ponazyrevo"
            },
            {
              "label": "Солигалич",
              "slug": "soligalich"
            },
            {
              "label": "Судиславль",
              "slug": "sudislavl"
            },
            {
              "label": "Сусанино",
              "slug": "susanino"
            },
            {
              "label": "Чухлома",
              "slug": "chuhloma"
            },
            {
              "label": "Шарья",
              "slug": "sharya"
            },
            {
              "label": "Шемятино",
              "slug": "shemyatino"
            }
          ]
        },
        {
          "label": "Краснодарский край",
          "slug": "krasnodarskiy-kray",
          "cities": [
            {
              "label": "Абинск",
              "slug": "abinsk"
            },
            {
              "label": "Абрау-Дюрсо",
              "slug": "abrau-dyurso"
            },
            {
              "label": "Анапа",
              "slug": "anapa"
            },
            {
              "label": "Апшеронск",
              "slug": "apsheronsk"
            },
            {
              "label": "Армавир",
              "slug": "armavir"
            },
            {
              "label": "Архипо-Осиповка",
              "slug": "arhipo-osipovka"
            },
            {
              "label": "Афипский",
              "slug": "afipskiy"
            },
            {
              "label": "Ахтырский",
              "slug": "ahtyrskiy"
            },
            {
              "label": "Ачуево",
              "slug": "achuevo"
            },
            {
              "label": "Белореченск",
              "slug": "belorechensk"
            },
            {
              "label": "Верхнебаканский",
              "slug": "verhnebakanskiy"
            },
            {
              "label": "Выселки",
              "slug": "vyselki"
            },
            {
              "label": "Геленджик",
              "slug": "gelendzhik"
            },
            {
              "label": "Гиагинская",
              "slug": "giaginskaya"
            },
            {
              "label": "Горячий Ключ",
              "slug": "goryachiy-klyuch"
            },
            {
              "label": "Джубга",
              "slug": "dzhubga"
            },
            {
              "label": "Динская",
              "slug": "dinskaya"
            },
            {
              "label": "Ейск",
              "slug": "eysk"
            },
            {
              "label": "Ильский",
              "slug": "ilskiy"
            },
            {
              "label": "Кабардинка",
              "slug": "kabardinka"
            },
            {
              "label": "Калинино",
              "slug": "kalinino"
            },
            {
              "label": "Калининская",
              "slug": "kalininskaya"
            },
            {
              "label": "Каменномостский",
              "slug": "kamennomostskiy"
            },
            {
              "label": "Каневская",
              "slug": "kanevskaya"
            },
            {
              "label": "Кореновск",
              "slug": "korenovsk"
            },
            {
              "label": "Красноармейская",
              "slug": "krasnoarmeyskaya"
            },
            {
              "label": "Краснодар",
              "slug": "krasnodar"
            },
            {
              "label": "Кропоткин",
              "slug": "kropotkin"
            },
            {
              "label": "Крыловская",
              "slug": "krylovskaya"
            },
            {
              "label": "Крымск",
              "slug": "krymsk"
            },
            {
              "label": "Курганинск",
              "slug": "kurganinsk"
            },
            {
              "label": "Кущевская",
              "slug": "kushchevskaya"
            },
            {
              "label": "Лабинск",
              "slug": "labinsk"
            },
            {
              "label": "Лениградская",
              "slug": "lenigradskaya"
            },
            {
              "label": "Майкоп",
              "slug": "maykop"
            },
            {
              "label": "Мостовской",
              "slug": "mostovskoy"
            },
            {
              "label": "Новороссийск",
              "slug": "novorossiysk"
            },
            {
              "label": "Отрадная",
              "slug": "otradnaya"
            },
            {
              "label": "Павловская",
              "slug": "pavlovskaya"
            },
            {
              "label": "Приморско-Ахтарск",
              "slug": "primorsko-ahtarsk"
            },
            {
              "label": "Северская",
              "slug": "severskaya"
            },
            {
              "label": "Славянск-на-Кубани",
              "slug": "slavyansk-na-kubani"
            },
            {
              "label": "Сочи",
              "slug": "sochi"
            },
            {
              "label": "Староминская",
              "slug": "starominskaya"
            },
            {
              "label": "Старощербиновская",
              "slug": "staroshcherbinovskaya"
            },
            {
              "label": "Тбилисская",
              "slug": "tbilisskaya"
            },
            {
              "label": "Темрюк",
              "slug": "temryuk"
            },
            {
              "label": "Тимашевск",
              "slug": "timashevsk"
            },
            {
              "label": "Тихорецк",
              "slug": "tihoreck"
            },
            {
              "label": "Туапсе",
              "slug": "tuapse"
            },
            {
              "label": "Тульский",
              "slug": "tulskiy"
            },
            {
              "label": "Усть-Лабинск",
              "slug": "ust-labinsk"
            },
            {
              "label": "Шовгеновский",
              "slug": "shovgenovskiy"
            }
          ]
        },
        {
          "label": "Красноярский край",
          "slug": "krasnoyarskiy-kray",
          "cities": [
            {
              "label": " Железногорск",
              "slug": "zheleznogorsk"
            },
            {
              "label": "Абаза",
              "slug": "abaza"
            },
            {
              "label": "Абакан",
              "slug": "abakan"
            },
            {
              "label": "Абан",
              "slug": "aban"
            },
            {
              "label": "Агинское",
              "slug": "aginskoe"
            },
            {
              "label": "Артемовск",
              "slug": "artemovsk"
            },
            {
              "label": "Аскиз",
              "slug": "askiz"
            },
            {
              "label": "Ачинск",
              "slug": "achinsk"
            },
            {
              "label": "Байкит",
              "slug": "baykit"
            },
            {
              "label": "Балахта",
              "slug": "balahta"
            },
            {
              "label": "Балыкса",
              "slug": "balyksa"
            },
            {
              "label": "Белый Яр",
              "slug": "belyy-yar"
            },
            {
              "label": "Бельтырский",
              "slug": "beltyrskiy"
            },
            {
              "label": "Бея",
              "slug": "beya"
            },
            {
              "label": "Бискамжа",
              "slug": "biskamzha"
            },
            {
              "label": "Боготол",
              "slug": "bogotol"
            },
            {
              "label": "Боград",
              "slug": "bograd"
            },
            {
              "label": "Богучаны",
              "slug": "boguchany"
            },
            {
              "label": "Большая Мурта",
              "slug": "bolshaya-murta"
            },
            {
              "label": "Большой Улуй",
              "slug": "bolshoy-uluy"
            },
            {
              "label": "Бородино",
              "slug": "borodino"
            },
            {
              "label": "Ванавара",
              "slug": "vanavara"
            },
            {
              "label": "Верхнеимбатск",
              "slug": "verhneimbatsk"
            },
            {
              "label": "Горячегорск",
              "slug": "goryachegorsk"
            },
            {
              "label": "Дзержинское",
              "slug": "dzerzhinskoe"
            },
            {
              "label": "Дивногорск",
              "slug": "divnogorsk"
            },
            {
              "label": "Диксон",
              "slug": "dikson"
            },
            {
              "label": "Дудинка",
              "slug": "dudinka"
            },
            {
              "label": "Емельяново",
              "slug": "emelyanovo"
            },
            {
              "label": "Енисейск",
              "slug": "eniseysk"
            },
            {
              "label": "Ермаковское",
              "slug": "ermakovskoe"
            },
            {
              "label": "Заозерный",
              "slug": "zaozernyy"
            },
            {
              "label": "Зеленогорск",
              "slug": "zelenogorsk"
            },
            {
              "label": "Игарка",
              "slug": "igarka"
            },
            {
              "label": "Идринское",
              "slug": "idrinskoe"
            },
            {
              "label": "Иланский",
              "slug": "ilanskiy"
            },
            {
              "label": "Ирбейское",
              "slug": "irbeyskoe"
            },
            {
              "label": "Казачинское",
              "slug": "kazachinskoe"
            },
            {
              "label": "Канск",
              "slug": "kansk"
            },
            {
              "label": "Каратузское",
              "slug": "karatuzskoe"
            },
            {
              "label": "Караул",
              "slug": "karaul"
            },
            {
              "label": "Кежма",
              "slug": "kezhma"
            },
            {
              "label": "Кодинск",
              "slug": "kodinsk"
            },
            {
              "label": "Козулька",
              "slug": "kozulka"
            },
            {
              "label": "Копьево",
              "slug": "kopevo"
            },
            {
              "label": "Краснотуранск",
              "slug": "krasnoturansk"
            },
            {
              "label": "Красноярск",
              "slug": "krasnoyarsk"
            },
            {
              "label": "Курагино",
              "slug": "kuragino"
            },
            {
              "label": "Лесосибирск",
              "slug": "lesosibirsk"
            },
            {
              "label": "Минусинск",
              "slug": "minusinsk"
            },
            {
              "label": "Мотыгино",
              "slug": "motygino"
            },
            {
              "label": "Назарово",
              "slug": "nazarovo"
            },
            {
              "label": "Нижний Ингаш",
              "slug": "nizhniy-ingash"
            },
            {
              "label": "Новоселово",
              "slug": "novoselovo"
            },
            {
              "label": "Норильск",
              "slug": "norilsk"
            },
            {
              "label": "Партизанское",
              "slug": "partizanskoe"
            },
            {
              "label": "Пировское",
              "slug": "pirovskoe"
            },
            {
              "label": "Саяногорск",
              "slug": "sayanogorsk"
            },
            {
              "label": "Северо-Енисейский",
              "slug": "severo-eniseyskiy"
            },
            {
              "label": "Сосновоборск",
              "slug": "sosnovoborsk"
            },
            {
              "label": "Тасеево",
              "slug": "taseevo"
            },
            {
              "label": "Таштып",
              "slug": "tashtyp"
            },
            {
              "label": "Тура",
              "slug": "tura"
            },
            {
              "label": "Туруханск",
              "slug": "turuhansk"
            },
            {
              "label": "Тюхтет",
              "slug": "tyuhtet"
            },
            {
              "label": "Ужур",
              "slug": "uzhur"
            },
            {
              "label": "Усть-Авам",
              "slug": "ust-avam"
            },
            {
              "label": "Уяр",
              "slug": "uyar"
            },
            {
              "label": "Хатанга",
              "slug": "hatanga"
            },
            {
              "label": "Черемушки",
              "slug": "cheremushki"
            },
            {
              "label": "Черногорск",
              "slug": "chernogorsk"
            },
            {
              "label": "Шалинское",
              "slug": "shalinskoe"
            },
            {
              "label": "Шарыпово",
              "slug": "sharypovo"
            },
            {
              "label": "Шира",
              "slug": "shira"
            },
            {
              "label": "Шушенское",
              "slug": "shushenskoe"
            }
          ]
        },
        {
          "label": "Курганская обл.",
          "slug": "kurganskaya-obl.",
          "cities": [
            {
              "label": "Варгаши",
              "slug": "vargashi"
            },
            {
              "label": "Глядянское",
              "slug": "glyadyanskoe"
            },
            {
              "label": "Далматово",
              "slug": "dalmatovo"
            },
            {
              "label": "Каргаполье",
              "slug": "kargapole"
            },
            {
              "label": "Катайск",
              "slug": "kataysk"
            },
            {
              "label": "Кетово",
              "slug": "ketovo"
            },
            {
              "label": "Курган",
              "slug": "kurgan"
            },
            {
              "label": "Куртамыш",
              "slug": "kurtamysh"
            },
            {
              "label": "Лебяжье",
              "slug": "lebyazhe"
            },
            {
              "label": "Макушино",
              "slug": "makushino"
            },
            {
              "label": "Мишкино",
              "slug": "mishkino"
            },
            {
              "label": "Мокроусово",
              "slug": "mokrousovo"
            },
            {
              "label": "Петухово",
              "slug": "petuhovo"
            },
            {
              "label": "Половинное",
              "slug": "polovinnoe"
            },
            {
              "label": "Сафакулево",
              "slug": "safakulevo"
            },
            {
              "label": "Целинное",
              "slug": "celinnoe"
            },
            {
              "label": "Шадринск",
              "slug": "shadrinsk"
            },
            {
              "label": "Шатрово",
              "slug": "shatrovo"
            },
            {
              "label": "Шумиха",
              "slug": "shumiha"
            },
            {
              "label": "Щучье",
              "slug": "shchuche"
            },
            {
              "label": "Юргамыш",
              "slug": "yurgamysh"
            }
          ]
        },
        {
          "label": "Курская обл.",
          "slug": "kurskaya-obl.",
          "cities": [
            {
              "label": "Альменево",
              "slug": "almenevo"
            },
            {
              "label": "Белая",
              "slug": "belaya"
            },
            {
              "label": "Большое Солдатское",
              "slug": "bolshoe-soldatskoe"
            },
            {
              "label": "Глушково",
              "slug": "glushkovo"
            },
            {
              "label": "Горшечное",
              "slug": "gorshechnoe"
            },
            {
              "label": "Дмитриев-Льговский",
              "slug": "dmitriev-lgovskiy"
            },
            {
              "label": "Железногорск",
              "slug": "zheleznogorsk"
            },
            {
              "label": "Золотухино",
              "slug": "zolotuhino"
            },
            {
              "label": "Касторное",
              "slug": "kastornoe"
            },
            {
              "label": "Конышевка",
              "slug": "konyshevka"
            },
            {
              "label": "Коренево",
              "slug": "korenevo"
            },
            {
              "label": "Курск",
              "slug": "kursk"
            },
            {
              "label": "Курчатов",
              "slug": "kurchatov"
            },
            {
              "label": "Кшенский",
              "slug": "kshenskiy"
            },
            {
              "label": "Льгов",
              "slug": "lgov"
            },
            {
              "label": "Мантурово",
              "slug": "manturovo"
            },
            {
              "label": "Медвенка",
              "slug": "medvenka"
            },
            {
              "label": "Обоянь",
              "slug": "oboyan"
            },
            {
              "label": "Поныри",
              "slug": "ponyri"
            },
            {
              "label": "Пристень",
              "slug": "pristen"
            },
            {
              "label": "Прямицыно",
              "slug": "pryamicyno"
            },
            {
              "label": "Рыльск",
              "slug": "rylsk"
            },
            {
              "label": "Суджа",
              "slug": "sudzha"
            },
            {
              "label": "Тим",
              "slug": "tim"
            },
            {
              "label": "Фатеж",
              "slug": "fatezh"
            },
            {
              "label": "Хомутовка",
              "slug": "homutovka"
            },
            {
              "label": "Черемисиново",
              "slug": "cheremisinovo"
            },
            {
              "label": "Щигры",
              "slug": "shchigry"
            }
          ]
        },
        {
          "label": "Липецкая обл.",
          "slug": "lipeckaya-obl.",
          "cities": [
            {
              "label": "Грязи",
              "slug": "gryazi"
            },
            {
              "label": "Данхов",
              "slug": "danhov"
            },
            {
              "label": "Доброе",
              "slug": "dobroe"
            },
            {
              "label": "Долгоруково",
              "slug": "dolgorukovo"
            },
            {
              "label": "Елец",
              "slug": "elec"
            },
            {
              "label": "Задонск",
              "slug": "zadonsk"
            },
            {
              "label": "Измалково",
              "slug": "izmalkovo"
            },
            {
              "label": "Казинка",
              "slug": "kazinka"
            },
            {
              "label": "Лебедянь",
              "slug": "lebedyan"
            },
            {
              "label": "Лев Толстой",
              "slug": "lev-tolstoy"
            },
            {
              "label": "Липецк",
              "slug": "lipeck"
            },
            {
              "label": "Тербуны",
              "slug": "terbuny"
            },
            {
              "label": "Усмань",
              "slug": "usman"
            },
            {
              "label": "Хлевное",
              "slug": "hlevnoe"
            },
            {
              "label": "Чаплыгин",
              "slug": "chaplygin"
            }
          ]
        },
        {
          "label": "Магаданская обл.",
          "slug": "magadanskaya-obl.",
          "cities": [
            {
              "label": "Анадырь",
              "slug": "anadyr"
            },
            {
              "label": "Атка",
              "slug": "atka"
            },
            {
              "label": "Балыгычан",
              "slug": "balygychan"
            },
            {
              "label": "Беринговский",
              "slug": "beringovskiy"
            },
            {
              "label": "Билибино",
              "slug": "bilibino"
            },
            {
              "label": "Большевик",
              "slug": "bolshevik"
            },
            {
              "label": "Ванкарем",
              "slug": "vankarem"
            },
            {
              "label": "Иульитин",
              "slug": "iulitin"
            },
            {
              "label": "Кадыкчан",
              "slug": "kadykchan"
            },
            {
              "label": "Лаврентия",
              "slug": "lavrentiya"
            },
            {
              "label": "Магадан",
              "slug": "magadan"
            },
            {
              "label": "Мыс Шмидта",
              "slug": "mys-shmidta"
            },
            {
              "label": "Ола",
              "slug": "ola"
            },
            {
              "label": "Омонск",
              "slug": "omonsk"
            },
            {
              "label": "Омсукчан",
              "slug": "omsukchan"
            },
            {
              "label": "Палатка",
              "slug": "palatka"
            },
            {
              "label": "Певек",
              "slug": "pevek"
            },
            {
              "label": "Провидения",
              "slug": "provideniya"
            },
            {
              "label": "Сеймчан",
              "slug": "seymchan"
            },
            {
              "label": "Синегорье",
              "slug": "sinegore"
            },
            {
              "label": "Сусуман",
              "slug": "susuman"
            },
            {
              "label": "Усть-Белая",
              "slug": "ust-belaya"
            },
            {
              "label": "Усть-Омчуг",
              "slug": "ust-omchug"
            },
            {
              "label": "Эвенск",
              "slug": "evensk"
            },
            {
              "label": "Эгвекинот",
              "slug": "egvekinot"
            },
            {
              "label": "Ягодное",
              "slug": "yagodnoe"
            }
          ]
        },
        {
          "label": "Марий Эл",
          "slug": "mariy-el",
          "cities": [
            {
              "label": "Волжск",
              "slug": "volzhsk"
            },
            {
              "label": "Дубовский",
              "slug": "dubovskiy"
            },
            {
              "label": "Звенигово",
              "slug": "zvenigovo"
            },
            {
              "label": "Йошкар-Ола",
              "slug": "yoshkar-ola"
            },
            {
              "label": "Килемары",
              "slug": "kilemary"
            },
            {
              "label": "Козьмодемьянск",
              "slug": "kozmodemyansk"
            },
            {
              "label": "Куженер",
              "slug": "kuzhener"
            },
            {
              "label": "Мари-Турек",
              "slug": "mari-turek"
            },
            {
              "label": "Медведево",
              "slug": "medvedevo"
            },
            {
              "label": "Морки",
              "slug": "morki"
            },
            {
              "label": "Новый Торьял",
              "slug": "novyy-toryal"
            },
            {
              "label": "Оршанка",
              "slug": "orshanka"
            },
            {
              "label": "Параньга",
              "slug": "paranga"
            },
            {
              "label": "Сернур",
              "slug": "sernur"
            },
            {
              "label": "Советский",
              "slug": "sovetskiy"
            },
            {
              "label": "Юрино",
              "slug": "yurino"
            }
          ]
        },
        {
          "label": "Мордовия",
          "slug": "mordoviya",
          "cities": [
            {
              "label": "Ардатов",
              "slug": "ardatov"
            },
            {
              "label": "Атюрьево",
              "slug": "atyurevo"
            },
            {
              "label": "Атяшево",
              "slug": "atyashevo"
            },
            {
              "label": "Большие Березники",
              "slug": "bolshie-berezniki"
            },
            {
              "label": "Большое Игнатово",
              "slug": "bolshoe-ignatovo"
            },
            {
              "label": "Выша",
              "slug": "vysha"
            },
            {
              "label": "Ельники",
              "slug": "elniki"
            },
            {
              "label": "Зубова Поляна",
              "slug": "zubova-polyana"
            },
            {
              "label": "Инсар",
              "slug": "insar"
            },
            {
              "label": "Кадошкино",
              "slug": "kadoshkino"
            },
            {
              "label": "Кемля",
              "slug": "kemlya"
            },
            {
              "label": "Ковылкино",
              "slug": "kovylkino"
            },
            {
              "label": "Комсомольский",
              "slug": "komsomolskiy"
            },
            {
              "label": "Кочкурово",
              "slug": "kochkurovo"
            },
            {
              "label": "Краснослободск",
              "slug": "krasnoslobodsk"
            },
            {
              "label": "Лямбирь",
              "slug": "lyambir"
            },
            {
              "label": "Ромоданово",
              "slug": "romodanovo"
            },
            {
              "label": "Рузаевка",
              "slug": "ruzaevka"
            },
            {
              "label": "Саранск",
              "slug": "saransk"
            },
            {
              "label": "Старое Шайгово",
              "slug": "staroe-shaygovo"
            },
            {
              "label": "Темников",
              "slug": "temnikov"
            },
            {
              "label": "Теньгушево",
              "slug": "tengushevo"
            },
            {
              "label": "Торбеево",
              "slug": "torbeevo"
            },
            {
              "label": "Чамзинка",
              "slug": "chamzinka"
            }
          ]
        },
        {
          "label": "Мурманская обл.",
          "slug": "murmanskaya-obl.",
          "cities": [
            {
              "label": "Апатиты",
              "slug": "apatity"
            },
            {
              "label": "Африканда",
              "slug": "afrikanda"
            },
            {
              "label": "Верхнетуломский",
              "slug": "verhnetulomskiy"
            },
            {
              "label": "Заозерск",
              "slug": "zaozersk"
            },
            {
              "label": "Заполярный",
              "slug": "zapolyarnyy"
            },
            {
              "label": "Зареченск",
              "slug": "zarechensk"
            },
            {
              "label": "Зашеек",
              "slug": "zasheek"
            },
            {
              "label": "Зеленоборский",
              "slug": "zelenoborskiy"
            },
            {
              "label": "Кандалакша",
              "slug": "kandalaksha"
            },
            {
              "label": "Кильдинстрой",
              "slug": "kildinstroy"
            },
            {
              "label": "Кировск",
              "slug": "kirovsk"
            },
            {
              "label": "Ковдор",
              "slug": "kovdor"
            },
            {
              "label": "Кола",
              "slug": "kola"
            },
            {
              "label": "Конда",
              "slug": "konda"
            },
            {
              "label": "Мончегорск",
              "slug": "monchegorsk"
            },
            {
              "label": "Мурманск",
              "slug": "murmansk"
            },
            {
              "label": "Мурмаши",
              "slug": "murmashi"
            },
            {
              "label": "Никель",
              "slug": "nikel"
            },
            {
              "label": "Оленегорск",
              "slug": "olenegorsk"
            },
            {
              "label": "Полярные Зори",
              "slug": "polyarnye-zori"
            },
            {
              "label": "Полярный",
              "slug": "polyarnyy"
            },
            {
              "label": "Североморск",
              "slug": "severomorsk"
            },
            {
              "label": "Снежногорск",
              "slug": "snezhnogorsk"
            },
            {
              "label": "Умба",
              "slug": "umba"
            }
          ]
        },
        {
          "label": "Нижегородская (Горьковская)",
          "slug": "nizhegorodskaya-gorkovskaya",
          "cities": [
            {
              "label": "Ардатов",
              "slug": "ardatov"
            },
            {
              "label": "Арзамас",
              "slug": "arzamas"
            },
            {
              "label": "Арья",
              "slug": "arya"
            },
            {
              "label": "Балахна",
              "slug": "balahna"
            },
            {
              "label": "Богородск",
              "slug": "bogorodsk"
            },
            {
              "label": "Большереченск",
              "slug": "bolsherechensk"
            },
            {
              "label": "Большое Болдино",
              "slug": "bolshoe-boldino"
            },
            {
              "label": "Большое Козино",
              "slug": "bolshoe-kozino"
            },
            {
              "label": "Большое Мурашкино",
              "slug": "bolshoe-murashkino"
            },
            {
              "label": "Большое Пикино",
              "slug": "bolshoe-pikino"
            },
            {
              "label": "Бор",
              "slug": "bor"
            },
            {
              "label": "Бутурлино",
              "slug": "buturlino"
            },
            {
              "label": "Вад",
              "slug": "vad"
            },
            {
              "label": "Варнавино",
              "slug": "varnavino"
            },
            {
              "label": "Васильсурск",
              "slug": "vasilsursk"
            },
            {
              "label": "Вахтан",
              "slug": "vahtan"
            },
            {
              "label": "Вача",
              "slug": "vacha"
            },
            {
              "label": "Велетьма",
              "slug": "veletma"
            },
            {
              "label": "Ветлуга",
              "slug": "vetluga"
            },
            {
              "label": "Виля",
              "slug": "vilya"
            },
            {
              "label": "Вознесенское",
              "slug": "voznesenskoe"
            },
            {
              "label": "Володарск",
              "slug": "volodarsk"
            },
            {
              "label": "Воротынец",
              "slug": "vorotynec"
            },
            {
              "label": "Ворсма",
              "slug": "vorsma"
            },
            {
              "label": "Воскресенское",
              "slug": "voskresenskoe"
            },
            {
              "label": "Выездное",
              "slug": "vyezdnoe"
            },
            {
              "label": "Выкса",
              "slug": "vyksa"
            },
            {
              "label": "Гагино",
              "slug": "gagino"
            },
            {
              "label": "Гидроторф",
              "slug": "gidrotorf"
            },
            {
              "label": "Горбатов",
              "slug": "gorbatov"
            },
            {
              "label": "Горбатовка",
              "slug": "gorbatovka"
            },
            {
              "label": "Городец",
              "slug": "gorodec"
            },
            {
              "label": "Горький",
              "slug": "gorkiy"
            },
            {
              "label": "Дальнее Константиново",
              "slug": "dalnee-konstantinovo"
            },
            {
              "label": "Дзержинск",
              "slug": "dzerzhinsk"
            },
            {
              "label": "Дивеево",
              "slug": "diveevo"
            },
            {
              "label": "Досчатое",
              "slug": "doschatoe"
            },
            {
              "label": "Заволжье",
              "slug": "zavolzhe"
            },
            {
              "label": "Катунки",
              "slug": "katunki"
            },
            {
              "label": "Керженец",
              "slug": "kerzhenec"
            },
            {
              "label": "Княгинино",
              "slug": "knyaginino"
            },
            {
              "label": "Ковернино",
              "slug": "kovernino"
            },
            {
              "label": "Красные Баки",
              "slug": "krasnye-baki"
            },
            {
              "label": "Кстово",
              "slug": "kstovo"
            },
            {
              "label": "Кулебаки",
              "slug": "kulebaki"
            },
            {
              "label": "Лукоянов",
              "slug": "lukoyanov"
            },
            {
              "label": "Лысково",
              "slug": "lyskovo"
            },
            {
              "label": "Навашино",
              "slug": "navashino"
            },
            {
              "label": "Нижний Новгород",
              "slug": "nizhniy-novgorod"
            },
            {
              "label": "Павлово",
              "slug": "pavlovo"
            },
            {
              "label": "Первомайск",
              "slug": "pervomaysk"
            },
            {
              "label": "Перевоз",
              "slug": "perevoz"
            },
            {
              "label": "Пильна",
              "slug": "pilna"
            },
            {
              "label": "Починки",
              "slug": "pochinki"
            },
            {
              "label": "Саров",
              "slug": "sarov"
            },
            {
              "label": "Сергач",
              "slug": "sergach"
            },
            {
              "label": "Сеченово",
              "slug": "sechenovo"
            },
            {
              "label": "Сосновское",
              "slug": "sosnovskoe"
            },
            {
              "label": "Спасское",
              "slug": "spasskoe"
            },
            {
              "label": "Тонкино",
              "slug": "tonkino"
            },
            {
              "label": "Тоншаево",
              "slug": "tonshaevo"
            },
            {
              "label": "Уразовка",
              "slug": "urazovka"
            },
            {
              "label": "Урень",
              "slug": "uren"
            },
            {
              "label": "Чкаловск",
              "slug": "chkalovsk"
            },
            {
              "label": "Шаранга",
              "slug": "sharanga"
            },
            {
              "label": "Шатки",
              "slug": "shatki"
            },
            {
              "label": "Шахунья",
              "slug": "shahunya"
            }
          ]
        },
        {
          "label": "Новгородская обл.",
          "slug": "novgorodskaya-obl.",
          "cities": [
            {
              "label": "Анциферово",
              "slug": "anciferovo"
            },
            {
              "label": "Батецкий",
              "slug": "bateckiy"
            },
            {
              "label": "Большая Вишера",
              "slug": "bolshaya-vishera"
            },
            {
              "label": "Боровичи",
              "slug": "borovichi"
            },
            {
              "label": "Валдай",
              "slug": "valday"
            },
            {
              "label": "Волот",
              "slug": "volot"
            },
            {
              "label": "Деманск",
              "slug": "demansk"
            },
            {
              "label": "Зарубино",
              "slug": "zarubino"
            },
            {
              "label": "Кресцы",
              "slug": "krescy"
            },
            {
              "label": "Любытино",
              "slug": "lyubytino"
            },
            {
              "label": "Малая Вишера",
              "slug": "malaya-vishera"
            },
            {
              "label": "Марево",
              "slug": "marevo"
            },
            {
              "label": "Мошенское",
              "slug": "moshenskoe"
            },
            {
              "label": "Новгород",
              "slug": "novgorod"
            },
            {
              "label": "Окуловка",
              "slug": "okulovka"
            },
            {
              "label": "Парфино",
              "slug": "parfino"
            },
            {
              "label": "Пестово",
              "slug": "pestovo"
            },
            {
              "label": "Поддорье",
              "slug": "poddore"
            },
            {
              "label": "Сольцы",
              "slug": "solcy"
            },
            {
              "label": "Старая Русса",
              "slug": "staraya-russa"
            },
            {
              "label": "Хвойное",
              "slug": "hvoynoe"
            },
            {
              "label": "Холм",
              "slug": "holm"
            },
            {
              "label": "Чудово",
              "slug": "chudovo"
            },
            {
              "label": "Шимск",
              "slug": "shimsk"
            }
          ]
        },
        {
          "label": "Новосибирская обл.",
          "slug": "novosibirskaya-obl.",
          "cities": [
            {
              "label": "Баган",
              "slug": "bagan"
            },
            {
              "label": "Барабинск",
              "slug": "barabinsk"
            },
            {
              "label": "Бердск",
              "slug": "berdsk"
            },
            {
              "label": "Биаза",
              "slug": "biaza"
            },
            {
              "label": "Болотное",
              "slug": "bolotnoe"
            },
            {
              "label": "Венгерово",
              "slug": "vengerovo"
            },
            {
              "label": "Довольное",
              "slug": "dovolnoe"
            },
            {
              "label": "Завьялово",
              "slug": "zavyalovo"
            },
            {
              "label": "Искитим",
              "slug": "iskitim"
            },
            {
              "label": "Карасук",
              "slug": "karasuk"
            },
            {
              "label": "Каргат",
              "slug": "kargat"
            },
            {
              "label": "Колывань",
              "slug": "kolyvan"
            },
            {
              "label": "Краснозерское",
              "slug": "krasnozerskoe"
            },
            {
              "label": "Крутиха",
              "slug": "krutiha"
            },
            {
              "label": "Куйбышев",
              "slug": "kuybyshev"
            },
            {
              "label": "Купино",
              "slug": "kupino"
            },
            {
              "label": "Кыштовка",
              "slug": "kyshtovka"
            },
            {
              "label": "Маслянино",
              "slug": "maslyanino"
            },
            {
              "label": "Михайловский",
              "slug": "mihaylovskiy"
            },
            {
              "label": "Мошково",
              "slug": "moshkovo"
            },
            {
              "label": "Новосибирск",
              "slug": "novosibirsk"
            },
            {
              "label": "Ордынское",
              "slug": "ordynskoe"
            },
            {
              "label": "Северное",
              "slug": "severnoe"
            },
            {
              "label": "Сузун",
              "slug": "suzun"
            },
            {
              "label": "Татарск",
              "slug": "tatarsk"
            },
            {
              "label": "Тогучин",
              "slug": "toguchin"
            },
            {
              "label": "Убинское",
              "slug": "ubinskoe"
            },
            {
              "label": "Усть-Тарка",
              "slug": "ust-tarka"
            },
            {
              "label": "Чаны",
              "slug": "chany"
            },
            {
              "label": "Черепаново",
              "slug": "cherepanovo"
            },
            {
              "label": "Чистоозерное",
              "slug": "chistoozernoe"
            },
            {
              "label": "Чулым",
              "slug": "chulym"
            }
          ]
        },
        {
          "label": "Омская обл.",
          "slug": "omskaya-obl.",
          "cities": [
            {
              "label": "Береговой",
              "slug": "beregovoy"
            },
            {
              "label": "Большеречье",
              "slug": "bolshereche"
            },
            {
              "label": "Большие Уки",
              "slug": "bolshie-uki"
            },
            {
              "label": "Горьковское",
              "slug": "gorkovskoe"
            },
            {
              "label": "Знаменское",
              "slug": "znamenskoe"
            },
            {
              "label": "Исилькуль",
              "slug": "isilkul"
            },
            {
              "label": "Калачинск",
              "slug": "kalachinsk"
            },
            {
              "label": "Колосовка",
              "slug": "kolosovka"
            },
            {
              "label": "Кормиловка",
              "slug": "kormilovka"
            },
            {
              "label": "Крутинка",
              "slug": "krutinka"
            },
            {
              "label": "Любинский",
              "slug": "lyubinskiy"
            },
            {
              "label": "Марьяновка",
              "slug": "maryanovka"
            },
            {
              "label": "Муромцево",
              "slug": "muromcevo"
            },
            {
              "label": "Называевск",
              "slug": "nazyvaevsk"
            },
            {
              "label": "Нижняя Омка",
              "slug": "nizhnyaya-omka"
            },
            {
              "label": "Нововаршавка",
              "slug": "novovarshavka"
            },
            {
              "label": "Одесское",
              "slug": "odesskoe"
            },
            {
              "label": "Оконешниково",
              "slug": "okoneshnikovo"
            },
            {
              "label": "Омск",
              "slug": "omsk"
            },
            {
              "label": "Павлоградка",
              "slug": "pavlogradka"
            },
            {
              "label": "Полтавка",
              "slug": "poltavka"
            },
            {
              "label": "Русская Поляна",
              "slug": "russkaya-polyana"
            },
            {
              "label": "Саргатское",
              "slug": "sargatskoe"
            },
            {
              "label": "Седельниково",
              "slug": "sedelnikovo"
            },
            {
              "label": "Таврическое",
              "slug": "tavricheskoe"
            },
            {
              "label": "Тара",
              "slug": "tara"
            },
            {
              "label": "Тевриз",
              "slug": "tevriz"
            },
            {
              "label": "Тюкалинск",
              "slug": "tyukalinsk"
            },
            {
              "label": "Усть-Ишим",
              "slug": "ust-ishim"
            },
            {
              "label": "Черлак",
              "slug": "cherlak"
            },
            {
              "label": "Шербакуль",
              "slug": "sherbakul"
            }
          ]
        },
        {
          "label": "Оренбургская обл.",
          "slug": "orenburgskaya-obl.",
          "cities": [
            {
              "label": "Абдулино",
              "slug": "abdulino"
            },
            {
              "label": "Адамовка",
              "slug": "adamovka"
            },
            {
              "label": "Айдырлинский",
              "slug": "aydyrlinskiy"
            },
            {
              "label": "Акбулак",
              "slug": "akbulak"
            },
            {
              "label": "Аккермановка",
              "slug": "akkermanovka"
            },
            {
              "label": "Асекеево",
              "slug": "asekeevo"
            },
            {
              "label": "Беляевка",
              "slug": "belyaevka"
            },
            {
              "label": "Бугуруслан",
              "slug": "buguruslan"
            },
            {
              "label": "Бузулук",
              "slug": "buzuluk"
            },
            {
              "label": "Гай",
              "slug": "gay"
            },
            {
              "label": "Грачевка",
              "slug": "grachevka"
            },
            {
              "label": "Домбаровский",
              "slug": "dombarovskiy"
            },
            {
              "label": "Дубенский",
              "slug": "dubenskiy"
            },
            {
              "label": "Илек",
              "slug": "ilek"
            },
            {
              "label": "Ириклинский",
              "slug": "iriklinskiy"
            },
            {
              "label": "Кувандык",
              "slug": "kuvandyk"
            },
            {
              "label": "Курманаевка",
              "slug": "kurmanaevka"
            },
            {
              "label": "Матвеевка",
              "slug": "matveevka"
            },
            {
              "label": "Медногорск",
              "slug": "mednogorsk"
            },
            {
              "label": "Новоорск",
              "slug": "novoorsk"
            },
            {
              "label": "Новосергиевка",
              "slug": "novosergievka"
            },
            {
              "label": "Новотроицк",
              "slug": "novotroick"
            },
            {
              "label": "Октябрьское",
              "slug": "oktyabrskoe"
            },
            {
              "label": "Оренбург",
              "slug": "orenburg"
            },
            {
              "label": "Орск",
              "slug": "orsk"
            },
            {
              "label": "Первомайский",
              "slug": "pervomayskiy"
            },
            {
              "label": "Переволоцкий",
              "slug": "perevolockiy"
            },
            {
              "label": "Пономаревка",
              "slug": "ponomarevka"
            },
            {
              "label": "Саракташ",
              "slug": "saraktash"
            },
            {
              "label": "Светлый",
              "slug": "svetlyy"
            },
            {
              "label": "Северное",
              "slug": "severnoe"
            },
            {
              "label": "Соль-Илецк",
              "slug": "sol-ileck"
            },
            {
              "label": "Сорочинск",
              "slug": "sorochinsk"
            },
            {
              "label": "Ташла",
              "slug": "tashla"
            },
            {
              "label": "Тоцкое",
              "slug": "tockoe"
            },
            {
              "label": "Тюльган",
              "slug": "tyulgan"
            },
            {
              "label": "Шарлык",
              "slug": "sharlyk"
            },
            {
              "label": "Энергетик",
              "slug": "energetik"
            },
            {
              "label": "Ясный",
              "slug": "yasnyy"
            }
          ]
        },
        {
          "label": "Орловская обл.",
          "slug": "orlovskaya-obl.",
          "cities": [
            {
              "label": "Болхов",
              "slug": "bolhov"
            },
            {
              "label": "Верховье",
              "slug": "verhove"
            },
            {
              "label": "Глазуновка",
              "slug": "glazunovka"
            },
            {
              "label": "Дмитровск-Орловский",
              "slug": "dmitrovsk-orlovskiy"
            },
            {
              "label": "Долгое",
              "slug": "dolgoe"
            },
            {
              "label": "Залегощь",
              "slug": "zalegoshch"
            },
            {
              "label": "Змиевка",
              "slug": "zmievka"
            },
            {
              "label": "Знаменское",
              "slug": "znamenskoe"
            },
            {
              "label": "Колпны",
              "slug": "kolpny"
            },
            {
              "label": "Красная Заря",
              "slug": "krasnaya-zarya"
            },
            {
              "label": "Кромы",
              "slug": "kromy"
            },
            {
              "label": "Ливны",
              "slug": "livny"
            },
            {
              "label": "Малоархангельск",
              "slug": "maloarhangelsk"
            },
            {
              "label": "Мценск",
              "slug": "mcensk"
            },
            {
              "label": "Нарышкино",
              "slug": "naryshkino"
            },
            {
              "label": "Новосиль",
              "slug": "novosil"
            },
            {
              "label": "Орел",
              "slug": "orel"
            },
            {
              "label": "Покровское",
              "slug": "pokrovskoe"
            },
            {
              "label": "Сосково",
              "slug": "soskovo"
            },
            {
              "label": "Тросна",
              "slug": "trosna"
            },
            {
              "label": "Хомутово",
              "slug": "homutovo"
            },
            {
              "label": "Хотынец",
              "slug": "hotynec"
            },
            {
              "label": "Шаблыкино",
              "slug": "shablykino"
            }
          ]
        },
        {
          "label": "Пензенская обл.",
          "slug": "penzenskaya-obl.",
          "cities": [
            {
              "label": "Башмаково",
              "slug": "bashmakovo"
            },
            {
              "label": "Беднодемьяновск",
              "slug": "bednodemyanovsk"
            },
            {
              "label": "Беково",
              "slug": "bekovo"
            },
            {
              "label": "Белинский",
              "slug": "belinskiy"
            },
            {
              "label": "Бессоновка",
              "slug": "bessonovka"
            },
            {
              "label": "Вадинск",
              "slug": "vadinsk"
            },
            {
              "label": "Верхозим",
              "slug": "verhozim"
            },
            {
              "label": "Городище",
              "slug": "gorodishche"
            },
            {
              "label": "Евлашево",
              "slug": "evlashevo"
            },
            {
              "label": "Земетчино",
              "slug": "zemetchino"
            },
            {
              "label": "Золотаревка",
              "slug": "zolotarevka"
            },
            {
              "label": "Исса",
              "slug": "issa"
            },
            {
              "label": "Каменка",
              "slug": "kamenka"
            },
            {
              "label": "Колышлей",
              "slug": "kolyshley"
            },
            {
              "label": "Кондоль",
              "slug": "kondol"
            },
            {
              "label": "Кузнецк",
              "slug": "kuzneck"
            },
            {
              "label": "Лопатино",
              "slug": "lopatino"
            },
            {
              "label": "Малая Сердоба",
              "slug": "malaya-serdoba"
            },
            {
              "label": "Мокшан",
              "slug": "mokshan"
            },
            {
              "label": "Наровчат",
              "slug": "narovchat"
            },
            {
              "label": "Неверкино",
              "slug": "neverkino"
            },
            {
              "label": "Нижний Ломов",
              "slug": "nizhniy-lomov"
            },
            {
              "label": "Никольск",
              "slug": "nikolsk"
            },
            {
              "label": "Пачелма",
              "slug": "pachelma"
            },
            {
              "label": "Пенза",
              "slug": "penza"
            },
            {
              "label": "Русский Камешкир",
              "slug": "russkiy-kameshkir"
            },
            {
              "label": "Сердобск",
              "slug": "serdobsk"
            },
            {
              "label": "Сосновоборск",
              "slug": "sosnovoborsk"
            },
            {
              "label": "Сура",
              "slug": "sura"
            },
            {
              "label": "Тамала",
              "slug": "tamala"
            },
            {
              "label": "Шемышейка",
              "slug": "shemysheyka"
            }
          ]
        },
        {
          "label": "Пермская обл.",
          "slug": "permskaya-obl.",
          "cities": [
            {
              "label": "Барда",
              "slug": "barda"
            },
            {
              "label": "Березники",
              "slug": "berezniki"
            },
            {
              "label": "Большая Соснова",
              "slug": "bolshaya-sosnova"
            },
            {
              "label": "Верещагино",
              "slug": "vereshchagino"
            },
            {
              "label": "Гайны",
              "slug": "gayny"
            },
            {
              "label": "Горнозаводск",
              "slug": "gornozavodsk"
            },
            {
              "label": "Гремячинск",
              "slug": "gremyachinsk"
            },
            {
              "label": "Губаха",
              "slug": "gubaha"
            },
            {
              "label": "Добрянка",
              "slug": "dobryanka"
            },
            {
              "label": "Елово",
              "slug": "elovo"
            },
            {
              "label": "Зюкайка",
              "slug": "zyukayka"
            },
            {
              "label": "Ильинский",
              "slug": "ilinskiy"
            },
            {
              "label": "Карагай",
              "slug": "karagay"
            },
            {
              "label": "Керчевский",
              "slug": "kerchevskiy"
            },
            {
              "label": "Кизел",
              "slug": "kizel"
            },
            {
              "label": "Коса",
              "slug": "kosa"
            },
            {
              "label": "Кочево",
              "slug": "kochevo"
            },
            {
              "label": "Красновишерск",
              "slug": "krasnovishersk"
            },
            {
              "label": "Краснокамск",
              "slug": "krasnokamsk"
            },
            {
              "label": "Кудымкар",
              "slug": "kudymkar"
            },
            {
              "label": "Куеда",
              "slug": "kueda"
            },
            {
              "label": "Кунгур",
              "slug": "kungur"
            },
            {
              "label": "Лысьва",
              "slug": "lysva"
            },
            {
              "label": "Ныроб",
              "slug": "nyrob"
            },
            {
              "label": "Нытва",
              "slug": "nytva"
            },
            {
              "label": "Октябрьский",
              "slug": "oktyabrskiy"
            },
            {
              "label": "Орда",
              "slug": "orda"
            },
            {
              "label": "Оса",
              "slug": "osa"
            },
            {
              "label": "Оханск",
              "slug": "ohansk"
            },
            {
              "label": "Очер",
              "slug": "ocher"
            },
            {
              "label": "Пермь",
              "slug": "perm"
            },
            {
              "label": "Соликамск",
              "slug": "solikamsk"
            },
            {
              "label": "Суксун",
              "slug": "suksun"
            },
            {
              "label": "Уинское",
              "slug": "uinskoe"
            },
            {
              "label": "Усолье",
              "slug": "usole"
            },
            {
              "label": "Усть-Кишерть",
              "slug": "ust-kishert"
            },
            {
              "label": "Чайковский",
              "slug": "chaykovskiy"
            },
            {
              "label": "Частые",
              "slug": "chastye"
            },
            {
              "label": "Чердынь",
              "slug": "cherdyn"
            },
            {
              "label": "Чернореченский",
              "slug": "chernorechenskiy"
            },
            {
              "label": "Чернушка",
              "slug": "chernushka"
            },
            {
              "label": "Чусовой",
              "slug": "chusovoy"
            },
            {
              "label": "Юрла",
              "slug": "yurla"
            },
            {
              "label": "Юсьва",
              "slug": "yusva"
            }
          ]
        },
        {
          "label": "Приморский край",
          "slug": "primorskiy-kray",
          "cities": [
            {
              "label": "Анучино",
              "slug": "anuchino"
            },
            {
              "label": "Арсеньев",
              "slug": "arsenev"
            },
            {
              "label": "Артем",
              "slug": "artem"
            },
            {
              "label": "Артемовский",
              "slug": "artemovskiy"
            },
            {
              "label": "Большой Камень",
              "slug": "bolshoy-kamen"
            },
            {
              "label": "Валентин",
              "slug": "valentin"
            },
            {
              "label": "Владивосток",
              "slug": "vladivostok"
            },
            {
              "label": "Высокогорск",
              "slug": "vysokogorsk"
            },
            {
              "label": "Горные Ключи",
              "slug": "gornye-klyuchi"
            },
            {
              "label": "Горный",
              "slug": "gornyy"
            },
            {
              "label": "Дальнегорск",
              "slug": "dalnegorsk"
            },
            {
              "label": "Дальнереченск",
              "slug": "dalnerechensk"
            },
            {
              "label": "Зарубино",
              "slug": "zarubino"
            },
            {
              "label": "Кавалерово",
              "slug": "kavalerovo"
            },
            {
              "label": "Каменка",
              "slug": "kamenka"
            },
            {
              "label": "Камень-Рыболов",
              "slug": "kamen-rybolov"
            },
            {
              "label": "Кировский",
              "slug": "kirovskiy"
            },
            {
              "label": "Лазо",
              "slug": "lazo"
            },
            {
              "label": "Лесозаводск",
              "slug": "lesozavodsk"
            },
            {
              "label": "Лучегорск",
              "slug": "luchegorsk"
            },
            {
              "label": "Михайловка",
              "slug": "mihaylovka"
            },
            {
              "label": "Находка",
              "slug": "nahodka"
            },
            {
              "label": "Новопокровка",
              "slug": "novopokrovka"
            },
            {
              "label": "Ольга",
              "slug": "olga"
            },
            {
              "label": "Партизанск",
              "slug": "partizansk"
            },
            {
              "label": "Пограничный",
              "slug": "pogranichnyy"
            },
            {
              "label": "Покровка",
              "slug": "pokrovka"
            },
            {
              "label": "Русский",
              "slug": "russkiy"
            },
            {
              "label": "Самарга",
              "slug": "samarga"
            },
            {
              "label": "Славянка",
              "slug": "slavyanka"
            },
            {
              "label": "Спасск-Дальний",
              "slug": "spassk-dalniy"
            },
            {
              "label": "Терней",
              "slug": "terney"
            },
            {
              "label": "Уссурийск",
              "slug": "ussuriysk"
            },
            {
              "label": "Фокино",
              "slug": "fokino"
            },
            {
              "label": "Хасан",
              "slug": "hasan"
            },
            {
              "label": "Хороль",
              "slug": "horol"
            },
            {
              "label": "Черниговка",
              "slug": "chernigovka"
            },
            {
              "label": "Чугуевка",
              "slug": "chuguevka"
            },
            {
              "label": "Яковлевка",
              "slug": "yakovlevka"
            }
          ]
        },
        {
          "label": "Псковская обл.",
          "slug": "pskovskaya-obl.",
          "cities": [
            {
              "label": "Бежаницы",
              "slug": "bezhanicy"
            },
            {
              "label": "Великие Луки",
              "slug": "velikie-luki"
            },
            {
              "label": "Гдов",
              "slug": "gdov"
            },
            {
              "label": "Дедовичи",
              "slug": "dedovichi"
            },
            {
              "label": "Дно",
              "slug": "dno"
            },
            {
              "label": "Заплюсье",
              "slug": "zaplyuse"
            },
            {
              "label": "Идрица",
              "slug": "idrica"
            },
            {
              "label": "Красногородское",
              "slug": "krasnogorodskoe"
            },
            {
              "label": "Кунья",
              "slug": "kunya"
            },
            {
              "label": "Локня",
              "slug": "loknya"
            },
            {
              "label": "Невель",
              "slug": "nevel"
            },
            {
              "label": "Новоржев",
              "slug": "novorzhev"
            },
            {
              "label": "Новосокольники",
              "slug": "novosokolniki"
            },
            {
              "label": "Опочка",
              "slug": "opochka"
            },
            {
              "label": "Остров",
              "slug": "ostrov"
            },
            {
              "label": "Палкино",
              "slug": "palkino"
            },
            {
              "label": "Печоры",
              "slug": "pechory"
            },
            {
              "label": "Плюсса",
              "slug": "plyussa"
            },
            {
              "label": "Порхов",
              "slug": "porhov"
            },
            {
              "label": "Псков",
              "slug": "pskov"
            },
            {
              "label": "Пустошка",
              "slug": "pustoshka"
            },
            {
              "label": "Пушкинские Горы",
              "slug": "pushkinskie-gory"
            },
            {
              "label": "Пыталово",
              "slug": "pytalovo"
            },
            {
              "label": "Себеж",
              "slug": "sebezh"
            },
            {
              "label": "Струги-Красные",
              "slug": "strugi-krasnye"
            },
            {
              "label": "Усвяты",
              "slug": "usvyaty"
            }
          ]
        },
        {
          "label": "Ростовская обл.",
          "slug": "rostovskaya-obl.",
          "cities": [
            {
              "label": "Азов",
              "slug": "azov"
            },
            {
              "label": "Аксай",
              "slug": "aksay"
            },
            {
              "label": "Алмазный",
              "slug": "almaznyy"
            },
            {
              "label": "Аютинск",
              "slug": "ayutinsk"
            },
            {
              "label": "Багаевский",
              "slug": "bagaevskiy"
            },
            {
              "label": "Батайск",
              "slug": "bataysk"
            },
            {
              "label": "Белая Калитва",
              "slug": "belaya-kalitva"
            },
            {
              "label": "Боковская",
              "slug": "bokovskaya"
            },
            {
              "label": "Большая Мартыновка",
              "slug": "bolshaya-martynovka"
            },
            {
              "label": "Вешенская",
              "slug": "veshenskaya"
            },
            {
              "label": "Волгодонск",
              "slug": "volgodonsk"
            },
            {
              "label": "Восход",
              "slug": "voshod"
            },
            {
              "label": "Гигант",
              "slug": "gigant"
            },
            {
              "label": "Горняцкий",
              "slug": "gornyackiy"
            },
            {
              "label": "Гуково",
              "slug": "gukovo"
            },
            {
              "label": "Донецк",
              "slug": "doneck"
            },
            {
              "label": "Донской",
              "slug": "donskoy"
            },
            {
              "label": "Дубовское",
              "slug": "dubovskoe"
            },
            {
              "label": "Егорлыкская",
              "slug": "egorlykskaya"
            },
            {
              "label": "Жирнов",
              "slug": "zhirnov"
            },
            {
              "label": "Заветное",
              "slug": "zavetnoe"
            },
            {
              "label": "Заводской",
              "slug": "zavodskoy"
            },
            {
              "label": "Зверево",
              "slug": "zverevo"
            },
            {
              "label": "Зерноград",
              "slug": "zernograd"
            },
            {
              "label": "Зимовники",
              "slug": "zimovniki"
            },
            {
              "label": "Кагальницкая",
              "slug": "kagalnickaya"
            },
            {
              "label": "Казанская",
              "slug": "kazanskaya"
            },
            {
              "label": "Каменоломни",
              "slug": "kamenolomni"
            },
            {
              "label": "Каменск-Шахтинский",
              "slug": "kamensk-shahtinskiy"
            },
            {
              "label": "Кашары",
              "slug": "kashary"
            },
            {
              "label": "Коксовый",
              "slug": "koksovyy"
            },
            {
              "label": "Константиновск",
              "slug": "konstantinovsk"
            },
            {
              "label": "Красный Сулин",
              "slug": "krasnyy-sulin"
            },
            {
              "label": "Куйбышево",
              "slug": "kuybyshevo"
            },
            {
              "label": "Матвеев Курган",
              "slug": "matveev-kurgan"
            },
            {
              "label": "Мигулинская",
              "slug": "migulinskaya"
            },
            {
              "label": "Миллерово",
              "slug": "millerovo"
            },
            {
              "label": "Милютинская",
              "slug": "milyutinskaya"
            },
            {
              "label": "Морозовск",
              "slug": "morozovsk"
            },
            {
              "label": "Новочеркасск",
              "slug": "novocherkassk"
            },
            {
              "label": "Новошахтинск",
              "slug": "novoshahtinsk"
            },
            {
              "label": "Обливская",
              "slug": "oblivskaya"
            },
            {
              "label": "Орловский",
              "slug": "orlovskiy"
            },
            {
              "label": "Песчанокопское",
              "slug": "peschanokopskoe"
            },
            {
              "label": "Покровское",
              "slug": "pokrovskoe"
            },
            {
              "label": "Пролетарск",
              "slug": "proletarsk"
            },
            {
              "label": "Ремонтное",
              "slug": "remontnoe"
            },
            {
              "label": "Родионово-Несветайская",
              "slug": "rodionovo-nesvetayskaya"
            },
            {
              "label": "Ростов-на-Дону",
              "slug": "rostov-na-donu"
            },
            {
              "label": "Сальск",
              "slug": "salsk"
            },
            {
              "label": "Семикаракорск",
              "slug": "semikarakorsk"
            },
            {
              "label": "Таганрог",
              "slug": "taganrog"
            },
            {
              "label": "Тарасовский",
              "slug": "tarasovskiy"
            },
            {
              "label": "Тацинский",
              "slug": "tacinskiy"
            },
            {
              "label": "Усть-Донецкий",
              "slug": "ust-doneckiy"
            },
            {
              "label": "Целина",
              "slug": "celina"
            },
            {
              "label": "Цимлянск",
              "slug": "cimlyansk"
            },
            {
              "label": "Чалтырь",
              "slug": "chaltyr"
            },
            {
              "label": "Чертково",
              "slug": "chertkovo"
            },
            {
              "label": "Шахты",
              "slug": "shahty"
            },
            {
              "label": "Шолоховский",
              "slug": "sholohovskiy"
            }
          ]
        },
        {
          "label": "Рязанская обл.",
          "slug": "ryazanskaya-obl.",
          "cities": [
            {
              "label": "Александро-Невский",
              "slug": "aleksandro-nevskiy"
            },
            {
              "label": "Горняк",
              "slug": "gornyak"
            },
            {
              "label": "Гусь Железный",
              "slug": "gus-zheleznyy"
            },
            {
              "label": "Елатьма",
              "slug": "elatma"
            },
            {
              "label": "Ермишь",
              "slug": "ermish"
            },
            {
              "label": "Заречный",
              "slug": "zarechnyy"
            },
            {
              "label": "Захарово",
              "slug": "zaharovo"
            },
            {
              "label": "Кадом",
              "slug": "kadom"
            },
            {
              "label": "Касимов",
              "slug": "kasimov"
            },
            {
              "label": "Кораблино",
              "slug": "korablino"
            },
            {
              "label": "Милославское",
              "slug": "miloslavskoe"
            },
            {
              "label": "Михайлов",
              "slug": "mihaylov"
            },
            {
              "label": "Пителино",
              "slug": "pitelino"
            },
            {
              "label": "Пронск",
              "slug": "pronsk"
            },
            {
              "label": "Путятино",
              "slug": "putyatino"
            },
            {
              "label": "Рыбное",
              "slug": "rybnoe"
            },
            {
              "label": "Ряжск",
              "slug": "ryazhsk"
            },
            {
              "label": "Рязань",
              "slug": "ryazan"
            },
            {
              "label": "Сапожок",
              "slug": "sapozhok"
            },
            {
              "label": "Сараи",
              "slug": "sarai"
            },
            {
              "label": "Сасово",
              "slug": "sasovo"
            },
            {
              "label": "Скопин",
              "slug": "skopin"
            },
            {
              "label": "Спас-Клепики",
              "slug": "spas-klepiki"
            },
            {
              "label": "Спасск-Рязанский",
              "slug": "spassk-ryazanskiy"
            },
            {
              "label": "Старожилово",
              "slug": "starozhilovo"
            },
            {
              "label": "Ухолово",
              "slug": "uholovo"
            },
            {
              "label": "Чучково",
              "slug": "chuchkovo"
            },
            {
              "label": "Шацк",
              "slug": "shack"
            },
            {
              "label": "Шилово",
              "slug": "shilovo"
            }
          ]
        },
        {
          "label": "Самарская обл.",
          "slug": "samarskaya-obl.",
          "cities": [
            {
              "label": "Алексеевка",
              "slug": "alekseevka"
            },
            {
              "label": "Безенчук",
              "slug": "bezenchuk"
            },
            {
              "label": "Богатое",
              "slug": "bogatoe"
            },
            {
              "label": "Богатырь",
              "slug": "bogatyr"
            },
            {
              "label": "Большая Глущица",
              "slug": "bolshaya-glushchica"
            },
            {
              "label": "Большая Черниговка",
              "slug": "bolshaya-chernigovka"
            },
            {
              "label": "Борское",
              "slug": "borskoe"
            },
            {
              "label": "Волжский",
              "slug": "volzhskiy"
            },
            {
              "label": "Жигулевск",
              "slug": "zhigulevsk"
            },
            {
              "label": "Зольное",
              "slug": "zolnoe"
            },
            {
              "label": "Исаклы",
              "slug": "isakly"
            },
            {
              "label": "Камышла",
              "slug": "kamyshla"
            },
            {
              "label": "Кинель",
              "slug": "kinel"
            },
            {
              "label": "Кинель-Черкасы",
              "slug": "kinel-cherkasy"
            },
            {
              "label": "Клявлино",
              "slug": "klyavlino"
            },
            {
              "label": "Кошки",
              "slug": "koshki"
            },
            {
              "label": "Красноармейское",
              "slug": "krasnoarmeyskoe"
            },
            {
              "label": "Красный Яр",
              "slug": "krasnyy-yar"
            },
            {
              "label": "Куйбышев",
              "slug": "kuybyshev"
            },
            {
              "label": "Нефтегорск",
              "slug": "neftegorsk"
            },
            {
              "label": "Новокуйбышевск",
              "slug": "novokuybyshevsk"
            },
            {
              "label": "Октябрьск",
              "slug": "oktyabrsk"
            },
            {
              "label": "Отрадный",
              "slug": "otradnyy"
            },
            {
              "label": "Пестравка",
              "slug": "pestravka"
            },
            {
              "label": "Похвистнево",
              "slug": "pohvistnevo"
            },
            {
              "label": "Приволжье",
              "slug": "privolzhe"
            },
            {
              "label": "Самара",
              "slug": "samara"
            },
            {
              "label": "Сургут (Самарская обл.)",
              "slug": "surgut-samarskaya-obl."
            },
            {
              "label": "Сызрань",
              "slug": "syzran"
            },
            {
              "label": "Тольятти",
              "slug": "tolyatti"
            },
            {
              "label": "Хворостянка",
              "slug": "hvorostyanka"
            },
            {
              "label": "Чапаевск",
              "slug": "chapaevsk"
            },
            {
              "label": "Челно-Вершины",
              "slug": "chelno-vershiny"
            },
            {
              "label": "Шентала",
              "slug": "shentala"
            },
            {
              "label": "Шигоны",
              "slug": "shigony"
            }
          ]
        },
        {
          "label": "Саратовская обл.",
          "slug": "saratovskaya-obl.",
          "cities": [
            {
              "label": "Александров Гай",
              "slug": "aleksandrov-gay"
            },
            {
              "label": "Аркадак",
              "slug": "arkadak"
            },
            {
              "label": "Аткарск",
              "slug": "atkarsk"
            },
            {
              "label": "Базарный Карабулак",
              "slug": "bazarnyy-karabulak"
            },
            {
              "label": "Балаково",
              "slug": "balakovo"
            },
            {
              "label": "Балашов",
              "slug": "balashov"
            },
            {
              "label": "Балтай",
              "slug": "baltay"
            },
            {
              "label": "Возрождение",
              "slug": "vozrozhdenie"
            },
            {
              "label": "Вольск",
              "slug": "volsk"
            },
            {
              "label": "Воскресенское",
              "slug": "voskresenskoe"
            },
            {
              "label": "Горный",
              "slug": "gornyy"
            },
            {
              "label": "Дергачи",
              "slug": "dergachi"
            },
            {
              "label": "Духовницкое",
              "slug": "duhovnickoe"
            },
            {
              "label": "Екатериновка",
              "slug": "ekaterinovka"
            },
            {
              "label": "Ершов",
              "slug": "ershov"
            },
            {
              "label": "Заречный",
              "slug": "zarechnyy"
            },
            {
              "label": "Ивантеевка",
              "slug": "ivanteevka"
            },
            {
              "label": "Калининск",
              "slug": "kalininsk"
            },
            {
              "label": "Каменский",
              "slug": "kamenskiy"
            },
            {
              "label": "Красноармейск",
              "slug": "krasnoarmeysk"
            },
            {
              "label": "Красный Кут",
              "slug": "krasnyy-kut"
            },
            {
              "label": "Лысые Горы",
              "slug": "lysye-gory"
            },
            {
              "label": "Маркс",
              "slug": "marks"
            },
            {
              "label": "Мокроус",
              "slug": "mokrous"
            },
            {
              "label": "Новоузенск",
              "slug": "novouzensk"
            },
            {
              "label": "Новые Бурасы",
              "slug": "novye-burasy"
            },
            {
              "label": "Озинки",
              "slug": "ozinki"
            },
            {
              "label": "Перелюб",
              "slug": "perelyub"
            },
            {
              "label": "Петровск",
              "slug": "petrovsk"
            },
            {
              "label": "Питерка",
              "slug": "piterka"
            },
            {
              "label": "Пугачев",
              "slug": "pugachev"
            },
            {
              "label": "Ровное",
              "slug": "rovnoe"
            },
            {
              "label": "Романовка",
              "slug": "romanovka"
            },
            {
              "label": "Ртищево",
              "slug": "rtishchevo"
            },
            {
              "label": "Самойловка",
              "slug": "samoylovka"
            },
            {
              "label": "Саратов",
              "slug": "saratov"
            },
            {
              "label": "Степное",
              "slug": "stepnoe"
            },
            {
              "label": "Татищево",
              "slug": "tatishchevo"
            },
            {
              "label": "Турки",
              "slug": "turki"
            },
            {
              "label": "Хвалынск",
              "slug": "hvalynsk"
            },
            {
              "label": "Энгельс",
              "slug": "engels"
            }
          ]
        },
        {
          "label": "Саха (Якутия)",
          "slug": "saha-yakutiya",
          "cities": [
            {
              "label": "Абый",
              "slug": "abyy"
            },
            {
              "label": "Алдан",
              "slug": "aldan"
            },
            {
              "label": "Амга",
              "slug": "amga"
            },
            {
              "label": "Батагай",
              "slug": "batagay"
            },
            {
              "label": "Бердигестях",
              "slug": "berdigestyah"
            },
            {
              "label": "Беркакит",
              "slug": "berkakit"
            },
            {
              "label": "Бестях",
              "slug": "bestyah"
            },
            {
              "label": "Борогонцы",
              "slug": "borogoncy"
            },
            {
              "label": "Верхневилюйск",
              "slug": "verhnevilyuysk"
            },
            {
              "label": "Верхнеколымск",
              "slug": "verhnekolymsk"
            },
            {
              "label": "Верхоянск",
              "slug": "verhoyansk"
            },
            {
              "label": "Вилюйск",
              "slug": "vilyuysk"
            },
            {
              "label": "Витим",
              "slug": "vitim"
            },
            {
              "label": "Власово",
              "slug": "vlasovo"
            },
            {
              "label": "Жиганск",
              "slug": "zhigansk"
            },
            {
              "label": "Зырянка",
              "slug": "zyryanka"
            },
            {
              "label": "Кангалассы",
              "slug": "kangalassy"
            },
            {
              "label": "Канкунский",
              "slug": "kankunskiy"
            },
            {
              "label": "Ленск",
              "slug": "lensk"
            },
            {
              "label": "Майя",
              "slug": "mayya"
            },
            {
              "label": "Менкеря",
              "slug": "menkerya"
            },
            {
              "label": "Мирный",
              "slug": "mirnyy"
            },
            {
              "label": "Нерюнгри",
              "slug": "neryungri"
            },
            {
              "label": "Нычалах",
              "slug": "nychalah"
            },
            {
              "label": "Нюрба",
              "slug": "nyurba"
            },
            {
              "label": "Олекминск",
              "slug": "olekminsk"
            },
            {
              "label": "Покровск",
              "slug": "pokrovsk"
            },
            {
              "label": "Сангар",
              "slug": "sangar"
            },
            {
              "label": "Саскылах",
              "slug": "saskylah"
            },
            {
              "label": "Среднеколымск",
              "slug": "srednekolymsk"
            },
            {
              "label": "Сунтар",
              "slug": "suntar"
            },
            {
              "label": "Тикси",
              "slug": "tiksi"
            },
            {
              "label": "Усть-Мая",
              "slug": "ust-maya"
            },
            {
              "label": "Усть-Нера",
              "slug": "ust-nera"
            },
            {
              "label": "Хандыга",
              "slug": "handyga"
            },
            {
              "label": "Хонуу",
              "slug": "honuu"
            },
            {
              "label": "Черский",
              "slug": "cherskiy"
            },
            {
              "label": "Чокурдах",
              "slug": "chokurdah"
            },
            {
              "label": "Чурапча",
              "slug": "churapcha"
            },
            {
              "label": "Якутск",
              "slug": "yakutsk"
            }
          ]
        },
        {
          "label": "Сахалин",
          "slug": "sahalin",
          "cities": [
            {
              "label": "Александровск-Сахалинский",
              "slug": "aleksandrovsk-sahalinskiy"
            },
            {
              "label": "Анбэцу",
              "slug": "anbecu"
            },
            {
              "label": "Анива",
              "slug": "aniva"
            },
            {
              "label": "Бошняково",
              "slug": "boshnyakovo"
            },
            {
              "label": "Быков",
              "slug": "bykov"
            },
            {
              "label": "Вахрушев",
              "slug": "vahrushev"
            },
            {
              "label": "Взморье",
              "slug": "vzmore"
            },
            {
              "label": "Гастелло",
              "slug": "gastello"
            },
            {
              "label": "Горнозаводск",
              "slug": "gornozavodsk"
            },
            {
              "label": "Долинск",
              "slug": "dolinsk"
            },
            {
              "label": "Ильинский",
              "slug": "ilinskiy"
            },
            {
              "label": "Катангли",
              "slug": "katangli"
            },
            {
              "label": "Корсаков",
              "slug": "korsakov"
            },
            {
              "label": "Курильск",
              "slug": "kurilsk"
            },
            {
              "label": "Макаров",
              "slug": "makarov"
            },
            {
              "label": "Невельск",
              "slug": "nevelsk"
            },
            {
              "label": "Ноглики",
              "slug": "nogliki"
            },
            {
              "label": "Оха",
              "slug": "oha"
            },
            {
              "label": "Поронайск",
              "slug": "poronaysk"
            },
            {
              "label": "Северо-Курильск",
              "slug": "severo-kurilsk"
            },
            {
              "label": "Смирных",
              "slug": "smirnyh"
            },
            {
              "label": "Томари",
              "slug": "tomari"
            },
            {
              "label": "Тымовское",
              "slug": "tymovskoe"
            },
            {
              "label": "Углегорск",
              "slug": "uglegorsk"
            },
            {
              "label": "Холмск",
              "slug": "holmsk"
            },
            {
              "label": "Шахтерск",
              "slug": "shahtersk"
            },
            {
              "label": "Южно-Курильск",
              "slug": "yuzhno-kurilsk"
            },
            {
              "label": "Южно-Сахалинск",
              "slug": "yuzhno-sahalinsk"
            }
          ]
        },
        {
          "label": "Свердловская обл.",
          "slug": "sverdlovskaya-obl.",
          "cities": [
            {
              "label": "Алапаевск",
              "slug": "alapaevsk"
            },
            {
              "label": "Алтынай",
              "slug": "altynay"
            },
            {
              "label": "Арамиль",
              "slug": "aramil"
            },
            {
              "label": "Артемовский",
              "slug": "artemovskiy"
            },
            {
              "label": "Арти",
              "slug": "arti"
            },
            {
              "label": "Асбест",
              "slug": "asbest"
            },
            {
              "label": "Ачит",
              "slug": "achit"
            },
            {
              "label": "Байкалово",
              "slug": "baykalovo"
            },
            {
              "label": "Басьяновский",
              "slug": "basyanovskiy"
            },
            {
              "label": "Белоярский",
              "slug": "beloyarskiy"
            },
            {
              "label": "Березовский",
              "slug": "berezovskiy"
            },
            {
              "label": "Богданович",
              "slug": "bogdanovich"
            },
            {
              "label": "Буланаш",
              "slug": "bulanash"
            },
            {
              "label": "Верхний Тагил",
              "slug": "verhniy-tagil"
            },
            {
              "label": "Верхняя Пышма",
              "slug": "verhnyaya-pyshma"
            },
            {
              "label": "Верхняя Салда",
              "slug": "verhnyaya-salda"
            },
            {
              "label": "Верхняя Синячиха",
              "slug": "verhnyaya-sinyachiha"
            },
            {
              "label": "Верхняя Сысерть",
              "slug": "verhnyaya-sysert"
            },
            {
              "label": "Верхняя Тура",
              "slug": "verhnyaya-tura"
            },
            {
              "label": "Верхотурье",
              "slug": "verhoture"
            },
            {
              "label": "Висим",
              "slug": "visim"
            },
            {
              "label": "Волчанск",
              "slug": "volchansk"
            },
            {
              "label": "Воронцовка",
              "slug": "voroncovka"
            },
            {
              "label": "Гари",
              "slug": "gari"
            },
            {
              "label": "Дегтярск",
              "slug": "degtyarsk"
            },
            {
              "label": "Екатеринбург",
              "slug": "ekaterinburg"
            },
            {
              "label": "Ертарский",
              "slug": "ertarskiy"
            },
            {
              "label": "Заводоуспенское",
              "slug": "zavodouspenskoe"
            },
            {
              "label": "Зыряновский",
              "slug": "zyryanovskiy"
            },
            {
              "label": "Зюзельский",
              "slug": "zyuzelskiy"
            },
            {
              "label": "Ивдель",
              "slug": "ivdel"
            },
            {
              "label": "Изумруд",
              "slug": "izumrud"
            },
            {
              "label": "Ирбит",
              "slug": "irbit"
            },
            {
              "label": "Ис",
              "slug": "is"
            },
            {
              "label": "Каменск-Уральский",
              "slug": "kamensk-uralskiy"
            },
            {
              "label": "Камышлов",
              "slug": "kamyshlov"
            },
            {
              "label": "Карпинск",
              "slug": "karpinsk"
            },
            {
              "label": "Карпунинский",
              "slug": "karpuninskiy"
            },
            {
              "label": "Качканар",
              "slug": "kachkanar"
            },
            {
              "label": "Кировград",
              "slug": "kirovgrad"
            },
            {
              "label": "Краснотурьинск",
              "slug": "krasnoturinsk"
            },
            {
              "label": "Красноуральск",
              "slug": "krasnouralsk"
            },
            {
              "label": "Красноуфимск",
              "slug": "krasnoufimsk"
            },
            {
              "label": "Кушва",
              "slug": "kushva"
            },
            {
              "label": "Лесной",
              "slug": "lesnoy"
            },
            {
              "label": "Михайловск",
              "slug": "mihaylovsk"
            },
            {
              "label": "Невьянск",
              "slug": "nevyansk"
            },
            {
              "label": "Нижние Серги",
              "slug": "nizhnie-sergi"
            },
            {
              "label": "Нижний Тагил",
              "slug": "nizhniy-tagil"
            },
            {
              "label": "Нижняя Салда",
              "slug": "nizhnyaya-salda"
            },
            {
              "label": "Нижняя Тура",
              "slug": "nizhnyaya-tura"
            },
            {
              "label": "Новая Ляля",
              "slug": "novaya-lyalya"
            },
            {
              "label": "Новоуральск",
              "slug": "novouralsk"
            },
            {
              "label": "Оус",
              "slug": "ous"
            },
            {
              "label": "Первоуральск",
              "slug": "pervouralsk"
            },
            {
              "label": "Полевской",
              "slug": "polevskoy"
            },
            {
              "label": "Пышма",
              "slug": "pyshma"
            },
            {
              "label": "Ревда",
              "slug": "revda"
            },
            {
              "label": "Реж",
              "slug": "rezh"
            },
            {
              "label": "Свердловск",
              "slug": "sverdlovsk"
            },
            {
              "label": "Североуральск",
              "slug": "severouralsk"
            },
            {
              "label": "Серов",
              "slug": "serov"
            },
            {
              "label": "Сосьва",
              "slug": "sosva"
            },
            {
              "label": "Среднеуральск",
              "slug": "sredneuralsk"
            },
            {
              "label": "Сухой Лог",
              "slug": "suhoy-log"
            },
            {
              "label": "Сысерть",
              "slug": "sysert"
            },
            {
              "label": "Таборы",
              "slug": "tabory"
            },
            {
              "label": "Тавда",
              "slug": "tavda"
            },
            {
              "label": "Талица",
              "slug": "talica"
            },
            {
              "label": "Тугулым",
              "slug": "tugulym"
            },
            {
              "label": "Туринск",
              "slug": "turinsk"
            },
            {
              "label": "Туринская Слобода",
              "slug": "turinskaya-sloboda"
            }
          ]
        },
        {
          "label": "Северная Осетия",
          "slug": "severnaya-osetiya",
          "cities": [
            {
              "label": "Алагир",
              "slug": "alagir"
            },
            {
              "label": "Ардон",
              "slug": "ardon"
            },
            {
              "label": "Беслан",
              "slug": "beslan"
            },
            {
              "label": "Бурон",
              "slug": "buron"
            },
            {
              "label": "Владикавказ",
              "slug": "vladikavkaz"
            },
            {
              "label": "Дигора",
              "slug": "digora"
            },
            {
              "label": "Моздок",
              "slug": "mozdok"
            },
            {
              "label": "Орджоникидзе",
              "slug": "ordzhonikidze"
            },
            {
              "label": "Чикола",
              "slug": "chikola"
            }
          ]
        },
        {
          "label": "Смоленская обл.",
          "slug": "smolenskaya-obl.",
          "cities": [
            {
              "label": "Велиж",
              "slug": "velizh"
            },
            {
              "label": "Верхнеднепровский",
              "slug": "verhnedneprovskiy"
            },
            {
              "label": "Ворга",
              "slug": "vorga"
            },
            {
              "label": "Вязьма",
              "slug": "vyazma"
            },
            {
              "label": "Гагарин",
              "slug": "gagarin"
            },
            {
              "label": "Глинка",
              "slug": "glinka"
            },
            {
              "label": "Голынки",
              "slug": "golynki"
            },
            {
              "label": "Демидов",
              "slug": "demidov"
            },
            {
              "label": "Десногорск",
              "slug": "desnogorsk"
            },
            {
              "label": "Дорогобуж",
              "slug": "dorogobuzh"
            },
            {
              "label": "Духовщина",
              "slug": "duhovshchina"
            },
            {
              "label": "Екимовичи",
              "slug": "ekimovichi"
            },
            {
              "label": "Ельня",
              "slug": "elnya"
            },
            {
              "label": "Ершичи",
              "slug": "ershichi"
            },
            {
              "label": "Издешково",
              "slug": "izdeshkovo"
            },
            {
              "label": "Кардымово",
              "slug": "kardymovo"
            },
            {
              "label": "Красный",
              "slug": "krasnyy"
            },
            {
              "label": "Монастырщина",
              "slug": "monastyrshchina"
            },
            {
              "label": "Новодугино",
              "slug": "novodugino"
            },
            {
              "label": "Починок",
              "slug": "pochinok"
            },
            {
              "label": "Рославль",
              "slug": "roslavl"
            },
            {
              "label": "Рудня",
              "slug": "rudnya"
            },
            {
              "label": "Сафоново",
              "slug": "safonovo"
            },
            {
              "label": "Смоленск",
              "slug": "smolensk"
            },
            {
              "label": "Сычевка",
              "slug": "sychevka"
            },
            {
              "label": "Угра",
              "slug": "ugra"
            },
            {
              "label": "Хиславичи",
              "slug": "hislavichi"
            },
            {
              "label": "Холм-Жирковский",
              "slug": "holm-zhirkovskiy"
            },
            {
              "label": "Шумячи",
              "slug": "shumyachi"
            },
            {
              "label": "Ярцево",
              "slug": "yarcevo"
            }
          ]
        },
        {
          "label": "Ставропольский край",
          "slug": "stavropolskiy-kray",
          "cities": [
            {
              "label": "Александровское",
              "slug": "aleksandrovskoe"
            },
            {
              "label": "Арзгир",
              "slug": "arzgir"
            },
            {
              "label": "Благодарный",
              "slug": "blagodarnyy"
            },
            {
              "label": "Буденновск",
              "slug": "budennovsk"
            },
            {
              "label": "Георгиевск",
              "slug": "georgievsk"
            },
            {
              "label": "Дивное",
              "slug": "divnoe"
            },
            {
              "label": "Домбай",
              "slug": "dombay"
            },
            {
              "label": "Донское",
              "slug": "donskoe"
            },
            {
              "label": "Ессентуки",
              "slug": "essentuki"
            },
            {
              "label": "Железноводск",
              "slug": "zheleznovodsk"
            },
            {
              "label": "Зеленокумск",
              "slug": "zelenokumsk"
            },
            {
              "label": "Изобильный",
              "slug": "izobilnyy"
            },
            {
              "label": "Иноземцево",
              "slug": "inozemcevo"
            },
            {
              "label": "Ипатово",
              "slug": "ipatovo"
            },
            {
              "label": "Карачаевск",
              "slug": "karachaevsk"
            },
            {
              "label": "Кисловодск",
              "slug": "kislovodsk"
            },
            {
              "label": "Кочубеевское",
              "slug": "kochubeevskoe"
            },
            {
              "label": "Красногвардейское",
              "slug": "krasnogvardeyskoe"
            },
            {
              "label": "Курсавка",
              "slug": "kursavka"
            },
            {
              "label": "Левокумское",
              "slug": "levokumskoe"
            },
            {
              "label": "Минеральные Воды",
              "slug": "mineralnye-vody"
            },
            {
              "label": "Невинномысск",
              "slug": "nevinnomyssk"
            },
            {
              "label": "Нефтекумск",
              "slug": "neftekumsk"
            },
            {
              "label": "Новоалександровск",
              "slug": "novoaleksandrovsk"
            },
            {
              "label": "Новоалександровская",
              "slug": "novoaleksandrovskaya"
            },
            {
              "label": "Новопавловск",
              "slug": "novopavlovsk"
            },
            {
              "label": "Новоселицкое",
              "slug": "novoselickoe"
            },
            {
              "label": "Преградная",
              "slug": "pregradnaya"
            },
            {
              "label": "Пятигорск",
              "slug": "pyatigorsk"
            },
            {
              "label": "Светлоград",
              "slug": "svetlograd"
            },
            {
              "label": "Солнечнодольск",
              "slug": "solnechnodolsk"
            },
            {
              "label": "Ставрополь",
              "slug": "stavropol"
            },
            {
              "label": "Степное",
              "slug": "stepnoe"
            },
            {
              "label": "Теберда",
              "slug": "teberda"
            },
            {
              "label": "Усть-Джегута",
              "slug": "ust-dzheguta"
            },
            {
              "label": "Хабез",
              "slug": "habez"
            },
            {
              "label": "Черкесск",
              "slug": "cherkessk"
            }
          ]
        },
        {
          "label": "Тамбовская обл.",
          "slug": "tambovskaya-obl.",
          "cities": [
            {
              "label": "Бондари",
              "slug": "bondari"
            },
            {
              "label": "Гавриловка Вторая",
              "slug": "gavrilovka-vtoraya"
            },
            {
              "label": "Жердевка",
              "slug": "zherdevka"
            },
            {
              "label": "Знаменка",
              "slug": "znamenka"
            },
            {
              "label": "Инжавино",
              "slug": "inzhavino"
            },
            {
              "label": "Кирсанов",
              "slug": "kirsanov"
            },
            {
              "label": "Котовск",
              "slug": "kotovsk"
            },
            {
              "label": "Мичуринск",
              "slug": "michurinsk"
            },
            {
              "label": "Мордово",
              "slug": "mordovo"
            },
            {
              "label": "Моршанск",
              "slug": "morshansk"
            },
            {
              "label": "Мучкапский",
              "slug": "muchkapskiy"
            },
            {
              "label": "Первомайский",
              "slug": "pervomayskiy"
            },
            {
              "label": "Петровское",
              "slug": "petrovskoe"
            },
            {
              "label": "Пичаево",
              "slug": "pichaevo"
            },
            {
              "label": "Рассказово",
              "slug": "rasskazovo"
            },
            {
              "label": "Ржакса",
              "slug": "rzhaksa"
            },
            {
              "label": "Староюрьево",
              "slug": "staroyurevo"
            },
            {
              "label": "Тамбов",
              "slug": "tambov"
            },
            {
              "label": "Токаревка",
              "slug": "tokarevka"
            },
            {
              "label": "Уварово",
              "slug": "uvarovo"
            },
            {
              "label": "Умет",
              "slug": "umet"
            }
          ]
        },
        {
          "label": "Татарстан",
          "slug": "tatarstan",
          "cities": [
            {
              "label": "Агрыз",
              "slug": "agryz"
            },
            {
              "label": "Азнакаево",
              "slug": "aznakaevo"
            },
            {
              "label": "Аксубаево",
              "slug": "aksubaevo"
            },
            {
              "label": "Актюбинский",
              "slug": "aktyubinskiy"
            },
            {
              "label": "Алексеевское",
              "slug": "alekseevskoe"
            },
            {
              "label": "Альметьевск",
              "slug": "almetevsk"
            },
            {
              "label": "Альметьевск",
              "slug": "almetevsk"
            },
            {
              "label": "Апастово",
              "slug": "apastovo"
            },
            {
              "label": "Арск",
              "slug": "arsk"
            },
            {
              "label": "Бавлы",
              "slug": "bavly"
            },
            {
              "label": "Базарные Матаки",
              "slug": "bazarnye-mataki"
            },
            {
              "label": "Балтаси",
              "slug": "baltasi"
            },
            {
              "label": "Богатые Сабы",
              "slug": "bogatye-saby"
            },
            {
              "label": "Брежнев",
              "slug": "brezhnev"
            },
            {
              "label": "Бугульма",
              "slug": "bugulma"
            },
            {
              "label": "Буинск",
              "slug": "buinsk"
            },
            {
              "label": "Васильево",
              "slug": "vasilevo"
            },
            {
              "label": "Верхний Услон",
              "slug": "verhniy-uslon"
            },
            {
              "label": "Высокая Гора",
              "slug": "vysokaya-gora"
            },
            {
              "label": "Дербешкинский",
              "slug": "derbeshkinskiy"
            },
            {
              "label": "Елабуга",
              "slug": "elabuga"
            },
            {
              "label": "Заинск",
              "slug": "zainsk"
            },
            {
              "label": "Зеленодольск",
              "slug": "zelenodolsk"
            },
            {
              "label": "Казань",
              "slug": "kazan"
            },
            {
              "label": "Камское Устье",
              "slug": "kamskoe-uste"
            },
            {
              "label": "Карабаш",
              "slug": "karabash"
            },
            {
              "label": "Куйбышев",
              "slug": "kuybyshev"
            },
            {
              "label": "Кукмод",
              "slug": "kukmod"
            },
            {
              "label": "Кукмор",
              "slug": "kukmor"
            },
            {
              "label": "Лаишево",
              "slug": "laishevo"
            },
            {
              "label": "Лениногорск",
              "slug": "leninogorsk"
            },
            {
              "label": "Мамадыш",
              "slug": "mamadysh"
            },
            {
              "label": "Менделеевск",
              "slug": "mendeleevsk"
            },
            {
              "label": "Мензелинск",
              "slug": "menzelinsk"
            },
            {
              "label": "Муслюмово",
              "slug": "muslyumovo"
            },
            {
              "label": "Набережные Челны",
              "slug": "naberezhnye-chelny"
            },
            {
              "label": "Нижнекамск",
              "slug": "nizhnekamsk"
            },
            {
              "label": "Новошешминск",
              "slug": "novosheshminsk"
            },
            {
              "label": "Нурлат",
              "slug": "nurlat"
            },
            {
              "label": "Пестрецы",
              "slug": "pestrecy"
            },
            {
              "label": "Рыбная Слобода",
              "slug": "rybnaya-sloboda"
            },
            {
              "label": "Сарманово",
              "slug": "sarmanovo"
            },
            {
              "label": "Старое Дрожжаное",
              "slug": "staroe-drozhzhanoe"
            },
            {
              "label": "Тетюши",
              "slug": "tetyushi"
            },
            {
              "label": "Чистополь",
              "slug": "chistopol"
            }
          ]
        },
        {
          "label": "Тверская обл.",
          "slug": "tverskaya-obl.",
          "cities": [
            {
              "label": "Андреаполь",
              "slug": "andreapol"
            },
            {
              "label": "Бежецк",
              "slug": "bezheck"
            },
            {
              "label": "Белый",
              "slug": "belyy"
            },
            {
              "label": "Белый Городок",
              "slug": "belyy-gorodok"
            },
            {
              "label": "Березайка",
              "slug": "berezayka"
            },
            {
              "label": "Бологое",
              "slug": "bologoe"
            },
            {
              "label": "Васильевский Мох",
              "slug": "vasilevskiy-moh"
            },
            {
              "label": "Выползово",
              "slug": "vypolzovo"
            },
            {
              "label": "Вышний Волочек",
              "slug": "vyshniy-volochek"
            },
            {
              "label": "Жарковский",
              "slug": "zharkovskiy"
            },
            {
              "label": "Западная Двина",
              "slug": "zapadnaya-dvina"
            },
            {
              "label": "Заречье",
              "slug": "zareche"
            },
            {
              "label": "Зубцов",
              "slug": "zubcov"
            },
            {
              "label": "Изоплит",
              "slug": "izoplit"
            },
            {
              "label": "Калашниково",
              "slug": "kalashnikovo"
            },
            {
              "label": "Калинин",
              "slug": "kalinin"
            },
            {
              "label": "Калязин",
              "slug": "kalyazin"
            },
            {
              "label": "Кашин",
              "slug": "kashin"
            },
            {
              "label": "Кесова Гора",
              "slug": "kesova-gora"
            },
            {
              "label": "Кимры",
              "slug": "kimry"
            },
            {
              "label": "Конаково",
              "slug": "konakovo"
            },
            {
              "label": "Красный Холм",
              "slug": "krasnyy-holm"
            },
            {
              "label": "Кувшиново",
              "slug": "kuvshinovo"
            },
            {
              "label": "Лесное",
              "slug": "lesnoe"
            },
            {
              "label": "Лихославль",
              "slug": "lihoslavl"
            },
            {
              "label": "Максатиха",
              "slug": "maksatiha"
            },
            {
              "label": "Молоково",
              "slug": "molokovo"
            },
            {
              "label": "Нелидово",
              "slug": "nelidovo"
            },
            {
              "label": "Оленино",
              "slug": "olenino"
            },
            {
              "label": "Осташков",
              "slug": "ostashkov"
            },
            {
              "label": "Пено",
              "slug": "peno"
            },
            {
              "label": "Рамешки",
              "slug": "rameshki"
            },
            {
              "label": "Ржев",
              "slug": "rzhev"
            },
            {
              "label": "Сандово",
              "slug": "sandovo"
            },
            {
              "label": "Селижарово",
              "slug": "selizharovo"
            },
            {
              "label": "Сонково",
              "slug": "sonkovo"
            },
            {
              "label": "Спирово",
              "slug": "spirovo"
            },
            {
              "label": "Старица",
              "slug": "starica"
            },
            {
              "label": "Тверь",
              "slug": "tver"
            },
            {
              "label": "Торжок",
              "slug": "torzhok"
            },
            {
              "label": "Торопец",
              "slug": "toropec"
            },
            {
              "label": "Удомля",
              "slug": "udomlya"
            },
            {
              "label": "Фирово",
              "slug": "firovo"
            }
          ]
        },
        {
          "label": "Томская обл.",
          "slug": "tomskaya-obl.",
          "cities": [
            {
              "label": "Александровское",
              "slug": "aleksandrovskoe"
            },
            {
              "label": "Асино",
              "slug": "asino"
            },
            {
              "label": "Бакчар",
              "slug": "bakchar"
            },
            {
              "label": "Батурино",
              "slug": "baturino"
            },
            {
              "label": "Белый Яр",
              "slug": "belyy-yar"
            },
            {
              "label": "Зырянское",
              "slug": "zyryanskoe"
            },
            {
              "label": "Итатка",
              "slug": "itatka"
            },
            {
              "label": "Каргасок",
              "slug": "kargasok"
            },
            {
              "label": "Катайга",
              "slug": "katayga"
            },
            {
              "label": "Кожевниково",
              "slug": "kozhevnikovo"
            },
            {
              "label": "Колпашево",
              "slug": "kolpashevo"
            },
            {
              "label": "Кривошеино",
              "slug": "krivosheino"
            },
            {
              "label": "Мельниково",
              "slug": "melnikovo"
            },
            {
              "label": "Молчаново",
              "slug": "molchanovo"
            },
            {
              "label": "Парабель",
              "slug": "parabel"
            },
            {
              "label": "Первомайское",
              "slug": "pervomayskoe"
            },
            {
              "label": "Подгорное",
              "slug": "podgornoe"
            },
            {
              "label": "Северск",
              "slug": "seversk"
            },
            {
              "label": "Стрежевой",
              "slug": "strezhevoy"
            },
            {
              "label": "Томск",
              "slug": "tomsk"
            },
            {
              "label": "Тымск",
              "slug": "tymsk"
            }
          ]
        },
        {
          "label": "Тува (Тувинская Респ.)",
          "slug": "tuva-tuvinskaya-resp.",
          "cities": [
            {
              "label": "Ак-Довурак",
              "slug": "ak-dovurak"
            },
            {
              "label": "Бай Хаак",
              "slug": "bay-haak"
            },
            {
              "label": "Кызыл",
              "slug": "kyzyl"
            },
            {
              "label": "Самагалтай",
              "slug": "samagaltay"
            },
            {
              "label": "Сарыг-Сеп",
              "slug": "saryg-sep"
            },
            {
              "label": "Суть-Холь",
              "slug": "sut-hol"
            },
            {
              "label": "Тоора-Хем",
              "slug": "toora-hem"
            },
            {
              "label": "Туран",
              "slug": "turan"
            },
            {
              "label": "Тээли",
              "slug": "teeli"
            },
            {
              "label": "Хову-Аксы",
              "slug": "hovu-aksy"
            },
            {
              "label": "Чадан",
              "slug": "chadan"
            },
            {
              "label": "Шагонар",
              "slug": "shagonar"
            },
            {
              "label": "Эрзин",
              "slug": "erzin"
            }
          ]
        },
        {
          "label": "Тульская обл.",
          "slug": "tulskaya-obl.",
          "cities": [
            {
              "label": "Агеево",
              "slug": "ageevo"
            },
            {
              "label": "Алексин",
              "slug": "aleksin"
            },
            {
              "label": "Арсеньево",
              "slug": "arsenevo"
            },
            {
              "label": "Барсуки",
              "slug": "barsuki"
            },
            {
              "label": "Бегичевский",
              "slug": "begichevskiy"
            },
            {
              "label": "Белев",
              "slug": "belev"
            },
            {
              "label": "Богородицк",
              "slug": "bogorodick"
            },
            {
              "label": "Болохово",
              "slug": "bolohovo"
            },
            {
              "label": "Велегож",
              "slug": "velegozh"
            },
            {
              "label": "Венев",
              "slug": "venev"
            },
            {
              "label": "Волово",
              "slug": "volovo"
            },
            {
              "label": "Горелки",
              "slug": "gorelki"
            },
            {
              "label": "Донской",
              "slug": "donskoy"
            },
            {
              "label": "Дубна",
              "slug": "dubna"
            },
            {
              "label": "Епифань",
              "slug": "epifan"
            },
            {
              "label": "Ефремов",
              "slug": "efremov"
            },
            {
              "label": "Заокский",
              "slug": "zaokskiy"
            },
            {
              "label": "Казановка",
              "slug": "kazanovka"
            },
            {
              "label": "Кимовск",
              "slug": "kimovsk"
            },
            {
              "label": "Киреевск",
              "slug": "kireevsk"
            },
            {
              "label": "Куркино",
              "slug": "kurkino"
            },
            {
              "label": "Ленинский",
              "slug": "leninskiy"
            },
            {
              "label": "Новомосковск",
              "slug": "novomoskovsk"
            },
            {
              "label": "Одоев",
              "slug": "odoev"
            },
            {
              "label": "Плавск",
              "slug": "plavsk"
            },
            {
              "label": "Суворов",
              "slug": "suvorov"
            },
            {
              "label": "Тула",
              "slug": "tula"
            },
            {
              "label": "Узловая",
              "slug": "uzlovaya"
            },
            {
              "label": "Щекино",
              "slug": "shchekino"
            },
            {
              "label": "Ясногорск",
              "slug": "yasnogorsk"
            }
          ]
        },
        {
          "label": "Тюменская обл.",
          "slug": "tyumenskaya-obl.",
          "cities": [
            {
              "label": "Абатский",
              "slug": "abatskiy"
            },
            {
              "label": "Аксарка",
              "slug": "aksarka"
            },
            {
              "label": "Армизонское",
              "slug": "armizonskoe"
            },
            {
              "label": "Аромашево",
              "slug": "aromashevo"
            },
            {
              "label": "Белоярский",
              "slug": "beloyarskiy"
            },
            {
              "label": "Бердюжье",
              "slug": "berdyuzhe"
            },
            {
              "label": "Большое Сорокино",
              "slug": "bolshoe-sorokino"
            },
            {
              "label": "Вагай",
              "slug": "vagay"
            },
            {
              "label": "Викулово",
              "slug": "vikulovo"
            },
            {
              "label": "Винзили",
              "slug": "vinzili"
            },
            {
              "label": "Голышманово",
              "slug": "golyshmanovo"
            },
            {
              "label": "Губкинский",
              "slug": "gubkinskiy"
            },
            {
              "label": "Заводопетровский",
              "slug": "zavodopetrovskiy"
            },
            {
              "label": "Заводоуковск",
              "slug": "zavodoukovsk"
            },
            {
              "label": "Излучинск",
              "slug": "izluchinsk"
            },
            {
              "label": "Исетское",
              "slug": "isetskoe"
            },
            {
              "label": "Ишим",
              "slug": "ishim"
            },
            {
              "label": "Казанское",
              "slug": "kazanskoe"
            },
            {
              "label": "Казым-Мыс",
              "slug": "kazym-mys"
            },
            {
              "label": "Когалым",
              "slug": "kogalym"
            },
            {
              "label": "Кондинское",
              "slug": "kondinskoe"
            },
            {
              "label": "Красноселькуп",
              "slug": "krasnoselkup"
            },
            {
              "label": "Лабытнанги",
              "slug": "labytnangi"
            },
            {
              "label": "Ларьяк",
              "slug": "laryak"
            },
            {
              "label": "Мегион",
              "slug": "megion"
            },
            {
              "label": "Мужи",
              "slug": "muzhi"
            },
            {
              "label": "Муравленко",
              "slug": "muravlenko"
            },
            {
              "label": "Надым",
              "slug": "nadym"
            },
            {
              "label": "Находка",
              "slug": "nahodka"
            },
            {
              "label": "Нефтеюганск",
              "slug": "nefteyugansk"
            },
            {
              "label": "Нижневартовск",
              "slug": "nizhnevartovsk"
            },
            {
              "label": "Нижняя Тавда",
              "slug": "nizhnyaya-tavda"
            },
            {
              "label": "Новый Уренгой",
              "slug": "novyy-urengoy"
            },
            {
              "label": "Ноябрьск",
              "slug": "noyabrsk"
            },
            {
              "label": "Нягань",
              "slug": "nyagan"
            },
            {
              "label": "Октябрьское",
              "slug": "oktyabrskoe"
            },
            {
              "label": "Омутинский",
              "slug": "omutinskiy"
            },
            {
              "label": "Радужный",
              "slug": "raduzhnyy"
            },
            {
              "label": "Салехард",
              "slug": "salehard"
            },
            {
              "label": "Сладково",
              "slug": "sladkovo"
            },
            {
              "label": "Советский",
              "slug": "sovetskiy"
            },
            {
              "label": "Сургут",
              "slug": "surgut"
            },
            {
              "label": "Тазовский",
              "slug": "tazovskiy"
            },
            {
              "label": "Тарко-Сале",
              "slug": "tarko-sale"
            },
            {
              "label": "Тобольск",
              "slug": "tobolsk"
            },
            {
              "label": "Тюмень",
              "slug": "tyumen"
            },
            {
              "label": "Уват",
              "slug": "uvat"
            },
            {
              "label": "Унъюган",
              "slug": "unyugan"
            },
            {
              "label": "Упорово",
              "slug": "uporovo"
            },
            {
              "label": "Урай",
              "slug": "uray"
            },
            {
              "label": "Ханты-Мансийск",
              "slug": "hanty-mansiysk"
            },
            {
              "label": "Юрибей",
              "slug": "yuribey"
            },
            {
              "label": "Ялуторовск",
              "slug": "yalutorovsk"
            },
            {
              "label": "Яр-Сале",
              "slug": "yar-sale"
            },
            {
              "label": "Ярково",
              "slug": "yarkovo"
            }
          ]
        },
        {
          "label": "Удмуртия",
          "slug": "udmurtiya",
          "cities": [
            {
              "label": "Алнаши",
              "slug": "alnashi"
            },
            {
              "label": "Балезино",
              "slug": "balezino"
            },
            {
              "label": "Вавож",
              "slug": "vavozh"
            },
            {
              "label": "Воткинск",
              "slug": "votkinsk"
            },
            {
              "label": "Глазов",
              "slug": "glazov"
            },
            {
              "label": "Грахово",
              "slug": "grahovo"
            },
            {
              "label": "Дебесы",
              "slug": "debesy"
            },
            {
              "label": "Завьялово",
              "slug": "zavyalovo"
            },
            {
              "label": "Игра",
              "slug": "igra"
            },
            {
              "label": "Ижевск",
              "slug": "izhevsk"
            },
            {
              "label": "Кама",
              "slug": "kama"
            },
            {
              "label": "Камбарка",
              "slug": "kambarka"
            },
            {
              "label": "Каракулино",
              "slug": "karakulino"
            },
            {
              "label": "Кез",
              "slug": "kez"
            },
            {
              "label": "Кизнер",
              "slug": "kizner"
            },
            {
              "label": "Киясово",
              "slug": "kiyasovo"
            },
            {
              "label": "Красногорское",
              "slug": "krasnogorskoe"
            },
            {
              "label": "Можга",
              "slug": "mozhga"
            },
            {
              "label": "Сарапул",
              "slug": "sarapul"
            },
            {
              "label": "Селты",
              "slug": "selty"
            },
            {
              "label": "Сюмси",
              "slug": "syumsi"
            },
            {
              "label": "Ува",
              "slug": "uva"
            },
            {
              "label": "Устинов",
              "slug": "ustinov"
            },
            {
              "label": "Шаркан",
              "slug": "sharkan"
            },
            {
              "label": "Юкаменское",
              "slug": "yukamenskoe"
            },
            {
              "label": "Якшур-Бодья",
              "slug": "yakshur-bodya"
            },
            {
              "label": "Яр",
              "slug": "yar"
            }
          ]
        },
        {
          "label": "Ульяновская обл.",
          "slug": "ulyanovskaya-obl.",
          "cities": [
            {
              "label": "Базарный Сызган",
              "slug": "bazarnyy-syzgan"
            },
            {
              "label": "Барыш",
              "slug": "barysh"
            },
            {
              "label": "Большое Нагаткино",
              "slug": "bolshoe-nagatkino"
            },
            {
              "label": "Вешкайма",
              "slug": "veshkayma"
            },
            {
              "label": "Глотовка",
              "slug": "glotovka"
            },
            {
              "label": "Димитровград",
              "slug": "dimitrovgrad"
            },
            {
              "label": "Игнатовка",
              "slug": "ignatovka"
            },
            {
              "label": "Измайлово",
              "slug": "izmaylovo"
            },
            {
              "label": "Инза",
              "slug": "inza"
            },
            {
              "label": "Ишеевка",
              "slug": "isheevka"
            },
            {
              "label": "Канадей",
              "slug": "kanadey"
            },
            {
              "label": "Карсун",
              "slug": "karsun"
            },
            {
              "label": "Кузоватово",
              "slug": "kuzovatovo"
            },
            {
              "label": "Майна",
              "slug": "mayna"
            },
            {
              "label": "Новая Малыкла",
              "slug": "novaya-malykla"
            },
            {
              "label": "Новоспасское",
              "slug": "novospasskoe"
            },
            {
              "label": "Павловка",
              "slug": "pavlovka"
            },
            {
              "label": "Радищево",
              "slug": "radishchevo"
            },
            {
              "label": "Сенгилей",
              "slug": "sengiley"
            },
            {
              "label": "Старая Кулатка",
              "slug": "staraya-kulatka"
            },
            {
              "label": "Старая Майна",
              "slug": "staraya-mayna"
            },
            {
              "label": "Сурское",
              "slug": "surskoe"
            },
            {
              "label": "Тереньга",
              "slug": "terenga"
            },
            {
              "label": "Ульяновск",
              "slug": "ulyanovsk"
            },
            {
              "label": "Чердаклы",
              "slug": "cherdakly"
            }
          ]
        },
        {
          "label": "Уральская обл.",
          "slug": "uralskaya-obl.",
          "cities": [
            {
              "label": "Аксай",
              "slug": "aksay"
            },
            {
              "label": "Дарьинское",
              "slug": "darinskoe"
            },
            {
              "label": "Деркул",
              "slug": "derkul"
            },
            {
              "label": "Джамбейты",
              "slug": "dzhambeyty"
            },
            {
              "label": "Джаныбек",
              "slug": "dzhanybek"
            },
            {
              "label": "Казталовка",
              "slug": "kaztalovka"
            },
            {
              "label": "Калмыково",
              "slug": "kalmykovo"
            },
            {
              "label": "Каратобе",
              "slug": "karatobe"
            },
            {
              "label": "Переметное",
              "slug": "peremetnoe"
            },
            {
              "label": "Сайхин",
              "slug": "sayhin"
            },
            {
              "label": "Уральск",
              "slug": "uralsk"
            },
            {
              "label": "Федоровка",
              "slug": "fedorovka"
            },
            {
              "label": "Фурманово",
              "slug": "furmanovo"
            },
            {
              "label": "Чапаев",
              "slug": "chapaev"
            }
          ]
        },
        {
          "label": "Хабаровский край",
          "slug": "habarovskiy-kray",
          "cities": [
            {
              "label": "Амурск",
              "slug": "amursk"
            },
            {
              "label": "Аян",
              "slug": "ayan"
            },
            {
              "label": "Березовый",
              "slug": "berezovyy"
            },
            {
              "label": "Бикин",
              "slug": "bikin"
            },
            {
              "label": "Бира",
              "slug": "bira"
            },
            {
              "label": "Биракан",
              "slug": "birakan"
            },
            {
              "label": "Богородское",
              "slug": "bogorodskoe"
            },
            {
              "label": "Болонь",
              "slug": "bolon"
            },
            {
              "label": "Ванино",
              "slug": "vanino"
            },
            {
              "label": "Волочаевка Вторая",
              "slug": "volochaevka-vtoraya"
            },
            {
              "label": "Высокогорный",
              "slug": "vysokogornyy"
            },
            {
              "label": "Вяземский",
              "slug": "vyazemskiy"
            },
            {
              "label": "Горный",
              "slug": "gornyy"
            },
            {
              "label": "Гурское",
              "slug": "gurskoe"
            },
            {
              "label": "Дормидонтовка",
              "slug": "dormidontovka"
            },
            {
              "label": "Заветы Ильича",
              "slug": "zavety-ilicha"
            },
            {
              "label": "Известковый",
              "slug": "izvestkovyy"
            },
            {
              "label": "Иннокентьевка",
              "slug": "innokentevka"
            },
            {
              "label": "Комсомольск-на-Амуре",
              "slug": "komsomolsk-na-amure"
            },
            {
              "label": "Ленинское",
              "slug": "leninskoe"
            },
            {
              "label": "Нелькан",
              "slug": "nelkan"
            },
            {
              "label": "Николаевск-на-Амуре",
              "slug": "nikolaevsk-na-amure"
            },
            {
              "label": "Облучье",
              "slug": "obluche"
            },
            {
              "label": "Охотск",
              "slug": "ohotsk"
            },
            {
              "label": "Переяславка",
              "slug": "pereyaslavka"
            },
            {
              "label": "Смидович",
              "slug": "smidovich"
            },
            {
              "label": "Советская Гавань",
              "slug": "sovetskaya-gavan"
            },
            {
              "label": "Софийск",
              "slug": "sofiysk"
            },
            {
              "label": "Троицкое",
              "slug": "troickoe"
            },
            {
              "label": "Тугур",
              "slug": "tugur"
            },
            {
              "label": "Хабаровск",
              "slug": "habarovsk"
            },
            {
              "label": "Чегдомын",
              "slug": "chegdomyn"
            },
            {
              "label": "Чумикан",
              "slug": "chumikan"
            }
          ]
        },
        {
          "label": "Хакасия",
          "slug": "hakasiya",
          "cities": [
            {
              "label": "Абакан",
              "slug": "abakan"
            },
            {
              "label": "Саяногорск",
              "slug": "sayanogorsk"
            }
          ]
        },
        {
          "label": "Ханты-Мансийский АО",
          "slug": "hanty-mansiyskiy-ao",
          "cities": [
            {
              "label": "Аган",
              "slug": "agan"
            },
            {
              "label": "Игрим",
              "slug": "igrim"
            },
            {
              "label": "Излучинск",
              "slug": "izluchinsk"
            },
            {
              "label": "Лангепас",
              "slug": "langepas"
            },
            {
              "label": "Лянтор",
              "slug": "lyantor"
            },
            {
              "label": "Мегион",
              "slug": "megion"
            },
            {
              "label": "Нефтеюганск",
              "slug": "nefteyugansk"
            },
            {
              "label": "Нижневартовск",
              "slug": "nizhnevartovsk"
            },
            {
              "label": "Нягань",
              "slug": "nyagan"
            },
            {
              "label": "Покачи",
              "slug": "pokachi"
            },
            {
              "label": "Приобье",
              "slug": "priobe"
            },
            {
              "label": "Пыть-Ях",
              "slug": "pyt-yah"
            },
            {
              "label": "Радужный",
              "slug": "raduzhnyy"
            },
            {
              "label": "Сургут",
              "slug": "surgut"
            },
            {
              "label": "Урай",
              "slug": "uray"
            },
            {
              "label": "Ханты-Мансийск",
              "slug": "hanty-mansiysk"
            },
            {
              "label": "Югорск",
              "slug": "yugorsk"
            }
          ]
        },
        {
          "label": "Челябинская обл.",
          "slug": "chelyabinskaya-obl.",
          "cities": [
            {
              "label": "Агаповка",
              "slug": "agapovka"
            },
            {
              "label": "Аргаяш",
              "slug": "argayash"
            },
            {
              "label": "Аша",
              "slug": "asha"
            },
            {
              "label": "Бакал",
              "slug": "bakal"
            },
            {
              "label": "Бреды",
              "slug": "bredy"
            },
            {
              "label": "Варна",
              "slug": "varna"
            },
            {
              "label": "Верхнеуральск",
              "slug": "verhneuralsk"
            },
            {
              "label": "Верхний Уфалей",
              "slug": "verhniy-ufaley"
            },
            {
              "label": "Еманжелинск",
              "slug": "emanzhelinsk"
            },
            {
              "label": "Златоуст",
              "slug": "zlatoust"
            },
            {
              "label": "Карабаш",
              "slug": "karabash"
            },
            {
              "label": "Карталы",
              "slug": "kartaly"
            },
            {
              "label": "Касли",
              "slug": "kasli"
            },
            {
              "label": "Катав-Ивановск",
              "slug": "katav-ivanovsk"
            },
            {
              "label": "Копейск",
              "slug": "kopeysk"
            },
            {
              "label": "Коркино",
              "slug": "korkino"
            },
            {
              "label": "Кунашак",
              "slug": "kunashak"
            },
            {
              "label": "Куса",
              "slug": "kusa"
            },
            {
              "label": "Кыштым",
              "slug": "kyshtym"
            },
            {
              "label": "Магнитогорск",
              "slug": "magnitogorsk"
            },
            {
              "label": "Миасс",
              "slug": "miass"
            },
            {
              "label": "Озерск",
              "slug": "ozersk"
            },
            {
              "label": "Октябрьское",
              "slug": "oktyabrskoe"
            },
            {
              "label": "Пласт",
              "slug": "plast"
            },
            {
              "label": "Сатка",
              "slug": "satka"
            },
            {
              "label": "Сим",
              "slug": "sim"
            },
            {
              "label": "Снежинск",
              "slug": "snezhinsk"
            },
            {
              "label": "Трехгорный",
              "slug": "trehgornyy"
            },
            {
              "label": "Троицк",
              "slug": "troick"
            },
            {
              "label": "Увельский",
              "slug": "uvelskiy"
            },
            {
              "label": "Уйское",
              "slug": "uyskoe"
            },
            {
              "label": "Усть-Катав",
              "slug": "ust-katav"
            },
            {
              "label": "Фершампенуаз",
              "slug": "fershampenuaz"
            },
            {
              "label": "Чебаркуль",
              "slug": "chebarkul"
            },
            {
              "label": "Челябинск",
              "slug": "chelyabinsk"
            },
            {
              "label": "Чесма",
              "slug": "chesma"
            },
            {
              "label": "Южно-Уральск",
              "slug": "yuzhno-uralsk"
            },
            {
              "label": "Юрюзань",
              "slug": "yuryuzan"
            }
          ]
        },
        {
          "label": "Чечено-Ингушетия",
          "slug": "checheno-ingushetiya",
          "cities": [
            {
              "label": "Аргун",
              "slug": "argun"
            },
            {
              "label": "Грозный",
              "slug": "groznyy"
            },
            {
              "label": "Гудермез",
              "slug": "gudermez"
            },
            {
              "label": "Малгобек",
              "slug": "malgobek"
            },
            {
              "label": "Назрань",
              "slug": "nazran"
            },
            {
              "label": "Наурская",
              "slug": "naurskaya"
            },
            {
              "label": "Ножай-Юрт",
              "slug": "nozhay-yurt"
            },
            {
              "label": "Орджоникидзевская",
              "slug": "ordzhonikidzevskaya"
            },
            {
              "label": "Советское",
              "slug": "sovetskoe"
            },
            {
              "label": "Урус-Мартан",
              "slug": "urus-martan"
            },
            {
              "label": "Шали",
              "slug": "shali"
            }
          ]
        },
        {
          "label": "Читинская обл.",
          "slug": "chitinskaya-obl.",
          "cities": [
            {
              "label": "Агинское",
              "slug": "aginskoe"
            },
            {
              "label": "Аксеново-Зиловское",
              "slug": "aksenovo-zilovskoe"
            },
            {
              "label": "Акша",
              "slug": "aksha"
            },
            {
              "label": "Александровский Завод",
              "slug": "aleksandrovskiy-zavod"
            },
            {
              "label": "Амазар",
              "slug": "amazar"
            },
            {
              "label": "Арбагар",
              "slug": "arbagar"
            },
            {
              "label": "Атамановка",
              "slug": "atamanovka"
            },
            {
              "label": "Балей",
              "slug": "baley"
            },
            {
              "label": "Борзя",
              "slug": "borzya"
            },
            {
              "label": "Букачача",
              "slug": "bukachacha"
            },
            {
              "label": "Газимурский Завод",
              "slug": "gazimurskiy-zavod"
            },
            {
              "label": "Давенда",
              "slug": "davenda"
            },
            {
              "label": "Дарасун",
              "slug": "darasun"
            },
            {
              "label": "Дровяная",
              "slug": "drovyanaya"
            },
            {
              "label": "Дульдурга",
              "slug": "duldurga"
            },
            {
              "label": "Жиндо",
              "slug": "zhindo"
            },
            {
              "label": "Забайкальск",
              "slug": "zabaykalsk"
            },
            {
              "label": "Итака",
              "slug": "itaka"
            },
            {
              "label": "Калга",
              "slug": "kalga"
            },
            {
              "label": "Карымское",
              "slug": "karymskoe"
            },
            {
              "label": "Кличка",
              "slug": "klichka"
            },
            {
              "label": "Ключевский",
              "slug": "klyuchevskiy"
            },
            {
              "label": "Кокуй",
              "slug": "kokuy"
            },
            {
              "label": "Краснокаменск",
              "slug": "krasnokamensk"
            },
            {
              "label": "Красный Чикой",
              "slug": "krasnyy-chikoy"
            },
            {
              "label": "Кыра",
              "slug": "kyra"
            },
            {
              "label": "Моготуй",
              "slug": "mogotuy"
            },
            {
              "label": "Могоча",
              "slug": "mogocha"
            },
            {
              "label": "Нерчинск",
              "slug": "nerchinsk"
            },
            {
              "label": "Нерчинский Завод",
              "slug": "nerchinskiy-zavod"
            },
            {
              "label": "Нижний Часучей",
              "slug": "nizhniy-chasuchey"
            },
            {
              "label": "Оловянная",
              "slug": "olovyannaya"
            },
            {
              "label": "Первомайский",
              "slug": "pervomayskiy"
            },
            {
              "label": "Петровск-Забайкальский",
              "slug": "petrovsk-zabaykalskiy"
            },
            {
              "label": "Приаргунск",
              "slug": "priargunsk"
            },
            {
              "label": "Сретенск",
              "slug": "sretensk"
            },
            {
              "label": "Тупик",
              "slug": "tupik"
            },
            {
              "label": "Улеты",
              "slug": "ulety"
            },
            {
              "label": "Хилок",
              "slug": "hilok"
            },
            {
              "label": "Чара",
              "slug": "chara"
            },
            {
              "label": "Чернышевск",
              "slug": "chernyshevsk"
            },
            {
              "label": "Чита",
              "slug": "chita"
            },
            {
              "label": "Шелопугино",
              "slug": "shelopugino"
            },
            {
              "label": "Шилка",
              "slug": "shilka"
            }
          ]
        },
        {
          "label": "Чувашия",
          "slug": "chuvashiya",
          "cities": [
            {
              "label": "Алатырь",
              "slug": "alatyr"
            },
            {
              "label": "Аликово",
              "slug": "alikovo"
            },
            {
              "label": "Батырева",
              "slug": "batyreva"
            },
            {
              "label": "Буинск",
              "slug": "buinsk"
            },
            {
              "label": "Вурнары",
              "slug": "vurnary"
            },
            {
              "label": "Ибреси",
              "slug": "ibresi"
            },
            {
              "label": "Канаш",
              "slug": "kanash"
            },
            {
              "label": "Киря",
              "slug": "kirya"
            },
            {
              "label": "Комсомольское",
              "slug": "komsomolskoe"
            },
            {
              "label": "Красноармейское",
              "slug": "krasnoarmeyskoe"
            },
            {
              "label": "Красные Четаи",
              "slug": "krasnye-chetai"
            },
            {
              "label": "Кугеси",
              "slug": "kugesi"
            },
            {
              "label": "Мариинский Посад",
              "slug": "mariinskiy-posad"
            },
            {
              "label": "Моргауши",
              "slug": "morgaushi"
            },
            {
              "label": "Новочебоксарск",
              "slug": "novocheboksarsk"
            },
            {
              "label": "Порецкое",
              "slug": "poreckoe"
            },
            {
              "label": "Урмары",
              "slug": "urmary"
            },
            {
              "label": "Цивильск",
              "slug": "civilsk"
            },
            {
              "label": "Чебоксары",
              "slug": "cheboksary"
            },
            {
              "label": "Шемурша",
              "slug": "shemursha"
            },
            {
              "label": "Шумерля",
              "slug": "shumerlya"
            },
            {
              "label": "Ядрин",
              "slug": "yadrin"
            },
            {
              "label": "Яльчики",
              "slug": "yalchiki"
            },
            {
              "label": "Янтиково",
              "slug": "yantikovo"
            }
          ]
        },
        {
          "label": "Чукотский АО",
          "slug": "chukotskiy-ao",
          "cities": [
            {
              "label": "Анадырь",
              "slug": "anadyr"
            },
            {
              "label": "Билибино",
              "slug": "bilibino"
            }
          ]
        },
        {
          "label": "Ямало-Ненецкий АО",
          "slug": "yamalo-neneckiy-ao",
          "cities": [
            {
              "label": "Губкинский",
              "slug": "gubkinskiy"
            },
            {
              "label": "Заполярный",
              "slug": "zapolyarnyy"
            },
            {
              "label": "Муравленко",
              "slug": "muravlenko"
            },
            {
              "label": "Надым",
              "slug": "nadym"
            },
            {
              "label": "Новый Уренгой",
              "slug": "novyy-urengoy"
            },
            {
              "label": "Ноябрьск",
              "slug": "noyabrsk"
            },
            {
              "label": "Пуровск",
              "slug": "purovsk"
            },
            {
              "label": "Салехард",
              "slug": "salehard"
            },
            {
              "label": "Тарко",
              "slug": "tarko"
            }
          ]
        },
        {
          "label": "Ярославская обл.",
          "slug": "yaroslavskaya-obl.",
          "cities": [
            {
              "label": "Андропов",
              "slug": "andropov"
            },
            {
              "label": "Берендеево",
              "slug": "berendeevo"
            },
            {
              "label": "Большое Село",
              "slug": "bolshoe-selo"
            },
            {
              "label": "Борисоглебский",
              "slug": "borisoglebskiy"
            },
            {
              "label": "Брейтово",
              "slug": "breytovo"
            },
            {
              "label": "Бурмакино",
              "slug": "burmakino"
            },
            {
              "label": "Варегово",
              "slug": "varegovo"
            },
            {
              "label": "Волга",
              "slug": "volga"
            },
            {
              "label": "Гаврилов Ям",
              "slug": "gavrilov-yam"
            },
            {
              "label": "Данилов",
              "slug": "danilov"
            },
            {
              "label": "Любим",
              "slug": "lyubim"
            },
            {
              "label": "Мышкино",
              "slug": "myshkino"
            },
            {
              "label": "Некрасовское",
              "slug": "nekrasovskoe"
            },
            {
              "label": "Новый Некоуз",
              "slug": "novyy-nekouz"
            },
            {
              "label": "Переславль-Залесский",
              "slug": "pereslavl-zalesskiy"
            },
            {
              "label": "Пошехонье-Володарск",
              "slug": "poshehone-volodarsk"
            },
            {
              "label": "Ростов",
              "slug": "rostov"
            },
            {
              "label": "Рыбинск",
              "slug": "rybinsk"
            },
            {
              "label": "Тутаев",
              "slug": "tutaev"
            },
            {
              "label": "Углич",
              "slug": "uglich"
            },
            {
              "label": "Ярославль",
              "slug": "yaroslavl"
            }
          ]
        }
      ],
      newArray: [],
    }
  },
  computed: {
    ...mapGetters([
      'getFlatLocalitiesList',
    ]),
    ...mapState([
      'federalRegions',
      'filterDataDefault',
    ]),
    //  latitude / широта
    stepLat() {
      const stepLatValue = ((this.coords1[0] - this.coords3[0]) / 30);
      // console.log('stepLatValue', stepLatValue);
      return stepLatValue;
    },
    // longitude / долгота
    stepLon() {
      const stepLonValue = ((this.coords2[1] - this.coords1[1]) / 30);
      return stepLonValue;
    },
  },
  methods: {
    modifyTownsList() {
      this.newArray = this.federalRegions.map(
        item => {
          const newArrayLocalities = item.localities.map(
            subItem => {
              const locality = {
                'type': 'city',
                'slug': slugify(subItem.label),
                'label': subItem.label,
                'districts': [
                  {
                    'label': '',
                    'slug': '',
                  },
                  {
                    'label': 'Центр',
                    'slug': 'center',
                  },
                  {
                    'label': 'Пригород',
                    'slug': 'suburb',
                  }
                ]
              };
              return locality;
            }
          );
          const obl = {
            'type': item.type,
            'slug': slugify(item.label),
            'label': item.label,
            'localities': newArrayLocalities,
          };
          return obl;
          // this.federalRegionsArrayOldNew = this.federalRegionsArrayOld;
        }
      );
      // console.log('newArray', newArray);
      // const fullLength = this.filterDataDefault.town.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionLabel = this.filterDataDefault.town[i].region;
      //   const regionSlug = slugify(this.filterDataDefault.town[i].region);
      //   const regionCity = this.filterDataDefault.town[i].city;
      //   const regionObject = {
      //     label: regionLabel,
      //     slug: regionSlug,
      //   };
      //   const flag = this.federalRegionsArrayOld.some(
      //     item => item.slug === regionSlug
      //   )
      //   if (!flag) {
      //     this.federalRegionsArrayOld.push(regionObject);
      //   }
      // }

      // const fullLength = this.filterDataDefault.town.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionLabel = this.filterDataDefault.town[i].region;
      //   const regionSlug = slugify(this.filterDataDefault.town[i].region);
      //   const regionObject = {
      //     label: regionLabel,
      //     slug: regionSlug,
      //   };
      //   const flag = this.federalRegionsArrayOld.some(
      //     item => item.slug === regionSlug
      //   )
      //   if (!flag) {
      //     this.federalRegionsArrayOld.push(regionObject);
      //   }
      // }

      // const fullLength = this.federalRegions.length;
      // for(let i = 0; i < fullLength; i++) {
      //   const regionSlug = slugify(this.federalRegions[i].label);
      //   this.federalRegions[i].slug = regionSlug;
      // }

      // console.log('this.federalRegions', this.federalRegions, this.federalRegions.length);
      // this.federalRegions.forEach(
      //   (item, index) => {
      //     if (item.type === 'obl') {
      //       console.log(index, item.label);
      //     }
      //   }
      // );
    },
    validate() {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      const query = this.query;
      const appID = 'TPqfwho_hEfIAMTcZzYC1cg2Gagma7rpDUTrq0KD6gY';
      const apiKey = 'TPqfwho_hEfIAMTcZzYC1cg2Gagma7rpDUTrq0KD6gY';
      const url = `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?apiKey=${appID}&maxresults=1&query=${query}`;
      const urlParis = 'https://geocode.search.hereapi.com/v1/geocode?q=5+Rue+Daunou%2C+75000+Paris%2C+France';

      const urlPetrolNear = 
        `https://discover.search.hereapi.com/v1/
          discover
          ?at=52.5228,13.412
          &q=petrol+station
          &limit=5
          &lang=en-US
          &apiKey=${apiKey}`;

      const urlGeocode = 
        `http://geocode.search.hereapi.com/v1/
          geocode
          ?q=Invalidenstr+117%2C+Berlin
          &apiKey=${apiKey}`;

      axios.get(
        urlGeocode,
        config
      )
        .then(result => {
          console.log(
            'result ::',
            result.json(),
          );
        }).catch((error) => {
          console.log('error ::', error);
        });
      // return fetch(`https://geocoder.api.here.com/6.2/geocode.json?app_id=APP_ID_HERE&app_code=APP_CODE_HERE&searchtext=${query}`)
      //   .then(result => result.json())
      //   .then(result => {
      //     if(result.Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
      //       let data = result.Response.View[0].Result[0];
      //       return data;
      //     }
      //   }, error => {
      //     console.error(error);
      //   });
    },
    getAddress(coords) {
      ymaps.geocode(coords).then(
        res => {
          console.log('res 0 ::', res.geoObjects);
          const firstGeoObject = res.geoObjects.get(0);
          const addressArray = firstGeoObject.properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
          let selectedAddressArray = [];
          let selectedAddress = '';

          addressArray.forEach(
            (item, index) => {
              if (index === 2 && item.kind === 'province') {
                selectedAddressArray.push(item.name);
              } else if (item.kind === 'locality') {
                selectedAddressArray.push(item.name);
              } else {
                if (item.kind === 'street' || item.kind === 'house') {
                  if (item.kind === 'street') {
                    selectedAddressArray.push(item.name);
                  } else if (item.kind === 'house') {
                    selectedAddressArray.push(item.name);
                  }
                } else if (item.kind === 'district') {
                  selectedAddressArray.push(item.name);
                }
              }
            }
          )

          selectedAddressArray.forEach(
            (item, index) => {
              if (index === 0) {
                selectedAddress = item;
              } else {
                selectedAddress += ', ' + item;
              }
            }
          );

          // console.log(
          //   '::',
          //   firstGeoObject.getLocalities()[0],
          //   firstGeoObject._xalEntities.administrativeAreas[0],
          //   firstGeoObject._xalEntities.thoroughfare,
          //   firstGeoObject._xalEntities.premiseNumber,
          //   firstGeoObject.getLocalities(),
          //   firstGeoObject.getAdministrativeAreas(),
          //   firstGeoObject.getPremise(),
          //   firstGeoObject.getThoroughfare(),
          //   firstGeoObject.properties.getAll().text
          // );

          this.currentAddress = selectedAddress;
        },
        error => {
          console.log('Rejected [Geocode error] ::', error);
        }
      );
    },
    getDistrict(cityName) {
      ymaps.geocode(cityName).then(
        res => {
          const coords = res.geoObjects.get(0).geometry.getCoordinates();
          const step = 0.001;
          // console.log('coords ::', coords[0], coords[1]);
          // console.log('coords 1 ::', coords[0] + step, coords[1] + step);
          // console.log('coords 2 ::', coords[0] + step * 2, coords[1] + step * 2);
          let changedCoords = [];

          // console.log('getDistrict res step ymapsGeocode 1 ::');
          function ymapsGeocode(coords) {
            // console.log('ymapsGeocode 2 ::');
            ymaps.geocode(
              coords,
              {
                kind: 'district'
              }
            ).then(
              res => {
                console.log('res ::', coords);
                console.log('res ::', res.geoObjects);
                const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
                // console.log('addressArray ::', addressArray);

                addressArray.forEach(
                  (item, index) => {
                    if (item.kind === 'district') {
                      this.district = item.name;
                      console.log('this.district ::', item.name);
                    }
                  }
                );

                // console.log('this.district ::', this.district);

              },
              error => {
                console.log('Rejected [Geocode error] ::', error);
              }
            );
          };
          // console.log('getDistrict res step ymapsGeocode 2 ::');

          for(let i = 0; i < 10; i++) {
            // console.log('for 1::');
            changedCoords = [coords[0] + (step * i), coords[1] + (step * i)];
            // console.log('ymapsGeocode 1::');
            ymapsGeocode(changedCoords);
          }

          // const coordsArray = 

        },
        error => {
          console.log('Rejected [getDistrict error] ::', error);
        }
      );
    },
    isPointInPolygon(point, vs) {
      let x = point[0], y = point[1];

      let inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    },
    moveStepMarker() {
      // console.log('stepLat ::', this.stepLat);
      // console.log('stepLon ::', this.stepLon);
      // console.log('moveStepMarker');
      // const changedLat = this.stepMarker[0] + this.stepLat;
      const changedLon = this.stepMarker[1] - this.stepLon;
      const changedArrayPosition = [this.stepMarker[0], changedLon]
      this.stepMarker = changedArrayPosition;
    },
    moveStepMarkerByCoords(array) {
      // console.log('array ::', array);
      this.stepMarker = array;
      // setTimeout(
      //   () => {
      //     // console.log('array ::', array);
      //     this.stepMarker = array;
      //   },
      //   400
      // );
    },
    getTaganrogsDistricts() {
      // Getting an array of coords for square of the city.
      for(let i = this.coords1[1]; i < this.coords2[1]; i += this.stepLon) {
        for(let j = this.coords3[0]; j < this.coords1[0]; j += this.stepLat) {
          this.fullArrayCoords.push([j, i]);
        }
      }
      // Mapping all of the coords.
      this.fullArrayCoords.forEach(
        item => {
          // Getting an array of addresses for boundaries of the city.
          this.getDistrictsByCoordinates(item);
        }
      );
      console.log('this.fullArrayAddresses ::', this.fullArrayAddresses, this.fullArrayAddresses.length);
    },
    getDistrictsByCoordinates(coords) {
      // this.j++;
      // console.log('j:', this.j);
      ymaps.geocode(
        coords,
        {
          kind: 'district'
        }
      ).then(
        res => {
          // this.i++;
          // console.log('i:', this.i);

          // const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
          // if (Boolean(addressArray)) {
          //   this.fullArrayAddresses.push([coords, addressArray]);
          // } else {
          //   console.log('addressArray is wrong', addressArray);
          // }

          // console.log('res ::', coords);
          // console.log('::', res.geoObjects);
          // this.moveStepMarkerByCoords(coords);

          // console.log(this.i, addressArray);
          // addressArray.forEach(
          //   (item, index) => {
          //     if (item.kind === 'district') {
          //       this.district = item.name;
          //       console.log('this.district ::', item.name);
          //     }
          //   }
          // );

        },
        error => {
          console.log('Rejected [getDistrictsByCoordinates error] ::', error);
        }
      );
      // console.log('geoResponse', geoResponse);

    },
    onMapClick(e) {
      control.setQuery('Earth')
      console.log('e ::', e);
      // this.coordsTaganrog = e.get('coords');
      const coords = [e.latlng.lat, e.latlng.lng];
      this.coordsMarker = coords;
      console.log('coords ::', coords);
      // ymaps.geocode(
      //   coords,
      //   {
      //     kind: 'district'
      //   }
      // ).then(
      //   res => {
      //     console.log('res ::', res.geoObjects.get(0));
      //     // console.log('::', res.geoObjects);
      //     const addressArray = res.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.Components;
      //     console.log('point ::', addressArray);

      //     // addressArray.forEach(
      //     //   (item, index) => {
      //     //     if (item.kind === 'district') {
      //     //       this.district = item.name;
      //     //       console.log('this.district ::', item.name);
      //     //     }
      //     //   }
      //     // );

      //   },
      //   error => {
      //     console.log('Rejected [getDistrictsByCoordinates error] ::', error);
      //   }
      // );
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject;
    },
  },
  created() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  },
  async mounted() {
    console.log('federalRegions.length', this.federalRegions.length);
    console.log('getFlatLocalitiesList.length', this.getFlatLocalitiesList.length);
    const url = 'https://nominatim.openstreetmap.org/reverse';
    const url2 = 'https://nominatim.openstreetmap.org/reverse?format=geojson&pretty=1&lat=47.215266&lon=38.908182&zoom=18&addressdetails=1&accept-language=ru';

    const params1 = {
      format: 'geojson',
      lat: 47.245266,
      lon: 38.928182,
      zoom: 18,
      addressdetails: 1,
      acceptLanguage: 'ru',
      namedetails: 1,
    }
    const params2 = {
      format: 'geojson',
      lat: '47.215266',
      lon: '38.908182',
      zoom: '18',
      addressdetails: '1',
    }
    const params3 = {
      format: 'geojson',
      lat: 47.265266,
      lon: 38.968182,
      zoom: 18,
      addressdetails: 1,
      'accept-language': 'ru',
      namedetails: 1,
    }

    await axios.get(
      url,
      {
        params: params1
      }
    )
      .then((response) => {
        // console.log(
        //   'address 1 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road,
        //   response,
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(url2)
      .then((response) => {
        // console.log(
        //   'address 2 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(
     url,
      {
        params: params3
      }
    )
      .then((response) => {
        // console.log(
        //   'address 3 ::',
        //   response.data.features[0].properties.address.city,
        //   response.data.features[0].properties.address.suburb,
        //   response.data.features[0].properties.address.road
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });


    await axios.get(
      'https://nominatim.openstreetmap.org/',
      {
        params: {
          q: "Таганрог, Россия",
          format: 'json',
          zoom: 18,
          'accept-language': 'ru',
          polygon_geojson: 1,
        }
      }
    )
      .then((response) => {
        const polygon = response.data[0].geojson.coordinates[0];
        // console.log(
        //   'response ::',
        //   response,
        // );
        let inversedPolygon = [];
        polygon.forEach(
          item => {
            inversedPolygon.push([item[1], item[0]]);
          }
        );
        // console.log(
        //   'inversed polygon ::',
        //   inversedPolygon,
        // );
      }).catch((error) => {
        console.log('error ::', error);
      });
  }
};
</script>

<style lang="scss">
.main.get-districts {
  display: flex;
}

.button-wrap {
  position: relative;
}
#mapid {
  height: calc(100vh - 400px);
}

.lmap.vue2leaflet-map {
  position: relative;
  width: calc(100vw - 400px);
  height: calc(100vh - 400px);
}

.button {
  display: block;
  margin-bottom: 8px;
}
</style>