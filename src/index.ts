import * as babelParsers from 'prettier/plugins/babel';
import * as flowParsers from 'prettier/plugins/flow';
import * as htmlParsers from 'prettier/plugins/html';
import * as typescriptParsers from 'prettier/plugins/typescript';

import { defaultPreprocessor } from './preprocessors/default-processor';
import { vuePreprocessor } from './preprocessors/vue-preprocessor';

const options = {
  importOrder: {
    type: 'path',
    category: 'Global',
    array: true,
    default: [{ value: [] }],
    description: 'Provide an order to sort imports.',
  },
  importOrderCaseInsensitive: {
    type: 'boolean',
    category: 'Global',
    default: false,
    description: 'Provide a case sensitivity boolean flag',
  },
  importOrderParserPlugins: {
    type: 'path',
    category: 'Global',
    array: true,
    // By default, we add ts and jsx as parsers but if users define something
    // we take that option
    default: [{ value: ['typescript', 'jsx'] }],
    description: 'Provide a list of plugins for special syntax',
  },
  importOrderSeparation: {
    type: 'boolean',
    category: 'Global',
    default: false,
    description: 'Should imports be separated by new line?',
  },
  importOrderGroupNamespaceSpecifiers: {
    type: 'boolean',
    category: 'Global',
    default: false,
    description:
      'Should namespace specifiers be grouped at the top of their group?',
  },
  importOrderSortSpecifiers: {
    type: 'boolean',
    category: 'Global',
    default: false,
    description: 'Should specifiers be sorted?',
  },
};

module.exports = {
  // languages: [
  //   {
  //     name: 'babel',
  //     parsers: ['babel']
  //   },
  //   {
  //     name: 'flow',
  //     parsers: ['flow'],
  //   },
  //   {
  //     name: 'typescript',
  //     parsers: ['typescript'],
  //   },
  //   {
  //     name: 'vue',
  //     parsers: ['vue'],
  //   },
  // ],
  parsers: {
    babel: {
      // ...babelParsers.parsers.babel,
      parser: babelParsers.parsers.babel.parse,
      preprocess: defaultPreprocessor,
    },
    flow: {
      // ...flowParsers.parsers.flow,
      parser: flowParsers.parsers.flow.parse,
      preprocess: defaultPreprocessor,
    },
    typescript: {
      // ...typescriptParsers.parsers.typescript,
      parser: typescriptParsers.parsers.typescript.parse,
      preprocess: defaultPreprocessor,
    },
    vue: {
      // ...htmlParsers.parsers.vue,
      parser: htmlParsers.parsers.vue.parse,
      preprocess: vuePreprocessor,
    },
  },
  options,
};