# 2295. Replace Elements in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-elements-in-an-array](https://leetcode.com/problems/replace-elements-in-an-array)
**Companies:** Amazon

---

## Problem Description
Given an integer array `arr`, replace each element with the greatest element among the elements to its right, and set the last element to `-1`. Return the resulting array.

## Examples
- Input: `[17,18,5,4,6,1]` → Output: `[18,6,6,6,1,-1]` (18 is max to the right of 17, etc.)
- Input: `[400]` → Output: `[-1]` (single element case).

## Approach
Traverse the array from right to left while keeping track of the maximum seen so far.

```text
FUNCTION ReplaceElements(arr):
    SET maxSoFar ← -1
    FOR i ← LENGTH(arr) - 1 DOWNTO 0:
        SET current ← arr[i]
        SET arr[i] ← maxSoFar
        IF current > maxSoFar:
            SET maxSoFar ← current
    RETURN arr
```

## Walkthrough
| Index | Original | maxSoFar before | New Value |
|------|----------|----------------|----------|
| 5 | 1 | -1 | -1 |
| 4 | 6 | 1 | 1 |
| 3 | 4 | 6 | 6 |
| 2 | 5 | 6 | 6 |
| 1 | 18 | 6 | 6 |
| 0 | 17 | 18 | 18 |

## Complexity Analysis
- Time: O(n) – single pass.
- Space: O(1) – in‑place modification.

## Follow‑Up Questions
1. How would you modify the algorithm to return a new array instead of modifying in place?
2. Can this be extended to a circular array where the right side wraps around?
3. What if we needed the second‑largest element to the right?

## Key Takeaway
Scanning from right to left lets you maintain the maximum seen so far, enabling an O(n) in‑place solution.
