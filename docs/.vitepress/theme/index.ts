// https://vitepress.dev/guide/custom-theme
import { Button } from 'components'
import 'theme-chalk'
import type { Theme } from 'vitepress'
import ExhibitionCard from '../components/exhibition-card/index.vue'
import Layout from '../components/layout/index.vue'
import '../styles/index.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.component('sn-button', Button)
    app.component('exhibition-card', ExhibitionCard)
  }
} satisfies Theme
