<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();


async function navigateToQuiz() {
    router.push('/quiz/create')
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
        <h1 class="text-center">
            Welcome to Quiz Master, <br/> Your Ultimate Quiz Hub!
        </h1>
        <p class="text-left text-subtitle-1 mt-4">
            <b>Ready to challenge your brain, learn something new, or just have some fun?</b>
            <br/>
            Quiz Master brings you a world of quizzes on all your favorite subjects, tailored to your preferred
            difficulty level. Whether you’re a trivia buff, a lifelong learner, or just looking for a fun way to
            spend your time, we’ve got you covered!
        </p>
        <v-divider class="my-2"></v-divider>
        <p class="text-subtitle-1">
            <b>How It Works ?</b>
            <br/>
            Choose Your Subject: From science and technology to sports, entertainment, and everything in between –
            there’s something for everyone.
            Pick Your Difficulty: Whether you’re a beginner or a quiz master, set your challenge from Easy to Expert and
            see how far you can go!
            Put Your Knowledge to the Test: Answer questions, score points, and track your progress as you climb the
            leaderboard.
        </p>
        <v-divider class="my-2"></v-divider>
        <div class="font-weight-bold text-center text-subtitle-1">
            Are You Ready to Take on the Challenge?
        </div>
        <div class="d-flex justify-center">
            <v-btn class="mt-4" prepend-icon="mdi-brain" color="primary" size="x-large" stacked @click="navigateToQuiz">
                <template v-slot:prepend>
                    <v-icon color="pink-accent-1"></v-icon>
                </template>
                Let's Start!
            </v-btn>
        </div>

    </v-sheet>

</template>

<style lang="scss">
#quiz-form {
    label {
        opacity: 1;
    }
}
</style>