# 2006. Count Number of Pairs With Absolute Difference K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k](https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k)
**Companies:** Amazon, Google, Microsoft, Tcs

---

```
FUNCTION countKDifference(nums, k):
    count = Counter(nums)
    RETURN SUM(count[x] * count[x + k] for x in count)
```
