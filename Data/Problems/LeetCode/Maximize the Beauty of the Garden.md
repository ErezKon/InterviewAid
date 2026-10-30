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

> *Note: premium problem — statement verified via doocs/leetcode.*

There is a garden of `n` flowers, and each flower has an integer beauty value. The flowers are arranged in a line. You are given an integer array `flowers` of size `n` and each `flowers[i]` represents the beauty of the `i^th` flower.

A garden is **valid** if it meets these conditions:

- The garden has at least two flowers.
- The first and the last flower of the garden have the same beauty value.

As the appointed gardener, you have the ability to **remove** any (possibly none) flowers from the garden. You want to remove flowers in a way that makes the remaining garden **valid**. The beauty of the garden is the sum of the beauty of all the remaining flowers.

Return the maximum possible beauty of some **valid** garden after you have removed any (possibly none) flowers.

**Constraints:**
- `2 <= flowers.length <= 10^5`
- `-10^4 <= flowers[i] <= 10^4`
- It is possible to create a valid garden by removing some (possibly none) flowers.

---

## Examples

**Example 1:**
```
Input: flowers = [1,2,3,1,2]
Output: 8
Explanation: You can produce the valid garden [2,3,1,2] to have a total beauty of 2 + 3 + 1 + 2 = 8.
```

**Example 2:**
```
Input: flowers = [100,1,1,-3,1]
Output: 3
Explanation: You can produce the valid garden [1,1,1] to have a total beauty of 1 + 1 + 1 = 3.
```

**Example 3:**
```
Input: flowers = [-1,-2,0,-1]
Output: -2
Explanation: You can produce the valid garden [-1,-1] to have a total beauty of -1 + -1 = -2.
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
