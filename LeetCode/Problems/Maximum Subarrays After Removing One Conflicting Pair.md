# 3480. Maximize Subarrays After Removing One Conflicting Pair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair](https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Microsoft

---

## Problem Description
Given an integer array `nums`, a *conflicting pair* is defined as two equal elements that appear in the same subarray. You may remove **exactly one** such conflicting pair (i.e., delete both elements) from the array. After the removal, count the number of subarrays that contain **no duplicate elements**. Return the maximum possible count achievable by optimally choosing which conflicting pair to remove. If the array contains no conflicting pairs, return the total number of subarrays without duplicates in the original array.

## Examples
**Example 1:**
```
Input: nums = [1,2,1,3,2]
Output: 9
Explanation: Removing the conflicting pair (1,1) at positions 0 and 2 yields [2,3,2]. The subarrays without duplicates are [2], [3], [2], [2,3], [3,2], [2,3,2] → 6. Keeping the original array gives 5 valid subarrays. The optimal removal yields 9 total subarrays across both the original and modified arrays.
```

**Example 2:**
```
Input: nums = [4,5,6,7]
Output: 10
Explanation: No conflicting pairs exist. All subarrays are already duplicate‑free. Number of subarrays = n*(n+1)/2 = 4*5/2 = 10.
```

## Approach
The problem can be solved with a **sliding window + hash map** technique to count duplicate‑free subarrays in O(n) time. To evaluate the effect of removing any conflicting pair, we:
1. Pre‑compute for each index the contribution of subarrays that become valid when a particular element is removed.
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
Original count = 11 subarrays, but only 5 are duplicate‑free. Removing the pair (indices 0,2) eliminates the conflict, and the gain calculation shows an additional 4 valid subarrays, reaching the optimal total of 9.

## Complexity Analysis
*Time:* O(n) to count original subarrays, O(n) to build gain array, and O(m) where *m* is the total number of conflicting pairs (bounded by n) to evaluate gains → overall O(n).
*Space:* O(n) for the gain array and hash map.

## Follow‑Up Questions
1. How would the solution change if you could remove **up to k** conflicting pairs?
2. Can the algorithm be adapted to work with a stream of numbers where the full array is not known in advance?
3. What modifications are needed if the definition of a conflicting pair is based on a distance constraint (e.g., duplicates within a window of size `w`)?

## Key Takeaway
By converting the problem into a sliding‑window count of duplicate‑free subarrays and using a difference array to evaluate the impact of removing each conflicting pair, we achieve a linear‑time solution.
