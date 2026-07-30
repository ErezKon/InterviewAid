# 1642. Furthest Building You Can Reach

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/furthest-building-you-can-reach](https://leetcode.com/problems/furthest-building-you-can-reach)
**Companies:** Amazon, Bloomberg, De Shaw, Dream11, Google, Medianet, Meta, Microsoft, Oyo, Phonepe, Schrodinger, Tiktok, Twilio, Uber, Walmart Labs, Zip

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Min-Heap — O(n log n) ✅](#3-approach-min-heap--on-log-n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
FUNCTION furthestBuilding(heights, bricks, ladders):
    heap ← MinHeap()    // stores climbs where we used a ladder
    FOR i ← 0 TO LENGTH(heights) - 2 DO
        diff ← heights[i+1] - heights[i]
        IF diff <= 0 THEN CONTINUE
        heap.PUSH(diff)
        IF heap.SIZE() > ladders THEN
            bricks ← bricks - heap.POP()   // replace smallest ladder usage with bricks
            IF bricks < 0 THEN RETURN i
    RETURN LENGTH(heights) - 1
```

---

## 4. Examples

**Example 1:**
```
heights = [4,2,7,6,9,14,12]
bricks = 5
ladders = 1
```
*Result:* `4` (furthest building index reachable).

**Example 2:**
```
heights = [4,12,2,7,3,18,20,3,19]
bricks = 10
ladders = 2
```
*Result:* `7`

---

## 5. Walkthrough

Take Example 1:
1. Start at building 0 (height 4).
2. Climb to building 1 (height 2): diff = -2 → no resources needed.
3. Climb to building 2 (height 7): diff = 5 → push `5` into heap.
4. Heap size (1) ≤ ladders (1) → use ladder for this climb.
5. Climb to building 3 (height 6): diff = -1 → no resources.
6. Climb to building 4 (height 9): diff = 3 → push `3` into heap (size 2 > ladders).
   - Pop smallest (`3`) and pay with bricks: bricks = 5‑3 = 2.
7. Climb to building 5 (height 14): diff = 5 → push `5` (heap size 2 > ladders).
   - Pop smallest (`5`) → bricks = 2‑5 = -3 → bricks exhausted, stop.
8. Return index 4 (the last reachable building).

---

## 6. Complexity Analysis

- **Time:** O(n log l) – each climb triggers a heap operation of size at most `ladders`.
- **Space:** O(l) – heap stores at most `ladders` climbs.

---

## 7. Key Takeaway

> **Min-heap of size k** (ladders) keeps the k largest climbs on ladders. Evicted climbs are paid with bricks. Classic greedy + heap pattern.
