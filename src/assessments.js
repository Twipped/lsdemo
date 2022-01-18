
export default {
  Promis: {
    displayName: 'Promis',
    questions: {
      ability: {
        type: 'SCALE',
        caption: 'Rate your Ability to carry out Physical Activities',
      },
      pain: {
        type: 'SCALE',
        caption: 'Rate your Daily Pain',
      },
      overallHealth: {
        type: 'SCALE',
        caption: 'Rate your Overall Health',
      },
    },
  },
  PraPlus: {
    displayName: 'PraPlus',
    questions: {
      hospital: {
        type: 'CHOOSE_ONE',
        caption: 'In the previous 12 months, have you stayed overnight as a patient in a hospital?',
        options: [
          'Never',
          'Once',
          'Twice',
          'Three or More',
        ],
      },
      heartDisease: {
        type: 'CHOOSE_ONE',
        caption: 'Have you ever had heart disease?',
        options: [
          'Yes',
          'No',
          'I don\'t know',
        ],
      },
      conditions: {
        type: 'CHOOSE_MANY',
        caption: 'Please check the conditions for which you are currently receiving medical treatment:',
        options: [
          'Breathing problems',
          'High blood pressure',
          'Heart problems',
          'Urinary Problems',
          'Mental Problems',
          'Ankle Swelling',
          'Cancer',
        ],
      },
    },
  },
  HealthHistory: {
    displayName: 'Health History',
    questions: {
      diagnosis: {
        type: 'TEXT_LONG',
        caption: 'Please describe any current diagnosis',
      },
      hospitalizations: {
        type: 'TEXT_LONG',
        caption: 'Please describe any hospitalizations within the last 5 years.',
      },
      habits: {
        type: 'TEXT_LONG',
        caption: 'Please describe your health habits',
      },
    },
  },
};
