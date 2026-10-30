# 459. Repeated Substring Pattern

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/repeated-substring-pattern](https://leetcode.com/problems/repeated-substring-pattern)
**Companies:** Amazon, Bloomberg, Ebay, Google, Meta, Microsoft, Myntra, Tcs

---

## Problem Description

Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.
```

**Example 2:**
```
Input: s = "aba"
Output: false
```

**Example 3:**
```
Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" four times or the substring "abcabc" twice.
```

## Approach
If `s` can be formed by repeating a substring, then `s` will appear in the string `(s + s)` after removing the first and last characters. This works because the concatenated string contains two copies of the repeated pattern, and cutting off the ends eliminates the original `s`.

```text
FUNCTION repeatedSubstringPattern(s):
    SET doubled ← s + s
    SET trimmed ← doubled[1 : -1]  // remove first and last character
    RETURN s IS SUBSTRING OF trimmed
```

## Walkthrough
For `s = "abcabc"`:
| Step | doubled | trimmed | Contains s? |
|------|---------|---------|------------|
| concat | `"abcabcabcabc"` | `"bcabcabcab"` | Yes → return true |

## Complexity Analysis
- **Time:** O(n) where n is the length of `s`, due to substring search.
- **Space:** O(n) for the concatenated string.

## Follow-Up Questions
1. How would you solve the problem using the KMP prefix function for O(n) time and O(1) extra space?
2. Can you extend the solution to return the smallest repeating substring?
3. How would you handle Unicode strings where character length differs from byte length?

## Key Takeaway
A string that is a repetition of a substring will always appear inside its doubled version with the first and last characters removed, enabling a simple O(n) check.