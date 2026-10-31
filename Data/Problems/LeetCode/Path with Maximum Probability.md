# 1514. Path with Maximum Probability

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-probability](https://leetcode.com/problems/path-with-maximum-probability)
**Companies:** Amazon, Google, Meta, Microsoft, Samsung

---

## Problem Description
You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`.

Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability.

If there is no path from `start` to `end`, **return 0**. Your answer will be accepted if it differs from the correct answer by at most **1e-5**.

**Constraints:**

- `2 <= n <= 10^4`
- `0 <= start, end < n`
- `start != end`
- `0 <= a, b < n`
- `a != b`
- `0 <= succProb.length == edges.length <= 2*10^4`
- `0 <= succProb[i] <= 1`
- There is at most one edge between every two nodes.

## Examples

```
Example 1:
  Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
  Output: 0.25000
  Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
```

```
Example 2:
  Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
  Output: 0.30000
```

```
Example 3:
  Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
  Output: 0.00000
  Explanation: There is no path between 0 and 2.
```

## Approach
The problem is a maximum-product path, which can be solved by a variant of Dijkstra’s algorithm where the priority is the highest probability seen so far.

1. Build an adjacency list storing `(neighbor, edgeProb)` for each node.
2. Initialise an array `prob` with `0.0` for all nodes; set `prob[start] = 1.0`.
3. Use a max-heap (priority queue) keyed by probability (store negative to simulate max).
4. While the heap is not empty:
   - Pop the node with the current highest probability `p`.
   - If this node is `end`, return `p` (optimal due to max-heap property).
   - For each neighbor, compute `newP = p * edgeProb`.
   - If `newP` exceeds the recorded probability for that neighbor, update it and push onto the heap.
5. If the loop ends without reaching `end`, return `0.0`.

## Walkthrough
For the first example, start with `prob[0]=1`. Heap contains `(-1,0)`. Pop node 0, relax edges to 1 (0.5) and 2 (0.2). Heap now `(-0.5,1)`, `(-0.2,2)`. Pop node 1 (higher prob), relax edge to 2: `newP = 0.5*0.5 = 0.25` > `0.2`, update `prob[2]` and push `(-0.25,2)`. Next pop node 2 with `0.25` → return.

## Complexity Analysis
- Time: O(E log V) – each edge may cause a heap operation.
- Space: O(V + E) – adjacency list and probability array.

## Follow-Up Questions
1. How would you adapt the algorithm if edge probabilities were given as percentages (integers) and you needed exact rational results?
2. Can you solve the problem using a BFS with pruning instead of a heap?
3. What changes are required if you must output the actual path, not just its probability?

## Key Takeaway
Treat the maximum-product path as a longest-distance problem in log-space, and a max-heap Dijkstra efficiently finds the optimal probability.
