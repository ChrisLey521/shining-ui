
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const readYamlAsJson = (filePath: string): JSON => {
    const rawYamlContent = readFileSync(filePath, 'utf8');
    const parsedYaml = yaml.load(rawYamlContent);
    return parsedYaml
}

export {
    readYamlAsJson
};
