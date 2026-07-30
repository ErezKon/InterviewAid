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

Given hens and grains on a number line, each hen eats grains by moving. A hen at position `h` can eat a grain at `g` in `|h - g|` seconds. Return the **minimum** time for all grains to be eaten if hens work simultaneously.

**Constraints:**
- `1 <= hens.length, grains.length <= 2 × 10⁴`

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
Input: hens = [2,5], grains = [1,3,6]
Output: 3
Explanation: In 3 seconds, hen at 2 can eat grain at 1 (1s) then move to 3 (2s total). Hen at 5 can reach grain at 6 in 1 second. All grains eaten.
```

**Example 2:**
```
Input: hens = [0], grains = [10]
Output: 10
Explanation: Single hen must travel 10 units to eat the only grain.
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

> **Binary search on time combined with greedy left‑to‑right assignment** efficiently determines the minimal feasible time. This pattern appears in many “minimum‑time” scheduling problems.
