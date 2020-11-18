const testUsers = [
  {
    id: 1,
    role: 'agency',
    name: {
      slug: 'real-estate-agency-1',
      label: 'Агентство недвижимости №1',
    },
    login: 'admin',
    password: '12345678',
    description: {
      label: 
      `
        <h2>
          С 2008 г. на рынке
        </h2>
        <ul>
          <li>
            Все операции с недвижимостью: купля-продажа, обмен, дарение, рента, аренда
          </li>
          <li>
            Подбор любого объекта недвижимости в кратчайшие сроки, по вашим требованиям и финансовым возможностям
          </li>
          <li>
            Подготовка документов любой сложности: купля-продажа, оформление перепланировок квартир, межевание и размежевание земельных участков и т.д.
          </li>
          <li>
            Юридическое сопровождение всех сделок. Бесплатная юр. Консультация.
          </li>
          <li>
            Строительство кирпичных домов (строй-вариант 90% готовности) в г. Таганроге (пригород).
          </li>
        </ul>
      `
    },
    descriptionShort: {
      label: 'Нас Вам посоветовали!',
    },
    logo: [
      {
        "id": "canvas-0",
        "object": {
          "url": "/src/images/companies/an1.png"
        },
        "degrees": 0,
        "imageRatio": 2.6246056782334386
      }
    ],
    objectsCount: 416,
    email: 'info@an1tag.ru',
    phone: '+79287603835',
    website: 'http://an1tag.ru',
    address: 'Таганрог, г. Таганрог, ул.Чехова, 50, Центральный',
    employees: [
      {
        name: 'Степанов Максим 1',
        phoneNumber: '+79612701887',
        isEdit: false,
      },
      {
        name: 'Степанов Максим 2',
        phoneNumber: '+79612701888',
        isEdit: false,
      },
      {
        name: 'Степанов Максим 3',
        phoneNumber: '+79612701889',
        isEdit: false,
      },
      {
        name: 'Степанов Максим 4',
        phoneNumber: '+79612701890',
        isEdit: false,
      },
      {
        name: 'Степанов Максим 5',
        phoneNumber: '+79612701891',
        isEdit: false,
      },
    ],
    favouriteObjectsListID: [873589, 873592, 873596],
  },
];

export default testUsers;