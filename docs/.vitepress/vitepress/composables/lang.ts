import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { DEFAULT_LOCALE } from '../../locales'

export const useLang = () => {
    const route = useRoute()
    return computed(() => {
        // the first part of the first slash
        const path = route.data?.relativePath
        let lang: string

        if (path?.includes('/')) {
            lang = path.split('/').shift()! || DEFAULT_LOCALE
        } else {
            lang = DEFAULT_LOCALE
        }
        return lang
    })
}