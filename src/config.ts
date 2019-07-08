import { ComponentConfig } from 'jovo-framework';

interface SurveyConfig extends ComponentConfig {
    numberOfQuestions: number;
}

const config: SurveyConfig = {
    numberOfQuestions: 3
};

export {SurveyConfig, config as Config};