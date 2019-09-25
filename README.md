# Jovo Conversational Component: ConductSurvey

## Getting Started

The component provides a prepackaged solution to run a survey.

It asks the user questions that are predefined in a JSON file, which they answer to with a number from 1 to 5, where 1 is really bad and 5 is really good.

> [Find out more about Jovo's Conversational Components](https://www.jovo.tech/docs/components)

### Installation

You can install the component using npm:

```sh
$ npm install --save jovo-component-conduct-survey
```

After that, you use the Jovo CLI to transfer the component's files to your project using the `load` command:

```sh
$ jovo load jovo-component-conduct-survey
```

Last but not least you have to include the component in your `app.js`:

```js
// @language=typescript
// src/app.ts

import { ConductSurvey } from './components/jovo-component-conduct-survey';

app.useComponents(new ConductSurvey());

// @language=javascript
// src/app.js

const { ConductSurvey } = require("../components/jovo-component-conduct-survey");

app.useComponents(new ConductSurvey());
```

## Sample Dialog

SSML tags are not included in sample dialogs, but might be included in the responses.

<details>
<summary>Sample Dialog #1</summary>

User | Alexa Speech | Alexa Reprompt | Keys
--- | --- | --- | -
&nbsp; | Please help me improve by answering the {{numberOfQuestions}} following questions with a number between 1 and 5, where 1 is the worst and 5 is the best. Question 1 | &nbsp; | start, question.1
2 | &nbsp; | &nbsp; | &nbsp;
&nbsp; | Question 2 | &nbsp; | question.2
5 | &nbsp; | &nbsp; | &nbsp; 
&nbsp; | Question 3  | &nbsp; | question.3
4| &nbsp; | &nbsp; | &nbsp;

----> Send response back <----
</details>

<details>
<summary>Sample Dialog #2</summary>

User | Alexa Speech | Alexa Reprompt | Keys
--- | --- | --- | -
&nbsp; | Please help me improve by answering the {{numberOfQuestions}} following questions with a number between 1 and 5, where 1 is the worst and 5 is the best. Question 1 | &nbsp; | start, question.1
Stop | &nbsp; | &nbsp; | &nbsp;

----> Send response back <----
</details>

<details>
<summary>Sample Dialog #3</summary>

User | Alexa Speech | Alexa Reprompt | Keys
--- | --- | --- | -
&nbsp; | Please help me improve by answering the {{numberOfQuestions}} following questions with a number between 1 and 5, where 1 is the worst and 5 is the best. Question 1 | &nbsp; | start, question.1
Help | &nbsp; | &nbsp; | &nbsp;
&nbsp; | Simply answer to the questions with a number between 1 and 5, where 1 is the worst and 5 is the best. Question x| &nbsp; | help, question.x
5 | &nbsp; | &nbsp; | &nbsp; 
----> run through other questions <----
</details>

## Response

The component's `$response` has the following interface:

```javascript
{
    status: "SUCCESSFUL" | "REJECTED" | "ERROR",
    data: {
        answers: {
            '1': 5,
            '2': 2
        }
    }
}
```

The `answers` object contains the user's answers to each question, where the object's key is the question number.

> [Find out more about Conversational Component's responses](https://www.jovo.tech/docs/components#response)

## Configuration

The component offers two configurations. First, the questions. They are specified inside the `questions.json` file in the `src/` folder. The questions start with number `1` and continue until the last question is or until the configurable `numberOfQuestions` is reached.

Name | Descriptions | Type | Required
--- | --- | --- | ---
`numberOfQuestions` | The number of questions that should be asked | number | No - default 3

Example: 

```js
// config.js

module.exports = {
    // ...
    components: {
        ConductSurvey: {
            numberOfQuestions: 5
        }
    }
};
```


> [Find out more about Conversational Component's configuration](https://www.jovo.tech/docs/components#configuration)
