# 3658. GCD of Odd and Even Sums

**Difficulty:** 🟢 Easy

**Companies:** Bloomberg, Google, Microsoft
---

```
FUNCTION gcdOfSums(nums):
    oddSum = SUM(x for x in nums if x % 2 == 1)
    evenSum = SUM(x for x in nums if x % 2 == 0)
    RETURN GCD(oddSum, evenSum)
```
