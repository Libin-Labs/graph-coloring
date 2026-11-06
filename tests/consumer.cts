import { greedyColoring, type Coloring, type GraphEdge } from '@lp-labs/graph-coloring';
export type PublicTypes = [GraphEdge, Coloring];
void greedyColoring;
// @ts-expect-error public API requires numeric vertex counts
greedyColoring('invalid', []);
