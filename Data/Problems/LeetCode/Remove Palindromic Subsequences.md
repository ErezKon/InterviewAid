# 1332. Remove Palindromic Subsequences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-palindromic-subsequences](https://leetcode.com/problems/remove-palindromic-subsequences)
**Companies:** Amazon

---

## Problem Description
Given a string `s` consisting only of characters `'a'` and `'b'`, you can delete any palindromic subsequence from the string in one move. Return the minimum number of moves required to make the string empty.

## Examples
- **Input:** `s = "ababa"`
  **Output:** `1`
  *The whole string is a palindrome, so it can be removed in one move.*
- **Input:** `s = "abb"`
  **Output:** `2`
  *First remove "bb" (a palindrome), then remove the remaining "a".*
- **Input:** `s = "ba"`
  **Output:** `2`
  *No palindrome longer than 1 exists, so each character is removed separately.*

## Approach
The string contains only two distinct characters. If the string is already a palindrome, one move suffices. Otherwise, remove all `'a'`s in one move (they form a palindrome) and all `'b'`s in another.

```text
FUNCTION MinMovesToDelete(s):
    IF s IS EMPTY:
        RETURN 0
    IF s = REVERSE(s):
        RETURN 1
    RETURN 2
```

## Walkthrough
| Step | s | Palindrome? | Action | Moves |
|------|---|-------------|--------|-------|
| 1 | "abb" | No | Remove all 'b's → "a" | 1 |
| 2 | "a" | Yes | Remove "a" | 2 |

## Complexity Analysis
- **Time:** O(n) to check if `s` equals its reverse.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would the solution change if the string could contain any lowercase letters?
2. What is the minimum number of moves if you can only delete *contiguous* palindromic substrings?
3. Can you extend the approach to return the actual sequence of deletions?

## Key Takeaway
With only two character types, the answer is either 0, 1, or 2 moves: one if the string is already a palindrome, otherwise two moves suffice by deleting each character type separately.
