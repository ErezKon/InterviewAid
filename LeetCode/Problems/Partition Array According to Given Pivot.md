# 2161. Partition Array According to Given Pivot

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-according-to-given-pivot](https://leetcode.com/problems/partition-array-according-to-given-pivot)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION pivotArray(nums, pivot):
    less = [x for x in nums if x < pivot]
    equal = [x for x in nums if x == pivot]
    greater = [x for x in nums if x > pivot]
    RETURN less + equal + greater
```
