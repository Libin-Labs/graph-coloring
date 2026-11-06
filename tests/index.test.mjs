import test from 'node:test';
import assert from 'node:assert/strict';
import * as lib from '../dist/esm/index.js';
const assertProper = (n, edges, colors) => {
  assert.equal(colors.length, n);
  for (const { from, to } of edges) assert.notEqual(colors[from], colors[to]);
};
test('triangle receives three deterministic DSATUR colors', () => {
  const edges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 0 },
  ];
  const result = lib.greedyColoring(3, edges);
  assert.equal(result.colorCount, 3);
  assertProper(3, edges, result.colors);
});
test('bipartite path needs two colors and isolated node one', () => {
  const result = lib.greedyColoring(5, [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ]);
  assert.equal(result.colorCount, 2);
  assertProper(
    5,
    [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
    ],
    result.colors,
  );
});
test('duplicate constraints do not alter properness', () => {
  const edges = [
    { from: 0, to: 1 },
    { from: 0, to: 1 },
    { from: 1, to: 2 },
  ];
  assertProper(3, edges, lib.greedyColoring(3, edges).colors);
});
test('DSATUR tie-breaking is stable', () => {
  const edges = [
    { from: 0, to: 1 },
    { from: 2, to: 3 },
  ];
  assert.deepEqual(lib.greedyColoring(4, edges), lib.greedyColoring(4, edges));
});
test('seeded generated graphs always get a valid coloring', () => {
  let seed = 3425;
  const rand = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  for (let trial = 0; trial < 80; trial++) {
    const n = 12,
      edges = [];
    for (let a = 0; a < n; a++)
      for (let b = a + 1; b < n; b++) if (rand() < 0.24) edges.push({ from: a, to: b });
    const result = lib.greedyColoring(n, edges);
    assertProper(n, edges, result.colors);
    assert.equal(result.colorCount, Math.max(...result.colors) + 1);
  }
});
test('self-loops and malformed bounds reject impossible input', () => {
  assert.throws(() => lib.greedyColoring(2, [{ from: 0, to: 0 }]), RangeError);
  assert.throws(() => lib.greedyColoring(2, [{ from: 0, to: 2 }]), RangeError);
});
