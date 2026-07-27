# 3487. Maximum Unique Subarray Sum After Deletion

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion](https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

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

Given an integer array `nums`, you may delete any number of elements. From the remaining elements, select a **subarray** (contiguous) with all **unique** values that has the **maximum sum**. Return that maximum sum. You must keep at least one element.

**Constraints:**
- `1 ≤ nums.length ≤ 100`
- `-100 ≤ nums[i] ≤ 100`

---

## Examples

**Example 1:**
```
Input:  nums = [1, 2, 3, 4, 5]
Output: 15
Explanation: No deletions needed. Sum of all unique elements = 15.
```

**Example 2:**
```
Input:  nums = [1, 1, 0, 1, 1]
Output: 1
Explanation: Delete all but one 1. Max unique subarray sum = 1.
```

**Example 3:**
```
Input:  nums = [1, 2, -1, -2, 1, 0, -1]
Output: 3
Explanation: Delete negatives and duplicates. Keep {1, 2} → sum = 3.
```

---

## Key Insight

> Since you can delete **any** elements freely, the remaining "subarray" can effectively be any subset. The optimal strategy is: collect all **unique positive** values and sum them. Negative and zero values only hurt the sum. If all values are negative, you must keep one element — pick the maximum (least negative).

---

## Approach

```
FUNCTION maxSum(nums):
    // Keep unique positive numbers, take their sum
    // If all negative, take the maximum
    positives ← SET(x FOR x IN nums IF x > 0)
    IF positives IS NOT EMPTY THEN
        RETURN SUM(positives)
    RETURN MAX(nums)
```

**Why this works:**
- Positive unique values always increase the sum — include all of them.
- Duplicates of the same positive value don't help (uniqueness constraint).
- Negatives and zeros only decrease or maintain the sum — exclude them.
- Edge case: if no positive values exist, we must pick at least one element, so pick the largest (least negative).

---

## Walkthrough

```
nums = [1, 2, -1, -2, 1, 0, -1]

Step 1: Filter positives → {1, 2}  (duplicates removed by set)
Step 2: positives is not empty → SUM({1, 2}) = 3

Return 3 ✅
```

```
nums = [-5, -3, -1]

Step 1: Filter positives → {}  (empty)
Step 2: positives is empty → MAX([-5, -3, -1]) = -1

Return -1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Set of positives | **O(n)** | **O(n)** |

---

## Follow-Up Questions

1. **What if you cannot delete elements and must find a contiguous subarray with unique values?** Use sliding window with a hash set — this becomes LeetCode #1695 "Maximum Erasure Value."
2. **Why doesn't order matter here?** Because you can delete arbitrary elements, any subset of remaining elements forms a valid "subarray" after deletions collapse gaps.
3. **What if zero should be included?** Zero doesn't change the sum, so including or excluding it is equivalent. The solution correctly excludes it since `x > 0` filters it out.

---

## Key Takeaway

> When deletions are unrestricted, a "maximum unique subarray" reduces to **summing all distinct positive values** — recognizing this simplification is the key to an O(n) solution.

---
