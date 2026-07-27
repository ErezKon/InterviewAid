# 3006. Find Beautiful Indices in the Given Array I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-i](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-i)
**Companies:** Bloomberg, Google, Microsoft, Palantir, Samsara

---

## Problem Description

Find indices `i` where `a` starts at `i` in `s`, and there exists an index `j` where `b` starts at `j` in `s`, with `|i - j| <= k`. Return all such `i` sorted.

---

## Approach: String Matching + Two Pointers — O(n) ✅

```
FUNCTION beautifulIndices(s, a, b, k):
    posA = [i for i in range(len(s) - len(a) + 1) if s[i:i+len(a)] == a]
    posB = [i for i in range(len(s) - len(b) + 1) if s[i:i+len(b)] == b]

    result = []
    j = 0
    FOR i IN posA:
        WHILE j < len(posB) AND posB[j] < i - k: j += 1
        IF j < len(posB) AND ABS(posB[j] - i) <= k:
            result.ADD(i)

    RETURN result
```

---

## Key Takeaway

> **Find all occurrences of both patterns, then use two pointers on sorted position lists to check proximity within k. Part II uses KMP for efficient pattern matching.**
