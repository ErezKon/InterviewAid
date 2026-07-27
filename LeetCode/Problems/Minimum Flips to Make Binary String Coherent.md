# 3922. Minimum Flips to Make Binary String Coherent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-flips-to-make-binary-string-coherent](https://leetcode.com/problems/minimum-flips-to-make-binary-string-coherent)
**Companies:** Amazon

---

## Problem Description

Given a binary string, a string is **coherent** if all `0`s come before all `1`s (like "000111"). Return the **minimum number of flips** to make it coherent.

## Key Insight

> Same as "Minimum Deletions to Make String Balanced" but with flips instead of deletions. For each split point, count 1s on the left (flip to 0) + 0s on the right (flip to 1). Use prefix sums.

## Approach: Prefix Count — O(n) ✅

```
FUNCTION minFlips(s):
    n ← len(s)
    ones ← 0   // count of 1s seen so far (would need to flip to 0)
    minFlips ← count of '0's in s   // start: all become 1s

    FOR i ← 0 TO n - 1:
        IF s[i] == '0':
            minFlips ← minFlips - 1   // one fewer 0 on right
        ELSE:
            ones ← ones + 1           // one more 1 on left
        minFlips ← MIN(minFlips, ones + (zeros remaining on right))

    // Simpler: track prefix ones + suffix zeros
    RETURN minFlips
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> "All X's before all Y's" = **find the optimal split point** minimizing left-flips + right-flips, computable in O(n) with running counts.
