# 522. Longest Uncommon Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uncommon-subsequence-ii](https://leetcode.com/problems/longest-uncommon-subsequence-ii)
**Companies:** Google

---

## 1. Problem Description

Find the longest string that is NOT a subsequence of any other string in the array. Return -1 if none exists.

---

## 2. Approach: Sort + Subsequence Check — O(n²·L) ✅

```
FUNCTION findLUSlength(strs):
    FUNCTION isSubsequence(s, t):
        i = 0
        FOR c IN t:
            IF i < len(s) AND s[i] == c: i += 1
        RETURN i == len(s)

    SORT strs by length descending
    FOR i, s IN enumerate(strs):
        IF all(NOT isSubsequence(s, strs[j]) for j != i):
            RETURN len(s)
    RETURN -1
```

| Time | Space |
|------|-------|
| O(n² · L) | O(1) |

---

## 3. Key Takeaway

> Sort by length descending. For each string, check if it's a subsequence of any other. The first one that isn't a subsequence of any other string is the answer.
