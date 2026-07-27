# 941. Valid Mountain Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-mountain-array](https://leetcode.com/problems/valid-mountain-array)
**Companies:** Amazon, Bloomberg, Checkpoint, Google, Ibm, Meta, Microsoft, Tiktok

---

```
FUNCTION validMountainArray(arr):
    IF len(arr) < 3: RETURN false
    i = 0
    WHILE i + 1 < n AND arr[i] < arr[i + 1]: i += 1
    IF i == 0 OR i == n - 1: RETURN false
    WHILE i + 1 < n AND arr[i] > arr[i + 1]: i += 1
    RETURN i == n - 1
```

Walk up, then walk down. Must start going up and end at the last element.
