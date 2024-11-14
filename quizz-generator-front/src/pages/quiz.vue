<script setup lang="ts">

import { QuizDifficulty, QuizQuestion, QuizQuestionEnhanced, QuizSubject } from '@/api/api.model';
import { generateQuiz } from '@/api/api';

const userAnswers: Ref<string[]> = ref(null);
const questions: Ref<QuizQuestionEnhanced[]> = ref(null);

const numberOfQuestions = ref(10);
const difficulty: Ref<QuizDifficulty> = ref(QuizDifficulty.Medium);
const subject: Ref<QuizSubject> = ref(QuizSubject.Geo);
const isVerified = ref(false);


async function generateQuestions() {
    const rawQuestions: QuizQuestion[] = await generateQuiz(numberOfQuestions.value, subject.value, difficulty.value);
    questions.value = rawQuestions.map(question => enhanceQuestion(question));
    userAnswers.value = questions.value.map(question => question.allAnswers[0]);
    console.log('generated enhanced questions: ', questions.value);
}


function enhanceQuestion(question: QuizQuestion): QuizQuestionEnhanced {
    const correctAnswerRandomIndex = Math.floor(Math.random() * 4);
    const allAnswers: string[] = [];
    let wrongAnswerIndex = 0;
    for (let i = 0; i < 4; i++) {
        if (i === correctAnswerRandomIndex) {
            allAnswers.push(question.correctAnswer)
        } else {
            allAnswers.push(question.wrongAnswers[wrongAnswerIndex]);
            wrongAnswerIndex++;
        }
    }
    return {
        ...question,
        allAnswers
    };
}
</script>

<template>
    <v-sheet
        class="my-6 pa-4 mx-auto"
        elevation="4"
        :max-width="800"
        border
        rounded
    >
        <div v-if="!questions" class="fill-height d-flex justify-center">
            <v-form>
                <h1 class="text-center mb-2">
                    Choose Your Quiz
                </h1>
                <v-select
                    label="Subject"
                    v-model="subject"
                    :items="[
                        QuizSubject.Geo,
                        QuizSubject.History,
                        QuizSubject.FunFacts,
                        QuizSubject.Animals,
                        QuizSubject.CarAndMecanics,
                        QuizSubject.Technology,
                        QuizSubject.Sport,
                        QuizSubject.Health]"
                ></v-select>
                <v-select
                    label="Difficulty"
                    v-model="difficulty"
                    :items="[QuizDifficulty.Easy, QuizDifficulty.Medium, QuizDifficulty.Hard]"
                ></v-select>
                <v-select
                    label="Number of questions"
                    v-model.number="numberOfQuestions"
                    :items="[5, 10, 20]"
                >
                </v-select>
                <div class="d-flex justify-center">
                    <v-btn prepend-icon="mdi-brain" color="primary" size="x-large" stacked
                           @click.prevent="generateQuestions">
                        <template v-slot:prepend>
                            <v-icon color="pink-accent-1"></v-icon>
                        </template>
                        Generate Quiz
                    </v-btn>
                </div>
            </v-form>

        </div>
        <v-form v-else id="quiz-form">
            <template v-for="(question, questionIndex) of questions">
                <div class="text-h5 mb-1">
                    {{ question.question }}
                </div>
                <v-radio-group v-model="userAnswers[questionIndex]">
                    <v-radio v-for="choice of question.allAnswers" color="primary" :label="choice"
                             :value="choice">
                        <template v-slot:label>
                            <div>{{ choice }}</div>
                            <v-chip
                                v-if="isVerified && choice === question.correctAnswer"
                                class="ma-2"
                                color="success"
                                label
                            >
                                <v-icon icon="mdi-check-bold" start></v-icon>
                                Correct answer
                            </v-chip>
                            <v-chip
                                v-if="isVerified && userAnswers[questionIndex] === choice && choice !== question.correctAnswer"
                                class="ma-2"
                                color="error"
                                label
                            >
                                <v-icon icon="mdi-alert-box-outline" start></v-icon>
                                Wrong answer
                            </v-chip>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-divider v-if="questionIndex !== questions.length - 1"
                           class="border-opacity-25 mb-6"></v-divider>
            </template>
            <v-btn class="d-block mx-auto mt-6" prepend-icon="mdi-check-all" color="primary" size="x-large" stacked
                   @click="() => isVerified=true">
                Verify
            </v-btn>
        </v-form>

    </v-sheet>
</template>

<style lang="scss">
#quiz-form {
    label {
        opacity: 1;
    }
}
</style>