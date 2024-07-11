'use strict';

const fs = require('fs');
const extname = require('path').extname;
const prettier = require('prettier');

function run_spec(dirname, parsers, options) {
  options = Object.assign(
    {
      plugins: ['./src'],
      tabWidth: 4,
    },
    options,
  );

  /* instabul ignore if */
  if (!parsers || !parsers.length) {
    throw new Error(`No parsers were specified for ${dirname}`);
  }

  for (const filename of fs.readdirSync(dirname)) {
    const path = dirname + '/' + filename;
    if (
      extname(filename) !== '.snap' &&
      fs.lstatSync(path).isFile() &&
      filename[0] !== '.' &&
      filename !== 'ppsi.spec.js'
    ) {
      const source = read(path).replace(/\r\n/g, '\n');

      const mergedOptions = Object.assign({}, options, {
        parser: parsers[0],
      });
      test(`${filename} - ${mergedOptions.parser}-verify`, async () => {
        const output = await prettyprint(source, path, mergedOptions);
        try {
          expect(raw(source + '~'.repeat(80) + '\n' + output)).toMatchSnapshot(
            filename,
          );
        } catch (e) {
          console.error(e, path);
        }
      });

      for (const parserName of parsers.slice(1)) {
        test(`${filename} - ${parserName}-verify`, async () => {
          const verifyOptions = Object.assign(mergedOptions, {
            parser: parserName,
          });
          const verifyOutput = await prettyprint(source, path, verifyOptions);
          expect(output).toEqual(verifyOutput);
        });
      }
    }
  }
}
global.run_spec = run_spec;

module.exports = run_spec;

function stripLocation(ast) {
  if (Array.isArray(ast)) {
    return ast.map((e) => stripLocation(e));
  }
  if (typeof ast === 'object') {
    const newObj = {};
    for (const key in ast) {
      if (
        key === 'loc' ||
        key === 'range' ||
        key === 'raw' ||
        key === 'comments' ||
        key === 'parent' ||
        key === 'prev'
      ) {
        continue;
      }
      newObj[key] = stripLocation(ast[key]);
    }
    return newObj;
  }
  return ast;
}

function parse(string, opts) {
  return stripLocation(prettier.__debug.parse(string, opts));
}

async function prettyprint(src, filename, options) {
  return await prettier.format(
    src,
    Object.assign(
      {
        filepath: filename,
      },
      options,
    ),
  );
}

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
}

/**
 * Wraps a string in a marker object that is used by `./raw-serializer.js` to
 * directly print that string in a snapshot without escaping all double quotes.
 * Backticks will still be escaped.
 */
function raw(string) {
  if (typeof string !== 'string') {
    throw new Error('Raw snapshots have to be strings.');
  }
  return { [Symbol.for('raw')]: string };
}
