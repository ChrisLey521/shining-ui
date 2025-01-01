import presetIcons from '@unocss/preset-icons'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetAttributify, presetTypography, presetUno, } from 'unocss'

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
            outFile: 'packages/theme-chalk/styles/uno.css',
            patterns: [
                'packages/components/**/*.vue',
                'packages/components/**/*.ts'
            ]
        },
    }
})