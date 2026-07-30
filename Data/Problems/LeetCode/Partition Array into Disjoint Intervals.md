# 915. Partition Array into Disjoint Intervals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-into-disjoint-intervals](https://leetcode.com/problems/partition-array-into-disjoint-intervals)
**Companies:** Google, Microsoft

---

## Problem Description
Given an integer array `arr`, split it into two non‑empty parts `left` and `right` such that every element in `left` is less than or equal to every element in `right`. Return the smallest possible length of `left`.

## Examples
**Example 1:**
```
Input: arr = [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]. All elements in left ≤ all in right.
```
**Example 2:**
```
Input: arr = [1,1,1,0,6,12]
Output: 4
```

## Approach
Traverse the array while maintaining two values:
- `maxLeft`: maximum of the current left part.
- `maxOverall`: maximum seen so far.
Whenever the current element exceeds `maxLeft`, we must extend the left part to include this element, updating `maxLeft` to `maxOverall`. The index where we last updated `maxLeft` gives the minimal left length.

```text
FUNCTION partitionDisjoint(arr):
    maxLeft ← arr[0]
    maxOverall ← arr[0]
    partitionIdx ← 0
    FOR i ← 1 TO LEN(arr)-1:
        maxOverall ← MAX(maxOverall, arr[i])
        IF arr[i] < maxLeft:
            // need to include up to i in left
            maxLeft ← maxOverall
            partitionIdx ← i
    RETURN partitionIdx + 1   // length of left part
```

## Walkthrough
For `[5,0,3,8,6]`:
- i=1: maxOverall=5, arr[1]=0 < maxLeft=5 → extend left to i=1, maxLeft=5.
- i=2: arr[2]=3 < maxLeft → extend left to i=2.
- i=3: arr[3]=8 > maxLeft, no change.
- i=4: arr[4]=6 > maxLeft, no change.
Final partitionIdx=2 → left length = 3.

## Complexity Analysis
- **Time:** O(n) single pass.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual left and right subarrays?
2. Can the solution be adapted for the case where the inequality is strict (`<` instead of `≤`)?
3. What if the array is streamed and you cannot store it entirely?

## Key Takeaway
A single scan tracking the maximum of the left segment and the overall maximum determines the earliest valid split.
