# 3600. Maximize Spanning Tree Stability with Upgrades

**Difficulty:** 🔴 Hard
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

Given an undirected weighted graph with edges that can be "upgraded" (increase their weight), find a spanning tree that maximizes the **minimum edge weight** (stability) in the tree. Upgrades have a total budget constraint.

**Constraints:**
- Standard graph size constraints.

---

## Examples

**Example 1:**
```
Nodes: 4, Edges: [(1,2,3), (2,3,1), (3,4,2), (4,1,4)]
Budget: 3
```
Upgrading edge (2,3) from 1 to 4 (cost 3) allows a spanning tree with edges weights `[3,4,4]`; the minimum edge weight is `3`. No other set of upgrades yields a higher minimum.

**Example 2:**
```
Nodes: 3, Edges: [(1,2,5), (2,3,5), (1,3,1)]
Budget: 0
```
Without upgrades, the best spanning tree uses edges `(1,2,5)` and `(2,3,5)`, giving a minimum edge weight of `5`.

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
| 2 | Mid = (lo+hi+1)/2, e.g., `mid=3` for Example 1. | Test threshold `3`.
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
