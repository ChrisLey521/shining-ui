// https://vitepress.dev/guide/custom-theme
import ApiType from '@common/api-type.vue';
import ExhibitionCard from '@common/exhibition-card.vue';
import '@shining-ui/theme-chalk';
import { Button, ButtonGroup, Checkbox, CheckboxGroup, Dropdown, Icon, Input, InputNumber, InputTag, Overlay, Radio, RadioGroup, Select, Tag, Textarea, Tooltip } from 'components';
import type { Theme } from 'vitepress';
// import { vTooltip } from '../../../packages/directives';
import '../styles/index.scss';
import Layout from '../vitepress/layout/index.vue';

const vTooltip = {}
export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    // app.component('sn-tooltip', Tooltip)
    app.component('sn-button', Button)
    app.component('sn-button-group', ButtonGroup)
    app.component('sn-tag', Tag)
    app.component('sn-overlay', Overlay)
    app.component('sn-tooltip', Tooltip)
    app.component('sn-icon', Icon)
    app.component('sn-dropdown', Dropdown)
    app.component('sn-input', Input)
    app.component('sn-input-number', InputNumber)
    app.component('sn-textarea', Textarea)
    app.component('sn-input-tag', InputTag)
    app.component('sn-radio', Radio)
    app.component('sn-radio-group', RadioGroup)
    app.component('sn-checkbox', Checkbox)
    app.component('sn-checkbox-group', CheckboxGroup)
    app.component('sn-select', Select)
    app.directive('tooltip', vTooltip)
    app.component('exhibition-card', ExhibitionCard)
    app.component('api-type', ApiType)
  }
} satisfies Theme
