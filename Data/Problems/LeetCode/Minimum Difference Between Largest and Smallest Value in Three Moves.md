# 1509. Minimum Difference Between Largest and Smallest Value in Three Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves](https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + Check 4 Options — O(n log n)](#approach-sort--check-4-options--on-log-n)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

In one move, you can choose one element of `nums` and change it to **any value**.

Return *the minimum difference between the largest and smallest value of `nums` **after performing at most three moves***.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 2 to 3. nums becomes [5,3,3,4].
In the second move, change 4 to 3. nums becomes [5,3,3,3].
In the third move, change 5 to 3. nums becomes [3,3,3,3].
After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.
```

**Example 2:**
```
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: We can make at most 3 moves.
In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
After performing 3 moves, the difference between the minimum and maximum is 1 - 0 = 1.
It can be shown that there is no way to make the difference 0 in 3 moves.
```

**Example 3:**
```
Input: nums = [3,100,20]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 100 to 7. nums becomes [3,7,20].
In the second move, change 20 to 7. nums becomes [3,7,7].
In the third move, change 3 to 7. nums becomes [7,7,7].
After performing 3 moves, the difference between the minimum and maximum is 7 - 7 = 0.
```

---

## Key Insight

> Changing an element to any value is equivalent to **removing** it from the min/max consideration. With 3 changes, we remove some from the bottom and some from the top: 0+3, 1+2, 2+1, or 3+0 from (smallest + largest). Only 4 combinations to check.

---

## Approach: Sort + Check 4 Options — O(n log n) ✅

```
FUNCTION minDifference(nums):
    IF len(nums) <= 4: RETURN 0
    SORT nums
    n = len(nums)

    RETURN MIN(
        nums[n-1] - nums[3],     // remove 3 smallest
        nums[n-2] - nums[2],     // remove 2 smallest + 1 largest
        nums[n-3] - nums[1],     // remove 1 smallest + 2 largest
        nums[n-4] - nums[0]      // remove 3 largest
    )
```

---

## Walkthrough

```
nums = [1, 5, 0, 10, 14]
Sorted: [0, 1, 5, 10, 14], n = 5
```

| Strategy | Remove | Remaining range | Difference |
|----------|--------|----------------|------------|
| 3 smallest | 0,1,5 | [10, 14] | 14-10 = 4 |
| 2 smallest + 1 largest | 0,1 + 14 | [5, 10] | 10-5 = 5 |
| 1 smallest + 2 largest | 0 + 10,14 | [1, 5] | 5-1 = 4 |
| 3 largest | 5,10,14 | [0, 1] | 1-0 = **1** |

**Result:** min(4, 5, 4, 1) = **1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(1) — constant comparisons |

---

## Follow-Up Questions

1. **Why only 4 options?** With 3 changes split between smallest and largest: (0,3), (1,2), (2,1), (3,0) = 4 ways.
2. **What if we had `m` moves instead of 3?** Check `m+1` options: for `i` in 0..m, compare `nums[n-1-m+i] - nums[i]`.
3. **Can we avoid full sort?** Yes — only need the 4 smallest and 4 largest, achievable in O(n) with partial sort.

---

## Key Takeaway

> With `m` allowed changes, the optimal strategy removes some extremes from each end — sort and check the `m+1` boundary combinations. For m=3, that's just 4 comparisons.
