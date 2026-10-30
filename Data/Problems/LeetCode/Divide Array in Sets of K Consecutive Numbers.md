# 1296. Divide Array in Sets of K Consecutive Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers](https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers)
**Companies:** Google, Waymo

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy with SortedMap](#approach-greedy-with-sortedmap)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of integers `nums` and a positive integer `k`, check whether it is possible to divide this array into sets of `k` consecutive numbers.

Return `true` *if it is possible*.** **Otherwise, return `false`.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].
```

**Example 2:**
```
Input: nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
Output: true
Explanation: Array can be divided into [1,2,3] , [2,3,4] , [3,4,5] and [9,10,11].
```

**Example 3:**
```
Input: nums = [1,2,3,4], k = 3
Output: false
Explanation: Each array should be divided in subarrays of size 3.
```

---

## Key Insight

> Greedily start groups from the **smallest available** number. For each group, consume k consecutive values. If any value in the consecutive run is missing, return false.

---

## Approach: Greedy with SortedMap ✅

```
FUNCTION isPossibleDivide(nums, k):
    IF length(nums) % k ≠ 0 THEN RETURN false
    freq ← Counter(nums)  // or sorted map

    FOR num IN sorted(freq.keys()) DO
        count ← freq[num]
        IF count > 0 THEN
            FOR i ← 0 TO k-1 DO
                IF freq[num + i] < count THEN RETURN false
                freq[num + i] -= count

    RETURN true
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Sorting + greedy pass |
| **Space** | O(n) | Frequency map |

---

## Key Takeaway

> **Greedy grouping of consecutive numbers: always start from the smallest, consume k consecutive values. Same pattern as "Hand of Straights" (LC 846).**
