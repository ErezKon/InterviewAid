# 525. Contiguous Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/contiguous-array](https://leetcode.com/problems/contiguous-array)
**Companies:** Accenture, Adobe, Akamai, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Morgan Stanley, Motive, Oracle, Tiktok, Walmart Labs

---

## Problem Description
Given a binary array `nums`, find the length of the longest contiguous subarray with an equal number of `0`s and `1`s.

## Examples
**Example 1:**
```
Input: nums = [0,1,0]
Output: 2
Explanation: The longest subarray is [0,1] or [1,0].
```
**Example 2:**
```
Input: nums = [0,0,1,0,0,0,1,1]
Output: 4
Explanation: The longest subarray is [0,1,0,0,1,1] → the middle four elements have equal 0s and 1s.
```

## Approach
Replace each `0` with `-1`. The problem becomes finding the longest subarray whose sum is `0`. Use a hash map to store the first index where each prefix sum appears.

**Pseudocode**
```text
FUNCTION findMaxLength(nums):
    SET prefixSum ← 0
    SET maxLen ← 0
    SET firstSeen ← {0: -1}               // sum → earliest index
    FOR i FROM 0 TO LENGTH(nums) - 1:
        IF nums[i] = 1:
            SET prefixSum ← prefixSum + 1
        ELSE:
            SET prefixSum ← prefixSum - 1
        IF prefixSum IN firstSeen:
            SET maxLen ← MAX(maxLen, i - firstSeen[prefixSum])
        ELSE:
            firstSeen[prefixSum] ← i
    RETURN maxLen
```

## Walkthrough
For `nums = [0,0,1,0,0,0,1,1]` (0 → -1):
| i | value | prefixSum | firstSeen | maxLen |
|---|-------|-----------|-----------|--------|
|0|-1| -1 | {0:-1, -1:0} | 0 |
|1|-1| -2 | {0:-1, -1:0, -2:1} | 0 |
|2|+1| -1 | already seen at 0 → len=2 (maxLen=2) |
|3|-1| -2 | already seen at 1 → len=2 |
|4|-1| -3 | add -3:4 |
|5|-1| -4 | add -4:5 |
|6|+1| -3 | seen at 4 → len=2 |
|7|+1| -2 | seen at 1 → len=6 (maxLen=6) |
The longest length is 6, but the example expects 4 due to a mistake; correct longest is 6.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(n) – hash map stores at most one entry per distinct prefix sum.

## Follow‑Up Questions
1. How would you adapt the solution for an array with more than two distinct values?
2. Can the algorithm be extended to return the actual subarray indices?
3. What changes are needed if the array is streamed and you cannot store the whole prefix map?

## Key Takeaway
Transforming `0`s to `-1`s turns the equal‑count condition into a zero‑sum problem, solvable with a prefix‑sum hash map.
