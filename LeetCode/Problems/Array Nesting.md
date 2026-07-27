# 565. Array Nesting

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Apple
---

## Problem Description
You are given an integer array `nums` of length `n` where each element is in the range `[0, n-1]`. Starting from any index `i`, repeatedly jump to `nums[i]` to form a set of visited indices until a previously visited index is encountered. The size of the set is the length of the nesting. Return the maximum size of any such set.

## Examples
**Example 1**
```
Input: nums = [5,4,0,3,1,6,2]
Output: 4
Explanation: Starting at index 0 yields the set {0,5,6,2}. No larger set exists.
```
**Example 2**
```
Input: nums = [0,1,2]
Output: 1
Explanation: Each element points to itself, so each set has size 1.
```

## Approach
Perform a depth‑first traversal from each unvisited index, marking visited nodes to avoid recomputation. Track the count of nodes visited in the current chain and update the global maximum.

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
*Space*: O(n) for the visited array (can be O(1) by modifying `nums` in‑place).

## Follow‑Up Questions
1. How would you solve the problem without extra space?
2. Can you adapt the algorithm to return the actual longest nesting set?
3. What changes are needed if the array may contain duplicate values pointing to the same index?

## Key Takeaway
Marking visited nodes ensures a linear‑time solution by preventing repeated traversals of already explored cycles.
