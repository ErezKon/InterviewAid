# 2364. Count Number of Bad Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-bad-pairs
**Companies:** Amazon, Bloomberg, Google, Microsoft
---

## Problem Description
You are given a **0-indexed** integer array `nums`. A pair of indices `(i, j)` is a **bad pair** if `i < j` and `j - i != nums[j] - nums[i]`.

Return *the total number of **bad pairs** in* `nums`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples
```
Example 1:
  Input: nums = [4,1,3,3]
  Output: 5
  Explanation: The pair (0, 1) is a bad pair since 1 - 0 != 1 - 4.
  The pair (0, 2) is a bad pair since 2 - 0 != 3 - 4, 2 != -1.
  The pair (0, 3) is a bad pair since 3 - 0 != 3 - 4, 3 != -1.
  The pair (1, 2) is a bad pair since 2 - 1 != 3 - 1, 1 != 2.
  The pair (2, 3) is a bad pair since 3 - 2 != 3 - 3, 1 != 0.
  There are a total of 5 bad pairs, so we return 5.
```

```
Example 2:
  Input: nums = [1,2,3,4,5]
  Output: 0
  Explanation: There are no bad pairs.
```

## Approach
Transform the condition: `j - i != nums[j] - nums[i]` ⇔ `nums[i] - i != nums[j] - j`. For each element compute `key = nums[i] - i`. Count how many previous elements share the same key (good pairs). Total pairs = n·(n‑1)/2. Bad pairs = total – good.

## Walkthrough
| Index i | nums[i] | key = nums[i]‑i | Good pairs added |
|---------|---------|----------------|------------------|
| 0       | 4       | 4              | 0                |
| 1       | 1       | 0              | 0                |
| 2       | 3       | 1              | 0                |
| 3       | 3       | 0              | 1 (matches index 1) |
The sum of good pairs is 1, total pairs = 6, so bad = 5.

## Complexity Analysis
- **Time:** O(n) – single pass to compute keys and count good pairs.
- **Space:** O(n) in the worst case for the hash map storing frequencies.

## Follow-Up Questions
- How would you modify the solution to handle streaming input where the array is not fully known in advance?
- Can the problem be solved with O(1) extra space if the array is sorted?
- What if the definition of a bad pair changes to a different linear relation?

## Key Takeaway
By rewriting the bad‑pair condition to a simple equality of `nums[i]‑i`, the problem reduces to counting equal values, which is efficiently done with a hash map in linear time.
