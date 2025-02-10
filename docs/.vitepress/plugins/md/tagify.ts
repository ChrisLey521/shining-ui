import type { MarkdownRenderer } from 'vitepress'

const Tagify = (md: MarkdownRenderer): void => {
    md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
        const tagRegExp = /^\^\(([^)]*)\)/
        const str = state.src.slice(state.pos, state.posMax)

        if (!tagRegExp.test(str)) return false
        if (silent) return true

        const result = str.match(tagRegExp)

        if (!result) return false

        const token = state.push('html_inline', '', 0)
        const value = result[1].trim()

        const tagVariantMap = new Map([
            ['beta', 'warning'],
            ['deprecated', 'danger'],
            ['ally', 'success'],
            ['required', 'primary']
        ])
        
        token.content = `<sn-tag
            variant="${tagVariantMap.get(value) ?? 'primary'}"
            size="small"
            theme="${tagVariantMap.has(value) ? 'dark' : 'plain'}"
            round="${tagVariantMap.has(value)}"
        >${value}</sn-tag>`
        token.level = state.level
        state.pos += result[0].length

        return true
    })
}

export default Tagify