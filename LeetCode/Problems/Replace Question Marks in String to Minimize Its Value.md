# 3081. Replace Question Marks in String to Minimize Its Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value](https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value)
**Companies:** Amazon

---

## Problem Description
Given a string `s` consisting of lowercase letters and `'?'` characters, replace each `'?'` with a lowercase letter such that the resulting string is lexicographically smallest possible. The replacement must ensure that no two adjacent characters are the same.

## Examples
- Input: `"?ab??"` → Output: `"aabac"` (replace first `?` with `a`, last two with `a` and `c`).
- Input: `"????"` → Output: `"abab"` (alternating `a` and `b`).

## Approach
Iterate through the string, and for each `'?'` choose the smallest letter (`'a'`‑`'z'`) that differs from its immediate neighbors.

```text
FUNCTION MinimizeString(s):
    CONVERT s TO mutable list chars
    FOR i ← 0 TO LENGTH(chars) - 1:
        IF chars[i] = '?':
            FOR c ← 'a' TO 'z':
                IF (i > 0 AND chars[i-1] = c) OR (i < LENGTH(chars)-1 AND chars[i+1] = c):
                    CONTINUE
                SET chars[i] ← c
                BREAK
    RETURN JOIN(chars)
```

## Walkthrough
| Index | Original | Chosen Char | Result So Far |
|------|----------|-------------|--------------|
| 0 | ? | a (no left neighbor, right is 'a') | a |
| 1 | a | – | a |
| 2 | b | – | ab |
| 3 | ? | a (left is 'b', right is '?') | aba |
| 4 | ? | c (left is 'a', no right) | abac |

## Complexity Analysis
- Time: O(n·26) → O(n) since 26 is constant.
- Space: O(n) for mutable character list.

## Follow‑Up Questions
1. How would you handle uppercase letters as well?
2. Can the algorithm be adapted to minimize the number of distinct letters used?
3. What if the string must also avoid forming a given forbidden substring?

## Key Takeaway
Greedy selection of the smallest valid character at each `'?'` yields the lexicographically minimal string while respecting adjacency constraints.
