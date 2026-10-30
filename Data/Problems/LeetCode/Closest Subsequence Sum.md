# 1755. Closest Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-subsequence-sum](https://leetcode.com/problems/closest-subsequence-sum)
**Companies:** Google, Lti, Sprinklr
---

## Problem Description
You are given an integer array `nums` and an integer `goal`.

You want to choose a subsequence of `nums` such that the sum of its elements is the closest possible to `goal`. That is, if the sum of the subsequence's elements is `sum`, then you want to **minimize the absolute difference** `abs(sum - goal)`.

Return *the **minimum** possible value of* `abs(sum - goal)`.

Note that a subsequence of an array is an array formed by removing some elements **(possibly all or none)** of the original array.

**Constraints:**
- `1 <= nums.length <= 40`
- `-10^7 <= nums[i] <= 10^7`
- `-10^9 <= goal <= 10^9`

## Examples
```
Example 1:
  Input: nums = [5,-7,3,5], goal = 6
  Output: 0
  Explanation: Choose the whole array as a subsequence, with a sum of 6.
  This is equal to the goal, so the absolute difference is 0.
```

```
Example 2:
  Input: nums = [7,-9,15,-2], goal = -5
  Output: 1
  Explanation: Choose the subsequence [7,-9,-2], with a sum of -4.
  The absolute difference is abs(-4 - (-5)) = abs(1) = 1, which is the minimum.
```

```
Example 3:
  Input: nums = [1,2,3], goal = -7
  Output: 7
```

## Approach
Use the **Meet‑in‑the‑Middle** technique:
1. Split `nums` into two halves.
2. Enumerate all subset sums of each half (`leftSums`, `rightSums`).
3. Sort `rightSums`.
4. For each sum `s` in `leftSums`, binary‑search in `rightSums` for the value closest to `goal‑s` and update the best difference.

### Pseudocode
```text
FUNCTION minAbsDifference(nums, goal):
    n ← LENGTH(nums)
    leftPart ← nums[0 : n//2]
    rightPart ← nums[n//2 :]
    leftSums ← allSubsetSums(leftPart)
    rightSums ← allSubsetSums(rightPart)
    SORT rightSums
    best ← INFINITY
    FOR s IN leftSums:
        target ← goal - s
        idx ← bisect_left(rightSums, target)
        FOR j IN [idx-1, idx]:
            IF 0 ≤ j < LENGTH(rightSums):
                diff ← ABS(s + rightSums[j] - goal)
                best ← MIN(best, diff)
    RETURN best

FUNCTION allSubsetSums(arr):
    sums ← [0]
    FOR x IN arr:
        new ← []
        FOR cur IN sums:
            APPEND cur + x TO new
        EXTEND sums WITH new
    RETURN sums
```

## Walkthrough
For `nums = [5,-7,3,5]`, `goal = 6`:
1. Split → left `[5,-7]`, right `[3,5]`.
2. `leftSums = [0,5,-7,-2]`.
3. `rightSums = [0,3,5,8]` (sorted).
4. Iterate `s = -2` → target `8`. Binary search finds index of `8` in `rightSums`; diff `|-2+8-6| = 0`. Best becomes `0`.
5. No better diff possible; return `0`.

## Complexity Analysis
Time: O(2^{n/2} · log(2^{n/2})) ≈ O(2^{n/2} log 2^{n/2}). Space: O(2^{n/2}) for storing subset sums.

## Follow-Up Questions
- How would you adapt the algorithm if `nums` length were up to 100?
- Can you solve the problem using dynamic programming with limited sum range?
- What changes if negative numbers are disallowed?

---

## Key Takeaway

> Splitting the array in half reduces an exponential‑time subset‑sum problem to manageable O(2^{n/2}) by pairing sums from each half.
