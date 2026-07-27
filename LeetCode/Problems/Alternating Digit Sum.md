# 2544. Alternating Digit Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/alternating-digit-sum](https://leetcode.com/problems/alternating-digit-sum)
**Companies:** Amazon, Capital One, Ebay, Visa

---

```
FUNCTION alternateDigitSum(n):
    digits = [int(d) for d in str(n)]
    RETURN SUM(d * (-1)**i for i, d in enumerate(digits))
```
