# 3083. Existence of a Substring in a String and Its Reverse

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse](https://leetcode.com/problems/existence-of-a-substring-in-a-string-and-its-reverse)
**Companies:** Rubrik

---

## Problem Description
Given a **string** `s`, find any substring of length `2` which is also present in the reverse of `s`.

Return `true` *if such a substring exists, and* `false` *otherwise.*

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists only of lowercase English letters.

## Examples
```
Example 1:
  Input: s = "leetcode"
  Output: true
  Explanation: Substring "ee" is of length 2 which is also present in reverse(s) == "edocteel".
```

```
Example 2:
  Input: s = "abcba"
  Output: true
  Explanation: All of the substrings of length 2 "ab", "bc", "cb", "ba" are also present in reverse(s) == "abcba".
```

```
Example 3:
  Input: s = "abcd"
  Output: false
  Explanation: There is no substring of length 2 in s, which is also present in the reverse of s.
```

## Approach
Any single character is a substring. Therefore the answer is `true` iff `s` contains at least one character that also appears in its reverse, which is always the case for any non-empty string. The only failing case is when `s` has length 1? Actually length 1 trivially true. Hence the answer is always `true` for non-empty strings. If empty, return `false`.

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

## Follow-Up Questions
- How would you modify the problem to require a substring of length ≥ 2?
- Can you find the longest such common substring efficiently?
- What if the strings contain Unicode characters?

## Key Takeaway
For the original statement, any non-empty string always contains a character that also appears in its reverse, making the answer trivially `true`.
