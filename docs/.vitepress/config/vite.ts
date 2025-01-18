import { defineConfig } from 'vite';

const viteConfig = defineConfig({
  // plugins: [
  //   UnoCSS() as PluginOption,
  // ],
  resolve: {
    extensions: ['.vue', '.ts', '.js']
  }
})

export {
  viteConfig
};

