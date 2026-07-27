# 1460. Make Two Arrays Equal by Reversing Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

## 1. Problem Description

Check if `arr` can become equal to `target` by reversing any subarrays any number of times.

---

## 2. Approach: Sort Comparison — O(n log n) ✅

```
FUNCTION canBeEqual(target, arr):
    RETURN sorted(target) == sorted(arr)
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Any permutation is reachable via subarray reversals (bubble sort argument). So just check if both arrays are permutations of each other.
