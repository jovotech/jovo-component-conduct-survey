import { ComponentConfig } from 'jovo-framework';

interface SurveyConfig extends ComponentConfig {
  numberOfQuestions: number;
}

const config: SurveyConfig = {
  intentMap: {
    'AMAZON.HelpIntent': 'HelpIntent',
    'AMAZON.StopIntent': 'END',
  },
  numberOfQuestions: 3,
};

export { SurveyConfig, config as Config };
