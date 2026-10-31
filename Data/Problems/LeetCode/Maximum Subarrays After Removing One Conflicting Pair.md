# 3480. Maximize Subarrays After Removing One Conflicting Pair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair](https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## Problem Description

> *Note: the Approach below talks about duplicate elements, which is not the official problem. Correct idea: normalize pairs to `a < b`. For each right end `r`, the valid starts are `> max1(r)`, where `max1`/`max2` are the two largest `a` over pairs with `b ≤ r`. The base count is `Σ (r − max1)`. Removing the pair that supplies `max1` gains `max1 − max2` at each such `r`; accumulate this gain per pair. Answer = base + the best gain. O(n + P).*

You are given an integer `n` which represents an array `nums` containing the numbers from 1 to `n` in order. Additionally, you are given a 2D array `conflictingPairs`, where `conflictingPairs[i] = [a, b]` indicates that `a` and `b` form a conflicting pair.

Remove **exactly** one element from `conflictingPairs`. Afterward, count the number of non-empty subarrays of `nums` which do not contain both `a` and `b` for any remaining conflicting pair `[a, b]`.

Return the **maximum** number of subarrays possible after removing **exactly** one conflicting pair.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= conflictingPairs.length <= 2 * n`
- `conflictingPairs[i].length == 2`
- `1 <= conflictingPairs[i][j] <= n`
- `conflictingPairs[i][0] != conflictingPairs[i][1]`

## Examples

**Example 1:**
```
Input: n = 4, conflictingPairs = [[2,3],[1,4]]
Output: 9
Explanation: - Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
- There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
- The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.
```

**Example 2:**
```
Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]
Output: 12
Explanation: - Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
- There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
- The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.
```

## Approach
The problem can be solved with a **sliding window + hash map** technique to count duplicate-free subarrays in O(n) time. To evaluate the effect of removing any conflicting pair, we:
1. Pre-compute for each index the contribution of subarrays that become valid when a particular element is removed.
2. Use a **difference array** to aggregate the gain for each possible pair removal in O(n).
3. Scan all conflicting pairs and pick the pair with the highest gain.

### Pseudocode
```text
FUNCTION maxSubarraysAfterRemovingPair(nums):
    n ← LENGTH(nums)
    // Step 1: count subarrays without duplicates in original array
    originalCount ← countUniqueSubarrays(nums)
    // Step 2: compute gain for each index when removed
    gain ← ARRAY of zeros size n
    left ← 0
    map ← EMPTY hashmap
    FOR right FROM 0 TO n-1:
        IF map CONTAINS nums[right]:
            // duplicate found, slide left past previous occurrence
            left ← MAX(left, map[nums[right]] + 1)
        map[nums[right]] ← right
        // number of new unique subarrays ending at right
        gain[right] ← right - left + 1
    // Step 3: build prefix sums of gains to evaluate pair removal
    prefix ← PREFIX_SUM(gain)
    bestGain ← 0
    // iterate over all conflicting pairs (i < j, nums[i] == nums[j])
    positions ← MAP from value to list of indices
    FOR each list IN positions.values():
        FOR k FROM 0 TO LENGTH(list)-2:
            i ← list[k]
            j ← list[k+1]
            // gain if we delete both i and j
            pairGain ← (prefix[j-1] - (i>0 ? prefix[i-1] : 0))
            bestGain ← MAX(bestGain, pairGain)
    RETURN originalCount + bestGain

FUNCTION countUniqueSubarrays(arr):
    left ← 0
    map ← EMPTY hashmap
    total ← 0
    FOR right FROM 0 TO LENGTH(arr)-1:
        IF map CONTAINS arr[right]:
            left ← MAX(left, map[arr[right]] + 1)
        map[arr[right]] ← right
        total ← total + (right - left + 1)
    RETURN total
```

## Walkthrough
Consider `nums = [1,2,1,3,2]`.
| Step | right | left | map (value→index) | subarrays ending at right | total so far |
|------|-------|------|-------------------|---------------------------|-------------|
| 0 | 0 | 0 | {1:0} | 1 | 1 |
| 1 | 1 | 0 | {1:0,2:1} | 2 | 3 |
| 2 | 2 | 1 (duplicate 1) | {1:2,2:1} | 2 | 5 |
| 3 | 3 | 1 | {1:2,2:1,3:3} | 3 | 8 |
| 4 | 4 | 2 (duplicate 2) | {1:2,2:4,3:3} | 3 | 11 |
Original count = 11 subarrays, but only 5 are duplicate-free. Removing the pair (indices 0,2) eliminates the conflict, and the gain calculation shows an additional 4 valid subarrays, reaching the optimal total of 9.

## Complexity Analysis
*Time:* O(n) to count original subarrays, O(n) to build gain array, and O(m) where *m* is the total number of conflicting pairs (bounded by n) to evaluate gains → overall O(n).
*Space:* O(n) for the gain array and hash map.

## Follow-Up Questions
1. How would the solution change if you could remove **up to k** conflicting pairs?
2. Can the algorithm be adapted to work with a stream of numbers where the full array is not known in advance?
3. What modifications are needed if the definition of a conflicting pair is based on a distance constraint (e.g., duplicates within a window of size `w`)?

## Key Takeaway
By converting the problem into a sliding-window count of duplicate-free subarrays and using a difference array to evaluate the impact of removing each conflicting pair, we achieve a linear-time solution.
