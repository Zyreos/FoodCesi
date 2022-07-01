// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          primary: '#96bafe',
          // more colors
        },
        variables: {} //ADD AN EMPTY OBJECT
     }
   }
  }
})
