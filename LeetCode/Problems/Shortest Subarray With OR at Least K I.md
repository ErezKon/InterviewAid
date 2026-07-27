# 3095. Shortest Subarray With OR at Least K I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-i](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-i)
**Companies:** Mitsogo

---

## Problem Description

You are given an array `nums` of non-negative integers and an integer `k`.

Return the length of the **shortest non-empty subarray** of `nums` such that the bitwise OR of all its elements is **at least** `k`. Return `-1` if no such subarray exists.

A **subarray** is a contiguous non-empty sequence of elements within an array.

### Examples

**Example 1:**
- **Input:** `nums = [1,2,3]`, `k = 2`
- **Output:** `1`
- **Explanation:** The subarray `[3]` has OR value `3 >= 2`.

**Example 2:**
- **Input:** `nums = [2,1,8]`, `k = 10`
- **Output:** `3`
- **Explanation:** The subarray `[2,1,8]` has OR value `2 | 1 | 8 = 11 >= 10`.

**Example 3:**
- **Input:** `nums = [1,2]`, `k = 0`
- **Output:** `1`
- **Explanation:** Any single-element subarray has OR >= 0.

### Constraints

- `1 <= nums.length <= 50`
- `0 <= nums[i] <= 50`
- `0 <= k <= 64`

---

## Approach: Brute Force — O(n²)

Since the array length is at most 50 (Easy version), we can check every possible subarray.

For each starting index `i`, expand rightward accumulating the bitwise OR. As soon as the OR reaches `k`, record the length and break (expanding further only increases length).

```
FUNCTION minimumSubarrayLength(nums, k):
    n ← LENGTH(nums)
    minLen ← infinity
    FOR i ← 0 TO n-1:
        orVal ← 0
        FOR j ← i TO n-1:
            orVal ← orVal | nums[j]
            IF orVal >= k:
                minLen ← MIN(minLen, j - i + 1)
                BREAK
    RETURN minLen IF minLen < infinity ELSE -1
```

### Walkthrough — `nums = [2,1,8]`, `k = 10`

| i | j | orVal | >= k? | minLen |
|---|---|-------|-------|--------|
| 0 | 0 | 2     | No    | ∞      |
| 0 | 1 | 3     | No    | ∞      |
| 0 | 2 | 11    | Yes   | 3      |
| 1 | 1 | 1     | No    | 3      |
| 1 | 2 | 9     | No    | 3      |
| 2 | 2 | 8     | No    | 3      |

Result: `3`

| Time | Space |
|------|-------|
| O(n²) | O(1) |

---

## Follow-up

- See **Shortest Subarray With OR at Least K II** for the harder version with `n` up to 2 × 10⁵, which requires a sliding window with bit-count tracking in O(n · 30).
