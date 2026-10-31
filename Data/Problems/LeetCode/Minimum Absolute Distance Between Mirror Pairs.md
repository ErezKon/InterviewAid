# 3761. Minimum Absolute Distance Between Mirror Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
You are given an integer array `nums`.

A **mirror pair** is a pair of indices `(i, j)` such that:
- `0 <= i < j < nums.length`, and
- `reverse(nums[i]) == nums[j]`, where `reverse(x)` denotes the integer formed by reversing the digits of `x`. Leading zeros are omitted after reversing, for example `reverse(120) = 21`.

Return the **minimum** absolute distance between the indices of any mirror pair. The absolute distance between indices `i` and `j` is `abs(i - j)`.

If no mirror pair exists, return `-1`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples

```
Example 1:
  Input: nums = [12,21,45,33,54]
  Output: 1
  Explanation: The mirror pairs are:
  - (0, 1) since reverse(nums[0]) = reverse(12) = 21 = nums[1], giving an absolute distance abs(0 - 1) = 1.
  - (2, 4) since reverse(nums[2]) = reverse(45) = 54 = nums[4], giving an absolute distance abs(2 - 4) = 2.
  The minimum absolute distance among all pairs is 1.
```

```
Example 2:
  Input: nums = [120,21]
  Output: 1
  Explanation: There is only one mirror pair (0, 1) since reverse(nums[0]) = reverse(120) = 21 = nums[1].
  The minimum absolute distance is 1.
```

```
Example 3:
  Input: nums = [21,120]
  Output: -1
  Explanation: There are no mirror pairs in the array.
```

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

## Follow-Up Questions
1. How would the solution change if mirror pairs required characters to be different but positioned symmetrically?
2. Can you adapt the algorithm to return all mirror pairs within a given distance threshold?
3. What modifications are needed if the string contains Unicode characters with large alphabets?

## Key Takeaway
Tracking the most recent occurrence of each character enables a linear-time solution to find the smallest mirror-pair distance.
