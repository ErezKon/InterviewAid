# 3915. Maximum Sum of Alternating Subsequence With Distance at Least K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-alternating-subsequence-with-distance-at-least-k](https://leetcode.com/problems/maximum-sum-of-alternating-subsequence-with-distance-at-least-k)
**Companies:** Visa

---

## Problem Description
Given an integer array `nums` and an integer `k`, select a subsequence `i1 < i2 < ... < im` such that:
1. The signs of consecutive selected elements strictly alternate (positive, negative, positive, … or vice‑versa).
2. The distance between any two consecutive selected indices is at least `k` (`ij+1 - ij >= k`).
Return the maximum possible sum of the selected elements.

## Examples
**Example 1**
```
Input: nums = [1, -2, 3, -4, 5, -6], k = 2
Output: 9
Explanation: Choose indices 0, 2, 4 → values 1, 3, 5 (all positive, alternating condition satisfied trivially). Sum = 9.
```
**Example 2**
```
Input: nums = [-1, 2, -3, 4, -5, 6], k = 1
Output: 12
Explanation: Choose -1, 2, -3, 4, -5, 6 → alternating signs, sum = 3.
Better choice: 2, -3, 4, -5, 6 → sum = 4.
Maximum achievable sum is 12 by selecting 2, -3, 4, -5, 6 (alternating, distance 1).
```

## Approach
Dynamic programming with two states per index:
- `pos[i]`: maximum sum of a valid alternating subsequence ending at `i` with `nums[i]` taken as a **positive** element.
- `neg[i]`: same but ending with a **negative** element.
Transition uses the best opposite‑sign value from any index at least `k` positions before.
1. Initialize `pos[i] = nums[i]` if `nums[i] > 0` else `-∞`; similarly for `neg[i]`.
2. For each `i` from `0` to `n-1`:
   - Look back to `j = i - k` (or earlier). Maintain running maximums `bestPos` and `bestNeg` for windows of size `k` using a deque or sliding‑window max.
   - Update `pos[i] = max(pos[i], bestNeg + nums[i])` when `nums[i] > 0`.
   - Update `neg[i] = max(neg[i], bestPos + nums[i])` when `nums[i] < 0`.
3. The answer is the maximum over all `pos[i]` and `neg[i]`.
The sliding‑window maximum ensures O(n) time.

```text
FUNCTION maxAlternatingSum(nums, k):
    n ← LENGTH(nums)
    pos ← ARRAY(n, -∞)
    neg ← ARRAY(n, -∞)
    // Deques store pairs (index, value) for max queries
    maxPosDeque ← EMPTY_DEQUE()
    maxNegDeque ← EMPTY_DEQUE()
    FOR i ← 0 TO n-1:
        IF nums[i] > 0:
            pos[i] ← nums[i]
        IF nums[i] < 0:
            neg[i] ← nums[i]
        // Remove elements out of the k‑window
        WHILE NOT IS_EMPTY(maxPosDeque) AND maxPosDeque[0].index < i - k:
            POP_FRONT(maxPosDeque)
        WHILE NOT IS_EMPTY(maxNegDeque) AND maxNegDeque[0].index < i - k:
            POP_FRONT(maxNegDeque)
        // Update using previous opposite sign
        IF nums[i] > 0 AND NOT IS_EMPTY(maxNegDeque):
            pos[i] ← MAX(pos[i], maxNegDeque[0].value + nums[i])
        IF nums[i] < 0 AND NOT IS_EMPTY(maxPosDeque):
            neg[i] ← MAX(neg[i], maxPosDeque[0].value + nums[i])
        // Insert current values into deques for future use
        IF pos[i] > -∞:
            WHILE NOT IS_EMPTY(maxPosDeque) AND maxPosDeque[-1].value <= pos[i]:
                POP_BACK(maxPosDeque)
            APPEND(maxPosDeque, {index: i, value: pos[i]})
        IF neg[i] > -∞:
            WHILE NOT IS_EMPTY(maxNegDeque) AND maxNegDeque[-1].value <= neg[i]:
                POP_BACK(maxNegDeque)
            APPEND(maxNegDeque, {index: i, value: neg[i]})
    RETURN MAX(MAX_VALUE(pos), MAX_VALUE(neg))
```

## Walkthrough
For `nums = [1, -2, 3, -4, 5, -6]`, `k = 2`:
- At `i=0`, `pos[0]=1` stored in `maxPosDeque`.
- `i=2` (value 3): window allows index 0, `bestNeg` is empty, so `pos[2]=3`.
- `i=4` (value 5): bestNeg from index 2 is still empty, `pos[4]=5`.
- The deques keep the best positive sums; final answer is `1+3+5 = 9`.

## Complexity Analysis
*Time*: O(n) – each index is processed once, deque operations are amortized O(1).
*Space*: O(k) for the deques, plus O(n) for `pos` and `neg` arrays.

## Follow‑Up Questions
1. How would you adapt the DP if the sign alternation requirement were removed, leaving only the distance constraint?
2. Can the solution be extended to handle a maximum distance constraint as well (i.e., `k ≤ distance ≤ K2`)?
3. How would you modify the algorithm to also return the actual subsequence achieving the maximum sum?

## Key Takeaway
Maintaining sliding‑window maximums of opposite‑sign DP states lets you enforce both alternation and distance constraints in linear time.
