# 675. Cut Off Trees for Golf Event

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cut-off-trees-for-golf-event](https://leetcode.com/problems/cut-off-trees-for-golf-event)
**Companies:** Amazon, Flipkart

---

## Problem Description

Given a grid with trees of various heights, cut them in order of increasing height starting from `(0,0)`. Find the minimum total steps, or `-1` if impossible.

---

## Examples

**Example 1:**
```
forest = [
  [1,2,3],
  [0,0,4],
  [7,6,5]
]
```
**Output:** `6`
*Explanation:* Cut trees in order 2 → 3 → 4 → 5 → 6 → 7, total steps = 6.

**Example 2:**
```
forest = [
  [1,2,3],
  [0,0,0],
  [7,6,5]
]
```
**Output:** `-1`
*Explanation:* Tree with height 4 is unreachable.

---

## Approach

```text
FUNCTION cutOffTree(forest):
    // Collect all trees > 1 with their coordinates
    SET trees ← list of (height, row, col) for each cell where height > 1
    SORT trees BY height ASCENDING
    SET totalSteps ← 0
    SET startR, startC ← 0, 0

    FOR EACH (height, targetR, targetC) IN trees:
        SET dist ← BFS(forest, startR, startC, targetR, targetC)
        IF dist == -1:
            RETURN -1
        SET totalSteps ← totalSteps + dist
        SET startR, startC ← targetR, targetC
        // Cut the tree (set height to 1) – optional for further BFS
        SET forest[startR][startC] ← 1

    RETURN totalSteps
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Extract trees > 1 and sort by height. | Determines cutting order: 2,3,4,5,6,7. |
| 2 | BFS from (0,0) to tree height 2 at (0,1). | Distance = 1, add to total. |
| 3 | BFS from (0,1) to tree height 3 at (0,2). | Distance = 1, total = 2. |
| 4 | Continue BFS to each subsequent tree. | Distances: to 4 = 2, to 5 = 1, to 6 = 1, to 7 = 1; total = 6. |
| 5 | If any BFS returns -1, return -1. | In Example 2, tree height 4 is blocked, BFS fails. |

---

## Complexity Analysis

- **Time:** O(T * (m·n)) where T is number of trees and each BFS scans the grid of size m·n.
- **Space:** O(m·n) for the BFS queue and visited matrix.

---

## Follow-Up Questions

- How would the solution change if diagonal moves were allowed?
- Can you improve the time complexity using a multi-source BFS or precomputed distances?

---

## Key Takeaway

> **Ordered grid traversal: sort targets by priority, then BFS between consecutive targets. Sum shortest path distances. Return -1 if any target is unreachable.**