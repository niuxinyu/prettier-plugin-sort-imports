const fs = require('fs')
const prettier = require('prettier')
const plugin = require('./src/index')

const code = fs
  .readFileSync('./tests/React/react-native.tsx', 'utf8')
  .toString()

const options = {
  parser: 'typescript',
  plugins: [plugin],
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@server/(.*)',
    '^@ui/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: ['typescript', 'jsx'],
}

prettier.format(code, options).then((res: string) => {
  console.log(res)
})
