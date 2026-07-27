# 1750. Minimum Length of String After Deleting Similar Ends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends)
**Companies:** Amazon, Goldman Sachs, Meta

---

## Problem Description

Repeatedly remove matching characters from both ends of string `s` (same character prefix and suffix). Return the **minimum remaining length**.

## Approach: Two Pointers — O(n) ✅

```
FUNCTION minimumLength(s):
    lo, hi = 0, len(s) - 1
    WHILE lo < hi AND s[lo] == s[hi]:
        c = s[lo]
        WHILE lo <= hi AND s[lo] == c: lo += 1
        WHILE lo <= hi AND s[hi] == c: hi -= 1
    RETURN hi - lo + 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Two pointers from both ends, consuming matching character runs greedily — stop when ends differ or pointers cross.
