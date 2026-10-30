# 2063. Vowels of All Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowels-of-all-substrings](https://leetcode.com/problems/vowels-of-all-substrings)
**Companies:** Servicenow

---

## Problem Description

Given a string `word`, return *the **sum of the number of vowels*** (`'a'`, `'e'`, `'i'`, `'o'`, *and* `'u'`) *in every substring of* `word`.

A **substring** is a contiguous (non-empty) sequence of characters within a string.

**Note:** Due to the large constraints, the answer may not fit in a signed 32-bit integer. Please be careful during the calculations.

**Constraints:**
- `1 <= word.length <= 10^5`
- `word` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: word = "aba"
Output: 6
Explanation:
All possible substrings are: "a", "ab", "aba", "b", "ba", and "a".
- "b" has 0 vowels in it
- "a", "ab", "ba", and "a" have 1 vowel each
- "aba" has 2 vowels in it
Hence, the total sum of vowels = 0 + 1 + 1 + 1 + 1 + 2 = 6.
```

**Example 2:**
```
Input: word = "abc"
Output: 3
Explanation:
All possible substrings are: "a", "ab", "abc", "b", "bc", and "c".
- "a", "ab", and "abc" have 1 vowel each
- "b", "bc", and "c" have 0 vowels each
Hence, the total sum of vowels = 1 + 1 + 1 + 0 + 0 + 0 = 3.
```

**Example 3:**
```
Input: word = "ltcd"
Output: 0
Explanation: There are no vowels in any substring of "ltcd".
```

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
