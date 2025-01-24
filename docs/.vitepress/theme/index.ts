// https://vitepress.dev/guide/custom-theme
import ExhibitionCard from '@common/exhibition-card.vue';
import '@shining-ui/theme-chalk';
import { Button } from 'components';
import type { Theme } from 'vitepress';
import { vTooltip } from '../../../packages/directives';
import '../styles/index.css';
import Layout from '../vitepress/layout/index.vue';

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    // app.component('sn-tooltip', Tooltip)
    app.component('sn-button', Button)
    app.component('exhibition-card', ExhibitionCard)
    app.directive('tooltip', vTooltip)
  }
} satisfies Theme
