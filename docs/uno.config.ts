import presetIcons from '@unocss/preset-icons'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetAttributify, presetTypography, presetUno, UserConfig } from 'unocss'

const unocssConfig: UserConfig = defineConfig({
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
    rules: [
        ['m-1', { margin: '1px' }],
    ],
    content: {
        filesystem: [
            'pages/**/*.{md,html}',
            '.vitepress/**/*.{vue,js,ts}'
        ],
        pipeline: {
            exclude: [
                '.vitepress/cache/**/*'
            ]
        }
    }
})

export default unocssConfig