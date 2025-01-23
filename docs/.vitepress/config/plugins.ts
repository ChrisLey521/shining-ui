import mdContainer from 'markdown-it-container'
import { MarkdownRenderer } from 'vitepress'
import ApiListContainer from '../plugins/md/api-list'
import createDemoContainer from '../plugins/md/demo'
import ListConatiner from '../plugins/md/list-container'
import Tagify from '../plugins/md/tagify'
import TypeTooltip from '../plugins/md/type-tooltip'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(mdContainer, 'demo', createDemoContainer(md))
  md.use(Tagify)
  md.use(TypeTooltip)
  md.use(ApiListContainer)
  md.use(ListConatiner)
}