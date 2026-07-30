# 2150. Find All Lonely Numbers in the Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-lonely-numbers-in-the-array](https://leetcode.com/problems/find-all-lonely-numbers-in-the-array)
**Companies:** Apple, Google

---

## Problem Description
Given an integer array `nums`, a number `x` is called *lonely* if it appears exactly once in the array and neither `x-1` nor `x+1` appear in the array. Return all lonely numbers in any order.

## Examples
**Example 1:**
```
Input: nums = [10,6,5,8]
Output: [10,8]
Explanation: 10 and 8 appear once and their neighbors (9,11 and 7,9) are absent.
```
**Example 2:**
```
Input: nums = [1,3,5,3]
Output: [1,5]
Explanation: 1 and 5 are unique and have no adjacent values in the array.
```

## Approach
Use a frequency map to count occurrences. Then iterate over the map; a number is lonely if its count is 1 and neither `num-1` nor `num+1` exist in the map.

```text
FUNCTION findLonely(nums):
    freq ← EMPTY_MAP
    FOR v IN nums:
        freq[v] ← freq.get(v, 0) + 1
    result ← []
    FOR (num, cnt) IN freq:
        IF cnt == 1 AND (num-1) NOT IN freq AND (num+1) NOT IN freq:
            APPEND num TO result
    RETURN result
```
The map provides O(1) look‑ups for neighbor checks.

## Walkthrough
For `nums = [10,6,5,8]`:
| num | count | num-1 in map? | num+1 in map? | lonely? |
|-----|-------|---------------|---------------|---------|
|10|1|false|false|yes|
|6|1|false|true (7 absent) → false|no|
|5|1|false|true (6 present) → false|no|
|8|1|false|false|yes|
Result = [10,8].

## Complexity Analysis
- **Time:** O(n) to build the frequency map and O(m) to scan it, where m ≤ n.
- **Space:** O(m) for the map storing distinct numbers.

## Follow-Up Questions
1. How would you adapt the solution if the array is sorted and you must use O(1) extra space?
2. Can you solve it in a single pass without an explicit map by leveraging counting sort when the range of numbers is limited?
3. How would the approach change if the definition of loneliness required both neighbors to be absent *and* the number to be a prime?

## Key Takeaway
A frequency map lets you efficiently verify uniqueness and the absence of adjacent values in linear time.
