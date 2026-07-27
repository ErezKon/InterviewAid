# 3375. Minimum Operations to Make Array Values Equal to K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k](https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k)
**Companies:** Bloomberg, Google, Lowe, Microsoft

---

```
FUNCTION minOperations(nums, k):
    IF MIN(nums) < k: RETURN -1
    RETURN len(SET(x for x in nums if x > k))
```
