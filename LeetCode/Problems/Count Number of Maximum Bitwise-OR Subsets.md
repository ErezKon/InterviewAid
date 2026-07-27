# 2044. Count Number of Maximum Bitwise-OR Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets](https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets)
**Companies:** Amazon, Bloomberg, Bny Mellon, Citadel, Google, Meta, Microsoft

---

```
FUNCTION countMaxOrSubsets(nums):
    maxOr = 0
    FOR num IN nums: maxOr |= num

    count = 0
    FUNCTION backtrack(idx, currOr):
        IF idx == len(nums):
            IF currOr == maxOr: count += 1
            RETURN
        backtrack(idx + 1, currOr | nums[idx])    // include
        backtrack(idx + 1, currOr)                 // exclude

    backtrack(0, 0)
    RETURN count
```

n ≤ 16, so 2^16 = 65536 subsets is fine.
