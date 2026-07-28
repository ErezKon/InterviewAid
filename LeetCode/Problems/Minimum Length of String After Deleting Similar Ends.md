# 1750. Minimum Length of String After Deleting Similar Ends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends)
**Companies:** Amazon, Goldman Sachs, Meta

---

## Problem Description

Repeatedly remove matching characters from both ends of string `s` (same character prefix and suffix). Return the **minimum remaining length**.

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aabccbaa"` | `2` | Remove `'a'` from both ends → `"abccba"`; remove `'b'` from both ends → `"cc"`. Length is 2. |
| `"abc"` | `3` | No matching ends, string stays unchanged. |
| `"zzzz"` | `0` | Remove `'z'` repeatedly until empty.

## Approach

**Two Pointers — O(n)** ✅

```text
FUNCTION minimumLength(s):
    lo ← 0
    hi ← LEN(s) - 1
    WHILE lo < hi AND s[lo] == s[hi]:
        c ← s[lo]
        WHILE lo <= hi AND s[lo] == c:
            lo ← lo + 1
        WHILE lo <= hi AND s[hi] == c:
            hi ← hi - 1
    RETURN hi - lo + 1
```

## Walkthrough

Consider `s = "aabccbaa"`:

1. `lo=0`, `hi=7`, `s[lo]=s[hi]='a'` → character `c='a'`.
2. Advance `lo` while `'a'`: `lo` becomes 2.
3. Decrease `hi` while `'a'`: `hi` becomes 5.
4. Now `s[lo]='b'`, `s[hi]='a'` differ → exit loop.
5. Result length = `hi - lo + 1 = 5 - 2 + 1 = 4`? Actually after first removal we have `"abccba"`; repeat steps remove `'b'` similarly, ending with `"cc"` length 2.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

* How would the solution change if you could delete any matching pair of characters anywhere in the string?
* Can you extend this to return the final string instead of its length?
* What is the effect of using a stack instead of two pointers?

## Key Takeaway

> Two pointers from both ends, consuming matching character runs greedily — stop when ends differ or pointers cross.
