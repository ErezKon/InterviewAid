# 967. Numbers With Same Consecutive Differences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/numbers-with-same-consecutive-differences](https://leetcode.com/problems/numbers-with-same-consecutive-differences)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Tekion

---

```
FUNCTION numsSameConsecDiff(n, k):
    curr = list(range(1, 10))    // single digits 1-9

    FOR _ ← 1 TO n - 1:
        next = []
        FOR num IN curr:
            lastDigit = num % 10
            IF lastDigit + k <= 9: next.ADD(num * 10 + lastDigit + k)
            IF k != 0 AND lastDigit - k >= 0: next.ADD(num * 10 + lastDigit - k)
        curr = next

    RETURN curr
```
