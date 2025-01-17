// https://vitepress.dev/guide/custom-theme
import { Button } from 'components'
import 'theme-chalk'
import type { Theme } from 'vitepress'
import Layout from '../components/layout'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.component('sn-button', Button)
  }
} satisfies Theme
