/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
    dark: false,
    colors: {
        primary: '#00bcd4',
        secondary: '#ffc107',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ff9800',
        info: '#009688',
        success: '#4caf50'
    }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },

})
