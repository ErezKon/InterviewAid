# 2099. Find Subsequence of Length K With the Largest Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort Indices by Value — O(n log n) ✅](#4-approach-sort-indices-by-value--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and an integer `k`, return a subsequence of length `k` that has the **largest sum**. A subsequence preserves the relative order of elements.

If there are multiple answers, return any.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-10⁵ <= nums[i] <= 10⁵`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input:  nums = [2, 1, 3, 3], k = 2
  Output: [3, 3]
  Reason: Largest 2 elements are both 3s.

Example 2:
  Input:  nums = [-1, -2, 3, 4], k = 3
  Output: [-1, 3, 4]
  Reason: Pick 3 largest: -1, 3, 4. Return in original order.
```

---

## 3. Key Insight

> The maximum-sum subsequence of length `k` always consists of the **k largest elements**. Find their indices, sort the indices to restore original order, and extract.

---

## 4. Approach: Sort Indices by Value — O(n log n) ✅

```
FUNCTION maxSubsequence(nums, k):
    indices = sorted(range(len(nums)), key=lambda i: nums[i], reverse=True)[:k]
    RETURN [nums[i] for i in sorted(indices)]
```

---

## 5. Walkthrough

```
nums = [-1, -2, 3, 4], k = 3

Sort indices by value (descending): [3(4), 2(3), 0(-1), 1(-2)]
Take top k=3: [3, 2, 0]
Sort by index: [0, 2, 3]
Extract: [nums[0], nums[2], nums[3]] = [-1, 3, 4] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — two sorts |
| **Space** | O(n) — indices array |

---

## 7. Follow-Up Questions

### 7.1 Can you do this in O(n) average time?

Yes — use quickselect to find the k-th largest element in O(n) average, then collect all elements ≥ that value in order.

### 7.2 What if we want the minimum-sum subsequence?

Sort ascending instead of descending — take the k smallest elements.

### 7.3 How does this differ from "Maximum Subarray"?

Maximum Subarray requires contiguous elements. Here, elements can be non-contiguous (subsequence), making it simpler — just pick the largest k.

---

## 8. Key Takeaway

> **Select the k largest, restore order** — for subsequences (not subarrays), the optimal sum always comes from the top-k elements. The two-sort trick (by value, then by index) is clean and O(n log n).
