# 477. Total Hamming Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-hamming-distance](https://leetcode.com/problems/total-hamming-distance)
**Companies:** Apple, Bloomberg, Meta

---

```
FUNCTION totalHammingDistance(nums):
    total = 0; n = len(nums)
    FOR bit ← 0 TO 31:
        ones = SUM(1 for num in nums if num & (1 << bit))
        total += ones * (n - ones)
    RETURN total
```

For each bit position, count pairs with different bits: ones × zeros.
