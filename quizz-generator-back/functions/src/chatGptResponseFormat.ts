// JSON format to provide when calling chatGPT api
export const chatGptResponseFormat = {
    "name": "questionnaire",
    "strict": false,
    "schema": {
        "type": "object",
        "properties": {
            "questionnaire": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "question": {
                            "type": "string"
                        },
                        "correctAnswer": {
                            "type": "string"
                        },
                        "wrongAnswers": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "question",
                        "correctAnswer",
                        "wrongAnswers"
                    ]
                }
            }
        },
        "required": [
            "questionnaire"
        ]
    }
};