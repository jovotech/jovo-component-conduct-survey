import { Handler } from 'jovo-core';
import { ComponentPlugin } from 'jovo-framework';

import { Config, SurveyConfig } from './src/config';
import { surveyHandler } from './src/handler';

export class ConductSurvey extends ComponentPlugin {
  config: SurveyConfig = Config;
  pathToI18n = './src/i18n/';
  name = 'jovo-component-conduct-survey';
  handler: Handler = {
    [this.name!]: surveyHandler,
  };

  constructor(config?: SurveyConfig) {
    super(config);
  }
}
