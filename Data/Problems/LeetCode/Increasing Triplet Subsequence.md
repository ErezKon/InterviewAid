# 334. Increasing Triplet Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/increasing-triplet-subsequence](https://leetcode.com/problems/increasing-triplet-subsequence)
**Companies:** Amazon, Bloomberg, Coupang, Google, Meta, Microsoft, Nutanix

---

## Problem Description

You are given an integer array `nums`.

Return `true`* if there exists a triple of indices *`(i, j, k)`* such that *`i < j < k`* and *`nums[i] < nums[j] < nums[k]`. If no such indices exists, return `false`.

**Follow up:** Could you implement a solution that runs in `O(n)` time complexity and `O(1)` space complexity?

**Constraints:**
- `1 <= nums.length <= 5 * 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.
```

**Example 2:**
```
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.
```

**Example 3:**
```
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: One of the valid triplet is (1, 4, 5), because nums[1] == 1 < nums[4] == 4 < nums[5] == 6.
```

## Approach

**Algorithm:** Greedy tracking of two smallest values — O(n) time, O(1) space.

**Key Insight:** Maintain the smallest (`first`) and the second smallest (`second`) values seen so far. If a number larger than both appears, an increasing triplet is found.

```text
FUNCTION increasingTriplet(nums):
    SET first ← INFINITY
    SET second ← INFINITY
    FOR num IN nums:
        IF num <= first:
            SET first ← num
        ELSE IF num <= second:
            SET second ← num
        ELSE:
            RETURN true   // found num > second > first
    RETURN false
```

## Walkthrough

| Step | num | first | second | Action |
|------|-----|-------|--------|--------|
| 1 | 2 | 2 | ∞ | set first = 2 |
| 2 | 1 | 1 | ∞ | update first = 1 |
| 3 | 5 | 1 | 5 | set second = 5 |
| 4 | 0 | 0 | 5 | update first = 0 |
| 5 | 4 | 0 | 4 | update second = 4 |
| 6 | 6 | 0 | 4 | 6 > second → return true |

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only two variables are stored.

## Follow-Up Questions

- How would you modify the algorithm to return the actual triplet indices?
- Can this approach be extended to find an increasing subsequence of length `k`?
- What changes are needed if the input size is extremely large and cannot fit in memory?

## Key Takeaway

> By greedily tracking the two smallest values, any later number larger than both confirms an increasing triplet in linear time.
