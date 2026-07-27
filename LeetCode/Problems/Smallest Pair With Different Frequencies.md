# 3852. Smallest Pair With Different Frequencies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-pair-with-different-frequencies](https://leetcode.com/problems/smallest-pair-with-different-frequencies)
**Companies:** Nagarro

---

## Problem Description

Given an array of integers `nums`, find the pair of numbers `(x, y)` such that `x` and `y` have different frequencies in the array, and the sum `x + y` is minimized. Return this minimum sum.

## Examples

- **Input:** `nums = [1, 1, 2, 2, 2, 3]`
  - **Frequencies:** `1:2`, `2:3`, `3:1`.
  - **Pairs with different frequencies:** `(1, 2)`, `(1, 3)`, `(2, 3)`.
  - **Sums:** `1+2=3`, `1+3=4`, `2+3=5`.
  - **Output:** `3`.

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
