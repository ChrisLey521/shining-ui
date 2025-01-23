import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';

const filename = fileURLToPath(new URL(import.meta.url))
const __dirname = dirname(filename)

const projectRoot = resolve(__dirname, '../../..')
// Docs
const docsDirName = 'docs'
const docRoot = resolve(projectRoot, docsDirName)
const docDemoPath = '.vitepress/vitepress/demos'
const docDemoAlias = '@demos'

export {
    docDemoAlias, docDemoPath, docRoot,
    docsDirName, projectRoot
};

