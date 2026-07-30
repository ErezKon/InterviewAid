# MST Patterns (Kruskal & Prim)

---

## Problem Description
A Minimum Spanning Tree (MST) connects all `n` vertices of an undirected weighted graph with exactly `n‑1` edges such that the total edge weight is minimized. Two classic algorithms solve this: **Kruskal** (edge‑centric) and **Prim** (vertex‑centric). The problem may ask for the total weight of the MST or to construct the edge set.

## Examples
**Example 1 – Kruskal:**
```
n = 4
edges = [(1,0,1),(4,0,2),(3,1,2),(2,1,3),(5,2,3)]
Output: 7   // edges (1,0,1), (2,1,3), (3,1,2) form MST
```
**Example 2 – Prim:**
```
adj = {
 0: [(1,1),(2,4)],
 1: [(0,1),(2,3),(3,2)],
 2: [(0,4),(1,3),(3,5)],
 3: [(1,2),(2,5)]
}
Output: 7
```

## Approach
Both algorithms rely on a **greedy** selection of the smallest edge that does not create a cycle.
- **Kruskal:** Sort all edges by weight, then iterate, adding an edge if its endpoints belong to different Union‑Find sets.
- **Prim:** Start from an arbitrary vertex, push all incident edges into a min‑heap, repeatedly extract the smallest edge that connects to an unvisited vertex, and add its outgoing edges to the heap.

```text
FUNCTION kruskal(n, edges):
    SORT edges BY weight
    uf ← UnionFind(n)
    cost ← 0
    edgeCount ← 0
    FOR (w, u, v) IN edges:
        IF uf.find(u) != uf.find(v):
            uf.union(u, v)
            cost ← cost + w
            edgeCount ← edgeCount + 1
            IF edgeCount == n - 1: BREAK
    RETURN cost IF edgeCount == n - 1 ELSE -1

FUNCTION prim(n, adj):
    visited ← SET()
    heap ← MIN-HEAP()
    heap.PUSH((0, 0))   // (weight, vertex)
    cost ← 0
    WHILE heap NOT EMPTY AND SIZE(visited) < n:
        (w, u) ← heap.POP_MIN()
        IF u IN visited: CONTINUE
        visited.ADD(u)
        cost ← cost + w
        FOR (v, wt) IN adj[u]:
            IF v NOT IN visited:
                heap.PUSH((wt, v))
    RETURN cost
```

## Walkthrough (Kruskal Example)
1. Sort edges → [(1,0,1),(2,1,3),(3,1,2),(4,0,2),(5,2,3)].
2. Add (1,0,1): union 0‑1, cost=1.
3. Add (2,1,3): union 1‑3, cost=3.
4. Add (3,1,2): union 1‑2, cost=6 → now 3 edges (`n‑1`), MST complete.

## Complexity Analysis
- **Time:** Kruskal O(E log E) for sorting; Prim O(E log V) using a heap.
- **Space:** O(E) for edge list or adjacency, plus O(V) for Union‑Find / visited set.

## Follow-Up Questions
1. How would you modify Kruskal to list all **critical** and **pseudo‑critical** edges?
2. Can you compute an MST when edge weights are updated dynamically?
3. What changes are needed for a **directed** graph with a minimum arborescence?

## Key Takeaway
Both Kruskal and Prim apply a greedy edge‑selection principle; choose Kruskal for edge‑list input or sparse graphs, and Prim for dense adjacency representations.
