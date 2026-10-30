# 859. Buddy Strings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/buddy-strings](https://leetcode.com/problems/buddy-strings)
**Companies:** Amazon, Doordash, Google, Meta, Zoho

---

## Problem Description
Given two strings `s` and `goal`, return `true` *if you can swap two letters in* `s` *so the result is equal to* `goal`*, otherwise, return* `false`*.*

Swapping letters is defined as taking two indices `i` and `j` (0-indexed) such that `i != j` and swapping the characters at `s[i]` and `s[j]`.

- For example, swapping at indices `0` and `2` in `"abcd"` results in `"cbad"`.

**Constraints:**
- `1 ≤ s.length, goal.length ≤ 2 * 10⁴`
- `s` and `goal` consist of lowercase letters.

## Examples
```
Example 1:
  Input: s = "ab", goal = "ba"
  Output: true
  Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.

Example 2:
  Input: s = "ab", goal = "ab"
  Output: false
  Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.

Example 3:
  Input: s = "aa", goal = "aa"
  Output: true
  Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.
```

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
