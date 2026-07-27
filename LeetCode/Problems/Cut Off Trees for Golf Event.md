# 675. Cut Off Trees for Golf Event

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cut-off-trees-for-golf-event](https://leetcode.com/problems/cut-off-trees-for-golf-event)
**Companies:** Amazon, Flipkart

---

## Problem Description

Given a grid with trees of various heights, cut them in order of increasing height starting from `(0,0)`. Find the minimum total steps, or `-1` if impossible.

---

## Key Insight

Sort trees by height to determine the cutting order. Then BFS between consecutive target positions to find shortest paths. Sum all BFS distances.

---

## Approach

```
FUNCTION cutOffTree(forest):
    trees = sorted list of (height, row, col) for all trees > 1
    totalSteps = 0
    startR, startC = 0, 0

    FOR (height, targetR, targetC) IN trees:
        dist = BFS(forest, startR, startC, targetR, targetC)
        IF dist == -1: RETURN -1
        totalSteps += dist
        startR, startC = targetR, targetC

    RETURN totalSteps
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m²n²) — BFS for each tree, up to mn trees |
| **Space** | O(mn) |

---

## Key Takeaway

> **Ordered grid traversal: sort targets by priority, then BFS between consecutive targets. Sum shortest path distances. Return -1 if any target is unreachable.**
