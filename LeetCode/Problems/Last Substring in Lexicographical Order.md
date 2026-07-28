# 1163. Last Substring in Lexicographical Order

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/last-substring-in-lexicographical-order](https://leetcode.com/problems/last-substring-in-lexicographical-order)
**Companies:** Amazon, Ibm, Mathworks, Microsoft, Qualcomm

---

## Problem Description

Given a string `s`, return the lexicographically largest substring of `s`. A substring is a contiguous sequence of characters within the string.

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abab"` | `"bab"` | Substrings: `"a"`, `"ab"`, `"aba"`, `"abab"`, `"b"`, `"ba"`, `"bab"`. The largest lexicographically is `"bab"`. |
| `"leetcode"` | `"tcode"` | The suffix starting at the last `'t'` is the largest. |

## Approach

**Two Pointers** – Compare candidate suffixes and discard the loser.

```text
FUNCTION lastSubstring(s):
    i, j, k ← 0, 1, 0
    WHILE j + k < LEN(s):
        IF s[i + k] == s[j + k]:
            k ← k + 1
        ELSE IF s[i + k] < s[j + k]:
            i ← MAX(i + k + 1, j)
            j ← i + 1
            k ← 0
        ELSE:
            j ← j + k + 1
            k ← 0
    RETURN SUBSTRING(s, i)
```

## Walkthrough

Consider `s = "abab"`:
1. Start with `i=0` (candidate `"abab"`) and `j=1` (candidate `"bab"`).
2. Compare characters: `s[0]='a'` vs `s[1]='b'` → `'a' < 'b'`.
3. Discard the loser (`i`), set `i = max(0+0+1,1)=1`, `j=2`.
4. Now compare `s[1]='b'` vs `s[2]='a'` → `'b' > 'a'`, discard `j`, set `j=3`.
5. Continue until `j+k` reaches end. Final `i=1`, return `s[1:] = "bab"`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

* How would you modify the algorithm for circular strings?
* Can you find the lexicographically smallest substring using a similar approach?
* What is the effect of Unicode characters on the comparison logic?

## Key Takeaway

> The lexicographically last substring is always a suffix. Two pointers race: `i` holds the current best suffix, `j` challenges it, and the loser jumps past all matched characters.
