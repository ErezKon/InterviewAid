# 1754. Largest Merge Of Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-merge-of-two-strings](https://leetcode.com/problems/largest-merge-of-two-strings)
**Companies:** Snapchat

---

## 1. Problem Description

Given two strings `word1` and `word2`, build the lexicographically largest merge by repeatedly taking the first character from whichever remaining string is lexicographically larger.

---

## 2. Approach: Greedy Comparison — O((m+n)²) ✅

```
FUNCTION largestMerge(word1, word2):
    merge = []
    i, j = 0, 0
    WHILE i < len(word1) AND j < len(word2):
        IF word1[i:] >= word2[j:]:
            merge.ADD(word1[i]); i += 1
        ELSE:
            merge.ADD(word2[j]); j += 1
    merge.ADD(word1[i:] + word2[j:])
    RETURN JOIN(merge)
```

| Time | Space |
|------|-------|
| O((m+n)²) due to suffix comparison | O(m+n) |

---

## 3. Key Takeaway

> Always pick from the string whose remaining suffix is lexicographically larger. Full suffix comparison handles tiebreaking correctly.
