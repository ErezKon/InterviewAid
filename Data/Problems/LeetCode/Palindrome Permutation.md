# 266. Palindrome Permutation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/palindrome-permutation](https://leetcode.com/problems/palindrome-permutation)
**Companies:** Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given a string *s*, determine if any permutation of *s* can form a palindrome. Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
```
Input: "code"
Output: false
```
**Example 2:**
```
Input: "aab"
Output: true
Explanation: Rearrange to "aba" which is a palindrome.
```

## Approach
A string can form a palindrome if at most one character appears an odd number of times. Count character frequencies and ensure the odd count does not exceed one.

```text
FUNCTION canPermutePalindrome(s):
    freq ← MAP CHARACTER → INTEGER
    FOR ch IN s:
        freq[ch] ← freq.get(ch, 0) + 1
    oddCount ← 0
    FOR count IN freq.VALUES():
        IF count MOD 2 = 1:
            oddCount ← oddCount + 1
    RETURN oddCount ≤ 1
```

## Walkthrough
For "aab":
- freq: a→2, b→1 → oddCount=1 → return true.
For "code":
- freq: c→1, o→1, d→1, e→1 → oddCount=4 → return false.

## Complexity Analysis
- **Time:** O(n) where *n* is the length of the string.
- **Space:** O(1) (alphabet size is constant, e.g., 26 for lowercase letters).

## Follow-Up Questions
1. How would you adapt the solution for Unicode characters?
2. Can you solve it using bit manipulation for lowercase letters only?
3. What changes if you need to output one valid palindrome permutation?

## Key Takeaway
A palindrome permits at most one odd‑frequency character; counting frequencies suffices to decide feasibility.
