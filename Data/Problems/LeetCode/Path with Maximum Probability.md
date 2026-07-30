# 1514. Path with Maximum Probability

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-probability](https://leetcode.com/problems/path-with-maximum-probability)
**Companies:** Amazon, Google, Meta, Microsoft, Samsung

---

## Problem Description
Given an undirected weighted graph with `n` nodes labeled `0` to `n-1`, where each edge `(u, v)` has a success probability `succProb[i]`. Starting from node `start`, find the path to node `end` that maximizes the product of probabilities along the edges. Return the maximum probability; if no path exists, return `0`.

Constraints: `1 ≤ n ≤ 10⁴`; `0 ≤ edges.length ≤ 2·10⁴`; each probability `0 ≤ succProb[i] ≤ 1`.

## Examples
| n | edges | succProb | start | end | Output | Explanation |
|---|-------|----------|-------|-----|--------|-------------|
| 3 | [[0,1],[1,2],[0,2]] | [0.5,0.5,0.2] | 0 | 2 | 0.25 | Path 0→1→2 gives 0.5·0.5 = 0.25, higher than direct 0→2 (0.2). |
| 3 | [[0,1],[1,2]] | [0.5,0.5] | 0 | 2 | 0.25 | Only one possible path.

## Approach
The problem is a maximum‑product path, which can be solved by a variant of Dijkstra’s algorithm where the priority is the highest probability seen so far.

1. Build an adjacency list storing `(neighbor, edgeProb)` for each node.
2. Initialise an array `prob` with `0.0` for all nodes; set `prob[start] = 1.0`.
3. Use a max‑heap (priority queue) keyed by probability (store negative to simulate max).
4. While the heap is not empty:
   - Pop the node with the current highest probability `p`.
   - If this node is `end`, return `p` (optimal due to max‑heap property).
   - For each neighbor, compute `newP = p * edgeProb`.
   - If `newP` exceeds the recorded probability for that neighbor, update it and push onto the heap.
5. If the loop ends without reaching `end`, return `0.0`.

## Walkthrough
For the first example, start with `prob[0]=1`. Heap contains `(‑1,0)`. Pop node 0, relax edges to 1 (0.5) and 2 (0.2). Heap now `(‑0.5,1)`, `(‑0.2,2)`. Pop node 1 (higher prob), relax edge to 2: `newP = 0.5*0.5 = 0.25` > `0.2`, update `prob[2]` and push `(‑0.25,2)`. Next pop node 2 with `0.25` → return.

## Complexity Analysis
- Time: O(E log V) – each edge may cause a heap operation.
- Space: O(V + E) – adjacency list and probability array.

## Follow‑Up Questions
1. How would you adapt the algorithm if edge probabilities were given as percentages (integers) and you needed exact rational results?
2. Can you solve the problem using a BFS with pruning instead of a heap?
3. What changes are required if you must output the actual path, not just its probability?

## Key Takeaway
Treat the maximum‑product path as a longest‑distance problem in log‑space, and a max‑heap Dijkstra efficiently finds the optimal probability.
