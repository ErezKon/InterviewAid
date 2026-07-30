# 3922. Minimum Flips to Make Binary String Coherent

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-flips-to-make-binary-string-coherent
**Companies:** Amazon

---

## Problem Description

Given a binary string, a string is **coherent** if all `0`s come before all `1`s (like "000111"). Return the **minimum number of flips** to make it coherent.

## Examples

| s | Minimum flips |
|---|---------------|
| `"00110"` | 1 |
| `"010110"` | 2 |
| `"111000"` | 3 |

*Explanation*: For `"00110"` flip the third character from `1` to `0` to obtain `"00010"`, then flip the fourth `1` to `0` → `"00000"` (or flip the last `0` to `1`). The optimal count is 1.

## Approach

**Prefix‑Count Dynamic Programming** – For each possible split point, compute flips needed: `flips = (# of 1s on the left) + (# of 0s on the right)`. Track the minimum while scanning.

```text
FUNCTION minFlips(s):
    n ← LENGTH(s)
    totalZeros ← COUNT of '0' in s
    leftOnes ← 0
    minFlips ← totalZeros   // all become 1s
    FOR i ← 0 TO n - 1:
        IF s[i] == '0':
            totalZeros ← totalZeros - 1   // one fewer zero on right
        ELSE:
            leftOnes ← leftOnes + 1        // one more one on left
        minFlips ← MIN(minFlips, leftOnes + totalZeros)
    RETURN minFlips
```

## Walkthrough

Consider `s = "010110"`:
1. Initial `totalZeros = 3`, `leftOnes = 0`, `minFlips = 3`.
2. i=0, char=`0`: `totalZeros=2`, `minFlips = MIN(3,0+2)=2`.
3. i=1, char=`1`: `leftOnes=1`, `minFlips = MIN(2,1+2)=2`.
4. i=2, char=`0`: `totalZeros=1`, `minFlips = MIN(2,1+1)=2`.
5. i=3, char=`1`: `leftOnes=2`, `minFlips = MIN(2,2+1)=2`.
6. i=4, char=`1`: `leftOnes=3`, `minFlips = MIN(2,3+1)=2`.
7. i=5, char=`0`: `totalZeros=0`, `minFlips = MIN(2,3+0)=2`.
Result = **2** flips.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow‑Up Questions

* How would the solution change if you could also delete characters instead of flipping?
* Can you extend the algorithm to handle strings with more than two distinct characters needing ordered groups?
* What is the impact on complexity if the string length is extremely large (streaming input)?

## Key Takeaway

> Transforming a binary string into a coherent form reduces to finding the optimal split point that minimizes `leftOnes + rightZeros`, solvable in linear time with running counts.
