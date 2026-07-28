# 3434. Maximum Frequency After Subarray Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-frequency-after-subarray-operation](https://leetcode.com/problems/maximum-frequency-after-subarray-operation)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given an integer array `nums` and an integer `k`, you may choose any subarray and add the same integer `c` to every element of that subarray. After this operation, maximize the frequency (the number of occurrences) of the value `k` in the entire array.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,2,2], k = 2
Output: 5
Explanation: Choose the subarray [1,2,3] and add c = 1, turning it into [2,3,4]. The array becomes [2,3,4,2,2] and the frequency of 2 is 3 (original) + 2 (converted) = 5.
```

**Example 2:**
```
Input: nums = [5,5,5], k = 5
Output: 3
Explanation: No operation is needed; the frequency of 5 is already maximal.
```

---

## Approach

**Algorithm:** Kadane's per distinct value (excluding `k`).

For each possible original value `v` (where `v ≠ k`), adding `c = k - v` to a subarray converts every `v` inside that subarray to `k`. However, any existing `k` inside the chosen subarray would be shifted away, effectively losing one occurrence. Model each element as:
- `+1` if it equals `v` (gain a new `k`)
- `-1` if it equals `k` (lose an existing `k`)
- `0` otherwise
Finding the subarray with the maximum net gain is exactly the classic **Maximum Subarray (Kadane's)** problem.

The overall answer is the base count of `k` outside the chosen subarray plus the best net gain across all `v`.

---

## Walkthrough

Consider the first example `nums = [1,2,3,2,2]`, `k = 2`.

1. **Base count:** There are three `2`s already.
2. **Iterate over possible `v` values:** `{1,3}`.
   - For `v = 1` (convert `1` to `2`):
     - Transform array to gains: `[+1, -1, 0, -1, -1]` (`+1` for `1`, `-1` for each existing `2`).
     - Kadane's maximum subarray sum = `+1` (choose subarray `[1]`).
     - Total frequency = `3 (base) + 1 = 4`.
   - For `v = 3` (convert `3` to `2`):
     - Gains: `[0, -1, +1, -1, -1]`.
     - Kadane's maximum sum = `+1` (subarray `[3]`).
     - Total frequency = `3 + 1 = 4`.
3. **Best gain:** Both give a gain of `1`. However, we can also choose a larger subarray that includes both `1` and `3` by adding `c = 1` (convert `1` to `2` and `3` to `4` – not useful). The optimal strategy is to pick the subarray `[1,2,3]` and add `c = 1`, which converts `1` and `3` to `2` while shifting the middle `2` to `3`. Net gain = `+2 -1 = +1`, achieving a total frequency of `5`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Kadane's per value | **O(n · σ)** where `σ` is the number of distinct values (excluding `k`) | O(1) |

---

## Follow-Up Questions

1. How would the solution change if you could perform the operation on **multiple** subarrays?
2. Can the algorithm be optimized to **O(n log n)** using prefix sums and a balanced BST?
3. What if the added constant `c` must be **non‑negative**?

---

## Key Takeaway

> Adding a constant to a subarray to maximize the frequency of `k` reduces to a Kadane's maximum subarray problem for each candidate original value, where each element contributes `+1` if convertible and `-1` if it displaces an existing `k`.