# 2604. Minimum Time to Eat All Grains

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-eat-all-grains](https://leetcode.com/problems/minimum-time-to-eat-all-grains)
**Companies:** Confluent

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search + Greedy — O(n log n log D)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given hens and grains on a number line, each hen eats grains by moving. A hen at position `h` can eat a grain at `g` in `|h - g|` seconds. Return the **minimum** time for all grains to be eaten if hens work simultaneously.

**Constraints:**
- `1 <= hens.length, grains.length <= 2 × 10⁴`

---

## 2. Key Insight

> Binary search on the answer `T`. For a given `T`, greedily assign grains to hens left-to-right: each hen can cover a range depending on whether it goes left-then-right or right-then-left within time `T`.

---

## 3. Approach: Binary Search + Greedy — O(n log n log D) ✅

```
FUNCTION minimumTime(hens, grains):
    SORT hens; SORT grains
    lo, hi = 0, 2 * 10^9

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canEatAll(hens, grains, mid): hi = mid
        ELSE: lo = mid + 1

    RETURN lo

FUNCTION canEatAll(hens, grains, T):
    g = 0  // grain pointer
    FOR h IN hens:
        IF g >= len(grains): RETURN true
        IF grains[g] < h:  // grains to the left
            leftDist = h - grains[g]
            IF leftDist > T: CONTINUE  // can't reach
            // Option 1: go left first, then right
            rightReach1 = h + MAX(0, T - 2 * leftDist)
            // Option 2: go right first, then left
            rightReach2 = h + MAX(0, (T - leftDist) / 2)
            rightReach = MAX(rightReach1, rightReach2)
        ELSE:
            rightReach = h + T
        // Advance g past all grains this hen covers
        WHILE g < len(grains) AND grains[g] <= rightReach: g += 1
    RETURN g >= len(grains)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n+m) log D) where D = coordinate range |
| **Space** | O(1) extra |

---

## 5. Key Takeaway

> **Binary search on time + greedy assignment.** Each hen's coverage depends on left-right vs right-left traversal within the time budget. Classic binary search + greedy feasibility check.
