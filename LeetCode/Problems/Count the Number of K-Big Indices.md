# 2519. Count the Number of K-Big Indices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-k-big-indices](https://leetcode.com/problems/count-the-number-of-k-big-indices)
**Companies:** Amazon

---

## Problem Description

Given an integer array `nums` and an integer `k`, an index `i` is called **k‑big** if there are at least `k` elements strictly smaller than `nums[i]` to its left **and** at least `k` elements strictly smaller than `nums[i]` to its right. Return the number of k‑big indices.

---

## Examples

**Example 1**
```
Input: nums = [3,1,4,2,5], k = 1
Output: 2
Explanation:
- Index 2 (value 4): left smaller = [3,1] → 2 elements < 4, right smaller = [2,5] → 1 element < 4 → k‑big.
- Index 4 (value 5): left smaller = [3,1,4,2] → 4 elements < 5, right smaller = [] → 0 < k, not k‑big.
- Index 0 and 1 are not k‑big because they lack enough left elements.
Thus, only index 2 satisfies the condition.
```

**Example 2**
```
Input: nums = [1,2,3,4], k = 2
Output: 0
Explanation: No index has at least two smaller elements on both sides.
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
| i | nums[i] | leftSmaller[i] (BIT query) | rightSmaller[i] (BIT query) | k‑big? |
|---|---|---|---|---|
| 0 | 3 | 0 (no previous) | 2 (elements 1,2) | No (left < k) |
| 1 | 1 | 0 | 0 | No |
| 2 | 4 | 2 (3,1) | 1 (2) | **Yes** |
| 3 | 2 | 1 (1) | 0 | No |
| 4 | 5 | 4 (3,1,4,2) | 0 | No |
Only index 2 meets both thresholds, giving the answer 1.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log M) where M is the range of `nums` (BIT operations) |
| **Space** | O(M) for the BIT arrays |

---

## Follow-Up Questions

1. How would you solve the problem if `k` could be different for each index?
2. Can you achieve O(n) time using order‑statistics trees or offline sorting?
3. How would the solution change if the array contains duplicate values?

---

## Key Takeaway

> **K‑big indices require counting smaller elements on both sides. Two Fenwick Tree passes give an O(n log M) solution.**