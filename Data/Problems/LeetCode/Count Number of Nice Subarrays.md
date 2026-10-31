# 1248. Count Number of Nice Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-nice-subarrays
**Companies:** Amazon, Bloomberg, Deliveroo, Google, Meta, Microsoft, Oracle, Roblox, Tiktok
---

## Problem Description
Given an array of integers `nums` and an integer `k`. A continuous subarray is called **nice** if there are `k` odd numbers on it.

Return *the number of **nice** sub-arrays*.

**Constraints:**
- `1 <= nums.length <= 50000`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Examples
```
Example 1:
  Input: nums = [1,1,2,1,1], k = 3
  Output: 2
  Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
```

```
Example 2:
  Input: nums = [2,4,6], k = 1
  Output: 0
  Explanation: There are no odd numbers in the array.
```

```
Example 3:
  Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
  Output: 16
```

## Approach
Use the sliding-window technique to compute `atMost(k)` – the number of subarrays with at most `k` odd numbers. The answer is `atMost(k) - atMost(k-1)`. The `atMost` function expands a right pointer, counts odd numbers, and shrinks the left pointer while the odd count exceeds the limit.

## Walkthrough
| Step | right index | nums[right] | odds | left index | count added |
|------|-------------|------------|------|------------|-------------|
| 1    | 0           | 1 (odd)    | 1    | 0          | 1 (0-0+1)   |
| 2    | 1           | 1 (odd)    | 2    | 0          | 2 (1-0+1)   |
| 3    | 2           | 2 (even)   | 2    | 0          | 3 (2-0+1)   |
| 4    | 3           | 1 (odd)    | 3 > k → shrink left until odds≤k |
| …    | …           | …          | …    | …          | … |
The `atMost` routine yields counts for `k` and `k-1`; their difference gives the final answer.

## Complexity Analysis
- **Time:** O(n) – each element is visited at most twice by the two pointers.
- **Space:** O(1) – only a few integer variables are used.

## Follow-Up Questions
- How would you adapt the solution to count subarrays with at most `k` distinct values?
- Can the method be extended to handle streams of numbers where the array size is unknown in advance?
- What changes are needed if the definition of “nice” uses even numbers instead of odd?

## Key Takeaway
Transforming “exactly k odd numbers” into a difference of two “at most k” counts enables a linear-time sliding-window solution.
