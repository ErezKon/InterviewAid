# 3314. Construct the Minimum Bitwise Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-i](https://leetcode.com/problems/construct-the-minimum-bitwise-array-i)
**Companies:** Amazon, Aon, Bloomberg, Google, Microsoft

---

```
FUNCTION minBitwiseArray(nums):
    result = []
    FOR num IN nums:
        IF num == 2: result.ADD(-1)
        ELSE:
            // Find lowest 0 bit, clear the bit below it
            bit = 0
            WHILE num & (1 << bit): bit += 1
            result.ADD(num ^ (1 << (bit - 1)))
    RETURN result
```
