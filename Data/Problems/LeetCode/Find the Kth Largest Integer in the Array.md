# 1985. Find the Kth Largest Integer in the Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array](https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Custom Sort — O(n log n) ✅](#4-approach-custom-sort--on-log-n-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array of strings `nums` where each string represents a non-negative integer, return the `k`-th **largest** integer (as a string). Duplicate values are counted distinctly.

**Constraints:**
- `1 <= k <= nums.length <= 10⁴`
- `1 <= nums[i].length <= 100`

---

## 2. Examples

```
Example 1:
  Input:  nums = ["3","6","7","10"], k = 4
  Output: "3"

Example 2:
  Input:  nums = ["2","21","12","1"], k = 3
  Output: "2"
```

---

## 3. Key Insight

> Sort strings by numeric value: first by length (shorter = smaller), then lexicographically for same length. The k-th largest is at index `n - k` after sorting.

---

## 4. Approach: Custom Sort — O(n log n) ✅

```
FUNCTION kthLargestNumber(nums, k):
    nums.SORT(key = lambda x: (len(x), x))
    RETURN nums[len(nums) - k]
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · L · log n) — sorting with L-length string comparisons |
| **Space** | O(1) — in-place sort |

---

## 6. Key Takeaway

> **Sort strings numerically** by comparing (length, then lexicographic). This avoids converting potentially huge numbers to integers.
