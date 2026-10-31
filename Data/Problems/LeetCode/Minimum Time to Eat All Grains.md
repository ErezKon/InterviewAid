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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

There are `n` hens and `m` grains on a line. You are given the initial positions of the hens and the grains in two integer arrays `hens` and `grains` of size `n` and `m` respectively.

Any hen can eat a grain if they are on the same position. The time taken for this is negligible. One hen can also eat multiple grains.

In `1` second, a hen can move right or left by `1` unit. The hens can move simultaneously and independently of each other.

Return *the **minimum** time to eat all grains if the hens act optimally.*

**Constraints:**
- `1 <= hens.length, grains.length <= 2*10^4`
- `0 <= hens[i], grains[j] <= 10^9`

---

## 2. Key Insight

> Binary search on the answer `T`. For a given `T`, greedily assign grains to hens left-to-right: each hen can cover a range depending on whether it goes left-then-right or right-then-left within time `T`.

---

## 3. Approach: Binary Search + Greedy — O(n log n log D) ✅

```text
FUNCTION minimumTime(hens, grains):
    SORT hens ASCENDING
    SORT grains ASCENDING
    lo ← 0
    hi ← 2 * 10^9
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF canEatAll(hens, grains, mid):
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION canEatAll(hens, grains, T):
    g ← 0  // index of current grain
    FOR EACH h IN hens:
        IF g >= LENGTH(grains):
            RETURN TRUE
        IF grains[g] < h:
            leftDist ← h - grains[g]
            IF leftDist > T:
                CONTINUE
            // two possible routes for the hen
            rightReach1 ← h + MAX(0, T - 2 * leftDist)   // left first then right
            rightReach2 ← h + MAX(0, (T - leftDist) / 2) // right first then left
            rightReach ← MAX(rightReach1, rightReach2)
        ELSE:
            rightReach ← h + T
        // consume all grains within reachable range
        WHILE g < LENGTH(grains) AND grains[g] <= rightReach:
            g ← g + 1
    RETURN g >= LENGTH(grains)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n+m) log D) where D is coordinate range |
| **Space** | O(1) extra |

---

## 5. Examples

**Example 1:**
```
Input: hens = [3,6,7], grains = [2,4,7,9]
Output: 2
Explanation: One of the ways hens eat all grains in 2 seconds is described below:
- The first hen eats the grain at position 2 in 1 second.
- The second hen eats the grain at position 4 in 2 seconds.
- The third hen eats the grains at positions 7 and 9 in 2 seconds.
So, the maximum time needed is 2.
It can be proven that the hens cannot eat all grains before 2 seconds.
```

**Example 2:**
```
Input: hens = [4,6,109,111,213,215], grains = [5,110,214]
Output: 1
Explanation: One of the ways hens eat all grains in 1 second is described below:
- The first hen eats the grain at position 5 in 1 second.
- The fourth hen eats the grain at position 110 in 1 second.
- The sixth hen eats the grain at position 214 in 1 second.
- The other hens do not move.
So, the maximum time needed is 1.
```

---

## 6. Walkthrough

Consider the first example.
| Step | Hen position | Grain pointer before | Reachable right bound (T=3) | Grains consumed | Grain pointer after |
|------|--------------|----------------------|-----------------------------|----------------|--------------------|
| 1 | 2 | 0 (grain at 1) | rightReach = 2 + MAX(0, 3 - 2*1) = 3 | grain 1 (pos1) and grain 2 (pos3) | 2 |
| 2 | 5 | 2 (grain at 6) | rightReach = 5 + 3 = 8 | grain 3 (pos6) | 3 |
All grains consumed with T=3.

---

## 7. Key Takeaway

> **Binary search on time combined with greedy left-to-right assignment** efficiently determines the minimal feasible time. This pattern appears in many “minimum-time” scheduling problems.
