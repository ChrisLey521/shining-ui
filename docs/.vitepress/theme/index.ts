// https://vitepress.dev/guide/custom-theme
import ApiType from '@common/api-type.vue';
import ExhibitionCard from '@common/exhibition-card.vue';
import '@shining-ui/theme-chalk';
import { Button, Dropdown, Icon, Overlay, Tag, Tooltip } from 'components';
import type { Theme } from 'vitepress';
import { vTooltip } from '../../../packages/directives';
import '../styles/index.scss';
import Layout from '../vitepress/layout/index.vue';

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    // app.component('sn-tooltip', Tooltip)
    app.component('sn-button', Button)
    app.component('sn-tag', Tag)
    app.component('sn-overlay', Overlay)
    app.component('sn-tooltip', Tooltip)
    app.component('sn-icon', Icon)
    app.component('sn-dropdown', Dropdown)
    app.component('exhibition-card', ExhibitionCard)
    app.component('api-type', ApiType)
    app.directive('tooltip', vTooltip)
  }
} satisfies Theme
