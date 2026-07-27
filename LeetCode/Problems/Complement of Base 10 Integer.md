# 1009. Complement of Base 10 Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/complement-of-base-10-integer](https://leetcode.com/problems/complement-of-base-10-integer)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

```
FUNCTION bitwiseComplement(n):
    IF n == 0: RETURN 1
    mask = (1 << n.bit_length()) - 1
    RETURN n ^ mask
```

XOR with all 1s of same bit length flips all bits.
