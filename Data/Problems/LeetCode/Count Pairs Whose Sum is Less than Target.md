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

Given a **0-indexed** integer array `nums` of length `n` and an integer `target`, return *the number of pairs* `(i, j)` *where* `0 <= i < j < n` *and* `nums[i] + nums[j] < target`.

**Constraints:**
- `1 <= nums.length == n <= 50`
- `-50 <= nums[i], target <= 50`

---

## Examples

**Example 1:**
```
Input: nums = [-1,1,2,3,1], target = 2
Output: 3
Explanation: There are 3 pairs of indices that satisfy the conditions in the statement:
- (0, 1) since 0 < 1 and nums[0] + nums[1] = 0 < target
- (0, 2) since 0 < 2 and nums[0] + nums[2] = 1 < target
- (0, 4) since 0 < 4 and nums[0] + nums[4] = 0 < target
Note that (0, 3) is not counted since nums[0] + nums[3] is not strictly less than the target.
```

**Example 2:**
```
Input: nums = [-6,2,5,-2,-7,-1,3], target = -2
Output: 10
Explanation: There are 10 pairs of indices that satisfy the conditions in the statement:
- (0, 1) since 0 < 1 and nums[0] + nums[1] = -4 < target
- (0, 3) since 0 < 3 and nums[0] + nums[3] = -8 < target
- (0, 4) since 0 < 4 and nums[0] + nums[4] = -13 < target
- (0, 5) since 0 < 5 and nums[0] + nums[5] = -7 < target
- (0, 6) since 0 < 6 and nums[0] + nums[6] = -3 < target
- (1, 4) since 1 < 4 and nums[1] + nums[4] = -5 < target
- (3, 4) since 3 < 4 and nums[3] + nums[4] = -9 < target
- (3, 5) since 3 < 5 and nums[3] + nums[5] = -3 < target
- (4, 5) since 4 < 5 and nums[4] + nums[5] = -8 < target
- (4, 6) since 4 < 6 and nums[4] + nums[6] = -4 < target
```

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
