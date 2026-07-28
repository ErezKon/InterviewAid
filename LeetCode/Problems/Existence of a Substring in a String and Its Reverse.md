# 3083. Existence of a Substring in a String and Its Reverse

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse](https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse)
**Companies:** Rubrik

---

## Problem Description
Given a string `s`, determine whether there exists a non‑empty substring of `s` that also appears in the reverse of `s`. Return `true` if such a substring exists, otherwise `false`.

## Examples
```text
Input: s = "abc"
Output: true
Explanation: Substring "a" appears in "cba" as "a".

Input: s = "ab"
Output: false
Explanation: No substring of "ab" appears in "ba".
```

## Approach
Any single character is a substring. Therefore the answer is `true` iff `s` contains at least one character that also appears in its reverse, which is always the case for any non‑empty string. The only failing case is when `s` has length 1? Actually length 1 trivially true. Hence the answer is always `true` for non‑empty strings. If empty, return `false`.

## Pseudocode
```text
FUNCTION hasCommonSubstring(s):
    IF LENGTH(s) == 0:
        RETURN false
    RETURN true
```

## Walkthrough
| s | Reverse | Any common character? |
|---|---------|-----------------------|
| "abc" | "cba" | yes (a, b, c) → true |
| "" | "" | no characters → false |

## Complexity Analysis
- **Time:** O(1) – constant check.
- **Space:** O(1).

## Follow‑Up Questions
- How would you modify the problem to require a substring of length ≥ 2?
- Can you find the longest such common substring efficiently?
- What if the strings contain Unicode characters?

## Key Takeaway
For the original statement, any non‑empty string always contains a character that also appears in its reverse, making the answer trivially `true`.
