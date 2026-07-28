# 3371. Identify the Largest Outlier in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/identify-the-largest-outlier-in-an-array](https://leetcode.com/problems/identify-the-largest-outlier-in-an-array)
**Companies:** Amazon, Goldman Sachs, Google, Meta

---

## Problem Description
Given an integer array `nums`, an *outlier* is an element `x` such that after removing `x` the sum of the remaining elements is even and half of that sum exists elsewhere in the array (excluding `x`). Return the largest possible outlier value, or `-∞` if none exists.

## Examples
**Example 1:**
```
Input: nums = [4, 1, 3, 2]
Output: 4
Explanation: Removing 4 leaves [1,3,2] with sum 6. Half is 3, which is present.
```
**Example 2:**
```
Input: nums = [5, 5, 5]
Output: -∞
Explanation: No element satisfies the condition.
```

## Approach
The condition can be checked in linear time using a hash map to store frequencies.
1. Compute the total sum of the array.
2. Build a frequency map `count` of each number.
3. Iterate each element `num`:
   - Decrease its count temporarily.
   - Compute `rest = total - num`.
   - If `rest` is even, let `half = rest / 2`.
   - If `count[half] > 0`, `num` is a valid outlier; track the maximum.
   - Restore the count.
4. Return the maximum found or `-∞`.

## Walkthrough
| Step | num | rest | rest even? | half | count[half] | max outlier |
|------|-----|------|------------|------|-------------|--------------|
| 1    | 4   | 6    | yes        | 3    | 1           | 4            |
| 2    | 1   | 9    | no         | -    | -           | 4            |
| 3    | 3   | 7    | no         | -    | -           | 4            |
| 4    | 2   | 8    | yes        | 4    | 0 (4 removed) | 4 |

## Complexity Analysis
- **Time:** O(n) – one pass to build the map and another pass to evaluate each element.
- **Space:** O(n) – storage for the frequency map.

## Follow-Up Questions
1. How would you modify the solution if the array could contain negative numbers?
2. Can the problem be solved in O(1) extra space by sorting the array first?
3. How would you extend this to return all valid outliers instead of only the largest?

## Key Takeaway
Using a frequency hash map lets you verify the pairing condition for each element in constant time, yielding an overall linear‑time solution.
