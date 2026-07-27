# 1863. Sum of All Subset XOR Totals

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-all-subset-xor-totals](https://leetcode.com/problems/sum-of-all-subset-xor-totals)
**Companies:** Adobe, Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION subsetXORSum(nums):
    // Each bit set in any element contributes to 2^(n-1) subsets
    orAll = 0
    FOR num IN nums: orAll |= num
    RETURN orAll * (1 << (len(nums) - 1))
```

O(n) trick: OR of all numbers × 2^(n-1).
