# 274. H-Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/h-index](https://leetcode.com/problems/h-index)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Nvidia

---

## Approach: Counting Sort — O(n) ✅

```
FUNCTION hIndex(citations):
    n = len(citations)
    count = [0] * (n + 1)

    FOR c IN citations:
        count[MIN(c, n)] += 1

    total = 0
    FOR h ← n DOWN TO 0:
        total += count[h]
        IF total >= h: RETURN h

    RETURN 0
```

Alternative: sort descending, find largest h where citations[h-1] >= h.
