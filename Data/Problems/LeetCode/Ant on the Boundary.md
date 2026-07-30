# 3028. Ant on the Boundary

**Difficulty:** 🟢 Easy
**Companies:** Accenture, Amazon, Google
---

## Problem Description
Given an array `nums` of integers representing the steps an ant moves along a line (positive for right, negative for left), count the number of times the ant returns to the starting point (position 0) after each step. The ant starts at position 0 before any moves.

## Examples
**Example 1:**
```
Input: nums = [1, -1, 2, -2]
Output: 2
Explanation: Prefix sums are [1,0,2,0]; the ant returns to 0 after the 2nd and 4th steps.
```
**Example 2:**
```
Input: nums = [3, -1, -2]
Output: 1
Explanation: Prefix sums [3,2,0]; returns to 0 only after the last step.
```

## Approach
Compute the running prefix sum while iterating through `nums`. Increment a counter each time the prefix sum equals zero.

```text
FUNCTION returnToBoundaryCount(nums):
    SET prefix ← 0
    SET count ← 0
    FOR num IN nums:
        SET prefix ← prefix + num
        IF prefix == 0:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
| Step | num | prefix | count |
|------|-----|--------|-------|
|1|1|1|0|
|2|-1|0|1|
|3|2|2|1|
|4|-2|0|2|
Result = 2.

## Complexity Analysis
- **Time:** O(n) where n = length of `nums`.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you modify the solution to count returns to any target position `t`?
2. Can you handle a stream of moves without storing the entire array?
3. What if the ant moves in a 2‑D grid and must return to the origin?

## Key Takeaway
A simple prefix‑sum scan efficiently counts how often the cumulative displacement returns to zero.
