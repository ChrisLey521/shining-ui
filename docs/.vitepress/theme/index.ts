// https://vitepress.dev/guide/custom-theme
import ExhibitionCard from '@common/exhibition-card.vue'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import { Button } from 'components'
import 'theme-chalk'
import type { Theme } from 'vitepress'
import '../styles/index.css'
import Layout from '../vitepress/layout/index.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.component('sn-button', Button)
    app.component('exhibition-card',ExhibitionCard )
    app.use(TwoslashFloatingVue) 
  }
} satisfies Theme
