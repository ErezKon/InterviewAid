# 1758. Minimum Changes To Make Alternating Binary String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string](https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string)
**Companies:** Amazon, Bloomberg, Ibm, Meta, Microsoft, Tesla

---

## Key Insight

> Only two valid alternating patterns exist: `"0101..."` and `"1010..."`. Count mismatches against one pattern; the other is `n - count`. Return the minimum.

---

## Approach

```
FUNCTION minOperations(s):
    count0 ← SUM(1 FOR i, c IN ENUMERATE(s) IF INT(c) ≠ i % 2)
    RETURN MIN(count0, LEN(s) - count0)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Two-pattern comparison** — only two alternating patterns exist. Count mismatches for one; the complement gives the other.

---
