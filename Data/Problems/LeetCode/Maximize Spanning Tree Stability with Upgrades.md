# 3600. Maximize Spanning Tree Stability with Upgrades

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-spanning-tree-stability-with-upgrades](https://leetcode.com/problems/maximize-spanning-tree-stability-with-upgrades)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search + MST — O(E log E · log V)](#approach-binary-search--mst--oe-log-e--log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below assumes additive upgrades with a budget. Officially `must` edges are mandatory and cannot be upgraded, and each optional edge can be **doubled** once, with at most `k` upgrades. Correct idea: return -1 if the `must` edges form a cycle or the graph is disconnected. Then binary search on the stability `X`. Every `must` edge needs `s ≥ X`; union them first, then optional edges with `s ≥ X` for free, then edges with `2s ≥ X` (each costs one upgrade). `X` is feasible if the result is connected using `≤ k` upgrades.*

You are given an integer `n`, representing `n` nodes numbered from 0 to `n - 1` and a list of `edges`, where `edges[i] = [u_i, v_i, s_i, must_i]`:

- `u_i` and `v_i` indicates an undirected edge between nodes `u_i` and `v_i`.
- `s_i` is the strength of the edge.
- `must_i` is an integer (0 or 1). If `must_i == 1`, the edge **must** be included in the** ****spanning tree**. These edges **cannot** be **upgraded**.

You are also given an integer `k`, the **maximum** number of upgrades you can perform. Each upgrade **doubles** the strength of an edge, and each eligible edge (with `must_i == 0`) can be upgraded **at most** once.

The **stability** of a spanning tree is defined as the **minimum** strength score among all edges included in it.

Return the **maximum** possible stability of any valid spanning tree. If it is impossible to connect all nodes, return `-1`.

**Note**: A **spanning tree** of a graph with `n` nodes is a subset of the edges that connects all nodes together (i.e. the graph is **connected**) *without* forming any cycles, and uses **exactly** `n - 1` edges.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= edges.length <= 10^5`
- `edges[i] = [u_i, v_i, s_i, must_i]`
- `0 <= u_i, v_i < n`
- `u_i != v_i`
- `1 <= s_i <= 10^5`
- `must_i` is either `0` or `1`.
- `0 <= k <= n`
- There are no duplicate edges.

---

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1,2,1],[1,2,3,0]], k = 1
Output: 2
Explanation: - Edge [0,1] with strength = 2 must be included in the spanning tree.
- Edge [1,2] is optional and can be upgraded from 3 to 6 using one upgrade.
- The resulting spanning tree includes these two edges with strengths 2 and 6.
- The minimum strength in the spanning tree is 2, which is the maximum possible stability.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,4,0],[1,2,3,0],[0,2,1,0]], k = 2
Output: 6
Explanation: - Since all edges are optional and up to k = 2 upgrades are allowed.
- Upgrade edges [0,1] from 4 to 8 and [1,2] from 3 to 6.
- The resulting spanning tree includes these two edges with strengths 8 and 6.
- The minimum strength in the tree is 6, which is the maximum possible stability.
```

**Example 3:**
```
Input: n = 3, edges = [[0,1,1,1],[1,2,1,1],[2,0,1,1]], k = 0
Output: -1
Explanation: - All edges are mandatory and form a cycle, which violates the spanning tree property of acyclicity. Thus, the answer is -1.
```

---

## Approach: Binary Search + MST — O(E log E · log V) ✅

```
FUNCTION maxStability(n, edges, budget):
    lo, hi = 0, MAX_WEIGHT + MAX_UPGRADE

    FUNCTION canAchieve(threshold):
        // Filter edges that can reach threshold within budget
        // Check if these edges form a spanning tree
        validEdges = [e for e in edges if e.weight + e.maxUpgrade >= threshold]
        upgradeCost = SUM(MAX(0, threshold - e.weight) for selected edges in MST)
        RETURN connected AND upgradeCost <= budget

    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canAchieve(mid): lo = mid
        ELSE: hi = mid - 1

    RETURN lo
```

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Set `lo=0`, `hi` to max possible weight after upgrades. | Initial bounds.
| 2 | Mid = (lo+hi+1)/2, e.g., `mid=3` for Example 1. | Test threshold `3`.
| 3 | Filter edges that can reach `3` within budget (all edges). Compute MST using cheapest upgrades. | MST cost `3` ≤ budget, so `lo=3`.
| 4 | Next `mid` becomes higher, e.g., `mid=4`. Filter edges, MST requires upgrading edge (2,3) to `4` (cost `3`). Still within budget, set `lo=4`.
| 5 | `mid=5` fails (requires more budget), set `hi=4`. Loop ends, answer `4`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + MST | **O(E log E · log V)** | O(E + V) |

---

## Key Takeaway

> **"Maximize minimum edge in spanning tree with upgrades" = binary search on the stability threshold + MST feasibility check.** Classic pattern combining binary search on answer with graph connectivity verification.
