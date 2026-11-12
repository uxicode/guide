import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Marked } from 'marked';
import { getHeadingList, gfmHeadingId, resetHeadings } from 'marked-gfm-heading-id';
import type { Plugin } from 'vite';

interface ReadmePluginOptions {
  /** 프로젝트 루트 기준 마크다운 경로 */
  source: string;
  /** h1 제목 뒤에 붙는 문서 버전 */
  version: string;
}

interface RenderedReadme {
  contentHtml: string;
  navHtml: string;
}

const NAV_PLACEHOLDER = '<!--readme:nav-->';
const CONTENT_PLACEHOLDER = '<!--readme:content-->';
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function readmePlugin({ source, version }: ReadmePluginOptions): Plugin {
  let readmePath = '';

  return {
    name: 'vite-plugin-readme',

    configResolved(config) {
      readmePath = resolve(config.root, source);
    },

    configureServer(server) {
      server.watcher.add(readmePath);
      server.watcher.on('change', (file) => {
        if (file === readmePath) server.ws.send({ type: 'full-reload' });
      });
    },

    transformIndexHtml: {
      // 'post': Vite 에셋 처리 이후에 주입해야 마크다운 이미지 경로(public/)가 그대로 유지된다.
      order: 'post',
      async handler(html) {
        const markdown = await readFile(readmePath, 'utf-8');
        const { contentHtml, navHtml } = await renderReadme(markdown, version);
        return html.replace(NAV_PLACEHOLDER, navHtml).replace(CONTENT_PLACEHOLDER, contentHtml);
      },
    },
  };
}

async function renderReadme(markdown: string, version: string): Promise<RenderedReadme> {
  const marked = new Marked(gfmHeadingId(), {
    renderer: {
      // 마크다운 안의 raw HTML은 렌더링하지 않고 텍스트로 노출한다.
      html: ({ text }) => escapeHtml(text),
    },
  });

  resetHeadings();
  const parsedHtml = await marked.parse(markdown);
  const headings = getHeadingList();

  const contentHtml = parsedHtml.replace('</h1>', ` ( ver ${escapeHtml(version)} )</h1>`);
  const navHtml = headings
    .filter((heading) => heading.level === 2)
    .map((heading) => {
      const label = heading.raw.replace(/^[0-9]+\.\s*/, 'ㆍ ');
      return `<a class="btn-shortcut" href="#${heading.id}">${escapeHtml(label)}</a>`;
    })
    .join('\n');

  return { contentHtml, navHtml };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}
