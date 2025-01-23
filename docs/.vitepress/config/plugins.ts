import mdContainer from 'markdown-it-container';
import { MarkdownRenderer } from 'vitepress';
import { ApiTableContainer } from '../plugins/md/api-table';
import createDemoContainer from '../plugins/md/demo';

const mdPlugin = async (md: MarkdownRenderer) => {
    md.use(ApiTableContainer)
    md.use(mdContainer, 'demo', createDemoContainer(md))
    // md.use(await Shiki({
    //     themes: {
    //         light: 'vitesse-light',
    //         dark: 'vitesse-dark',
    //     }
    // }))
}

export {
    mdPlugin
};
