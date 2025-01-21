// https://vitepress.dev/guide/custom-theme
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
  }
} satisfies Theme
