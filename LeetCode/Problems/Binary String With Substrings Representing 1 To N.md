# 1016. Binary String With Substrings Representing 1 To N

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n](https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n)
**Companies:** Gartner, Google

---

## 1. Problem Description

Given a binary string `s` and an integer `n`, return `true` if the binary representation of every integer from `1` to `n` appears as a substring of `s`.

---

## 2. Key Insight

> A string of length `L` has at most `L × (L+1) / 2` substrings. If `n` is large relative to `|s|`, the answer is `false`. For small `n`, simply check each number's binary representation.

---

## 3. Approach: Direct Check — O(n × L) ✅

```
FUNCTION queryString(s, n):
    FOR i FROM 1 TO n:
        IF bin(i)[2:] NOT IN s:  // binary representation without "0b"
            RETURN false
    RETURN true
```

Since `s` has at most ~10^5 characters, it can contain at most ~10^5 distinct substrings of each length, so `n` can't exceed ~10^5 for the answer to be `true`.

| Time | Space |
|------|-------|
| O(n × |s|) worst case | O(1) |

---

## Key Takeaway

> For substring containment of binary representations, the constraint on `|s|` limits how large `n` can be. A direct check with early termination is sufficient.
