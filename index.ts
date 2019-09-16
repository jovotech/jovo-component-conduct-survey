import { Handler } from 'jovo-core';
import { ComponentPlugin } from 'jovo-framework';

import { Config, SurveyConfig } from './src/config';
import { surveyHandler } from './src/handler';

export class ConductSurvey extends ComponentPlugin {
    handler: Handler = surveyHandler;
    config: SurveyConfig = Config;
    pathToI18n = './src/i18n/';

    constructor(config?: SurveyConfig) {
        super(config);
    }
}