# 859. Buddy Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buddy-strings](https://leetcode.com/problems/buddy-strings)
**Companies:** Amazon, Doordash, Google, Meta, Zoho

---

## Problem Description
Given two strings `s` and `goal` of equal length, determine if you can swap exactly one pair of characters in `s` so that the resulting string equals `goal`. Return `true` if possible, otherwise `false`.

## Examples
- Input: `s = "ab"`, `goal = "ba"` → Output: `true` (swap the two characters).
- Input: `s = "ab"`, `goal = "ab"` → Output: `false` (strings are already equal but no duplicate character to swap).
- Input: `s = "aa"`, `goal = "aa"` → Output: `true` (swap the two identical characters).

## Approach
**Case Analysis** –
1. If lengths differ → `false`.
2. If strings are identical, a valid swap exists only if there is at least one duplicate character in `s`.
3. Otherwise, collect the indices where `s` and `goal` differ. A single swap can fix the strings only if there are exactly two mismatched positions and the characters cross‑match.

```text
FUNCTION buddyStrings(s, goal):
    IF LENGTH(s) ≠ LENGTH(goal):
        RETURN false
    IF s = goal:
        RETURN EXISTS char IN s WITH frequency ≥ 2
    SET diffs ← []
    FOR i FROM 0 TO LENGTH(s)-1:
        IF s[i] ≠ goal[i]:
            diffs.APPEND(i)
    IF LENGTH(diffs) ≠ 2:
        RETURN false
    RETURN s[diffs[0]] = goal[diffs[1]] AND s[diffs[1]] = goal[diffs[0]]
```

## Walkthrough
`s = "abca"`, `goal = "abac"` → mismatches at indices 2 and 3 (`c` vs `a`, `a` vs `c`). Swapping these resolves the strings, so return `true`.

## Complexity Analysis
- **Time:** O(n) where n is the string length.
- **Space:** O(1) extra space (only a few indices stored).

## Follow‑Up Questions
1. How would you extend this to allow at most two swaps?
2. Can you solve the problem in a single pass without storing mismatched indices?
3. What if the strings contain Unicode characters?

## Key Takeaway
A simple mismatch‑count check combined with a duplicate‑character test covers all cases for a single‑swap transformation.
