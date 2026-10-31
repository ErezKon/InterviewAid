# 3264. Final Array State After K Multiplication Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

You are given an integer array `nums`, an integer `k`, and an integer `multiplier`.

You need to perform `k` operations on `nums`. In each operation:

- Find the **minimum** value `x` in `nums`. If there are multiple occurrences of the minimum value, select the one that appears **first**.
- Replace the selected minimum value `x` with `x * multiplier`.

Return an integer array denoting the *final state* of `nums` after performing all `k` operations.

**Constraints:**

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= k <= 10`
- `1 <= multiplier <= 5`

---

## Approach: Simulation — O(n·k) ✅

```text
FUNCTION getFinalState(nums, k, multiplier):
    FOR step ← 0 TO k - 1:
        SET minIdx ← 0
        FOR i ← 1 TO LENGTH(nums) - 1:
            IF nums[i] < nums[minIdx]:
                SET minIdx ← i
        SET nums[minIdx] ← nums[minIdx] * multiplier
    RETURN nums
```

---

## Examples

```
Example 1:
  Input: nums = [2,1,3,5,6], k = 5, multiplier = 2
  Output: [8,4,6,5,6]
  Explanation:
  Operation          | Result
  After operation 1  | [2, 2, 3, 5, 6]
  After operation 2  | [4, 2, 3, 5, 6]
  After operation 3  | [4, 4, 3, 5, 6]
  After operation 4  | [4, 4, 6, 5, 6]
  After operation 5  | [8, 4, 6, 5, 6]
```

```
Example 2:
  Input: nums = [1,2], k = 3, multiplier = 4
  Output: [16,8]
  Explanation:
  Operation          | Result
  After operation 1  | [4, 2]
  After operation 2  | [4, 8]
  After operation 3  | [16, 8]
```

## Walkthrough

Example 1: `nums=[5,3,2]`, `k=2`, `multiplier=2`
1. **Step 0:** Minimum is `2` at index 2 → multiply → `nums=[5,3,4]`.
2. **Step 1:** Minimum is `3` at index 1 → multiply → `nums=[5,6,4]`.
3. Return `[5,6,4]`.

## Complexity Analysis

- **Time:** O(n·k) – each of the `k` iterations scans the whole array to find the minimum.
- **Space:** O(1) – only a few scalar variables are used.

## Follow-Up Questions

- How would you improve the time complexity for large `k`?
- Can you modify the algorithm to work modulo `10⁹+7`?

## Key Takeaway

> **Greedy simulation: always multiply the smallest element. For large k, use a min-heap to find the minimum in O(log n) per operation.**