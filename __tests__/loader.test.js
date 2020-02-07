/**
 * @jest-environment node
 */
import compiler from './lib/compiler.js';
import path from "path";

test('Must be able to build js to load ejs', async () => {
  const stats = await compiler(path.resolve(__dirname, './test-data/entry.js'));
  const output = stats.toJson({source: true}).modules[0].source;

  expect(output).toEqual(expect.anything());
});