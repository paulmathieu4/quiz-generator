<script setup lang="ts">

import { QuizQuestion, QuizQuestionEnhanced } from '@/api/api.model';
import { generateQuiz } from '@/api/api';
import { myCustomDarkTheme } from '@/plugins/vuetify';

const router = useRouter();
const route = useRoute();

const userAnswers: Ref<string[]> = ref(null);
const questions: Ref<QuizQuestionEnhanced[]> = ref(null);
const isVerified = ref(false);
const quizLoading = ref(true);

const numberOfRightAnswsers = computed(() => {
    let result = 0;
    for (let index = 0; index < userAnswers.value.length; index++) {
        if (userAnswers.value[index] === questions.value[index].correctAnswer) {
            result++;
        }
    }
    return result;
})

const numberOfWrongAnswsers = computed(() => {
    let result = 0;
    for (let index = 0; index < userAnswers.value.length; index++) {
        if (userAnswers.value[index] !== questions.value[index].correctAnswer) {
            result++;
        }
    }
    return result;
})

const goodAnswersPercentage = computed(() => {
    return Math.ceil(numberOfRightAnswsers.value / (numberOfRightAnswsers.value + numberOfWrongAnswsers.value) * 100)
})

generateQuestions();

async function generateQuestions() {
    quizLoading.value = true;
    try {
        const rawQuestions: QuizQuestion[] = await generateQuiz(route.query.numberOfQuestions, route.query.subject, route.query.difficulty);
        questions.value = rawQuestions.map(question => enhanceQuestion(question));
        userAnswers.value = Array(questions.value.length).fill(null);
        console.log('generated enhanced questions: ', questions.value);
    } finally {
        quizLoading.value = false;
    }

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

function goToNewQuiz() {
    router.push('/quiz/create');
}

function computePercentStyle(value: number) {
    return {
        color: value >= 80 ? myCustomDarkTheme.colors.success : value >= 60 ? myCustomDarkTheme.colors.warning : myCustomDarkTheme.colors.error,
    };
}

function onVerifyClick() {
    isVerified.value = true;
    setTimeout(() => {
        const newQuizButtonElt = document.getElementById('new-quiz-button');
        newQuizButtonElt.scrollIntoView();
    }, 100)

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
        <v-container v-if="quizLoading">
            <div class="text-h5 text-center mb-4">
                Generating quiz
                <v-progress-circular
                    class="ml-2"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </div>
            <v-skeleton-loader color="primary" type="article"></v-skeleton-loader>
        </v-container>

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
            <v-divider :thickness="3" class="border-opacity-25 mb-6"></v-divider>
            <v-btn v-if="!isVerified" class="d-block mx-auto mt-6" prepend-icon="mdi-check-all" color="primary"
                   size="x-large" stacked
                   @click="onVerifyClick">
                Verify
            </v-btn>
            <v-container v-else>
                <div class="text-h6 text-center mb-1">
                    You have <b
                    :style="computePercentStyle(goodAnswersPercentage)">{{
                        goodAnswersPercentage
                    }}%</b>
                    of good answers (<b>{{ numberOfWrongAnswsers }}</b> wrong answer)
                </div>
                <v-btn id="new-quiz-button" class="d-block mx-auto mt-6" prepend-icon="mdi-file-plus" color="primary"
                       size="x-large"
                       stacked
                       @click="goToNewQuiz">
                    Start another quiz
                </v-btn>
            </v-container>
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