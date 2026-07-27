# 2191. Sort the Jumbled Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-jumbled-numbers](https://leetcode.com/problems/sort-the-jumbled-numbers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google

---

```
FUNCTION sortJumbled(mapping, nums):
    FUNCTION mapped(num):
        RETURN int(JOIN(str(mapping[int(d)]) for d in str(num)))
    RETURN sorted(nums, key=mapped)
```
