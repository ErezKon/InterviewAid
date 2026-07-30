# 1119. Remove Vowels from a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-vowels-from-a-string](https://leetcode.com/problems/remove-vowels-from-a-string)
**Companies:** Amazon

---

## Problem Description
Given a string *s*, return a new string where all vowels ('a', 'e', 'i', 'o', 'u' in both lower‑ and upper‑case) are removed. The order of the remaining characters must stay the same.

## Examples
**Example 1:**
```
Input: s = "leetcode"
Output: "ltcd"
Explanation: The vowels 'e', 'e', 'o' are removed.
```
**Example 2:**
```
Input: s = "AEIOU"
Output: ""
Explanation: All characters are vowels, so the result is an empty string.
```

## Approach
Iterate through the characters of the string and build a result containing only non‑vowel characters.

```text
FUNCTION removeVowels(s):
    SET vowels ← SET{'a','e','i','o','u','A','E','I','O','U'}
    SET result ← ""
    FOR ch IN s:
        IF ch NOT IN vowels:
            SET result ← result + ch
    RETURN result
```

## Walkthrough
| Index | ch | Is vowel? | result |
|-------|----|----------|--------|
| 0 | 'l' | No | "l" |
| 1 | 'e' | Yes | "l" |
| 2 | 'e' | Yes | "l" |
| 3 | 't' | No | "lt" |
| 4 | 'c' | No | "ltc" |
| 5 | 'o' | Yes | "ltc" |
| 6 | 'd' | No | "ltcd" |
| 7 | 'e' | Yes | "ltcd" |

## Complexity Analysis
- Time: O(n) where *n* is the length of the string.
- Space: O(n) for the output string (in‑place modification is also possible).

## Follow-Up Questions
1. How would you modify the algorithm to handle Unicode vowel characters?
2. Can you perform the removal in‑place on a mutable character array?
3. How would you extend this to remove a custom set of characters supplied at runtime?

## Key Takeaway
A simple linear scan with a vowel lookup set efficiently removes all vowels while preserving the original character order.