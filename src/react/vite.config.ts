/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'fs';

import type {
  ClassDeclaration,
  ClassField,
  CustomElementDeclaration,
  Declaration,
  Module,
  Package,
} from 'custom-elements-manifest/schema';
import type { PluginOption, UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

import rootConfig, {
  globIndexMap,
  isProdBuild,
  packageJsonTemplate,
  root,
} from '../../vite.config';

const packageRoot = new URL('.', import.meta.url);

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: packageRoot.pathname,
    plugins: [
      generateReactWrappers(),
      ...(isProdBuild(config)
        ? [
            dts({
              entryRoot: '.',
              include: `**/*.ts`,
              exclude: ['**/*.{stories,spec,e2e}.ts', 'vite.config.ts'],
              pathsToAliases: false,
            }),
            packageJsonTemplate(),
          ]
        : []),
    ],
    build: {
      lib: {
        formats: ['es'],
      },
      minify: false,
      outDir: new URL('./dist/react/', root).pathname,
      emptyOutDir: true,
      rollupOptions: {
        external: [/^@sbb-esta\/lyne-components\/?/, /^@lit\/react\/?/, /^lit\/?/, /^react/],
      },
    },
  }),
);

function generateReactWrappers(): PluginOption {
  const manifestPath = new URL('./dist/components/custom-elements.json', root);
  let manifest: Package;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    console.error(
      `Failed to read manifest at ${manifestPath}. Please run 'yarn build:components' or 'yarn docs:manifest' first!`,
    );
    process.exit(1);
  }

  const generatedPaths: URL[] = [];
  function createDir(dir: URL): void {
    if (!existsSync(dir)) {
      createDir(new URL('..', dir));
      generatedPaths.push(dir);
      mkdirSync(dir);
    }
  }
  return {
    name: 'generate-react-wrappers',
    config(config) {
      const declarations = manifest.modules
        .filter((m) => m.kind === 'javascript-module')
        .reduce((current, next) => current.concat(next.declarations ?? []), [] as Declaration[]);
      for (const module of manifest.modules) {
        for (const declaration of module.declarations.filter(
          (d): d is CustomElementDeclaration => 'customElement' in d && d.customElement,
        ) ?? []) {
          const targetPath = new URL(`./${module.path}/index.ts`, packageRoot);
          createDir(new URL('.', targetPath));
          const reactTemplate = renderTemplate(declaration, declarations, module);
          generatedPaths.push(targetPath);
          writeFileSync(targetPath, reactTemplate, 'utf8');
        }
      }

      for (const dirent of readdirSync(packageRoot, { withFileTypes: true }).filter((d) =>
        d.isDirectory(),
      )) {
        const dir = new URL(`./${dirent.name}/`, packageRoot);
        const dirIndex = new URL('./index.ts', dir);
        if (!existsSync(dirIndex)) {
          generatedPaths.push(dirIndex);
          const dirInfo = readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => `export * from './${d.name}';\n`)
            .join('');
          writeFileSync(new URL('./index.ts', dir), dirInfo, 'utf8');
        }
      }

      config.build.lib = {
        ...(config.build.lib ? config.build.lib : {}),
        entry: globIndexMap(packageRoot),
      };
    },
    closeBundle() {
      for (const path of generatedPaths.sort((a, b) => b.pathname.length - a.pathname.length)) {
        try {
          if (statSync(path).isDirectory()) {
            rmSync(path, { recursive: true, force: true });
          } else {
            unlinkSync(path);
          }
        } catch {
          /* empty */
        }
      }
    },
  };
}

function renderTemplate(
  declaration: CustomElementDeclaration,
  declarations: Declaration[],
  module: Module,
): string {
  const extensions = findExtensionUsage(declaration, declarations);
  const relativeCoreImportPath = `${'../'.repeat(module.path.split('/').length)}core`;
  const extensionImport = !extensions.size
    ? ''
    : `

import { ${Array.from(extensions.keys()).join(', ')} } from '${relativeCoreImportPath}';`;
  const extension = [...extensions.values()].reduce(
    (current, next) => (v) => current(next(v)),
    (v: string) => v,
  );
  const reactTemplate = `/* autogenerated */
import { createComponent, type EventName } from '${relativeCoreImportPath}';
import { ${declaration.name} } from '@sbb-esta/lyne-components/${module.path}';
import react from 'react';${extensionImport}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ${declaration.name.replace(/Element$/, '')} = ${extension(`createComponent({
  tagName: '${declaration.tagName}',
  elementClass: ${declaration.name},
  react,${
    declaration.events
      ? `
  events: {${declaration
    .events!.map(
      (e) =>
        `\n    'on${e.name.charAt(0).toUpperCase() + e.name.slice(1)}': '${e.name}' as EventName<${
          e.type.text
        }>,`,
    )
    .join('')}
  },
`
      : ''
  }
})`)};
`;
  return reactTemplate;
}

function findExtensionUsage(
  declaration: ClassDeclaration,
  declarations: Declaration[],
): Map<string, (_: string) => string> {
  const extensions = new Map<string, (_: string) => string>();
  if (usesSsrSlotState(declaration, declarations)) {
    extensions.set('withSsrDataSlotNames', (v) => `withSsrDataSlotNames(${v})`);
  }
  const childTypes = usesSsrSlotChildCounter(declaration);
  if (childTypes.length) {
    extensions.set(
      'withSsrDataChildCount',
      (v) => `withSsrDataChildCount([${childTypes.map((t) => `'${t}'`).join(', ')}], ${v})`,
    );
  }
  return extensions;
}

const ssrSlotStateKey = '_ssrslotstate';
function usesSsrSlotState(declaration: ClassDeclaration, declarations: Declaration[]): boolean {
  while (declaration) {
    if (
      declaration[ssrSlotStateKey] ||
      declaration.mixins?.some((m) =>
        declarations.find((d) => d.name === m.name && d[ssrSlotStateKey]),
      )
    ) {
      return true;
    }

    declaration = declarations.find(
      (d): d is ClassDeclaration => d.name === declaration.superclass?.name,
    );
  }

  return false;
}

const ssrSlotChildCountKey = '_ssrchildcounter';
function usesSsrSlotChildCounter(declaration: ClassDeclaration): string[] {
  return (
    declaration.members
      ?.find((m): m is ClassField => m[ssrSlotChildCountKey])
      ?.type?.text.replace(/[()[\] ]/g, '')
      .split('|') ?? []
  );
}
