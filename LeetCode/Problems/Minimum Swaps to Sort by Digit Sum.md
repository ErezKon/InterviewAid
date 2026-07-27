# 3551. Minimum Swaps to Sort by Digit Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum](https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Cycle Count — O(n log n)](#3-approach-sort--cycle-count--on-log-n)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, sort it by **digit sum** (ascending), breaking ties by value. Return the **minimum** swaps needed.

**Constraints:**
- `1 <= nums.length <= 10⁵`

---

## 2. Key Insight

> Determine the target sorted order using custom comparator (digit sum, then value). Then the minimum swaps to transform the current array into the sorted one = `n - number of cycles` in the permutation mapping.

---

## 3. Approach: Sort + Cycle Count — O(n log n) ✅

```
FUNCTION minSwaps(nums):
    target = sorted indices by (digitSum(nums[i]), nums[i])
    // Build permutation: where should each element go?
    visited = [false] * n
    swaps = 0

    FOR i ← 0 TO n - 1:
        IF visited[i] OR target[i] == i: CONTINUE
        cycleLen = 0
        j = i
        WHILE NOT visited[j]:
            visited[j] = true
            j = target[j]
            cycleLen += 1
        swaps += cycleLen - 1

    RETURN swaps
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Minimum swaps to sort = n - cycles.** Determine target positions via custom sort, decompose the resulting permutation into cycles, and count swaps.
