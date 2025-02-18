import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerAttributifyJsx,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

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
        transformerVariantGroup()
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