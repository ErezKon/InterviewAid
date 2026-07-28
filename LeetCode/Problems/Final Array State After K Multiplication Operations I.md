# 3264. Final Array State After K Multiplication Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given array `nums`, integer `k`, and `multiplier`, repeat `k` times: find the minimum element (first occurrence if ties), multiply it by `multiplier`. Return the final array.

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

| nums | k | multiplier | Final Array |
|------|---|------------|-------------|
| `[5,3,2]` | `2` | `2` | `[5,6,4]` |
| `[1,1,1]` | `3` | `3` | `[27,27,27]` |

## Walkthrough

Example 1: `nums=[5,3,2]`, `k=2`, `multiplier=2`
1. **Step 0:** Minimum is `2` at index 2 → multiply → `nums=[5,3,4]`.
2. **Step 1:** Minimum is `3` at index 1 → multiply → `nums=[5,6,4]`.
3. Return `[5,6,4]`.

## Complexity Analysis

- **Time:** O(n·k) – each of the `k` iterations scans the whole array to find the minimum.
- **Space:** O(1) – only a few scalar variables are used.

## Follow-Up Questions

- How would you improve the time complexity for large `k`?
- Can you modify the algorithm to work modulo `10⁹+7`?

## Key Takeaway

> **Greedy simulation: always multiply the smallest element. For large k, use a min‑heap to find the minimum in O(log n) per operation.**