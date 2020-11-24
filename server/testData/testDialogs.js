const testDialogs = [
  {
    userID: 1,
    clientID: 1,
    clientName: 'Сергей Махов',
    dialogID: 1,
    dialogTitle: 'Дом 80 м² на участке 5 сот. 2 750 000 ₽',
    objectID: 1,
    dialogImageUrl: '/src/images/objects/8993850241.jpg',
    dialogDate: 1605802723,
    dialogArray: [
      {
        text: 'А продай, бабуся, бычка.',
        date: 1605802723,
        position: 'user',
      },
      {
        text: 'И вам не хворать',
        date: 1605802756,
        position: 'client',
      },
      {
        text: 'Привет!',
        date: 1605802653,
        position: 'user',
      },
      {
        text: 'Привет в ответ!',
        date: 1605802656,
        position: 'client',
      },
      {
        text: 'Этого не продам!',
        date: 1605802730,
        position: 'client',
      },
      {
        text: 'Ну бывай.',
        date: 1605802753,
        position: 'user',
      },
    ],
    mine: false,
    unread: true,
    blackList: false,
  },
  {
    userID: 1,
    clientID: 1,
    clientName: 'Агентство недвижимости №1',
    employeeName: 'Алекснадр Петров',
    employeeID: 1,
    dialogID: 3,
    dialogTitle: 'Дом 75 м² на участке 3 сот. 2 700 000 ₽',
    dialogImageUrl: '/src/images/objects/8993850241.jpg',
    dialogDate: 1415402723,
    dialogArray: [
      {
        text: 'Теперь бы хорошо проехаться в коляске куда-нибудь за город',
        date: 1605802756,
        position: 'client',
      },
      {
        text: 'Да, конец марта.',
        date: 1605802723,
        position: 'user',
      },
      {
        text: 'А я после обеда вышел прогуляться, да вот и зашел, как видите',
        date: 1605802653,
        position: 'user',
      },
      {
        text: 'Грязно на дворе?',
        date: 1605802730,
        position: 'client',
      },
      {
        text: 'Нет, не очень. В саду уже тропинки.',
        date: 1605802753,
        position: 'user',
      },
      {
        text: 'Теперь какой месяц? Март?',
        date: 1605802656,
        position: 'client',
      },
    ],
    mine: false,
    unread: false,
    blackList: true,
  },
  {
    userID: 1,
    clientID: 1,
    clientName: 'Виктор Иванов',
    dialogID: 2,
    dialogTitle: 'Дом 60 м² на участке 3 сот. 2 500 000 ₽',
    dialogImageUrl: '/src/images/objects/8993850241.jpg',
    dialogDate: 1615802723,
    dialogArray: [
      {
        text: 'Теперь бы хорошо проехаться в коляске куда-нибудь за город',
        date: 1605802756,
        position: 'client',
      },
      {
        text: 'Да, конец марта.',
        date: 1605802723,
        position: 'user',
      },
      {
        text: 'А я после обеда вышел прогуляться, да вот и зашел, как видите',
        date: 1605802653,
        position: 'user',
      },
      {
        text: 'Грязно на дворе?',
        date: 1605802730,
        position: 'client',
      },
      {
        text: 'Нет, не очень. В саду уже тропинки.',
        date: 1605802753,
        position: 'user',
      },
      {
        text: 'Теперь какой месяц? Март?',
        date: 1605802656,
        position: 'client',
      },
    ],
    mine: false,
    unread: true,
    blackList: true,
  },
  {
    userID: 2,
    clientID: 1,
    clientName: 'Виктор Иванов',
    dialogID: 3,
    dialogTitle: 'Телевизор дёшево',
    dialogImageUrl: '/src/images/objects/8993850241.jpg',
    dialogDate: 1605822723,
    dialogArray: [
      {
        text: 'Привет!',
        date: 1605802653,
        position: 'user',
      },
      {
        text: 'Привет в ответ!',
        date: 1605802656,
        position: 'client',
      },
      {
        text: 'А продай, бабуся, бычка.',
        date: 1605802723,
        position: 'user',
      },
      {
        text: 'Этого не продам!',
        date: 1605802730,
        position: 'client',
      },
      {
        text: 'Ну бывай.',
        date: 1605802753,
        position: 'user',
      },
      {
        text: 'И вам не хворать',
        date: 1605802756,
        position: 'client',
      },
    ],
    mine: false,
    unread: false,
    blackList: true,
  },
];

export default testDialogs;