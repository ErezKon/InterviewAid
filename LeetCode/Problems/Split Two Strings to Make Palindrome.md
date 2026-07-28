# 1616. Split Two Strings to Make Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/split-two-strings-to-make-palindrome
**Companies:** Google
---

## Problem Description
Given two strings `a` and `b` of equal length, you may split each string at any index (including 0 or the length) into a left and right part. After splitting, you can concatenate the left part of one string with the right part of the other. Determine whether there exists a split such that the resulting string is a palindrome.

## Examples
**Example 1:**
```
a = "x", b = "y"
output = false
```
**Example 2:**
```
a = "abdef", b = "fecab"
output = true   // split a after "ab" and b after "fe" → "ab" + "cab" = "abcab", which is a palindrome
```

## Approach
The key insight is that a palindrome reads the same forward and backward, so the characters at symmetric positions must match. By trying all possible split positions (0 … n) and checking the two possible concatenations, we can verify the condition in linear time.

```text
FUNCTION CanFormPalindrome(a, b):
    SET n ← LENGTH(a)
    FOR split ← 0 TO n:
        // option 1: left part of a + right part of b
        SET candidate1 ← SUBSTRING(a, 0, split) + SUBSTRING(b, split, n)
        IF IsPalindrome(candidate1):
            RETURN true
        // option 2: left part of b + right part of a
        SET candidate2 ← SUBSTRING(b, 0, split) + SUBSTRING(a, split, n)
        IF IsPalindrome(candidate2):
            RETURN true
    RETURN false

FUNCTION IsPalindrome(s):
    SET left ← 0, right ← LENGTH(s) - 1
    WHILE left < right:
        IF s[left] ≠ s[right]:
            RETURN false
        SET left ← left + 1
        SET right ← right - 1
    RETURN true
```

## Walkthrough
| split | candidate1 | palindrome? |
|-------|------------|-------------|
| 0 | "" + "fecab" = "fecab" | false |
| 2 | "ab" + "cab" = "abcab" | true → stop |

## Complexity Analysis
*Time:* O(n²) in the worst case because each split builds a string of length n and palindrome check is O(n). With careful character‑by‑character comparison without building strings, it can be reduced to O(n).
*Space:* O(1) extra space besides the input strings.

## Follow-Up Questions
1. How would you adapt the solution if you could split at different positions in the two strings?
2. Can the problem be solved in O(n) time without constructing candidate strings?
3. What if the strings contain Unicode characters with multi‑byte representations?

## Key Takeaway
By enumerating split points and checking symmetric character matches, we can decide palindrome feasibility with only linear scans.
