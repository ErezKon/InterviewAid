# 161. One Edit Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/one-edit-distance](https://leetcode.com/problems/one-edit-distance)
**Companies:** Apple, Google, Meta, Snapchat, Stripe, Twitter, Uber, Yandex

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given two strings `s` and `t`, return `true` if they are both one edit distance apart, otherwise return `false`.

A string `s` is said to be one distance apart from a string `t` if you can:

- Insert **exactly one** character into `s` to get `t`.
- Delete **exactly one** character from `s` to get `t`.
- Replace **exactly one** character of `s` with **a different character** to get `t`.

**Constraints:**
- `0 <= s.length, t.length <= 10^4`
- `s` and `t` consist of lowercase letters, uppercase letters, and digits.

## Examples

**Example 1:**
```
Input: s = "ab", t = "acb"
Output: true
Explanation: We can insert 'c' into s to get t.
```

**Example 2:**
```
Input: s = "", t = ""
Output: false
Explanation: We cannot get t from s by only one step.
```

## Approach
**Algorithm:** Single‑pass two‑pointer comparison.
1. If length difference > 1 → false.
2. Ensure `s` is the shorter string.
3. Iterate with index `i` over `s`. On first mismatch:
   - If lengths equal → compare the suffixes after the mismatch (replace case).
   - If lengths differ → compare `s[i:]` with `t[i+1:]` (insert/delete case).
4. If loop finishes without mismatch, strings are one edit apart only when `t` has exactly one extra character.

### Pseudocode
```text
FUNCTION isOneEditDistance(s, t):
    IF ABS(LENGTH(s) - LENGTH(t)) > 1: RETURN FALSE
    IF LENGTH(s) > LENGTH(t):
        // swap to make s the shorter
        RETURN isOneEditDistance(t, s)
    FOR i ← 0 TO LENGTH(s) - 1:
        IF s[i] != t[i]:
            IF LENGTH(s) == LENGTH(t):
                // replace case
                RETURN SUBSTRING(s, i+1) == SUBSTRING(t, i+1)
            ELSE:
                // insert/delete case
                RETURN SUBSTRING(s, i) == SUBSTRING(t, i+1)
    // all previous chars matched
    RETURN LENGTH(t) - LENGTH(s) == 1
```

## Walkthrough
` s = "cab", t = "cat" ` (same length)
- i=0: `c` == `c`
- i=1: mismatch `a` vs `a`? actually both `a` → continue
- i=2: mismatch `b` vs `t`
- lengths equal → compare suffixes after i: `SUBSTRING(s,3) = ""`, `SUBSTRING(t,3) = ""` → equal → return `true`.

## Complexity Analysis
- Time: O(min(|s|,|t|)) – single pass.
- Space: O(1) – only pointers and counters.

## Follow‑Up Questions
1. How would you extend the algorithm to check if two strings are at most `k` edits apart?
2. Can you adapt it to return the actual edit operation (insert, delete, replace) and position?
3. What changes are needed if the strings contain Unicode characters with variable byte length?

## Key Takeaway
A single linear scan with careful handling of the first mismatch determines whether two strings differ by exactly one edit, using only constant extra space.