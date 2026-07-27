# 2176. Count Equal and Divisible Pairs in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array](https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array)
**Companies:** Bloomberg, Google, Meta, Microsoft, Zeta Suite

---

```
FUNCTION countPairs(nums, k):
    count = 0
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            IF nums[i] == nums[j] AND (i * j) % k == 0:
                count += 1
    RETURN count
```
