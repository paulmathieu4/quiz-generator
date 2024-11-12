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

export enum QuizSubject {
    Geo = 'geography',
    History = 'history'
}

export enum QuizDifficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
}
