# 3922. Minimum Flips to Make Binary String Coherent

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-flips-to-make-binary-string-coherent
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below makes the string sorted (`0*1*`), which is not the official condition. The strings avoiding the subsequences `"011"` and `"110"` are exactly: at most one `1`, all `1`s, or `1 0…0 1` (ones only at both ends). The answer is the minimum of `max(0, ones − 1)`, `zeros`, and `(s[0]=='0') + (s[n−1]=='0') + ones in s[1..n−2]` (n ≥ 2). Checked against brute force.*

You are given a binary string `s`.

A string is considered **coherent** if it does **not** contain `"011"` or `"110"` as subsequences.

In one operation, you can **flip** any character in `s` (`'0'` to `'1'` or `'1'` to `'0'`).

Return an integer denoting the **minimum** number of operations required to make `s` coherent.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

## Examples

**Example 1:**
```
Input: s = "1010"
Output: 1
Explanation: Flip s[0] to get "0010", which contains no "011" or "110" subsequences.
```

**Example 2:**
```
Input: s = "0110"
Output: 1
Explanation: Flip s[1] to get "0010", removing all forbidden subsequences "011" and "110".
```

**Example 3:**
```
Input: s = "1000"
Output: 0
Explanation: The string already has no "011" or "110" subsequences, so no flips are needed.
```

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
