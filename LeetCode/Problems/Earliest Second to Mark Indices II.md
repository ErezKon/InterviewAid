# 3049. Earliest Second to Mark Indices II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/earliest-second-to-mark-indices-ii](https://leetcode.com/problems/earliest-second-to-mark-indices-ii)
**Companies:** Google, Mathworks

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search + Greedy with Heap](#approach-binary-search--greedy-with-heap)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` (1-indexed) and `changeIndices` (1-indexed, representing which index is "special" at each second), at each second you can either:
1. Decrement `nums[i]` by 1 for any `i`, OR
2. If `nums[changeIndices[s]] == 0`, mark index `changeIndices[s]`.

Additionally, a special "instant mark" operation can zero out an index immediately at its designated second (instead of decrementing one-by-one). Return the **earliest second** by which all indices can be marked, or `-1` if impossible.

**Constraints:**
- `1 <= n <= 5000`
- `1 <= m (changeIndices.length) <= 5000`

---

## Examples

```
Input: nums = [3,2,3], changeIndices = [1,3,2,2,2,2,3]
Output: 6

Input: nums = [0,0,1,2], changeIndices = [1,2,1,2,1,2,1,2]
Output: 7
```

---

## Key Insight

> **Binary search on the answer** (earliest second t). For a given t, greedily decide which indices to "instant-mark" (save decrement steps) vs manually decrement. Use a **max-heap** to prioritize instant-marking the indices with largest `nums[i]` (biggest savings). Count if you have enough free seconds to cover remaining decrements.

---

## Approach: Binary Search + Greedy with Heap

```
FUNCTION earliestSecondToMarkIndices(nums, changeIndices):
    FUNCTION canFinish(t):
        // For seconds 1..t, determine last occurrence of each index in changeIndices
        // These are candidates for instant-mark
        // Use a heap to greedily pick which to instant-mark
        // Count free seconds vs required decrement seconds
        ...check feasibility...

    lo = n, hi = m
    ans = -1
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF canFinish(mid):
            ans = mid
            hi = mid - 1
        ELSE:
            lo = mid + 1
    RETURN ans
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(m × log m × n) | Binary search × greedy check with heap |
| **Space** | O(n + m) | Heap + auxiliary arrays |

---

## Key Takeaway

> **Binary search on time + greedy selection of which operations to "upgrade" (instant-mark vs manual decrement). Max-heap prioritizes the biggest savings. A hard scheduling/optimization problem.**
