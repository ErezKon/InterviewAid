# 2825. Make String a Subsequence Using Cyclic Increments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments](https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments)
**Companies:** Amazon

---

## 1. Problem Description

You can increment each character of `str1` by at most 1 (cyclically, z→a). Check if `str2` can become a subsequence of the modified `str1`.

---

## 2. Approach: Two Pointers — O(n + m) ✅

```
FUNCTION canMakeSubsequence(str1, str2):
    j = 0
    FOR c IN str1:
        IF j < len(str2) AND (c == str2[j] OR (c + 1) % 26 == str2[j]):
            j += 1
    RETURN j == len(str2)
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) |

---

## 3. Key Takeaway

> Standard subsequence check with a twist: each character in str1 can match str2[j] directly or after +1 cyclic increment.
