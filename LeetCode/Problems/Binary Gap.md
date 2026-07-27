# 868. Binary Gap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-gap](https://leetcode.com/problems/binary-gap)
**Companies:** Amazon, Bloomberg, Ebay, Google, Microsoft, Twitter

---

```
FUNCTION binaryGap(n):
    last = -1; maxGap = 0; pos = 0
    WHILE n > 0:
        IF n & 1:
            IF last >= 0: maxGap = MAX(maxGap, pos - last)
            last = pos
        n >>= 1; pos += 1
    RETURN maxGap
```
