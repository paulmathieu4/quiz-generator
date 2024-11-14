<template>
    <v-app>
        <v-app-bar :elevation="1" color="primary">
            <template v-slot:prepend>
                <RouterLink to="/">
                    <v-img
                        :width="60"
                        src="@/assets/brain.svg"
                    ></v-img>
                </RouterLink>

            </template>
            <v-app-bar-title>Quiz Master by Paul MATHIEU</v-app-bar-title>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
//
</script>
