# 1703. Minimum Adjacent Swaps for K Consecutive Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones](https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones)
**Companies:** Google, Microsoft, Turing

---

## Problem Description

You are given a binary array `nums` and an integer `k`. In one move you may swap any two adjacent elements. Return the minimum number of moves required to bring `k` ones together (i.e., make them consecutive) in the array.

Constraints:
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`
- `1 <= k <= number of 1s in nums`

---

## Examples

**Example 1:**
```
Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
Explanation: Swap the second and third elements to get [1,0,1,0,0,1]; the two ones at positions 0 and 2 are now consecutive.
```

**Example 2:**
```
Input: nums = [1,1,0,1,0,1,1,0,1], k = 3
Output: 2
Explanation: Minimum swaps = 2 to gather three consecutive ones.
```

---

## Approach

**Algorithm:** Sliding window on the positions of `1`s with prefix sums (median‑based L1 minimization).

Key insight: After extracting the indices of all `1`s, subtract the running index to normalize gaps. For any window of size `k`, the optimal target is the median position; the total swaps equal the sum of absolute distances to that median, which can be computed in O(1) using prefix sums.

Pseudocode:
```text
FUNCTION minAdjSwaps(nums, k):
    // collect original positions of 1s
    positions ← []
    FOR i ← 0 TO LEN(nums)-1 DO
        IF nums[i] = 1 THEN
            APPEND i TO positions
    // normalize to remove effect of indices within the window
    FOR j ← 0 TO LEN(positions)-1 DO
        positions[j] ← positions[j] - j
    // prefix sums for O(1) range sum queries
    prefix[0] ← 0
    FOR i ← 1 TO LEN(positions) DO
        prefix[i] ← prefix[i-1] + positions[i-1]
    result ← INFINITY
    FOR start ← 0 TO LEN(positions)-k DO
        mid ← start + k // 2   // integer division, floor
        median ← positions[mid]
        // left side cost
        leftCount ← mid - start
        leftSum ← prefix[mid] - prefix[start]
        leftCost ← median * leftCount - leftSum
        // right side cost
        rightCount ← start + k - mid - 1
        rightSum ← prefix[start+k] - prefix[mid+1]
        rightCost ← rightSum - median * rightCount
        total ← leftCost + rightCost
        result ← MIN(result, total)
    RETURN result
```
---

## Walkthrough

For `nums = [1,0,0,1,0,1]`, `k = 2`:
1. Positions of 1s: `[0,3,5]`.
2. Normalized: `[0-0, 3-1, 5-2] → [0,2,3]`.
3. Prefix sums: `[0,0,2,5]`.
4. Window `[0,2]` (indices 0‑1): median = `positions[1]=2`.
   - leftCost = `2*1 - 0 = 2`
   - rightCost = `0` (no right elements)
   - total = 2.
5. Window `[2,3]` (indices 1‑2): median = `positions[2]=3`.
   - leftCost = `3*1 - 2 = 1`
   - rightCost = `0`
   - total = 1 → minimum swaps = 1.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding window with prefix sums | O(n) where n = number of 1s | O(n) |
---

## Follow‑Up Questions

1. How would you modify the algorithm to handle weighted swaps where moving a `1` over a `0` has a cost proportional to the distance?
2. Can the solution be extended to find the minimum swaps for multiple disjoint groups of `k` ones?
3. What is the impact on complexity if the array is streamed and you cannot store all positions?
---

## Key Takeaway

> After normalizing the positions of `1`s, the optimal gathering point is the median; using prefix sums lets you evaluate each window in constant time, yielding an O(n) solution.
