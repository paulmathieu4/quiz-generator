export interface GenerateQuizResponse {
    questionnaire: QuizQuestion[];
}

export interface QuizQuestion {
    "question": string;
    "correctAnswer": string;
    "wrongAnswers": string[];
}

export interface QuizQuestionEnhanced extends QuizQuestion {
    "allAnswers": string[];
}

