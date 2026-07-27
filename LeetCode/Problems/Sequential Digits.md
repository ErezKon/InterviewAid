# 1291. Sequential Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sequential-digits](https://leetcode.com/problems/sequential-digits)
**Companies:** F5 Networks, Google, Meta

---

## Problem Description

Return all integers in `[low, high]` that have **sequential digits** (each digit is one more than the previous, e.g., 123, 2345).

---

## Approach

```
FUNCTION sequentialDigits(low, high):
    result = []
    FOR length ← 2 TO 9:
        FOR start ← 1 TO 10 - length:
            num = 0
            FOR d ← start TO start + length - 1:
                num = num * 10 + d
            IF low <= num <= high: result.ADD(num)
    RETURN result
```

| Time | Space |
|------|-------|
| O(1) — at most 36 candidates | O(1) |

---

## Key Takeaway

> There are only 36 possible sequential-digit numbers (lengths 2-9, starting digits 1-8). Enumerate all and filter by range.
