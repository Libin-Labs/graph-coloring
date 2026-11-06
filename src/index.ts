export interface GraphEdge {
  from: number;
  to: number;
}
export interface Coloring {
  colors: number[];
  colorCount: number;
}
export function greedyColoring(vertexCount: number, edges: readonly GraphEdge[]): Coloring {
  if (!Number.isSafeInteger(vertexCount) || vertexCount < 1 || vertexCount > 10_000)
    throw new RangeError('Invalid vertexCount');
  if (!Array.isArray(edges) || edges.length > 1_000_000) throw new RangeError('Invalid edges');
  const adjacency: Set<number>[] = Array.from({ length: vertexCount }, () => new Set());
  for (const edge of edges) {
    if (!edge || typeof edge !== 'object') throw new RangeError('Invalid edge');
    const { from, to } = edge;
    if (
      !Number.isSafeInteger(from) ||
      !Number.isSafeInteger(to) ||
      from < 0 ||
      to < 0 ||
      from >= vertexCount ||
      to >= vertexCount
    )
      throw new RangeError('Edge endpoint out of range');
    if (from === to) throw new RangeError('Self-loops cannot be properly colored');
    adjacency[from]!.add(to);
    adjacency[to]!.add(from);
  }
  const colors = new Int32Array(vertexCount).fill(-1);
  const saturation: Set<number>[] = Array.from({ length: vertexCount }, () => new Set());
  let colored = 0;
  let colorCount = 0;
  while (colored < vertexCount) {
    let selected = -1;
    for (let vertex = 0; vertex < vertexCount; vertex++) {
      if (colors[vertex]! >= 0) continue;
      if (
        selected < 0 ||
        saturation[vertex]!.size > saturation[selected]!.size ||
        (saturation[vertex]!.size === saturation[selected]!.size &&
          (adjacency[vertex]!.size > adjacency[selected]!.size ||
            (adjacency[vertex]!.size === adjacency[selected]!.size && vertex < selected)))
      )
        selected = vertex;
    }
    let color = 0;
    while (saturation[selected]!.has(color)) color++;
    colors[selected] = color;
    colorCount = Math.max(colorCount, color + 1);
    colored++;
    for (const neighbor of adjacency[selected]!)
      if (colors[neighbor]! < 0) saturation[neighbor]!.add(color);
  }
  return { colors: Array.from(colors), colorCount };
}
