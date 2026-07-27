# 1087. Brace Expansion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brace-expansion](https://leetcode.com/problems/brace-expansion)
**Companies:** Anduril, Apple, Doordash, Google, Niantic, Stripe

---

```
FUNCTION expand(s):
    groups = parse s into groups (each group is list of chars)
    // "{a,b}c{d,e}" → [['a','b'], ['c'], ['d','e']]

    result = [""]
    FOR group IN groups:
        result = [prev + c for prev in result for c in group]

    RETURN sorted(result)
```
