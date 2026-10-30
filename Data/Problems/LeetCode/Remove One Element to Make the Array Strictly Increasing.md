# 1909. Remove One Element to Make the Array Strictly Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing](https://leetcode.com/problems/remove-one-element-to-make-the-array-strictly-increasing)
**Companies:** Amazon, Ebay, Goldman Sachs

---

## Problem Description

Given a **0-indexed** integer array `nums`, return `true` *if it can be made **strictly increasing** after removing **exactly one** element, or* `false` *otherwise. If the array is already strictly increasing, return* `true`.

The array `nums` is **strictly increasing** if `nums[i - 1] < nums[i]` for each index `(1 <= i < nums.length)`.

**Constraints:**
- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [1,2,10,5,7]
Output: true
Explanation: By removing 10 at index 2 from nums, it becomes [1,2,5,7].
[1,2,5,7] is strictly increasing, so return true.
```

**Example 2:**
```
Input: nums = [2,3,1,2]
Output: false
Explanation:
[3,1,2] is the result of removing the element at index 0.
[2,1,2] is the result of removing the element at index 1.
[2,3,2] is the result of removing the element at index 2.
[2,3,1] is the result of removing the element at index 3.
No resulting array is strictly increasing, so return false.
```

**Example 3:**
```
Input: nums = [1,1,1]
Output: false
Explanation: The result of removing any element is [1,1].
[1,1] is not strictly increasing, so return false.
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
