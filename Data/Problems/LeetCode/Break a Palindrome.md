# 1328. Break a Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/break-a-palindrome](https://leetcode.com/problems/break-a-palindrome)
**Companies:** Dell, Expedia, Mathworks, Nvidia, Vmware, Workday
---

## Problem Description
Given a palindromic string of lowercase English letters `palindrome`, replace **exactly one** character with any lowercase English letter so that the resulting string is **not** a palindrome and that it is the **lexicographically smallest** one possible.

Return *the resulting string. If there is no way to replace a character to make it not a palindrome, return an **empty string**.*

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, `a` has a character strictly smaller than the corresponding character in `b`. For example, `"abcc"` is lexicographically smaller than `"abcd"` because the first position they differ is at the fourth character, and `'c'` is smaller than `'d'`.

**Constraints:**
- `1 ≤ palindrome.length ≤ 1000`
- `palindrome` consists of only lowercase English letters.

## Examples
```
Example 1:
  Input: palindrome = "abccba"
  Output: "aaccba"
  Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".
  Of all the ways, "aaccba" is the lexicographically smallest.

Example 2:
  Input: palindrome = "a"
  Output: ""
  Explanation: There is no way to replace a single character to make "a" not a palindrome, so return an empty string.
```

## Approach
Iterate over the first half of the string. Change the first character that is not `'a'` to `'a'`. If all characters in the first half are `'a'`, change the last character to `'b'`. This yields the smallest lexicographic non-palindrome.

### Pseudocode
```text
FUNCTION breakPalindrome(palindrome):
    n ← LENGTH(palindrome)
    IF n == 1: RETURN ""
    arr ← LIST(palindrome)
    FOR i ← 0 TO (n // 2) - 1:
        IF arr[i] != 'a':
            arr[i] ← 'a'
            RETURN JOIN(arr)
    // All characters in first half are 'a'
    arr[n-1] ← 'b'
    RETURN JOIN(arr)
```

## Walkthrough
| Index | Char before | Action | Char after |
|-------|--------------|--------|------------|
| 0 | 'a' | skip (already 'a') | 'a' |
| 1 | 'b' | change to 'a' (first non-'a') | 'a' |
| ... | ... | ... | ... |
| Last | 'a' | set to 'b' if needed | 'b' |

## Complexity Analysis
- **Time:** O(n) – single pass over at most half the string.
- **Space:** O(n) – to store mutable character array (or O(1) if modifying in place).

## Follow-Up Questions
1. How would you handle uppercase letters or a custom alphabet?
2. Can the solution be adapted to return all possible minimal-lexicographic results?
3. What if you were allowed to change up to two characters?

## Key Takeaway
Changing the first non-'a' character in the first half to 'a', or the last character to 'b' when all are 'a', yields the smallest lexicographically non-palindromic string in linear time.
