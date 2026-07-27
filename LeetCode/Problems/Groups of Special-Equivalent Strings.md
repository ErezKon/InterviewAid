# 893. Groups of Special-Equivalent Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/groups-of-special-equivalent-strings](https://leetcode.com/problems/groups-of-special-equivalent-strings)
**Companies:** Meta

---

## 1. Problem Description

Two strings are special-equivalent if you can swap characters at even indices among themselves and odd indices among themselves to make them equal. Count the number of groups.

## 2. Approach: Canonical Key — O(n · k) ✅

```
FUNCTION numSpecialEquivGroups(words):
    keys ← SET()
    FOR word IN words DO
        even ← sorted chars at even indices
        odd ← sorted chars at odd indices
        keys.ADD((even, odd))
    RETURN LENGTH(keys)
```

## Key Takeaway

> Canonicalize by sorting even-indexed and odd-indexed characters separately. Same canonical key = same group.
