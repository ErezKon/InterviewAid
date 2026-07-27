# 3315. Construct the Minimum Bitwise Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii](https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii)
**Companies:** Amazon, Aon, Meta, Microsoft

---

```
FUNCTION minBitwiseArray(nums):
    result = []
    FOR num IN nums:
        IF num == 2: result.ADD(-1)
        ELSE:
            bit = 0
            WHILE num & (1 << bit): bit += 1
            result.ADD(num ^ (1 << (bit - 1)))
    RETURN result
```
