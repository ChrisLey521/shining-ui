import { defineConfig, presetAttributify, presetUno, presetTypography, } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
    presets: [
        presetAttributify({}),
        presetUno(),
        presetTypography(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
            prefix: 'i-'
        })
    ],
    transformers: [
        transformerDirectives(),
        transformerAttributifyJsx(),
    ],
    rules: [
        ['m-1', { margin: '1px' }],
    ],
    cli: {
        entry: {
            outFile: 'packages/components/index.css',
            patterns: [
                'packages/components/**/*.vue'
            ]
        },
    }
})