# 1755. Closest Subsequence Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-subsequence-sum](https://leetcode.com/problems/closest-subsequence-sum)
**Companies:** Google, Lti, Sprinklr
---

## Problem Description
Given an integer array `nums` (size ≤ 35) and an integer `goal`, select any subsequence (any subset of elements, order irrelevant) and compute its sum. Return the minimum absolute difference between the sum of a chosen subsequence and `goal`.

## Examples
- **Example 1:** `nums = [5,-7,3,5]`, `goal = 6` → output `0` (subsequence `[5, -7, 5, 3]` sums to `6`).
- **Example 2:** `nums = [7,9,3,5]`, `goal = 8` → output `1` (subsequence `[7,3]` sums to `10`, diff `2`; best is `[9]` diff `1`).

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
