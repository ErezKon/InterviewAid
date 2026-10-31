# 2519. Count the Number of K-Big Indices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-k-big-indices](https://leetcode.com/problems/count-the-number-of-k-big-indices)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** integer array `nums` and a positive integer `k`.

We call an index `i` **k-big** if the following conditions are satisfied:

- There exist at least `k` different indices `idx1` such that `idx1 < i` and `nums[idx1] < nums[i]`.
- There exist at least `k` different indices `idx2` such that `idx2 > i` and `nums[idx2] < nums[i]`.

Return *the number of k-big indices*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= nums.length`

---

## Examples

```
Example 1:
  Input: nums = [2,3,6,5,2,3], k = 2
  Output: 2
  Explanation: There are only two 2-big indices in nums:
  - i = 2 --> There are two valid idx1: 0 and 1. There are three valid idx2: 3, 4, and 5.
  - i = 3 --> There are two valid idx1: 0 and 1. There are two valid idx2: 4 and 5.
```

```
Example 2:
  Input: nums = [1,1,1], k = 3
  Output: 0
  Explanation: There are no 3-big indices in nums.
```

---

## Approach

Use two passes with a **Binary Indexed Tree (Fenwick Tree)** to count smaller elements efficiently.
1. **Left pass** – iterate from left to right, for each `i` query the BIT for the count of values `< nums[i]` seen so far → `leftSmaller[i]`.
2. **Right pass** – iterate from right to left, similarly compute `rightSmaller[i]`.
3. Count indices where both `leftSmaller[i] ≥ k` and `rightSmaller[i] ≥ k`.

---

## Walkthrough

Consider `nums = [3,1,4,2,5]`, `k = 1`.
| i | nums[i] | leftSmaller[i] (BIT query) | rightSmaller[i] (BIT query) | k-big? |
|---|---|---|---|---|
| 0 | 3 | 0 (no previous) | 2 (elements 1,2) | No (left < k) |
| 1 | 1 | 0 | 0 | No |
| 2 | 4 | 2 (3,1) | 1 (2) | **Yes** |
| 3 | 2 | 1 (1) | 0 | No |
| 4 | 5 | 4 (3,1,4,2) | 0 | No |
Only index 2 meets both thresholds, giving the answer 1.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log M) where M is the range of `nums` (BIT operations) |
| **Space** | O(M) for the BIT arrays |

---

## Follow-Up Questions

1. How would you solve the problem if `k` could be different for each index?
2. Can you achieve O(n) time using order-statistics trees or offline sorting?
3. How would the solution change if the array contains duplicate values?

---

## Key Takeaway

> **K-big indices require counting smaller elements on both sides. Two Fenwick Tree passes give an O(n log M) solution.**