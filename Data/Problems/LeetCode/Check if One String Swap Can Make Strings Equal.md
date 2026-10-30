# 1790. Check if One String Swap Can Make Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal)
**Companies:** Amazon, Doordash, Google, Meta, Microsoft

---

## Problem Description
You are given two strings `s1` and `s2` of equal length. A **string swap** is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.

Return `true` *if it is possible to make both strings equal by performing **at most one string swap** on **exactly one** of the strings.* Otherwise, return `false`.

**Constraints:**
- `1 <= s1.length, s2.length <= 100`
- `s1.length == s2.length`
- `s1` and `s2` consist of only lowercase English letters.

## Examples
```
Example 1:
  Input: s1 = "bank", s2 = "kanb"
  Output: true
  Explanation: For example, swap the first character with the last character of s2 to make "bank".
```

```
Example 2:
  Input: s1 = "attack", s2 = "defend"
  Output: false
  Explanation: It is impossible to make them equal with one string swap.
```

```
Example 3:
  Input: s1 = "kelb", s2 = "kelb"
  Output: true
  Explanation: The two strings are already equal, so no string swap operation is required.
```

## Approach
The strings can only differ at at most two positions. Collect the indices where characters differ. If there are zero differences, return true. If there are exactly two differences, check whether swapping the mismatched characters in `s1` aligns it with `s2`. Any other number of differences makes the task impossible.

```text
FUNCTION canBeEqualByOneSwap(s1, s2):
    SET diffs ← []
    FOR i ← 0 TO LENGTH(s1) - 1:
        IF s1[i] ≠ s2[i]:
            APPEND (s1[i], s2[i]) TO diffs
    IF LENGTH(diffs) = 0:
        RETURN true
    IF LENGTH(diffs) = 2 AND diffs[0][0] = diffs[1][1] AND diffs[0][1] = diffs[1][0]:
        RETURN true
    RETURN false
```

## Walkthrough
Consider `s1 = "bank"`, `s2 = "kanb"`:
| i | s1[i] | s2[i] | diffs after step |
|---|-------|-------|-----------------|
|0| b | k | [(b, k)] |
|1| a | a | [(b, k)] |
|2| n | n | [(b, k)] |
|3| k | b | [(b, k), (k, b)] |
Two mismatches with reversed characters ⇒ return true.

## Complexity Analysis
*Time*: O(n) – one pass over the strings.
*Space*: O(1) – at most two mismatched pairs are stored.

## Follow-Up Questions
1. How would the solution change if you could perform **at most two** swaps?
2. What if the strings could have different lengths?
3. Can you extend the approach to handle Unicode characters efficiently?

## Key Takeaway
A single swap can only fix two mismatched positions, so checking the mismatched character pairs is sufficient.
