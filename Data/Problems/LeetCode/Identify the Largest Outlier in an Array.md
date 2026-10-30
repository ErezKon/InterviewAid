# 3371. Identify the Largest Outlier in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/identify-the-largest-outlier-in-an-array](https://leetcode.com/problems/identify-the-largest-outlier-in-an-array)
**Companies:** Amazon, Goldman Sachs, Google, Meta

---

## Problem Description

You are given an integer array `nums`. This array contains `n` elements, where **exactly** `n - 2` elements are **special**** numbers**. One of the remaining **two** elements is the *sum* of these **special numbers**, and the other is an **outlier**.

An **outlier** is defined as a number that is *neither* one of the original special numbers *nor* the element representing the sum of those numbers.

**Note** that special numbers, the sum element, and the outlier must have **distinct** indices, but *may *share the **same** value.

Return the **largest**** **potential** outlier** in `nums`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `-1000 <= nums[i] <= 1000`
- The input is generated such that at least **one** potential outlier exists in `nums`.

## Examples

**Example 1:**
```
Input: nums = [2,3,5,10]
Output: 10
Explanation: The special numbers could be 2 and 3, thus making their sum 5 and the outlier 10.
```

**Example 2:**
```
Input: nums = [-2,-1,-3,-6,4]
Output: 4
Explanation: The special numbers could be -2, -1, and -3, thus making their sum -6 and the outlier 4.
```

**Example 3:**
```
Input: nums = [1,1,1,1,1,5,5]
Output: 5
Explanation: The special numbers could be 1, 1, 1, 1, and 1, thus making their sum 5 and the other 5 as the outlier.
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
