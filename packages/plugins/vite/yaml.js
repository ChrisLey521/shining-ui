import { createFilter } from '@rollup/pluginutils';
import fs from 'fs';
import yaml from 'yaml';

export function viteYamlPlugin() {
  const filter = createFilter(/\.ya?ml$/);

  return {
    name: 'vite-plugin-yaml',
    transform(src, id) {
      if (!filter(id)) return null;

      const contents = fs.readFileSync(id, 'utf-8');
      const parsed = yaml.parse(contents);
      const code = `export default ${JSON.stringify(parsed, null, 2)}`;
      return {
        code,
        map: null // or a source map if you want to generate one
      };
    }
  };
}