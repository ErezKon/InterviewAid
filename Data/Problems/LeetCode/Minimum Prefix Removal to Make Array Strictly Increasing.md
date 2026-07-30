# 3818. Minimum Prefix Removal to Make Array Strictly Increasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-prefix-removal-to-make-array-strictly-increasing](https://leetcode.com/problems/minimum-prefix-removal-to-make-array-strictly-increasing)
**Companies:** Jpmorgan

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Find Longest Strictly Increasing Suffix — O(n)](#4-approach-find-longest-strictly-increasing-suffix--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums`, return the **minimum** number of elements to remove from the **beginning** (prefix) so that the remaining array is **strictly increasing**.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [5, 3, 4, 6, 7]
  Output: 1
  Explanation: Remove [5] → [3, 4, 6, 7] is strictly increasing.

Example 2:
  Input: nums = [1, 2, 3, 4]
  Output: 0
  Explanation: Already strictly increasing.

Example 3:
  Input: nums = [5, 4, 3, 2, 1]
  Output: 4
  Explanation: Remove [5,4,3,2] → [1] is trivially increasing.
```

---

## 3. Key Insight

> Find the **longest strictly increasing suffix**. The answer is `n - length of that suffix`. Scan from the right: as long as `nums[i] < nums[i+1]`, extend the suffix.

---

## 4. Approach: Find Longest Strictly Increasing Suffix — O(n) ✅

```
FUNCTION minPrefixRemoval(nums):
    n = len(nums)
    i = n - 1

    WHILE i > 0 AND nums[i-1] < nums[i]:
        i -= 1

    RETURN i  // remove elements [0..i-1]
```

---

## 5. Walkthrough

```
nums = [5, 3, 4, 6, 7]

Start at i=4:
  i=4: nums[3]=6 < nums[4]=7 → i=3
  i=3: nums[2]=4 < nums[3]=6 → i=2
  i=2: nums[1]=3 < nums[2]=4 → i=1
  i=1: nums[0]=5 < nums[1]=3? NO → stop

Return i = 1 (remove 1 element from prefix) ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single scan from right |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Longest increasing suffix** — when you can only remove a prefix, the answer is determined by how far back the strictly increasing property holds from the end.
