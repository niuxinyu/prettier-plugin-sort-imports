const plugin = require('./lib/src/index.js');

module.exports = {
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: true,
    jsxBracketSameLine: true,
    semi: true,
    plugins: [plugin],
    importOrder: ['^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
