import { Handler, Jovo } from 'jovo-core';
import { ComponentResponse } from 'jovo-framework';

const surveyHandler: Handler = {
    SURVEY: {
        START() {
            this.$session.$data.COMPONENT_SURVEY = {
                answers: {},
                questionCount: 1
            }
            this.$speech.t('component-survey.start', {numberOfQuestions: this.$components.SURVEY.config.numberOfQuestions});
            this.$speech.t(`component-survey.questions.${this.$session.$data.COMPONENT_SURVEY.questionCount}`);

            return this.ask(this.$speech);
        },

        AnswerIntent() {
            let answer = this.$inputs.answer.value;

            if (typeof answer === 'string') {
                answer = parseInt(answer, 10);
            }

            const questionCount = this.$session.$data.COMPONENT_SURVEY.questionCount;
            this.$session.$data.COMPONENT_SURVEY.answers[`${questionCount}`] = answer;

            if (questionCount >= this.$components.SURVEY.config.numberOfQuestions) {
                return sendComponentResponse(this, 'SUCCESSFUL', {answers: this.$session.$data.COMPONENT_SURVEY.answers});
            }
            else {
                this.$session.$data.COMPONENT_SURVEY.questionCount++;
                this.$speech.t(`component-survey.questions.${this.$session.$data.COMPONENT_SURVEY.questionCount}`);

                return this.ask(this.$speech);
            }
        },

        HelpIntent() {
            this.$speech.t('component-survey.help');
    
            return this.ask(this.$speech);
        },
    
        END() {
            return sendComponentResponse(this, 'REJECTED');
        },
    
        ON_ERROR() {
            const error = this.$handleRequest!.error;

            return sendComponentResponse(this, 'ERROR', undefined, error);
        },
    
        Unhandled() {
            return this.toIntent('HelpIntent');
        },
    }
}

function sendComponentResponse(jovo: Jovo, status: 'SUCCESSFUL' | 'ERROR' | 'REJECTED', data?: object, error?: Error): Promise<void> {
    const response: ComponentResponse = {
        status
    };

    if (data) {
        response.data = data;
    } else if (error) {
        response.error = error;
    }

    jovo.$components.SURVEY.$response = response;

    return jovo.toStateIntent(jovo.$components.SURVEY.stateBeforeDelegate, jovo.$components.SURVEY.onCompletedIntent!);
}

export {surveyHandler};