# 201. Bitwise AND of Numbers Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-and-of-numbers-range](https://leetcode.com/problems/bitwise-and-of-numbers-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION rangeBitwiseAnd(left, right):
    shift = 0
    WHILE left != right:
        left >>= 1
        right >>= 1
        shift += 1
    RETURN left << shift
```

Find common prefix of left and right in binary. All lower bits will be zeroed by AND.
