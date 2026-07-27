# 912. Sort an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-an-array](https://leetcode.com/problems/sort-an-array)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Hive, Infosys, Jpmorgan, Meta, Microsoft, Oracle, Tcs

---

## Problem Description

Sort an array of integers in ascending order without using built-in sort functions. Must be O(n log n).

### Examples

- **Input:** `nums = [5,2,3,1]` → **Output:** `[1,2,3,5]`
- **Input:** `nums = [5,1,1,2,0,0]` → **Output:** `[0,0,1,1,2,5]`

## Approach: Merge Sort — O(n log n) ✅

**Key Insight:** Divide and conquer with guaranteed O(n log n) worst case. Alternatives: quicksort with random pivot, heap sort, radix sort.

```
FUNCTION sortArray(nums):
    IF len(nums) <= 1: RETURN nums
    mid = len(nums) / 2
    left = sortArray(nums[:mid])
    right = sortArray(nums[mid:])
    RETURN merge(left, right)

FUNCTION merge(a, b):
    result = []
    i = j = 0
    WHILE i < len(a) AND j < len(b):
        IF a[i] <= b[j]: result.ADD(a[i]); i += 1
        ELSE: result.ADD(b[j]); j += 1
    result += a[i:]
    result += b[j:]
    RETURN result
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
