# 1356. Sort Integers by The Number of 1 Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits)
**Companies:** Amazon, Google, Mapbox, Microsoft

---

## Problem Description

Sort an integer array by the number of 1-bits in ascending order. For equal bit counts, sort by value ascending.

### Examples

- **Input:** `arr = [0,1,2,3,4,5,6,7,8]` → **Output:** `[0,1,2,4,8,3,5,6,7]`
- **Input:** `arr = [1024,512,256,128,64,32,16,8,4,2,1]` → **Output:** `[1,2,4,8,16,32,64,128,256,512,1024]`

## Approach: Custom Sort — O(n log n) ✅

```
FUNCTION sortByBits(arr):
    RETURN sorted(arr, key=lambda x: (bin(x).count('1'), x))
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
