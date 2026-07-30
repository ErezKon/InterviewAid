# 1788. Maximize the Beauty of the Garden

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-beauty-of-the-garden](https://leetcode.com/problems/maximize-the-beauty-of-the-garden)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Prefix Sum + Hash Map — O(n)](#approach-prefix-sum--hash-map--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `flowers` where `flowers[i]` represents the beauty of the i-th flower (can be negative), find a contiguous subarray `[i..j]` such that `flowers[i] == flowers[j]` and the sum of all **positive** flowers between `i` and `j` (inclusive) is maximized. Return the maximum beauty.

**Constraints:**
- `2 ≤ flowers.length ≤ 10⁵`
- `-10⁴ ≤ flowers[i] ≤ 10⁴`

---

## Examples

**Example 1:**
```
flowers = [1, -2, 3, 1, 2, -1, 1]
Output: 7
Explanation: Choose subarray [0..3] (values 1, -2, 3, 1). Positive sum = 1 + 3 + 1 = 5, plus endpoints give total 7.
```

**Example 2:**
```
flowers = [-5, -1, -3, -5]
Output: -5
Explanation: All values are negative; the best we can do is pick a single flower as both endpoints.
```

---

## Walkthrough

1. **Prefix sum of positives:** Build `prefix[i]` = sum of `max(0, flowers[t])` for `t < i`.
2. **First occurrence map:** While scanning, store the first index where each flower value appears.
3. **Compute beauty:** When we encounter a value seen before at index `j`, the beauty of subarray `[j..i]` is `prefix[i] - prefix[j+1] + 2*flowers[i]` (adding both endpoints).
4. **Track maximum:** Update the global maximum with each computed beauty.
5. **Result:** After the scan, the stored maximum is the answer.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum + hash map | **O(n)** | O(n) |

---

## Key Takeaway

> **For "maximize sum between matching endpoints," use prefix sums of positive elements and a hash map to track the first occurrence of each value.** The matching constraint turns a subarray problem into a hash map lookup.
