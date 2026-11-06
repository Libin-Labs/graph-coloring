# @lp-labs/graph-coloring

Deterministic DSATUR greedy proper coloring of undirected graphs. Zero runtime and peer dependencies. MIT. Node.js 18+; ES2022-compatible browser runtimes. No browser globals are accessed at import.

## Install

```sh
npm install @lp-labs/graph-coloring
```

## Quick start

```js
import { greedyColoring } from '@lp-labs/graph-coloring';
console.log(
  greedyColoring(3, [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
  ]),
);
```

Use the named ESM imports shown above. CommonJS uses `const { greedyColoring } = require('@lp-labs/graph-coloring');`. Both formats ship declarations.

## Public API and customization

Runtime exports: `greedyColoring`.

Public signatures: `greedyColoring(vertexCount: number, edges: readonly GraphEdge[]): Coloring`.

Types: `GraphEdge = { from: number; to: number }`; `Coloring = { colors: number[]; colorCount: number }`.

Returns color labels and the number of used colors. It guarantees a proper coloring, not a minimum or optimal coloring. Self-loops are rejected because no proper coloring exists. All graph vertices are integer indices from `0` to `vertexCount - 1`; edges are copied into algorithm-owned structures. Options are per call; no global configuration.

## Errors, ownership and limits

At most 10,000 vertices and 1,000,000 edges; deterministic selection uses greatest saturation, then degree, then smallest vertex index. Greedy selection is not an optimality guarantee. Invalid vertex counts, endpoints, edge shapes, option values, work exhaustion, and impossible numeric results raise `RangeError`. Results are fresh arrays/objects; input arrays are not mutated.

Synchronous algorithms are bounded by stated input/work limits, not cancellable or real-time. Validation does not sandbox hostile getters, proxies, or callbacks. Finite floating-point behavior applies where weights are used. No I/O, network, persistence, or cryptographic guarantees.

## Development

```sh
npm ci --offline
npm run build
npm run typecheck
npm test
npm run format:check
```

Strict TypeScript NodeNext builds produce ESM, CommonJS, and declarations. Installed ESM/CommonJS consumer checks and seeded or exhaustive reference-oracle tests are included. Only TypeScript and Prettier are development dependencies.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
