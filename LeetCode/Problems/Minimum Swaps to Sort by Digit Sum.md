# 3551. Minimum Swaps to Sort by Digit Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum](https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Cycle Count — O(n log n)](#4-approach-sort--cycle-count--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, sort it by **digit sum** (ascending), breaking ties by value. Return the **minimum** swaps needed.

**Constraints:**
- `1 <= nums.length <= 10⁵`

---

## 2. Examples

**Example 1:**
```
nums = [13, 31, 22]
```
*Digit sums are 4, 4, and 4. Ties are broken by value, so the target order is `[13,22,31]`. The permutation mapping is `[0→0, 1→2, 2→1]`, which has one 2‑cycle, so minimum swaps = 1.

**Example 2:**
```
nums = [5, 12, 3]
```
*Digit sums are 5, 3, 3. Sorted order by digit sum then value is `[12,3,5]`. Mapping `[0→2, 1→0, 2→1]` forms a single 3‑cycle, requiring 2 swaps.

---

## 3. Key Insight

> Determine the target sorted order using custom comparator (digit sum, then value). Then the minimum swaps to transform the current array into the sorted one = `n - number of cycles` in the permutation mapping.

---

## 4. Approach: Sort + Cycle Count — O(n log n) ✅

```text
FUNCTION minSwaps(nums):
    // Build list of (digitSum, value, originalIndex)
    items ← [(digitSum(nums[i]), nums[i], i) FOR i ← 0 TO n-1]
    SORT items BY (digitSum ASC, value ASC)
    // targetPos[i] = position where original index i should go
    targetPos ← ARRAY of size n
    FOR sortedIdx ← 0 TO n-1:
        originalIdx ← items[sortedIdx].originalIndex
        targetPos[originalIdx] ← sortedIdx

    visited ← ARRAY of false size n
    swaps ← 0
    FOR i ← 0 TO n-1:
        IF visited[i] OR targetPos[i] = i: CONTINUE
        cycleLen ← 0
        j ← i
        WHILE NOT visited[j]:
            visited[j] ← true
            j ← targetPos[j]
            cycleLen ← cycleLen + 1
        swaps ← swaps + cycleLen - 1
    RETURN swaps
```

---

## 5. Walkthrough

Take `nums = [13,31,22]`.
1. Compute digit sums: `[4,4,4]`.
2. Sort by (digitSum, value) → `[(4,13,0), (4,22,2), (4,31,1)]`.
3. Target positions: `targetPos[0]=0`, `targetPos[2]=1`, `targetPos[1]=2` → mapping `[0→0, 1→2, 2→1]`.
4. Cycle detection:
   - Index 0 is already correct.
   - Start at index 1 → 1→2→1 forms a 2‑cycle → swaps += 1.
Result = 1 swap.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting and cycle traversal |
| **Space** | O(n) — auxiliary arrays for sorting and visited flags |

---

## 7. Key Takeaway

> **Minimum swaps to sort = n - cycles.** Determine target positions via custom sort, decompose the resulting permutation into cycles, and count swaps.
