# 3761. Minimum Absolute Distance Between Mirror Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a string `s`, a *mirror pair* consists of indices `i < j` such that `s[i]` and `s[j]` are the same character when the string is read forwards and backwards (i.e., they are equal and positioned symmetrically around the center). Find the minimum absolute distance `|i - j|` among all mirror pairs, or return `-1` if none exist.

## Examples
**Example 1:**
Input: `s = "abca"`
Output: `2`
Explanation: Mirror pairs are `(0,3)` with characters `'a'` and `'a'`; distance `|0-3| = 3`. No smaller pair, so answer `3` (adjusted to reflect minimum distance).

**Example 2:**
Input: `s = "abc"`
Output: `-1`
Explanation: No characters match their mirror positions.

## Approach
**Single Pass with Hash Map** – Track the last index where each character was seen. For each position, compute the distance to the previous occurrence of the same character and keep the minimum.

```text
FUNCTION MinMirrorDistance(s):
    SET lastSeen ← MAP from character → last index
    SET minDist ← INFINITY
    FOR i ← 0 TO LEN(s) - 1:
        SET ch ← s[i]
        IF ch IN lastSeen:
            SET dist ← i - lastSeen[ch]
            SET minDist ← MIN(minDist, dist)
        SET lastSeen[ch] ← i
    RETURN minDist IF minDist ≠ INFINITY ELSE -1
```

## Walkthrough
Consider `s = "abca"`.
1. i=0, ch='a': not in map → store 0.
2. i=1, ch='b': store 1.
3. i=2, ch='c': store 2.
4. i=3, ch='a': previous index 0 → dist=3 → minDist=3.
Result = 3.

## Complexity Analysis
- **Time:** `O(n)` – one pass over the string.
- **Space:** `O(σ)` where σ is the alphabet size (constant for lowercase letters).

## Follow‑Up Questions
1. How would the solution change if mirror pairs required characters to be different but positioned symmetrically?
2. Can you adapt the algorithm to return all mirror pairs within a given distance threshold?
3. What modifications are needed if the string contains Unicode characters with large alphabets?

## Key Takeaway
Tracking the most recent occurrence of each character enables a linear‑time solution to find the smallest mirror‑pair distance.
