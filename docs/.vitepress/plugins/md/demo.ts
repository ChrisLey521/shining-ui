// import { docRoot } from '@element-plus/build-utils'
import { docRoot } from '@shining-ui/build-utils'
import fs from 'fs'
import path from 'path'
import type { MarkdownRenderer } from 'vitepress'

interface ContainerOpts {
    marker?: string | undefined
    validate?(params: string): boolean
    render?: MarkdownRenderer['renderer']['rules']['container']
}
function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
    return {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/)
        },

        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            if (tokens[idx].nesting === 1 /* means the tag is opening */) {
                const description = m && m.length > 1 ? m[1] : ''
                const sourceFileToken = tokens[idx + 2]
                let source = ''
                const sourceFile = sourceFileToken.children?.[0]?.content ?? ''
                if (sourceFileToken.type === 'inline') {
                    source = fs.readFileSync(
                        path.resolve(docRoot, '.vitepress/vitepress/demos', `${sourceFile}.vue`),
                        'utf-8'
                    )
                }
                if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

                return `<exhibition-card code="${encodeURIComponent(
                    md.render(`\`\`\` vue\n${source}\`\`\``)
                )}" path="${sourceFile}"  description="${encodeURIComponent(md.render(description))}">
                    <template #exhibitions>
                        <sn-${sourceFile.replaceAll('/', '-')}/>
                    </template>`
            } else {
                return '</exhibition-card>\n'
            }
        },
    }
}

export default createDemoContainer