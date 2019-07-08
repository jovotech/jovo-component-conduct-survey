import * as SurveyQuestions from '../questions.json';

const questions = SurveyQuestions['en-US'];

const enUS = {
    translation: {
        'component-survey': {
            'help': 'Simply answer to the questions with a number between 1 and 5, where 1 is the worst and 5 is the best.',
            'start': 'Please help me improve by answering the {{numberOfQuestions}} following questions with a number between 1 and 5, where 1 is the worst and 5 is the best.',
            questions
        }
    }
};

export = enUS;
