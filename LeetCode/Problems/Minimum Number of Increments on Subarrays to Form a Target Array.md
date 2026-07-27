# 1526. Minimum Number of Increments on Subarrays to Form a Target Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array](https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array)
**Companies:** Amazon, Dream11, Google, Ibm, Meta, Microsoft, Oracle

---

## Approach: Count Increases — O(n) ✅

```
FUNCTION minNumberOperations(target):
    ops = target[0]
    FOR i ← 1 TO n - 1:
        IF target[i] > target[i - 1]:
            ops += target[i] - target[i - 1]
    RETURN ops
```

Each increase from one element to the next requires new operations. Decreases are "free" (covered by previous operations).
