import { defineConfig } from 'vite';
import { MarkdownTransformer } from '../plugins/vite/md-transformer';

const viteConfig = defineConfig({
  plugins: [
    MarkdownTransformer({
      // 首页不转换
      whiteList: ['index']
    })
],
  resolve: {
    extensions: ['.vue', '.ts', '.js'],
    alias: {
      '@common': '/.vitepress/vitepress/common',
      '@demos': '/.vitepress/vitepress/demos'
    }
  }
})

export {
  viteConfig
};

