# 927. Three Equal Parts

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/three-equal-parts](https://leetcode.com/problems/three-equal-parts)
**Companies:** Hotstar

---

## Problem Description
Given a binary array `arr` (containing only 0s and 1s), partition it into three **non‑empty** parts such that each part represents the same binary value (ignoring leading zeros). Return the indices `[i, j]` where the first part is `arr[0..i]`, the second part is `arr[i+1..j]`, and the third part is `arr[j+1..]`. If no such partition exists, return `[-1, -1]`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,0,1,0,1]` | `[0,3]` | The three parts are `[1]`, `[0,1]`, `[0,1]` → all represent binary `1`. |
| `[1,1,0,1,1]` | `[-1,-1]` | No way to split into equal binary values. |
| `[0,0,0,0,0]` | `[0,4]` | All parts represent binary `0` (leading zeros allowed). |

## Approach
**Pattern Matching with Trailing Zeros** – Count total number of `1`s. If not divisible by 3, impossible. Let `k = totalOnes / 3`. Locate the start indices of the first, second, and third groups of `k` ones. The suffix after the third group defines the target pattern. Ensure the first and second groups can be extended with enough trailing zeros to match the third group.

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
- **Time:** O(n) – single pass to count ones and locate indices, plus constant‑time slice checks.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you adapt the solution for arrays with values other than binary?
2. Can the algorithm be extended to split into `k` equal parts for arbitrary `k`?
3. What if the array is presented as a stream?

## Key Takeaway
When the number of `1`s is divisible by three, the problem reduces to aligning three identical suffix patterns, allowing a linear‑time solution with only constant extra space.