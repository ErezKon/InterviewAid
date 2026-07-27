# 2009. Minimum Number of Operations to Make Array Continuous

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous)
**Companies:** Bloomberg, Google, Microsoft, Uber

---

## Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION minOperations(nums):
    n = len(nums)
    unique = sorted(set(nums))
    m = len(unique)

    maxKeep = 0; j = 0
    FOR i ← 0 TO m - 1:
        WHILE j < m AND unique[j] <= unique[i] + n - 1:
            j += 1
        maxKeep = MAX(maxKeep, j - i)

    RETURN n - maxKeep
```

Continuous = range of exactly n. Find max elements fitting in any window of size n. Answer = n - maxKeep.
