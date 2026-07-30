# 1638. Count Substrings That Differ by One Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-differ-by-one-character](https://leetcode.com/problems/count-substrings-that-differ-by-one-character)
**Companies:** Microsoft

---

## Problem Description

Given two strings `s` and `t`, count pairs of substrings `(s[i..i+len], t[j..j+len])` of the same length that differ in **exactly one** position.

---

## Examples

| Input | Output |
|-------|--------|
| `s = "aba", t = "baba"` | `6` |
| `s = "abcd", t = "abcd"` | `0` |

*Explanation*: For the first case, the valid pairs are `(s[0..0], t[0..0]) = ("a","b")`, `(s[0..1], t[0..1]) = ("ab","ba")`, `(s[1..1], t[1..1]) = ("b","a")`, `(s[1..2], t[1..2]) = ("ba","ab")`, `(s[2..2], t[2..2]) = ("a","b")`, and `(s[0..2], t[0..2]) = ("aba","bab")`.

---

## Approach

```
FUNCTION countSubstrings(s, t):
    result = 0
    FOR i ← 0 TO LENGTH(s) - 1 DO
        FOR j ← 0 TO LENGTH(t) - 1 DO
            IF s[i] != t[j]:
                // Count matching chars before (i,j)
                left = 0
                WHILE i-left-1 >= 0 AND j-left-1 >= 0 AND s[i-left-1] == t[j-left-1]:
                    left += 1
                // Count matching chars after (i,j)
                right = 0
                WHILE i+right+1 < LENGTH(s) AND j+right+1 < LENGTH(t) AND s[i+right+1] == t[j+right+1]:
                    right += 1
                result += (left + 1) * (right + 1)

    RETURN result
```

---

## Walkthrough

Take `s = "aba"`, `t = "baba"`.

1. Iterate over all positions. At `i=0` (`'a'`) and `j=0` (`'b'`), characters differ.
   - Extend left: none, so `left = 0`.
   - Extend right while characters match: compare `s[1]` (`'b'`) with `t[1]` (`'a'`) → mismatch, stop. So `right = 0`.
   - Contribution: `(0+1)*(0+1) = 1` (pair `"a"` vs `"b"`).
2. At `i=0`, `j=1` (`'a'` vs `'a'`) → same, skip.
3. At `i=0`, `j=2` (`'a'` vs `'b'`), differ.
   - Left extension: none → `left=0`.
   - Right extension: `s[1]='b'` matches `t[3]='a'`? No, stop → `right=0`.
   - Contribution: 1 (pair `"a"` vs `"b"`).
4. Continue scanning; mismatches at positions `(i=1,j=0)`, `(i=1,j=1)`, `(i=1,j=2)`, `(i=1,j=3)`, each yielding contributions based on matching extensions. Summing all contributions gives the total `6`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n × min(m,n)) worst case, but typically much better |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the algorithm to count pairs that differ in **at most** one character?
2. Can this approach be extended to handle a larger alphabet or Unicode characters efficiently?
3. What optimizations are possible if the strings are very long (e.g., using suffix arrays or hashing)?

---

## Key Takeaway

> **"Differ by exactly one character": fix the mismatch point, extend matching on both sides. The number of valid substring pairs for that mismatch is `(left+1) × (right+1)` — a clean counting identity.**