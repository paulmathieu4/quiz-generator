/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import { chatGptResponseFormat } from './chatGptResponseFormat';


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

/* eslint-disable */
export const generateQuiz = onRequest(async (request, response) => {
    logger.info("Hello logs!", {structuredData: true});

    if (!request.query?.questions || !request.query?.subject || !request.query?.difficulty) {
        const errorMessage = 'Missing mandatory parameters when calling generateQuiz';
        logger.error(errorMessage);
        response.status(400).send(errorMessage)
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const chatGptPrompt = `I want you to generate a multiple-choice questionnaire. The questionnaire should have ${request.query.questions} questions of ${request.query?.difficulty} difficulty about ${request.query.subject}. For each question, there should be 1 correct answer, and 3 wrong answers.`

    try {
        const apiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": chatGptPrompt
                        }
                    ]
                }
            ],
            temperature: 1,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: {
                "type": "json_schema",
                "json_schema": chatGptResponseFormat
            },
        });

        logger.info(`chatAPI request ID: ${apiResponse._request_id}`)
        const quiz = JSON.parse(apiResponse.choices[0].message.content as string);
        response.send(quiz);
    } catch (e) {
        logger.error('Error when calling openAI completions API: ', e);
        response.status(500).send('Internal server error')
    }
});
