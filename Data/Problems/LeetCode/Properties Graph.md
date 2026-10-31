# 3493. Properties Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/properties-graph](https://leetcode.com/problems/properties-graph)
**Companies:** Amazon

---

## Problem Description

You are given a 2D integer array `properties` having dimensions `n x m` and an integer `k`.

Define a function `intersect(a, b)` that returns the **number of distinct integers** common to both arrays `a` and `b`.

Construct an **undirected** graph where each index `i` corresponds to `properties[i]`. There is an edge between node `i` and node `j` if and only if `intersect(properties[i], properties[j]) >= k`, where `i` and `j` are in the range `[0, n - 1]` and `i != j`.

Return the number of **connected components** in the resulting graph.

**Constraints:**
- `1 <= n == properties.length <= 100`
- `1 <= m == properties[i].length <= 100`
- `1 <= properties[i][j] <= 100`
- `1 <= k <= m`

## Examples

**Example 1:**
```
Input: properties = [[1,2],[1,1],[3,4],[4,5],[5,6],[7,7]], k = 1
Output: 3
Explanation: The graph formed has 3 connected components.
```

**Example 2:**
```
Input: properties = [[1,2,3],[2,3,4],[4,3,5]], k = 2
Output: 1
Explanation: The graph formed has 1 connected component.
```

**Example 3:**
```
Input: properties = [[1,1],[1,1]], k = 2
Output: 2
Explanation: intersect(properties[0], properties[1]) = 1, which is less than k. This means there is no edge between properties[0] and properties[1] in the graph.
```

## Approach
Convert each row into a set of its distinct values (or a 100-bit mask, since values are in `1..100`). With `n <= 100` there are at most ~5000 pairs, so check every pair `i < j`: if `|set_i ∩ set_j| >= k`, union `i` and `j` in a Disjoint Set Union. Start with `n` components and decrement each time a union merges two different roots.

```text
FUNCTION numberOfComponents(properties, k):
    n ← LENGTH(properties)
    sets ← [SET(row) FOR row IN properties]
    dsu ← NEW UnionFind(n)
    components ← n
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            IF |sets[i] ∩ sets[j]| >= k:
                IF dsu.FIND(i) != dsu.FIND(j):
                    dsu.UNION(i, j)
                    components ← components - 1
    RETURN components
```

## Walkthrough
Example 1: `properties = [[1,2],[1,1],[3,4],[4,5],[5,6],[7,7]]`, `k = 1`.
Sets: `{1,2}, {1}, {3,4}, {4,5}, {5,6}, {7}`.

| Step | Pair | Intersection | Edge? | Components |
|------|------|--------------|-------|------------|
| 0 | - | - | - | 6 |
| 1 | (0,1) | {1} | yes, union | 5 |
| 2 | (2,3) | {4} | yes, union | 4 |
| 3 | (3,4) | {5} | yes, union | 3 |
| 4 | all other pairs | empty | no | 3 |

Components: `{0,1}`, `{2,3,4}`, `{5}` → answer `3`.

## Complexity Analysis
- **Time:** O(n² · m) for the pairwise intersections (O(n² · 100/64) with bitmasks), plus near-constant DSU operations.
- **Space:** O(n · m) for the sets and O(n) for the DSU.

## Follow-Up Questions
1. How would you speed up the intersection counts using bitsets and popcount?
2. If `n` were `10^5` but values were still small, how could you avoid checking all pairs (e.g. when `k = 1`, union each node with a "value node")?
3. How would you return the size of the largest component instead of the count?

## Key Takeaway
When the graph is defined implicitly by a pairwise predicate and `n` is small, build edges by brute-force pair checks and count components with Union-Find; convert rows to sets so duplicates are handled correctly.
