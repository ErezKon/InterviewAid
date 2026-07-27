# 1163. Last Substring in Lexicographical Order

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/last-substring-in-lexicographical-order](https://leetcode.com/problems/last-substring-in-lexicographical-order)
**Companies:** Amazon, Ibm, Mathworks, Microsoft, Qualcomm

---

## 1. Problem Description

Return the lexicographically largest substring of `s`.

---

## 2. Key Insight

The answer is always a suffix (extending to the end). Two-pointer technique compares candidate suffixes, advancing the loser.

---

## 3. Approach: Two Pointer — O(n) ✅

```
FUNCTION lastSubstring(s):
    i, j, k = 0, 1, 0
    WHILE j + k < len(s):
        IF s[i + k] == s[j + k]:
            k += 1
        ELSE IF s[i + k] < s[j + k]:
            i = MAX(i + k + 1, j)
            j = i + 1
            k = 0
        ELSE:
            j = j + k + 1
            k = 0
    RETURN s[i:]
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Key Takeaway

> The lexicographically last substring is always a suffix. Two pointers race: `i` is the current best, `j` is the challenger. When a mismatch occurs, the loser jumps past all matched characters.
