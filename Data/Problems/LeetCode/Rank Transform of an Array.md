# 1331. Rank Transform of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rank-transform-of-an-array](https://leetcode.com/problems/rank-transform-of-an-array)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `arr`, replace each element with its rank among the distinct values of the array. The smallest distinct value gets rank 1, the next smallest rank 2, and so on. Preserve the original order of elements.

## Examples
- Input: `[40,10,20,30]` → Distinct sorted `[10,20,30,40]` → Output `[4,1,2,3]`.
- Input: `[100,100,100]` → Distinct sorted `[100]` → Output `[1,1,1]`.

## Approach
Create a sorted list of the unique values, assign incremental ranks using a dictionary, then map each original element to its rank.

```text
FUNCTION arrayRankTransform(arr):
    // Unique sorted values
    SET uniqueVals ← SORTED(SET(arr))
    // Assign ranks
    SET rankMap ← DICTIONARY()
    SET r ← 1
    FOR val IN uniqueVals:
        SET rankMap[val] ← r
        SET r ← r + 1
    END FOR
    // Transform original array
    SET result ← []
    FOR v IN arr:
        APPEND rankMap[v] TO result
    END FOR
    RETURN result
END FUNCTION
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
|1|Unique values of `[40,10,20,30]`|`[10,20,30,40]`|
|2|Assign ranks → `{10:1,20:2,30:3,40:4}`|
|3|Map original elements|`[4,1,2,3]`|

## Complexity Analysis
- Time: O(n log n) for sorting the unique values.
- Space: O(n) for the rank map and output array.

## Follow‑Up Questions
1. How would you handle the transformation if the array is streamed and cannot be stored entirely?
2. Can you compute ranks in O(n) time using counting sort when the value range is limited?
3. Extend the problem to rank 2‑D matrices row‑wise and column‑wise.

## Key Takeaway
Sorting the distinct elements and assigning incremental ranks provides a simple O(n log n) solution to map each array entry to its rank.
