# 565. Array Nesting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/array-nesting](https://leetcode.com/problems/array-nesting)
**Companies:** Amazon, Apple
---

## Problem Description
You are given an integer array `nums` of length `n` where `nums` is a permutation of the numbers in the range `[0, n - 1]`.

You should build a set `s[k] = {nums[k], nums[nums[k]], nums[nums[nums[k]]], ... }` subjected to the following rule:

- The first element in `s[k]` starts with the selection of the element `nums[k]` of `index = k`.
- The next element in `s[k]` should be `nums[nums[k]]`, and then `nums[nums[nums[k]]]`, and so on.
- We stop adding right before a duplicate element occurs in `s[k]`.

Return *the longest length of a set* `s[k]`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] < nums.length`
- All the values of `nums` are **unique**.

## Examples
```
Example 1:
  Input: nums = [5,4,0,3,1,6,2]
  Output: 4
  Explanation:
  nums[0] = 5, nums[1] = 4, nums[2] = 0, nums[3] = 3, nums[4] = 1, nums[5] = 6, nums[6] = 2.
  One of the longest sets s[k]:
  s[0] = {nums[0], nums[5], nums[6], nums[2]} = {5, 6, 2, 0}
```
```
Example 2:
  Input: nums = [0,1,2]
  Output: 1
```

## Approach
Perform a depth-first traversal from each unvisited index, marking visited nodes to avoid recomputation. Track the count of nodes visited in the current chain and update the global maximum.

```text
FUNCTION arrayNesting(nums):
    n ← LENGTH(nums)
    visited ← ARRAY of false size n
    maxLen ← 0
    FOR i ← 0 TO n-1:
        IF NOT visited[i]:
            count ← 0
            j ← i
            WHILE NOT visited[j]:
                visited[j] ← true
                j ← nums[j]
                count ← count + 1
            maxLen ← MAX(maxLen, count)
    RETURN maxLen
```

## Walkthrough
For `nums = [5,4,0,3,1,6,2]`:
- Start at 0: 0→5→6→2→0 stops after 4 visits → maxLen=4.
- Other starts produce smaller counts.

## Complexity Analysis
*Time*: O(n) – each element is visited at most once.
*Space*: O(n) for the visited array (can be O(1) by modifying `nums` in-place).

## Follow-Up Questions
1. How would you solve the problem without extra space?
2. Can you adapt the algorithm to return the actual longest nesting set?
3. What changes are needed if the array may contain duplicate values pointing to the same index?

## Key Takeaway
Marking visited nodes ensures a linear-time solution by preventing repeated traversals of already explored cycles.
