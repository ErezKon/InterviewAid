# 3915. Maximum Sum of Alternating Subsequence With Distance at Least K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-alternating-subsequence-with-distance-at-least-k](https://leetcode.com/problems/maximum-sum-of-alternating-subsequence-with-distance-at-least-k)
**Companies:** Visa

---

## Problem Description

> *Note: the Approach below alternates **signs**. Officially the values must strictly alternate up/down (`<, >, <, …` or `>, <, >, …`) and consecutive indices must be at least `k` apart. Correct idea: `up[i] = nums[i] + max(down[j] : nums[j] < nums[i], j ≤ i − k)`, and symmetrically for `down`. Use two Fenwick trees (max) over compressed values, inserting index `j` once `i − k ≥ j`. O(n log n).*

You are given an integer array `nums` of length `n` and an integer `k`.

Pick a **subsequence** with indices `0 <= i_1 < i_2 < ... < i_m < n` such that:

- For every `1 <= t < m`, `i_t+1 - i_t >= k`.
- The selected values form a **strictly alternating** sequence. In other words, either:

- `nums[i_1] < nums[i_2] > nums[i_3] < ...`, or
- `nums[i_1] > nums[i_2] < nums[i_3] > ...`

A **subsequence** of length 1 is also considered **strictly** alternating. The score of a **valid** subsequence is the **sum** of its selected values.

Return an integer denoting the **maximum** possible **score** of a valid subsequence.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= n`

## Examples

**Example 1:**
```
Input: nums = [5,4,2], k = 2
Output: 7
Explanation: An optimal choice is indices [0, 2], which gives values [5, 2].
- The distance condition holds because 2 - 0 = 2 >= k.
- The values are strictly alternating because 5 > 2.
The score is 5 + 2 = 7.
```

**Example 2:**
```
Input: nums = [3,5,4,2,4], k = 1
Output: 14
Explanation: An optimal choice is indices [0, 1, 3, 4], which gives values [3, 5, 2, 4].
- The distance condition holds because each pair of consecutive chosen indices differs by at least k = 1.
- The values are strictly alternating since 3 < 5 > 2 < 4.
The score is 3 + 5 + 2 + 4 = 14.
```

**Example 3:**
```
Input: nums = [5], k = 1
Output: 5
Explanation: The only valid subsequence is [5]. A subsequence with 1 element is always strictly alternating, so the score is 5.
```

## Approach
Dynamic programming with two states per index:
- `pos[i]`: maximum sum of a valid alternating subsequence ending at `i` with `nums[i]` taken as a **positive** element.
- `neg[i]`: same but ending with a **negative** element.
Transition uses the best opposite-sign value from any index at least `k` positions before.
1. Initialize `pos[i] = nums[i]` if `nums[i] > 0` else `-∞`; similarly for `neg[i]`.
2. For each `i` from `0` to `n-1`:
   - Look back to `j = i - k` (or earlier). Maintain running maximums `bestPos` and `bestNeg` for windows of size `k` using a deque or sliding-window max.
   - Update `pos[i] = max(pos[i], bestNeg + nums[i])` when `nums[i] > 0`.
   - Update `neg[i] = max(neg[i], bestPos + nums[i])` when `nums[i] < 0`.
3. The answer is the maximum over all `pos[i]` and `neg[i]`.
The sliding-window maximum ensures O(n) time.

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
        // Remove elements out of the k-window
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

## Follow-Up Questions
1. How would you adapt the DP if the sign alternation requirement were removed, leaving only the distance constraint?
2. Can the solution be extended to handle a maximum distance constraint as well (i.e., `k ≤ distance ≤ K2`)?
3. How would you modify the algorithm to also return the actual subsequence achieving the maximum sum?

## Key Takeaway
Maintaining sliding-window maximums of opposite-sign DP states lets you enforce both alternation and distance constraints in linear time.
