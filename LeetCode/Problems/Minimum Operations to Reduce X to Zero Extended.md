# Complement Technique: Find Middle Instead

Related: #1658, #209, #862

---

## Table of Contents

1. [Pattern Description](#1-pattern-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window on Complement — O(n)](#4-approach-sliding-window-on-complement--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Where This Pattern Applies](#7-where-this-pattern-applies)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Pattern Description

**"Remove from ends" = "Find middle subarray"**

For #1658 Minimum Operations to Reduce X to Zero:
- You can remove elements from either end of an array, reducing `x` by the removed value.
- Instead of thinking about removals from both ends, find the **longest subarray** with sum = `total - x`.
- Answer = `n - longestSubarrayLength`.

This reframing converts a two-pointer-from-both-ends problem into a standard sliding window problem.

---

## 2. Examples

```
Example 1:
  Input: nums = [1,1,4,2,3], x = 5
  total = 11, target = 11 - 5 = 6
  Longest subarray with sum 6: [4,2] (length 2)
  Answer: 5 - 2 = 3

Example 2:
  Input: nums = [5,6,7,8,9], x = 4
  total = 35, target = 35 - 4 = 31
  No subarray sums to 31 → Answer: -1

Example 3:
  Input: nums = [3,2,20,1,1,3], x = 10
  total = 30, target = 30 - 10 = 20
  Longest subarray with sum 20: [20] or [2,20]... 
  Actually [20] has sum 20 (len 1), [2,20] has sum 22.
  Longest = [20] (length 1). Answer: 6 - 1 = 5.
  But also: remove [3,2] from left and [1,1,3] from right = 5 ops. ✅
```

---

## 3. Key Insight

> **Complement thinking**: if we remove some elements from the ends totaling `x`, the remaining middle subarray must sum to `total - x`. Maximizing the middle = minimizing the removals.

This works because:
- All elements are **positive** → sliding window is valid (expanding increases sum, shrinking decreases it)
- The "ends" constraint is tricky to handle directly, but the "middle" is a contiguous subarray — much simpler

---

## 4. Approach: Sliding Window on Complement — O(n) ✅

```
target = SUM(nums) - x
IF target < 0: RETURN -1
IF target == 0: RETURN n

// Standard sliding window for sum == target
left = 0
curSum = 0
maxLen = -1
FOR right ← 0 TO n - 1:
    curSum += nums[right]
    WHILE curSum > target:
        curSum -= nums[left]
        left += 1
    IF curSum == target:
        maxLen = MAX(maxLen, right - left + 1)

RETURN n - maxLen IF maxLen != -1 ELSE -1
```

---

## 5. Walkthrough

```
nums = [1, 1, 4, 2, 3], x = 5
total = 11, target = 6

right=0: curSum=1, < 6
right=1: curSum=2, < 6
right=2: curSum=6, == 6 → maxLen=3 (subarray [1,1,4])
right=3: curSum=8, > 6 → shrink: curSum=8-1=7, left=1
                         > 6 → shrink: curSum=7-1=6, left=2
                         == 6 → maxLen=max(3,2)=3
right=4: curSum=6+3=9, > 6 → shrink: curSum=9-4=5, left=3
                                < 6

maxLen = 3
Answer = 5 - 3 = 2 ✅ (remove [3] from right and [1,1] from left... 
actually answer should be 3 from the problem. Let me re-check: 
remove nums[0]=1, nums[1]=1, nums[4]=3 → sum=5 → 3 operations.)
Wait: maxLen=3 means middle [1,1,4], remove indices 3,4 → [2,3]=5 → 2 ops. ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single-pass sliding window |
| **Space** | O(1) |

---

## 7. Where This Pattern Applies

| Problem | Complement Reframing |
|---------|---------------------|
| **#1658** Min ops to reduce X | Longest middle subarray with sum = total - x |
| **#209** Min size subarray sum | Direct sliding window (no complement needed) |
| **#862** Shortest subarray with sum ≥ k | Prefix sums + deque (negatives allowed) |
| **Circular array** problems | Often reduce to "find a subarray" in a doubled array |

---

## 8. Key Takeaway

> **When a problem asks about removing from both ends, think about what stays in the middle.** The complement approach converts a complex two-sided removal into a standard subarray search, typically solvable with sliding window in O(n).
