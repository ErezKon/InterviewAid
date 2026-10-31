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

You are given an integer array `heights` representing the heights of buildings, some `bricks`, and some `ladders`.

You start your journey from building `0` and move to the next building by possibly using bricks or ladders.

While moving from building `i` to building `i+1` (**0-indexed**),

- If the current building's height is **greater than or equal** to the next building's height, you do **not** need a ladder or bricks.
- If the current building's height is **less than** the next building's height, you can either use **one ladder** or `(h[i+1] - h[i])` **bricks**.

*Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.*

**Constraints:**
- `1 <= heights.length <= 10^5`
- `1 <= heights[i] <= 10^6`
- `0 <= bricks <= 10^9`
- `0 <= ladders <= heights.length`

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
Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
```

**Example 2:**
```
Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
```

**Example 3:**
```
Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3
```

---

## 5. Walkthrough

Take Example 1:
1. Start at building 0 (height 4).
2. Climb to building 1 (height 2): diff = -2 → no resources needed.
3. Climb to building 2 (height 7): diff = 5 → push `5` into heap.
4. Heap size (1) ≤ ladders (1) → use ladder for this climb.
5. Climb to building 3 (height 6): diff = -1 → no resources.
6. Climb to building 4 (height 9): diff = 3 → push `3` into heap (size 2 > ladders).
   - Pop smallest (`3`) and pay with bricks: bricks = 5-3 = 2.
7. Climb to building 5 (height 14): diff = 5 → push `5` (heap size 2 > ladders).
   - Pop smallest (`5`) → bricks = 2-5 = -3 → bricks exhausted, stop.
8. Return index 4 (the last reachable building).

---

## 6. Complexity Analysis

- **Time:** O(n log l) – each climb triggers a heap operation of size at most `ladders`.
- **Space:** O(l) – heap stores at most `ladders` climbs.

---

## 7. Key Takeaway

> **Min-heap of size k** (ladders) keeps the k largest climbs on ladders. Evicted climbs are paid with bricks. Classic greedy + heap pattern.
