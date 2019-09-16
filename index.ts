import { Handler, PluginConfig } from 'jovo-core';
import { Component } from 'jovo-framework';

import { Config, SurveyConfig } from './src/config';
import { surveyHandler } from './src/handler';

export class ConductSurvey extends Component {
    handler: Handler = surveyHandler;
    config: SurveyConfig = Config;
    pathToI18n = './src/i18n/';

    constructor(config?: PluginConfig) {
        super(config);
    }
}