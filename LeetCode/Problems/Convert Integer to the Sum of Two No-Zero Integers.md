# 1317. Convert Integer to the Sum of Two No-Zero Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers](https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers)
**Companies:** Amazon, Google, Hrt, Microsoft

---

```
FUNCTION getNoZeroIntegers(n):
    FOR a ← 1 TO n - 1:
        IF '0' NOT IN str(a) AND '0' NOT IN str(n - a):
            RETURN [a, n - a]
```
