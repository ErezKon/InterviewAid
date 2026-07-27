# 3008. Find Beautiful Indices in the Given Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii)
**Companies:** Google, Palantir, Phonepe

---

## Problem Description

Same as Part I but with larger constraints. Find indices where pattern `a` occurs, paired with a nearby occurrence of pattern `b` within distance `k`.

---

## Approach: KMP + Two Pointers — O(n) ✅

```
FUNCTION beautifulIndices(s, a, b, k):
    posA = KMP_findAll(s, a)
    posB = KMP_findAll(s, b)

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

> **KMP for O(n) pattern matching (necessary for large inputs), then two pointers for proximity check. Same logic as Part I but with efficient string matching.**
