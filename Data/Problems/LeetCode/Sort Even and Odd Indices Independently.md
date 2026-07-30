# 2164. Sort Even and Odd Indices Independently

**Difficulty:** 🟢 Easy

**Companies:** Google, Microsoft, Zoho
---

## Problem Description

Sort even-indexed elements in ascending order and odd-indexed elements in descending order, then interleave them back.

### Examples

- **Input:** `nums = [4,1,2,3]` → **Output:** `[2,3,4,1]`
- **Input:** `nums = [2,1]` → **Output:** `[2,1]`

## Approach: Separate Sort — O(n log n) ✅

```
FUNCTION sortEvenOdd(nums):
    evens = sorted(nums[::2])
    odds = sorted(nums[1::2], reverse=True)
    FOR i: nums[i] = evens[i//2] IF i%2==0 ELSE odds[i//2]
    RETURN nums
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
