# 1748. Sum of Unique Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-unique-elements](https://leetcode.com/problems/sum-of-unique-elements)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION sumOfUnique(nums):
    count = Counter(nums)
    RETURN SUM(k for k, v in count.items() if v == 1)
```
