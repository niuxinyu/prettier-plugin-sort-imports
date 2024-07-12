module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  plugins: ['./lib/src/index.js'],
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
