# 1370. Increasing Decreasing String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/increasing-decreasing-string](https://leetcode.com/problems/increasing-decreasing-string)
**Companies:** Akuna Capital, Amazon, Google

---

## 1. Problem Description

Repeatedly pick the smallest unused char, then the next larger, etc. (ascending pass), then reverse (descending pass). Repeat until all chars used.

## 2. Approach: Bucket Sort Passes — O(n) ✅

```
FUNCTION sortString(s):
    count = Counter(s); result = []
    WHILE len(result) < len(s):
        FOR c IN 'abcdefghijklmnopqrstuvwxyz':
            IF count[c] > 0: result.ADD(c); count[c] -= 1
        FOR c IN 'zyxwvutsrqponmlkjihgfedcba':
            IF count[c] > 0: result.ADD(c); count[c] -= 1
    RETURN JOIN(result)
```

## Key Takeaway

> Count frequencies, alternate ascending/descending sweeps through the alphabet until all characters placed.
