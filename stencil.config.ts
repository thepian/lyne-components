import { inlineSvg } from 'stencil-inline-svg';
import jestConfig from './.jest.config.js';
import { sass } from '@stencil/sass';

export const config = {
  buildEs5: 'prod',
  namespace: 'lyne-components',
  outputTargets: [
    {
      esmLoaderPath: '../loader',
      type: 'dist'
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      footer: '',
      type: 'docs-readme'
    },
    {
      dir: './dist/documentation',
      footer: '',
      type: 'docs-readme'
    },
    {
      file: './dist/documentation/jsonDocs.json',
      type: 'docs-json'
    },
    {
      // disable service workers
      serviceWorker: null,
      type: 'www'
    }
  ],
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: ['src/global/variables.scss']
    })
  ],
  testing: jestConfig
};
