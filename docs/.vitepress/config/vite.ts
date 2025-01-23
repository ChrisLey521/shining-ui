import { viteYamlPlugin } from '@shining-ui/plugins';
import { defineConfig } from 'vite';
import { MarkdownTransformer } from '../plugins/vite/md-transform';

const viteConfig = defineConfig({
  plugins: [
    viteYamlPlugin(),
    MarkdownTransformer({
      // 首页不转换
      componentWhiteList: ['index']
    }),
  ],
  assetsInclude: ['**/*.yaml'],
  resolve: {
    extensions: ['.vue', '.ts', '.js'],
    alias: {
      '@common': '/.vitepress/vitepress/common',
      '@demos': '/.vitepress/vitepress/demos'
    }
  },
  optimizeDeps: {
    exclude: ['.yaml']
  }
})

export {
  viteConfig
};

