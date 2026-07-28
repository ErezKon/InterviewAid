# 1909. Remove One Element to Make the Array Strictly Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing](https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing)
**Companies:** Amazon, Ebay, Goldman Sachs

---

## Problem Description
Given an integer array `nums`, determine whether it is possible to remove exactly one element such that the remaining array is strictly increasing (each element is greater than the previous one). Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
```
Input: nums = [1,2,10,5,7]
Output: true
Explanation: Removing `10` yields [1,2,5,7] which is strictly increasing.
```
**Example 2:**
```
Input: nums = [2,3,1,2]
Output: false
Explanation: No single removal can make the array strictly increasing.
```

## Approach
Scan the array while counting violations of the strictly increasing property. When a violation `nums[i] >= nums[i+1]` is found, we have two options: remove `nums[i]` or remove `nums[i+1]`. Check whether the array would be valid after either removal by examining neighboring elements. If more than one violation occurs, return `false`.

```text
FUNCTION canBeIncreasing(nums):
    SET violations ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:
        IF nums[i] >= nums[i+1]:
            SET violations ← violations + 1
            IF violations > 1:
                RETURN false
            // Check if removing nums[i] fixes the sequence
            IF i > 0 AND nums[i-1] >= nums[i+1]:
                // Removing nums[i] doesn't work, try removing nums[i+1]
                IF i+2 < LENGTH(nums) AND nums[i] >= nums[i+2]:
                    RETURN false
    RETURN true
```

## Walkthrough
| Step | i | nums[i] | nums[i+1] | Violation? | Action |
|------|---|---------|-----------|------------|--------|
| 1 | 0 | 1 | 2 | no | continue |
| 2 | 1 | 2 | 10 | no | continue |
| 3 | 2 | 10 | 5 | yes | violations=1, check removal → removing 10 works |
| End | | | | | return true |

## Complexity Analysis
- **Time:** O(N) where N is the length of `nums`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you extend the solution to allow removal of up to `k` elements?
2. Can you solve the problem using a single pass without explicit violation counting?
3. How would the algorithm change if the array could contain duplicate values that are allowed?

## Key Takeaway
At most one violation can be fixed by a single removal; checking the neighboring values determines which element to drop.
