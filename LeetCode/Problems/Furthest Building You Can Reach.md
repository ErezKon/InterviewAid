# 1642. Furthest Building You Can Reach

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/furthest-building-you-can-reach](https://leetcode.com/problems/furthest-building-you-can-reach)
**Companies:** Amazon, Bloomberg, De Shaw, Dream11, Google, Medianet, Meta, Microsoft, Oyo, Phonepe, Schrodinger, Tiktok, Twilio, Uber, Walmart Labs, Zip

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Min-Heap — O(n log n) ✅](#3-approach-min-heap--on-log-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given building heights, bricks, and ladders, determine the furthest building you can reach. To climb up, use bricks (equal to height difference) or one ladder (covers any height).

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Greedily assign ladders to the largest climbs. Use a min-heap of size `ladders` — when the heap overflows, the smallest climb gets paid with bricks instead.

---

## 3. Approach: Min-Heap — O(n log n) ✅

```
FUNCTION furthestBuilding(heights, bricks, ladders):
    heap = MinHeap()    // stores climbs where we used a ladder

    FOR i ← 0 TO n - 2:
        diff = heights[i+1] - heights[i]
        IF diff <= 0: CONTINUE

        heap.PUSH(diff)

        IF heap.SIZE() > ladders:
            // Replace smallest ladder usage with bricks
            bricks -= heap.POP()
            IF bricks < 0:
                RETURN i

    RETURN n - 1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) |
| **Space** | O(n) — heap |

---

## 5. Key Takeaway

> **Min-heap of size k** (ladders) keeps the k largest climbs on ladders. Evicted climbs are paid with bricks. Classic greedy + heap pattern.
