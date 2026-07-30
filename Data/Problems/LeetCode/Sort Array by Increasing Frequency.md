# 1636. Sort Array by Increasing Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-increasing-frequency](https://leetcode.com/problems/sort-array-by-increasing-frequency)
**Companies:** Accenture, Adobe, Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Tcs, Zoho

---

## Problem Description

Sort an array by frequency in ascending order. For elements with equal frequency, sort by value in descending order.

### Examples

- **Input:** `nums = [1,1,2,2,2,3]` → **Output:** `[3,1,1,2,2,2]`
- **Input:** `nums = [2,3,1,3,2]` → **Output:** `[1,3,3,2,2]`

## Approach: Custom Sort — O(n log n) ✅

**Key Insight:** Sort by `(frequency, -value)` — ascending frequency, descending value for ties.

```
FUNCTION frequencySort(nums):
    count = Counter(nums)
    RETURN SORT(nums, key=lambda x: (count[x], -x))
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
