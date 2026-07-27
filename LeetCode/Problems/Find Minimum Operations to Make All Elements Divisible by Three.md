# 3190. Find Minimum Operations to Make All Elements Divisible by Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three](https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three)
**Companies:** Amazon, Bloomberg, Google, Tcs

---

```
FUNCTION minimumOperations(nums):
    RETURN SUM(MIN(num % 3, 3 - num % 3) for num in nums)
```
