# 2863. Maximum Length of Semi-Decreasing Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-semi-decreasing-subarrays](https://leetcode.com/problems/maximum-length-of-semi-decreasing-subarrays)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums`.

Return *the length of the **longest semi-decreasing** subarray of *`nums`*, and *`0`* if there are no such subarrays.*

- A **subarray** is a contiguous non-empty sequence of elements within an array.
- A non-empty array is **semi-decreasing** if its first element is **strictly greater** than its last element.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [7,6,5,4,3,2,1,6,10,11]
Output: 8
Explanation: Take the subarray [7,6,5,4,3,2,1,6].
The first element is 7 and the last one is 6 so the condition is met.
Hence, the answer would be the length of the subarray or 8.
It can be shown that there aren't any subarrays with the given condition with a length greater than 8.
```

**Example 2:**
```
Input: nums = [57,55,50,60,61,58,63,59,64,60,63]
Output: 6
Explanation: Take the subarray [61,58,63,59,64,60].
The first element is 61 and the last one is 60 so the condition is met.
Hence, the answer would be the length of the subarray or 6.
It can be shown that there aren't any subarrays with the given condition with a length greater than 6.
```

**Example 3:**
```
Input: nums = [1,2,3,4]
Output: 0
Explanation: Since there are no semi-decreasing subarrays in the given array, the answer is 0.
```

---

## Key Insight

> We want to **maximize j − i + 1** such that `nums[i] > nums[j]`. Group indices by value, then for each value consider pairings with smaller values. Sorting the values and using earliest/latest index tracking gives an optimal O(n log n) solution.

---

## Approach

1. **Group indices by value**: For each distinct value, store the minimum and maximum index.
2. **Sort distinct values** in decreasing order.
3. Sweep through sorted values, maintaining the **smallest index** seen so far from larger values.
4. For each value, the longest semi-decreasing subarray ending at one of its indices is `max_index_of_current_value - min_index_from_larger_values + 1`.

```
FUNCTION maxSemiDecreasingLength(nums)
    // Group indices by value
    groups ← HashMap()
    FOR i ← 0 TO len(nums) - 1 DO
        IF nums[i] NOT IN groups THEN
            groups[nums[i]] ← (i, i)        // (minIdx, maxIdx)
        ELSE
            groups[nums[i]].minIdx ← MIN(groups[nums[i]].minIdx, i)
            groups[nums[i]].maxIdx ← MAX(groups[nums[i]].maxIdx, i)
    
    // Sort distinct values in decreasing order
    sortedValues ← SORT(groups.keys(), DESCENDING)
    
    result ← 0
    minIdxSoFar ← INFINITY
    
    FOR each val IN sortedValues DO
        (minIdx, maxIdx) ← groups[val]
        
        // Try to form subarray: larger value at minIdxSoFar, current val at maxIdx
        IF minIdxSoFar < maxIdx THEN
            result ← MAX(result, maxIdx - minIdxSoFar + 1)
        
        // Update minIdxSoFar with current value's earliest index
        minIdxSoFar ← MIN(minIdxSoFar, minIdx)
    
    RETURN result
END FUNCTION
```

---

## Walkthrough

```
nums = [7, 6, 5, 4, 3, 2, 1, 6, 10, 11]
```

| Value | Min Index | Max Index |
|-------|-----------|-----------|
| 7     | 0         | 0         |
| 6     | 1         | 7         |
| 5     | 2         | 2         |
| 4     | 3         | 3         |
| 3     | 4         | 4         |
| 2     | 5         | 5         |
| 1     | 6         | 6         |
| 10    | 8         | 8         |
| 11    | 9         | 9         |

Sorted descending: `[11, 10, 7, 6, 5, 4, 3, 2, 1]`

| Step | val | minIdxSoFar | maxIdx | Length      | result |
|------|-----|-------------|--------|-------------|--------|
| 1    | 11  | ∞           | 9      | —           | 0      |
| —    |     | 9           |        |             |        |
| 2    | 10  | 9           | 8      | 8 < 9? No   | 0      |
| —    |     | 8           |        |             |        |
| 3    | 7   | 8           | 0      | 0 < 8? No   | 0      |
| —    |     | 0           |        |             |        |
| 4    | 6   | 0           | 7      | 7-0+1=**8** | **8**  |
| …    | …   | 0           | …      | ≤8          | 8      |

**Result: 8** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting distinct values |
| Space  | **O(n)** — hash map for index groups |

---

## Follow-Up Questions

1. **What if we need the actual subarray, not just the length?**
   Track the start/end indices that produced the maximum length.

2. **What if the condition were `nums[i] >= nums[j]` (non-strict)?**
   Same approach but include equal values in the pairing logic.

3. **Can this be solved in O(n)?**
   If values are bounded, bucket sort makes it O(n). Otherwise O(n log n) is optimal due to sorting.

4. **How does this relate to the "Maximum Width Ramp" problem?**
   Very similar — both seek to maximize `j - i` with a value constraint. Maximum Width Ramp uses a monotonic stack approach.

---

## Key Takeaway

> **Grouping indices by value and sweeping in sorted order** converts a two-pointer search problem into a linear scan, achieving O(n log n) by leveraging sorting and prefix-minimum tracking.
