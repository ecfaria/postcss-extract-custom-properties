/* eslint-disable */
const postcss = require('postcss');

const plugin = require('./');

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('does something', async () => {
  await run(':root { --color: #fafafa }', ':root { --color: #fafafa }', {
    importFrom: ['./tests/test.css'],
  });
});
