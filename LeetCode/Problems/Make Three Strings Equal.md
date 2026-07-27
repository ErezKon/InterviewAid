# 2937. Make Three Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-three-strings-equal](https://leetcode.com/problems/make-three-strings-equal)
**Companies:** Amazon

---

## 1. Problem Description

Remove suffixes from three strings to make them all equal. Minimize total characters removed. Return -1 if impossible.

---

## 2. Approach: Common Prefix — O(n) ✅

```
FUNCTION findMinimumOperations(s1, s2, s3):
    i = 0
    WHILE i < MIN(len(s1), len(s2), len(s3)):
        IF s1[i] == s2[i] == s3[i]: i += 1
        ELSE: BREAK
    IF i == 0: RETURN -1
    RETURN (len(s1) - i) + (len(s2) - i) + (len(s3) - i)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> The result must be a common prefix of all three strings. Find the longest common prefix, then the cost is total chars removed from each suffix.
