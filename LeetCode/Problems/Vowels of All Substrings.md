# 2063. Vowels of All Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowels-of-all-substrings](https://leetcode.com/problems/vowels-of-all-substrings)
**Companies:** Servicenow
---

## Problem Description
Given a string `s` consisting of lowercase English letters, calculate the total sum of vowels (`a, e, i, o, u`) that appear in every possible substring of `s`. Each occurrence of a vowel in a substring contributes 1 to the sum.

## Examples
- Input: `"aba"` → Output: `6`
  Explanation: Substrings are `"a","b","a","ab","ba","aba"`. Vowel counts: 1,0,1,1,1,2 → sum = 6.
- Input: `"abc"` → Output: `3`
  Explanation: Vowels appear only in substrings containing `"a"`.

## Approach
Each vowel at position `i` contributes to `(i+1) * (n-i)` substrings, where `n` is the length of the string. Sum these contributions for all vowel positions.

```text
FUNCTION sumVowelSubstrings(s):
    SET n ← LENGTH(s)
    SET total ← 0
    FOR i ← 0 TO n-1:
        IF s[i] IN {'a','e','i','o','u'}:
            SET contribution ← (i + 1) * (n - i)
            SET total ← total + contribution
    RETURN total
```

## Walkthrough
| Index i | Char | Contribution `(i+1)*(n-i)` |
|---------|------|-----------------------------|
| 0       | a    | (0+1)*(3-0)=3               |
| 1       | b    | 0                           |
| 2       | a    | (2+1)*(3-2)=3               |
Total = 6.

## Complexity Analysis
- Time: O(n) – single pass through the string.
- Space: O(1) extra space.

## Follow-Up Questions
- How would the solution change if uppercase vowels were also counted?
- Can you extend the method to compute the sum of consonants in all substrings?
- What if the problem asked for the sum modulo a large prime?

## Key Takeaway
A vowel’s contribution depends only on its position, allowing a linear‑time calculation without enumerating substrings.
