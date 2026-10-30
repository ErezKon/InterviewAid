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

You are given an array `nums` of **distinct** positive integers. You need to sort the array in **increasing** order based on the sum of the digits of each number. If two numbers have the same digit sum, the **smaller** number appears first in the sorted order.

Return the **minimum** number of swaps required to rearrange `nums` into this sorted order.

A **swap** is defined as exchanging the values at two distinct positions in the array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `nums` consists of **distinct** positive integers.

---

## 2. Examples

**Example 1:**
```
Input: nums = [37,100]
Output: 1
Explanation: - Compute the digit sum for each integer: [3 + 7 = 10, 1 + 0 + 0 = 1] → [10, 1]
- Sort the integers based on digit sum: [100, 37]. Swap 37 with 100 to obtain the sorted order.
- Thus, the minimum number of swaps required to rearrange nums is 1.
```

**Example 2:**
```
Input: nums = [22,14,33,7]
Output: 0
Explanation: - Compute the digit sum for each integer: [2 + 2 = 4, 1 + 4 = 5, 3 + 3 = 6, 7 = 7] → [4, 5, 6, 7]
- Sort the integers based on digit sum: [22, 14, 33, 7]. The array is already sorted.
- Thus, the minimum number of swaps required to rearrange nums is 0.
```

**Example 3:**
```
Input: nums = [18,43,34,16]
Output: 2
Explanation: - Compute the digit sum for each integer: [1 + 8 = 9, 4 + 3 = 7, 3 + 4 = 7, 1 + 6 = 7] → [9, 7, 7, 7]
- Sort the integers based on digit sum: [16, 34, 43, 18]. Swap 18 with 16, and swap 43 with 34 to obtain the sorted order.
- Thus, the minimum number of swaps required to rearrange nums is 2.
```

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
