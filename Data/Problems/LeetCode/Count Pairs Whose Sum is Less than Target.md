# 2824. Count Pairs Whose Sum is Less than Target

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target](https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Microsoft, Zoho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 0-indexed integer array `nums` and an integer `target`, return the number of pairs `(i, j)` where `i < j` and `nums[i] + nums[j] < target`.

**Constraints:**
- `1 <= nums.length <= 50`
- `-50 <= nums[i] <= 50`
- `-50 <= target <= 50`

---

## Examples

**Example 1:**
- **Input:** `nums = [-1, 1, 2, 3, 1], target = 2`
- **Output:** `3`
- **Explanation:** Pairs with sum < 2: (-1,1)=0, (-1,2)=1, (-1,1)=0.

**Example 2:**
- **Input:** `nums = [-6, 2, 5, -2, -7, -1, 3], target = -2`
- **Output:** `10`

---

## Key Insight

Sort the array. Use two pointers: if `nums[lo] + nums[hi] < target`, then **all** pairs `(lo, lo+1), (lo, lo+2), ..., (lo, hi)` are valid (since they have even smaller right elements). Count `hi - lo` pairs and advance `lo`. Otherwise, decrement `hi` to reduce the sum.

---

## Approach

```
FUNCTION countPairs(nums, target):
    SORT nums
    lo, hi = 0, n - 1
    count = 0
    WHILE lo < hi:
        IF nums[lo] + nums[hi] < target:
            count += hi - lo
            lo += 1
        ELSE:
            hi -= 1
    RETURN count
```

---

## Walkthrough

**Input:** `nums = [-1, 1, 2, 3, 1], target = 2`

```
Sorted: [-1, 1, 1, 2, 3]
```

| lo | hi | nums[lo]+nums[hi] | < 2? | Action | count |
|---|---|---|---|---|---|
| 0 | 4 | -1+3=2 | No | hi=3 | 0 |
| 0 | 3 | -1+2=1 | Yes | count+=3, lo=1 | 3 |
| 1 | 3 | 1+2=3 | No | hi=2 | 3 |
| 1 | 2 | 1+1=2 | No | hi=1 | 3 |
| lo ≥ hi → stop | | | | | 3 |

**Result:** `3` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(1) — in-place sort |

---

## Follow-Up Questions

**Q1: Why add `hi - lo` instead of 1?**
When `nums[lo] + nums[hi] < target`, every value between `lo+1` and `hi` paired with `lo` also sums to less than target (since those values are ≤ nums[hi]). So all `hi - lo` pairs are valid at once.

**Q2: Can this be done in O(n²)?**
Yes — brute force with two nested loops. With n ≤ 50, O(n²) is fine, but the two-pointer approach is a great interview technique to demonstrate.

**Q3: What if we need pairs with sum equal to target?**
Use the standard two-sum approach (sort + two pointers, or hash map).

---

## Key Takeaway

> **Sort + two pointers is the canonical approach for counting pairs satisfying a sum inequality. When the smallest + largest satisfies the condition, all intermediate pairs with the smallest also satisfy it — giving a batch count of `hi - lo`.**
