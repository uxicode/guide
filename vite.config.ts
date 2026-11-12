import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };
import { readmePlugin } from './plugins/vite-plugin-readme';

export default defineConfig({
  // 상대 경로로 빌드해 GitHub Pages 하위 경로(/guide/)와 로컬 preview 모두에서 동작하게 한다.
  base: './',
  plugins: [readmePlugin({ source: 'README.md', version: packageJson.version })],
});
