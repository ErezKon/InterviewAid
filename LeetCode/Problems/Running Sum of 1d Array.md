# 1480. Running Sum of 1d Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/running-sum-of-1d-array](https://leetcode.com/problems/running-sum-of-1d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Given an integer array `nums`, return an array `result` where `result[i]` is the sum of `nums[0]` through `nums[i]` inclusive.

---

## Approach

```
FUNCTION runningSum(nums):
    FOR i ← 1 TO n - 1:
        // add previous prefix to current element
        nums[i] ← nums[i] + nums[i - 1]
    RETURN nums
```

| Time | Space |
|------|-------|
| O(n) | O(1) — in‑place prefix sum |

---

## Examples

| Input | Output |
|-------|--------|
| `[1,2,3,4]` | `[1,3,6,10]` |
| `[1,1,1,1,1]` | `[1,2,3,4,5]` |
| `[]` | `[]` |

---

## Walkthrough

For the first example `[1,2,3,4]`:

| i | nums[i] before | nums[i] after |
|---|----------------|--------------|
| 0 | 1 | 1 (unchanged) |
| 1 | 2 | 2 + 1 = 3 |
| 2 | 3 | 3 + 3 = 6 |
| 3 | 4 | 4 + 6 = 10 |

Resulting array `[1,3,6,10]`.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – modifies the input array in place, no extra storage.

---

## Follow‑Up Questions

1. How would you compute the running sum without modifying the input array?
2. Can you extend this to a 2‑D matrix to compute prefix sums for sub‑matrix queries?

---

## Key Takeaway

Running sum is a simple prefix‑sum technique: each element accumulates the sum of all previous elements, enabling O(n) time and O(1) extra space.
