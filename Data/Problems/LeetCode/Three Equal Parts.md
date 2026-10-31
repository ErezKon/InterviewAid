# 927. Three Equal Parts

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/three-equal-parts](https://leetcode.com/problems/three-equal-parts)
**Companies:** Hotstar

---

## Problem Description
You are given an array `arr` which consists of only zeros and ones, divide the array into **three non-empty parts** such that all of these parts represent the same binary value.

If it is possible, return any `[i, j]` with `i + 1 < j`, such that:

- `arr[0], arr[1], ..., arr[i]` is the first part,
- `arr[i + 1], arr[i + 2], ..., arr[j - 1]` is the second part, and
- `arr[j], arr[j + 1], ..., arr[arr.length - 1]` is the third part.
- All three parts have equal binary values.

If it is not possible, return `[-1, -1]`.

Note that the entire part is used when considering what binary value it represents. For example, `[1,1,0]` represents `6` in decimal, not `3`. Also, leading zeros **are allowed**, so `[0,1,1]` and `[1,1]` represent the same value.

**Constraints:**
- `3 <= arr.length <= 3 * 10^4`
- `arr[i]` is `0` or `1`

## Examples
```
Example 1:
  Input: arr = [1,0,1,0,1]
  Output: [0,3]
```
```
Example 2:
  Input: arr = [1,1,0,1,1]
  Output: [-1,-1]
```
```
Example 3:
  Input: arr = [1,1,0,0,1]
  Output: [0,2]
```

## Approach
**Pattern Matching with Trailing Zeros** – Count total number of `1`s. If not divisible by 3, impossible. Let `k = totalOnes / 3`. Locate the start indices of the first, second, and third groups of `k` ones. The suffix after the third group defines the target pattern. Ensure the first and second groups can be extended with enough trailing zeros to match the third group.

```text
FUNCTION threeEqualParts(arr):
    SET totalOnes ← COUNT of 1 in arr
    IF totalOnes = 0:
        RETURN [0, LENGTH(arr)-1]
    IF totalOnes MOD 3 ≠ 0:
        RETURN [-1, -1]
    SET k ← totalOnes / 3
    // Find start indices of each group
    SET first ← INDEX of first 1
    SET second ← INDEX of (k+1)th 1
    SET third ← INDEX of (2k+1)th 1
    // Determine length of pattern from third group to end
    SET patternLen ← LENGTH(arr) - third
    // Verify groups match the pattern
    IF arr[first:first+patternLen] ≠ arr[second:second+patternLen] OR arr[first:first+patternLen] ≠ arr[third:]:
        RETURN [-1, -1]
    // Compute end positions allowing trailing zeros
    SET i ← first + patternLen - 1
    SET j ← second + patternLen
    RETURN [i, j]
```

## Walkthrough
For `arr = [1,0,1,0,1]`:
1. `totalOnes = 3`, `k = 1`.
2. `first = 0` (first 1), `second = 2` (second 1), `third = 4` (third 1).
3. `patternLen = 5 - 4 = 1` → pattern `[1]`.
4. Compare slices: `arr[0:1] = [1]`, `arr[2:3] = [1]`, `arr[4:] = [1]` → all match.
5. `i = 0 + 1 - 1 = 0`, `j = 2 + 1 = 3` → return `[0,3]`.

## Complexity Analysis
- **Time:** O(n) – single pass to count ones and locate indices, plus constant-time slice checks.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you adapt the solution for arrays with values other than binary?
2. Can the algorithm be extended to split into `k` equal parts for arbitrary `k`?
3. What if the array is presented as a stream?

## Key Takeaway
When the number of `1`s is divisible by three, the problem reduces to aligning three identical suffix patterns, allowing a linear-time solution with only constant extra space.