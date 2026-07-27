# 1122. Relative Sort Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/relative-sort-array](https://leetcode.com/problems/relative-sort-array)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Walmart Labs

---

```
FUNCTION relativeSortArray(arr1, arr2):
    order = {v: i for i, v in enumerate(arr2)}
    RETURN sorted(arr1, key=lambda x: (order.get(x, 1001 + x)))
```
