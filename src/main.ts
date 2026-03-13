import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/eva-icons/eva-icons.css'
import 'quasar/src/css/index.sass'

// Custom Sph Components
import SphComponents from './components/common';

import quasarIconSet from 'quasar/icon-set/eva-icons'

const spl = createApp(App)
spl
    .use(Quasar, {
        iconSet: quasarIconSet,
        plugins: {
            Notify,
        },
    })
    .use(router)
    .use(SphComponents)
    .mount('#app')
