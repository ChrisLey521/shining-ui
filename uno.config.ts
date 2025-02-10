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
        transformerDirectives({
            applyVariable: ['--at-apply'],
        }),
        transformerAttributifyJsx(),
    ],
    cli: {
        entry: {
            outFile: 'packages/theme-chalk/styles/uno.css',
            patterns: [
                'packages/components/**/*.{vue,ts,js}',
                'packages/directives/**/*.{vue,ts,js}',
                'packages/theme-chalk/styles/directives.css'
            ]
        },
    }
})