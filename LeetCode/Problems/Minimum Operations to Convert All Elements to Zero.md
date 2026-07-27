# 3542. Minimum Operations to Convert All Elements to Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero](https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
// Monotonic stack: count distinct non-zero "levels" in nested structure
FUNCTION minOperations(nums):
    stack = [0]; ops = 0
    FOR num IN nums:
        WHILE stack[-1] > num: stack.POP()
        IF num > stack[-1]:
            ops += 1
            stack.PUSH(num)
    RETURN ops
```
