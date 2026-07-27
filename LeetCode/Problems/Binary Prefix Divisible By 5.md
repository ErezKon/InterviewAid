# 1018. Binary Prefix Divisible By 5

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-prefix-divisible-by-5](https://leetcode.com/problems/binary-prefix-divisible-by-5)
**Companies:** Amazon, Google, Microsoft

---

```
FUNCTION prefixesDivBy5(nums):
    val = 0; result = []
    FOR bit IN nums:
        val = (val * 2 + bit) % 5
        result.ADD(val == 0)
    RETURN result
```
