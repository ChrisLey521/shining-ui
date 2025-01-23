import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const projectRoot = resolve(__dirname, '../../..')

// Docs
const docsDirName = 'docs'
const docRoot = resolve(projectRoot, docsDirName)
const docDemoAlias = '@demos'
const docDemoPath = '.vitepress/vitepress/demos'

export {
    docDemoAlias, docDemoPath, docRoot, docsDirName, projectRoot
}
