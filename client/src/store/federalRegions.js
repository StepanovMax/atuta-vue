const federalRegions = [
  {
    "type": "obl",
    "slug": "moskovskaya",
    "label": "Московская",
    "localities": [
      {
        "type": "city",
        "slug": "moskva",
        "label": "Москва",
        "districts": [
          {
            "label": "Академический",
            "slug": "akademicheskiy"
          },
          {
            "label": "Алексеевский",
            "slug": "alekseevskiy"
          },
          {
            "label": "Алтуфьевский",
            "slug": "altufevskiy"
          },
          {
            "label": "Арбат",
            "slug": "arbat"
          },
          {
            "label": "Аэропорт",
            "slug": "aeroport"
          },
          {
            "label": "Бабушкинский",
            "slug": "babushkinskiy"
          },
          {
            "label": "Басманный",
            "slug": "basmannyy"
          },
          {
            "label": "Беговой",
            "slug": "begovoy"
          },
          {
            "label": "Бескудниковский",
            "slug": "beskudnikovskiy"
          },
          {
            "label": "Бибирево",
            "slug": "bibirevo"
          },
          {
            "label": "Зябликово",
            "slug": "zyablikovo"
          },
          {
            "label": "Ивановское",
            "slug": "ivanovskoe"
          },
          {
            "label": "Измайлово",
            "slug": "izmaylovo"
          },
          {
            "label": "Капотня",
            "slug": "kapotnya"
          },
          {
            "label": "Коньково",
            "slug": "konkovo"
          },
          {
            "label": "Коптево",
            "slug": "koptevo"
          },
          {
            "label": "Косино-ухтомский",
            "slug": "kosino-uhtomskiy"
          },
          {
            "label": "Котловка",
            "slug": "kotlovka"
          },
          {
            "label": "Красносельский",
            "slug": "krasnoselskiy"
          },
          {
            "label": "Крылатское",
            "slug": "krylatskoe"
          },
          {
            "label": "Нагорный",
            "slug": "nagornyy"
          },
          {
            "label": "Некрасовка",
            "slug": "nekrasovka"
          },
          {
            "label": "Нижегородский",
            "slug": "nizhegorodskiy"
          },
          {
            "label": "Новогиреево",
            "slug": "novogireevo"
          },
          {
            "label": "Новокосино",
            "slug": "novokosino"
          },
          {
            "label": "Ново-переделкино",
            "slug": "novo-peredelkino"
          },
          {
            "label": "Обручевский",
            "slug": "obruchevskiy"
          },
          {
            "label": "Орехово-борисово северное",
            "slug": "orehovo-borisovo-severnoe"
          },
          {
            "label": "Орехово-борисово южное",
            "slug": "orehovo-borisovo-yuzhnoe"
          },
          {
            "label": "Останкинский",
            "slug": "ostankinskiy"
          },
          {
            "label": "Сокольники",
            "slug": "sokolniki"
          },
          {
            "label": "Солнцево",
            "slug": "solncevo"
          },
          {
            "label": "Строгино",
            "slug": "strogino"
          },
          {
            "label": "Таганский",
            "slug": "taganskiy"
          },
          {
            "label": "Тверской",
            "slug": "tverskoy"
          },
          {
            "label": "Текстильщики",
            "slug": "tekstilshchiki"
          },
          {
            "label": "Тёплый стан",
            "slug": "tyoplyy-stan"
          },
          {
            "label": "Тимирязевский",
            "slug": "timiryazevskiy"
          },
          {
            "label": "Тропарёво-никулино",
            "slug": "troparyovo-nikulino"
          },
          {
            "label": "Филёвский парк",
            "slug": "filyovskiy-park"
          },
          {
            "label": "Бирюлёво восточное",
            "slug": "biryulyovo-vostochnoe"
          },
          {
            "label": "Бирюлёво западное",
            "slug": "biryulyovo-zapadnoe"
          },
          {
            "label": "Богородское",
            "slug": "bogorodskoe"
          },
          {
            "label": "Братеево",
            "slug": "brateevo"
          },
          {
            "label": "Бутырский",
            "slug": "butyrskiy"
          },
          {
            "label": "Вешняки",
            "slug": "veshnyaki"
          },
          {
            "label": "Войковский",
            "slug": "voykovskiy"
          },
          {
            "label": "Восточное дегунино",
            "slug": "vostochnoe-degunino"
          },
          {
            "label": "Восточное измайлово",
            "slug": "vostochnoe-izmaylovo"
          },
          {
            "label": "Выхино-жулебино",
            "slug": "vyhino-zhulebino"
          },
          {
            "label": "Гагаринский",
            "slug": "gagarinskiy"
          },
          {
            "label": "Головинский",
            "slug": "golovinskiy"
          },
          {
            "label": "Гольяново",
            "slug": "golyanovo"
          },
          {
            "label": "Кузьминки",
            "slug": "kuzminki"
          },
          {
            "label": "Кунцево",
            "slug": "kuncevo"
          },
          {
            "label": "Куркино",
            "slug": "kurkino"
          },
          {
            "label": "Левобережный",
            "slug": "levoberezhnyy"
          },
          {
            "label": "Лефортово",
            "slug": "lefortovo"
          },
          {
            "label": "Лианозово",
            "slug": "lianozovo"
          },
          {
            "label": "Ломоносовский",
            "slug": "lomonosovskiy"
          },
          {
            "label": "Лосиноостровский",
            "slug": "losinoostrovskiy"
          },
          {
            "label": "Люблино",
            "slug": "lyublino"
          },
          {
            "label": "Марфино",
            "slug": "marfino"
          },
          {
            "label": "Марьина роща",
            "slug": "marina-roshcha"
          },
          {
            "label": "Марьино",
            "slug": "marino"
          },
          {
            "label": "Метрогородок",
            "slug": "metrogorodok"
          },
          {
            "label": "Отрадное",
            "slug": "otradnoe"
          },
          {
            "label": "Очаково-матвеевское",
            "slug": "ochakovo-matveevskoe"
          },
          {
            "label": "Перово",
            "slug": "perovo"
          },
          {
            "label": "Печатники",
            "slug": "pechatniki"
          },
          {
            "label": "Покровское-стрешнево",
            "slug": "pokrovskoe-streshnevo"
          },
          {
            "label": "Преображенское",
            "slug": "preobrazhenskoe"
          },
          {
            "label": "Пресненский",
            "slug": "presnenskiy"
          },
          {
            "label": "Проспект вернадского",
            "slug": "prospekt-vernadskogo"
          },
          {
            "label": "Раменки",
            "slug": "ramenki"
          },
          {
            "label": "Ростокино",
            "slug": "rostokino"
          },
          {
            "label": "Рязанский",
            "slug": "ryazanskiy"
          },
          {
            "label": "Савёловский",
            "slug": "savyolovskiy"
          },
          {
            "label": "Свиблово",
            "slug": "sviblovo"
          },
          {
            "label": "Фили-давыдково",
            "slug": "fili-davydkovo"
          },
          {
            "label": "Хамовники",
            "slug": "hamovniki"
          },
          {
            "label": "Ховрино",
            "slug": "hovrino"
          },
          {
            "label": "Хорошёво-мнёвники",
            "slug": "horoshyovo-mnyovniki"
          },
          {
            "label": "Хорошёвский",
            "slug": "horoshyovskiy"
          },
          {
            "label": "Царицыно",
            "slug": "caricyno"
          },
          {
            "label": "Черёмушки",
            "slug": "cheryomushki"
          },
          {
            "label": "Чертаново северное",
            "slug": "chertanovo-severnoe"
          },
          {
            "label": "Чертаново центральное",
            "slug": "chertanovo-centralnoe"
          },
          {
            "label": "Чертаново южное",
            "slug": "chertanovo-yuzhnoe"
          },
          {
            "label": "Щукино",
            "slug": "shchukino"
          },
          {
            "label": "Южное бутово",
            "slug": "yuzhnoe-butovo"
          },
          {
            "label": "Южное медведково",
            "slug": "yuzhnoe-medvedkovo"
          },
          {
            "label": "Мещанский",
            "slug": "meshchanskiy"
          },
          {
            "label": "Митино",
            "slug": "mitino"
          },
          {
            "label": "Можайский",
            "slug": "mozhayskiy"
          },
          {
            "label": "Молжаниновский",
            "slug": "molzhaninovskiy"
          },
          {
            "label": "Москворечье-сабурово",
            "slug": "moskvoreche-saburovo"
          },
          {
            "label": "Нагатино-садовники",
            "slug": "nagatino-sadovniki"
          },
          {
            "label": "Нагатинский затон",
            "slug": "nagatinskiy-zaton"
          },
          {
            "label": "Северное бутово",
            "slug": "severnoe-butovo"
          },
          {
            "label": "Северное измайлово",
            "slug": "severnoe-izmaylovo"
          },
          {
            "label": "Северное медведково",
            "slug": "severnoe-medvedkovo"
          },
          {
            "label": "Северное тушино",
            "slug": "severnoe-tushino"
          },
          {
            "label": "Северный",
            "slug": "severnyy"
          },
          {
            "label": "Сокол",
            "slug": "sokol"
          },
          {
            "label": "Соколиная гора",
            "slug": "sokolinaya-gora"
          },
          {
            "label": "Южное тушино",
            "slug": "yuzhnoe-tushino"
          },
          {
            "label": "Южнопортовый",
            "slug": "yuzhnoportovyy"
          },
          {
            "label": "Якиманка",
            "slug": "yakimanka"
          },
          {
            "label": "Рославский",
            "slug": "roslavskiy"
          },
          {
            "label": "Ясенево",
            "slug": "yasenevo"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "abramcevo",
        "label": "Абрамцево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "alabino",
        "label": "Алабино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "aprelevka",
        "label": "Апрелевка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "arhangelskoe",
        "label": "Архангельское",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ashitkovo",
        "label": "Ашитково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "baykonur",
        "label": "Байконур",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "baksheevo",
        "label": "Бакшеево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "balashiha",
        "label": "Балашиха",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "barybino",
        "label": "Барыбино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "beloomut",
        "label": "Белоомут",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "belye-stolby",
        "label": "Белые Столбы",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "borodino",
        "label": "Бородино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "bronnicy",
        "label": "Бронницы",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "bykovo",
        "label": "Быково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "valuevo",
        "label": "Валуево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "verbilki",
        "label": "Вербилки",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vereya",
        "label": "Верея",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vidnoe",
        "label": "Видное",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vnukovo",
        "label": "Внуково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vozhd-proletariata",
        "label": "Вождь Пролетариата",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "volokolamsk",
        "label": "Волоколамск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "voronovo",
        "label": "Вороново",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "voskresensk",
        "label": "Воскресенск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vostochnyy",
        "label": "Восточный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vostryakovo",
        "label": "Востряково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "vysokovsk",
        "label": "Высоковск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "golicino",
        "label": "Голицино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dedenevo",
        "label": "Деденево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dedovsk",
        "label": "Дедовск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dzherzhinskiy",
        "label": "Джержинский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dmitrov",
        "label": "Дмитров",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dolgoprudnyy",
        "label": "Долгопрудный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "domodedovo",
        "label": "Домодедово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dorohovo",
        "label": "Дорохово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "drezna",
        "label": "Дрезна",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dubki",
        "label": "Дубки",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "dubna",
        "label": "Дубна",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "egorevsk",
        "label": "Егорьевск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zheleznodorozhnyy",
        "label": "Железнодорожный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zhilevo",
        "label": "Жилево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zhukovskiy",
        "label": "Жуковский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zagorsk",
        "label": "Загорск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zagoryanskiy",
        "label": "Загорянский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zaprudnaya",
        "label": "Запрудная",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zaraysk",
        "label": "Зарайск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zvenigorod",
        "label": "Звенигород",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "zelenograd",
        "label": "Зеленоград",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ivanteevka",
        "label": "Ивантеевка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "iksha",
        "label": "Икша",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ilinskiy",
        "label": "Ильинский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "istra",
        "label": "Истра",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kashira",
        "label": "Кашира",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kerva",
        "label": "Керва",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "klimovsk",
        "label": "Климовск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "klin",
        "label": "Клин",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "klyazma",
        "label": "Клязьма",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kozhino",
        "label": "Кожино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kokoshkino",
        "label": "Кокошкино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kolomna",
        "label": "Коломна",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kolyubakino",
        "label": "Колюбакино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "korolev",
        "label": "Королев",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kosino",
        "label": "Косино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kotelniki",
        "label": "Котельники",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kraskovo",
        "label": "Красково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "krasnoarmeysk",
        "label": "Красноармейск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "krasnogorsk",
        "label": "Красногорск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "krasnozavodsk",
        "label": "Краснозаводск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "krasnoznamensk",
        "label": "Краснознаменск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "krasnyy-tkach",
        "label": "Красный Ткач",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kryukovo",
        "label": "Крюково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kubinka",
        "label": "Кубинка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kupavna",
        "label": "Купавна",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "kurovskoe",
        "label": "Куровское",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lesnoy-gorodok",
        "label": "Лесной Городок",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "likino-dulevo",
        "label": "Ликино-Дулево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lobnya",
        "label": "Лобня",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lopatinskiy",
        "label": "Лопатинский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "losino-petrovskiy",
        "label": "Лосино-Петровский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lotoshino",
        "label": "Лотошино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lukino",
        "label": "Лукино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "luhovicy",
        "label": "Луховицы",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lytkarino",
        "label": "Лыткарино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lvovskiy",
        "label": "Львовский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "lyubercy",
        "label": "Люберцы",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "malahovka",
        "label": "Малаховка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "mihaylovskoe",
        "label": "Михайловское",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "mihnevo",
        "label": "Михнево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "mozhaysk",
        "label": "Можайск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "monino",
        "label": "Монино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "muhanovo",
        "label": "Муханово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "mytishchi",
        "label": "Мытищи",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "narofominsk",
        "label": "Нарофоминск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "nahabino",
        "label": "Нахабино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "nekrasovka",
        "label": "Некрасовка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "nemchinovka",
        "label": "Немчиновка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "novobratcevskiy",
        "label": "Новобратцевский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "novopodrezkovo",
        "label": "Новоподрезково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "noginsk",
        "label": "Ногинск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "obuhovo",
        "label": "Обухово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "odincovo",
        "label": "Одинцово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ozherele",
        "label": "Ожерелье",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ozery",
        "label": "Озеры",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "oktyabrskiy",
        "label": "Октябрьский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "opaliha",
        "label": "Опалиха",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "orehovo-zuevo",
        "label": "Орехово-Зуево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pavlovskiy-posad",
        "label": "Павловский Посад",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pervomayskiy",
        "label": "Первомайский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "peski",
        "label": "Пески",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pirogovskiy",
        "label": "Пироговский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "podolsk",
        "label": "Подольск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "polushkino",
        "label": "Полушкино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pravdinskiy",
        "label": "Правдинский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "privokzalnyy",
        "label": "Привокзальный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "proletarskiy",
        "label": "Пролетарский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "protvino",
        "label": "Протвино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pushkino",
        "label": "Пушкино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "pushchino",
        "label": "Пущино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "radovickiy",
        "label": "Радовицкий",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ramenskoe",
        "label": "Раменское",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "reutov",
        "label": "Реутов",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "reshetnikovo",
        "label": "Решетниково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "rodniki",
        "label": "Родники",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "roshal",
        "label": "Рошаль",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "rublevo",
        "label": "Рублево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "ruza",
        "label": "Руза",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "saltykovka",
        "label": "Салтыковка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "severnyy",
        "label": "Северный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "sergiev-posad",
        "label": "Сергиев Посад",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "serebryanye-prudy",
        "label": "Серебряные Пруды",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "serpuhov",
        "label": "Серпухов",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "solnechnogorsk",
        "label": "Солнечногорск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "solncevo",
        "label": "Солнцево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "sofrino",
        "label": "Софрино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "staraya-kupavna",
        "label": "Старая Купавна",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "starbeevo",
        "label": "Старбеево",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "stupino",
        "label": "Ступино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shodnya",
        "label": "Сходня",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "taldom",
        "label": "Талдом",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tekstilshchik",
        "label": "Текстильщик",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tempy",
        "label": "Темпы",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tishkovo",
        "label": "Тишково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tomilino",
        "label": "Томилино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "troick",
        "label": "Троицк",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tugolesskiy-bor",
        "label": "Туголесский Бор",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "tuchkovo",
        "label": "Тучково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "uvarovka",
        "label": "Уваровка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "udelnaya",
        "label": "Удельная",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "uspenskoe",
        "label": "Успенское",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "firsanovka",
        "label": "Фирсановка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "fosforitnyy",
        "label": "Фосфоритный",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "fryazino",
        "label": "Фрязино",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "fryanovo",
        "label": "Фряново",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "himki",
        "label": "Химки",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "horlovo",
        "label": "Хорлово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "hotkovo",
        "label": "Хотьково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "cherkizovo",
        "label": "Черкизово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "chernogolovka",
        "label": "Черноголовка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "cherusti",
        "label": "Черусти",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "chehov",
        "label": "Чехов",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "sharapovo",
        "label": "Шарапово",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shatura",
        "label": "Шатура",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shaturtorf",
        "label": "Шатурторф",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shahovskaya",
        "label": "Шаховская",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "sheremetevskiy",
        "label": "Шереметьевский",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shchelkovo",
        "label": "Щелково",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "shcherbinka",
        "label": "Щербинка",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "elektrogorsk",
        "label": "Электрогорск",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "elektrostal",
        "label": "Электросталь",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "elektrougli",
        "label": "Электроугли",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      },
      {
        "type": "city",
        "slug": "yahroma",
        "label": "Яхрома",
        "districts": [
          {
            "label": "В черте города",
            "slug": "inTown"
          },
          {
            "label": "Пригород",
            "slug": "suburb"
          }
        ]
      }
    ]
  },
];

export default federalRegions;