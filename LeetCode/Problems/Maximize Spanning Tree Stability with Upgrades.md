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

## Key Insight

> Binary search on the minimum edge weight (stability threshold). For each candidate threshold, check if we can build a spanning tree where all edges have weight ≥ threshold (using upgrades within budget). Use Union-Find/Kruskal's to verify connectivity.

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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + MST | **O(E log E · log V)** | O(E + V) |

---

## Key Takeaway

> **"Maximize minimum edge in spanning tree with upgrades" = binary search on the stability threshold + MST feasibility check.** Classic pattern combining binary search on answer with graph connectivity verification.
