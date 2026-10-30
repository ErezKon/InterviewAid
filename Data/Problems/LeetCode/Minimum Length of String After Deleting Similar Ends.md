# 1750. Minimum Length of String After Deleting Similar Ends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends)
**Companies:** Amazon, Goldman Sachs, Meta

---

## Problem Description

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`. You are asked to apply the following algorithm on the string any number of times:

- Pick a **non-empty** prefix from the string `s` where all the characters in the prefix are equal.
- Pick a **non-empty** suffix from the string `s` where all the characters in this suffix are equal.
- The prefix and the suffix should not intersect at any index.
- The characters from the prefix and suffix must be the same.
- Delete both the prefix and the suffix.

Return *the **minimum length** of *`s` *after performing the above operation any number of times (possibly zero times)*.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` only consists of characters `'a'`, `'b'`, and `'c'`.

## Examples

**Example 1:**
```
Input: s = "ca"
Output: 2
Explanation: You can't remove any characters, so the string stays as is.
```

**Example 2:**
```
Input: s = "cabaabac"
Output: 0
Explanation: An optimal sequence of operations is:
- Take prefix = "c" and suffix = "c" and remove them, s = "abaaba".
- Take prefix = "a" and suffix = "a" and remove them, s = "baab".
- Take prefix = "b" and suffix = "b" and remove them, s = "aa".
- Take prefix = "a" and suffix = "a" and remove them, s = "".
```

**Example 3:**
```
Input: s = "aabccabba"
Output: 3
Explanation: An optimal sequence of operations is:
- Take prefix = "aa" and suffix = "a" and remove them, s = "bccabb".
- Take prefix = "b" and suffix = "bb" and remove them, s = "cca".
```

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
