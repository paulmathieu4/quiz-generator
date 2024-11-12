<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();


async function navigateToQuiz() {
    router.push('/quiz')
}

</script>

<template>
    <div class="fill-height d-flex justify-center align-center">
        <v-btn prepend-icon="mdi-brain" color="primary" size="x-large" stacked @click="navigateToQuiz">
            <template v-slot:prepend>
                <v-icon color="pink-accent-1"></v-icon>
            </template>
            Go to Quiz
        </v-btn>
    </div>
</template>

<style lang="scss">
#quiz-form {
    label {
        opacity: 1;
    }
}
</style>