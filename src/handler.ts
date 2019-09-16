import { Handler, Jovo } from 'jovo-core';
import { ComponentResponse } from 'jovo-framework';

const surveyHandler: Handler = {
    ConductSurvey: {
        START() {
            // Handle parsing of default data
            if (this.$components.ConductSurvey.data) {
                const values: string[] = Object.values(this.$components.ConductSurvey.data.answers);
                
                if (values.length === this.$components.ConductSurvey.config.numberOfQuestions) {
                    // every k
                    const allValuesDefined = values.every(value => {
                        return value; 
                    });

                    if (allValuesDefined) {
                        return sendComponentResponse(this, 'SUCCESSFUL');
                    }
                }
            }

            this.$session.$data.COMPONENT_ConductSurvey = {
                answers: {},
                questionCount: 1
            };
            this.$speech.t('component-ConductSurvey.start', {numberOfQuestions: this.$components.ConductSurvey.config.numberOfQuestions});
            this.$speech.t(`component-ConductSurvey.questions.${this.$session.$data.COMPONENT_ConductSurvey.questionCount}`);

            return this.ask(this.$speech);
        },

        AnswerIntent() {
            let answer = this.$inputs.answer.value;

            if (typeof answer === 'string') {
                answer = parseInt(answer, 10);
            }

            if (answer < 1 || answer > 5) {
                this.$speech.t('component-ConductSurvey.invalid-answer');
                this.$speech.t(`component-ConductSurvey.questions.${this.$session.$data.COMPONENT_ConductSurvey.questionCount}`);
                
                return this.ask(this.$speech);
            }

            const questionCount = this.$session.$data.COMPONENT_ConductSurvey.questionCount;
            this.$session.$data.COMPONENT_ConductSurvey.answers[`${questionCount}`] = answer;

            if (questionCount >= this.$components.ConductSurvey.config.numberOfQuestions ||
                questionCount >= this.t('component-ConductSurvey.questions').length) {

                this.$components.ConductSurvey.data.answers = this.$session.$data.COMPONENT_ConductSurvey.answers;

                return sendComponentResponse(this, 'SUCCESSFUL');
            }
            else {
                this.$session.$data.COMPONENT_ConductSurvey.questionCount++;
                this.$speech.t(`component-ConductSurvey.questions.${this.$session.$data.COMPONENT_ConductSurvey.questionCount}`);

                return this.ask(this.$speech);
            }
        },

        HelpIntent() {
            this.$speech.t('component-ConductSurvey.help');
            this.$speech.t(`component-ConductSurvey.questions.${this.$session.$data.COMPONENT_ConductSurvey.questionCount}`);
    
            return this.ask(this.$speech);
        },
    
        END() {
            return sendComponentResponse(this, 'REJECTED');
        },
    
        ON_ERROR() {
            return sendComponentResponse(this, 'ERROR');
        },
    
        Unhandled() {
            return this.toIntent('HelpIntent');
        },
    }
}

function sendComponentResponse(jovo: Jovo, status: 'SUCCESSFUL' | 'ERROR' | 'REJECTED'): Promise<void> {
    const response: ComponentResponse = {
        status
    };

    if (status === 'SUCCESSFUL') {
        response.data = jovo.$components.ConductSurvey.data;
    } else if (status === 'ERROR') {
        response.error = jovo.$handleRequest!.error;
    }

    return jovo.sendComponentResponse(response);
}

export {surveyHandler};