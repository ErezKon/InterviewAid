# 1253. Reconstruct a 2-Row Binary Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix](https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix)
**Companies:** Grab

---

## Problem Description
You are given an integer array `colsum` where `colsum[i]` is the sum of the two elements in the `i`‑th column of a 2‑row binary matrix. You are also given an integer `upper` representing the sum of the first row and `lower` representing the sum of the second row. Return any valid 2‑row binary matrix that matches these sums, or an empty array if none exists.

## Examples
**Example 1:**
```
Input: upper = 2, lower = 1, colsum = [1,1,1]
Output: [[1,1,0],[0,0,1]]
Explanation: The first row sums to 2, the second row sums to 1, and each column sums to the given colsum.
```
**Example 2:**
```
Input: upper = 2, lower = 3, colsum = [2,2,1,3]
Output: []
Explanation: No matrix can satisfy the constraints.
```

## Approach
The problem can be solved greedily. For each column:
- If `colsum[i] == 2`, both rows must have a `1` (decrement both `upper` and `lower`).
- If `colsum[i] == 0`, both rows get `0`.
- If `colsum[i] == 1`, we decide which row gets the `1` based on the remaining `upper` and `lower` counts, preferring the row with the larger remaining sum.
If at any point `upper` or `lower` becomes negative, the configuration is impossible.

## Pseudocode
```text
FUNCTION reconstructMatrix(upper, lower, colsum):
    SET n ← LENGTH(colsum)
    CREATE list rowUpper ← ARRAY of n zeros
    CREATE list rowLower ← ARRAY of n zeros
    FOR i ← 0 TO n-1:
        IF colsum[i] == 2:
            IF upper == 0 OR lower == 0:
                RETURN []
            SET rowUpper[i] ← 1
            SET rowLower[i] ← 1
            SET upper ← upper - 1
            SET lower ← lower - 1
        ELSE IF colsum[i] == 1:
            IF upper >= lower AND upper > 0:
                SET rowUpper[i] ← 1
                SET upper ← upper - 1
            ELSE IF lower > 0:
                SET rowLower[i] ← 1
                SET lower ← lower - 1
            ELSE:
                RETURN []
        // colsum[i] == 0 → both stay 0
    IF upper == 0 AND lower == 0:
        RETURN [rowUpper, rowLower]
    ELSE:
        RETURN []
```

## Walkthrough
Consider `upper = 2, lower = 1, colsum = [1,1,1]`.
1. i=0, colsum=1, upper>=lower → place 1 in upper row, upper→1.
2. i=1, colsum=1, upper>=lower → place 1 in upper row, upper→0.
3. i=2, colsum=1, upper<lower → place 1 in lower row, lower→0.
Result matrix matches the example.

## Complexity Analysis
- **Time:** O(n) where n is the length of `colsum`.
- **Space:** O(n) for the two output rows.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible matrices instead of just one?
2. What changes are needed if the matrix can have more than two rows?
3. Can the solution be adapted for a streaming `colsum` where the array is not fully known in advance?

## Key Takeaway
Greedy placement based on column sums and remaining row capacities yields a valid reconstruction or correctly detects impossibility.
