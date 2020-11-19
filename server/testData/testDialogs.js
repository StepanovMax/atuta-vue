const testDialogs = [
  {
    userID: 1,
    clientID: 1,
    clientTitle: 'Сергей Махов',
    dialogID: 1,
    dialogTitle: 'Радиаторы чугунные',
    dialogImageUrl: 'http://127.0.0.1:9000/src/images/objects/8993850241.jpg',
    dialogDate: '12.11.2020',
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
  },
  {
    userID: 1,
    clientID: 1,
    clientTitle: 'Виктор Иванов',
    dialogID: 2,
    dialogTitle: 'Телевизор дёшево',
    dialogImageUrl: 'http://127.0.0.1:9000/src/images/objects/8993850241.jpg',
    dialogDate: '12.11.2020',
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
  },
  {
    userID: 2,
    clientID: 1,
    clientTitle: 'Виктор Иванов',
    dialogID: 3,
    dialogTitle: 'Телевизор дёшево',
    dialogImageUrl: 'http://127.0.0.1:9000/src/images/objects/8993850241.jpg',
    dialogDate: '12.11.2020',
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
  },
];

export default testDialogs;