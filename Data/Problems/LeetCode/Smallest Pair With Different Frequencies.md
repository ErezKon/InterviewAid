# 3852. Smallest Pair With Different Frequencies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-pair-with-different-frequencies](https://leetcode.com/problems/smallest-pair-with-different-frequencies)
**Companies:** Nagarro

---

## Problem Description

You are given an integer array `nums`.

Consider all pairs of **distinct** values `x` and `y` from `nums` such that:

- `x < y`
- `x` and `y` have different frequencies in `nums`.

Among all such pairs:

- Choose the pair with the smallest possible value of `x`.
- If multiple pairs have the same `x`, choose the one with the smallest possible value of `y`.

Return an integer array `[x, y]`. If no valid pair exists, return `[-1, -1]`.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples

```
Example 1:
  Input: nums = [1,1,2,2,3,4]
  Output: [1,3]
  Explanation: The smallest value is 1 with a frequency of 2, and the smallest value greater than 1 that has a different frequency from 1 is 3 with a frequency of 1. Thus, the answer is [1, 3].
```

```
Example 2:
  Input: nums = [1,5]
  Output: [-1,-1]
  Explanation: Both values have the same frequency, so no valid pair exists. Return [-1, -1].
```

```
Example 3:
  Input: nums = [7]
  Output: [-1,-1]
  Explanation: There is only one value in the array, so no valid pair exists. Return [-1, -1].
```

## Approach: Frequency Map and Grouping [Time: O(N), Space: O(U)]

1.  **Count Frequencies:** First, create a frequency map of all numbers in `nums`.
2.  **Group by Frequency:** Invert the map to group numbers by their frequencies. For example, `freq_map = {1:[3], 2:[1], 3:[2]}`.
3.  **Find Smallest Numbers:** For each frequency, find the smallest number associated with it.
4.  **Iterate and Minimize:** Iterate through all pairs of distinct frequencies. For each pair of frequencies, take the smallest number from each group and calculate their sum. The minimum sum found across all pairs is the answer.

```
FUNCTION smallestPairSum(nums):
    // 1. Count frequencies
    counts = HASH_MAP()
    FOR num IN nums:
        counts[num] = counts.GET(num, 0) + 1

    // 2. Group numbers by frequency
    freq_to_nums = HASH_MAP()
    FOR num, freq IN counts.items():
        IF freq NOT IN freq_to_nums:
            freq_to_nums[freq] = []
        freq_to_nums[freq].APPEND(num)

    // 3. Find the smallest number for each frequency
    freq_to_min_num = HASH_MAP()
    FOR freq, num_list IN freq_to_nums.items():
        freq_to_min_num[freq] = MIN(num_list)

    // 4. Find the minimum pair sum
    min_sum = INFINITY
    unique_freqs = LIST(freq_to_min_num.keys())
    
    IF len(unique_freqs) < 2:
        RETURN -1 // Or handle as per problem spec for no such pair

    FOR i FROM 0 TO len(unique_freqs) - 1:
        FOR j FROM i + 1 TO len(unique_freqs) - 1:
            freq1 = unique_freqs[i]
            freq2 = unique_freqs[j]
            
            num1 = freq_to_min_num[freq1]
            num2 = freq_to_min_num[freq2]
            
            min_sum = MIN(min_sum, num1 + num2)
            
    RETURN min_sum
```

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(N) | O(U) |

- `N` is the number of elements in `nums`.
- `U` is the number of unique elements in `nums`.
- Counting frequencies is O(N).
- Grouping by frequency is O(U).
- The final nested loop runs on unique frequencies, which is at most O(U^2), but since the number of distinct frequencies is typically much smaller than N, this part is fast.

## Follow-up

- How would the approach change if you needed to find the pair with the *maximum* sum?
