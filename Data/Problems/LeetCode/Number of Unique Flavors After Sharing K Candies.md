# 2107. Number of Unique Flavors After Sharing K Candies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies](https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies)
**Companies:** Ciena, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Share exactly `k` consecutive candies. Maximize the number of unique flavors in the remaining `n - k` candies.

---

## Examples

**Example 1:**
```
Input: candies = [1,2,1,3,4,2,3], k = 3
Output: 4
Explanation: Share candies at positions 2‑4 (flavors 2,1,3). Remaining flavors are {1,4,2,3} → 4 unique.
```

**Example 2:**
```
Input: candies = [5,5,5,5], k = 2
Output: 1
Explanation: No matter which two candies are shared, only flavor 5 remains.
```

---

## 2. Key Insight

> Sliding window of size `k` (shared portion). Track unique flavors outside the window. Slide and update counts.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION shareCandies(candies, k):
    n ← LENGTH(candies)
    IF k == 0: RETURN SIZE(SET(candies))
    // Count all flavors
    totalCounts ← COUNTER(candies)
    // Remove flavors in initial shared window
    FOR i ← 0 TO k-1:
        totalCounts[candies[i]] ← totalCounts[candies[i]] - 1
        IF totalCounts[candies[i]] == 0:
            DELETE totalCounts[candies[i]]
    best ← SIZE(totalCounts)
    // Slide window across array
    FOR i ← k TO n-1:
        // Add back candy leaving window
        leftFlavor ← candies[i - k]
        totalCounts[leftFlavor] ← totalCounts.get(leftFlavor, 0) + 1
        // Remove new candy entering window
        rightFlavor ← candies[i]
        totalCounts[rightFlavor] ← totalCounts[rightFlavor] - 1
        IF totalCounts[rightFlavor] == 0:
            DELETE totalCounts[rightFlavor]
        best ← MAX(best, SIZE(totalCounts))
    RETURN best
```

---

## Walkthrough

Consider `candies = [1,2,1,3,4,2,3]`, `k = 3`.

| Step | Window (shared) | Remaining counts | Unique remaining |
|------|----------------|------------------|-------------------|
| Init | [1,2,1] | {3:1,4:1,2:1,3:1} → 4 | 4 |
| Slide 1 | [2,1,3] | {1:1,4:1,2:1,3:1} → 4 | 4 |
| Slide 2 | [1,3,4] | {2:2,1:1,3:1} → 3 | 3 |
| ... | ... | ... | ... |

The maximum unique count observed is **4**.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sliding window on the "shared" portion.** Track remaining flavors' count. Maximize unique count outside the window.
