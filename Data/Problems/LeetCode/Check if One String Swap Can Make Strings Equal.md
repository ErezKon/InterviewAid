# 1790. Check if One String Swap Can Make Strings Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal)
**Companies:** Amazon, Doordash, Google, Meta, Microsoft

---

## Problem Description
Given two strings `s1` and `s2` of equal length, determine whether you can make the strings equal by swapping **exactly one** pair of characters in `s1`. You may also choose not to swap any characters. Return `true` if it is possible, otherwise return `false`.

## Examples
| s1 | s2 | Output | Explanation |
|----|----|--------|-------------|
| "bank" | "kanb" | true | Swapping the first and last characters of `s1` makes it equal to `s2`. |
| "attack" | "defend" | false | More than two mismatched positions, impossible with a single swap. |
| "abcd" | "abcd" | true | Strings are already equal; zero swaps are allowed.

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
