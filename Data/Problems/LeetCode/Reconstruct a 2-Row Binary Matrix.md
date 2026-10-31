# 1253. Reconstruct a 2-Row Binary Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix](https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix)
**Companies:** Grab

---

## Problem Description
Given the following details of a matrix with `n` columns and `2` rows :

- The matrix is a binary matrix, which means each element in the matrix can be `0` or `1`.
- The sum of elements of the 0-th(upper) row is given as `upper`.
- The sum of elements of the 1-st(lower) row is given as `lower`.
- The sum of elements in the i-th column(0-indexed) is `colsum[i]`, where `colsum` is given as an integer array with length `n`.

Your task is to reconstruct the matrix with `upper`, `lower` and `colsum`.

Return it as a 2-D integer array.

If there are more than one valid solution, any of them will be accepted.

If no valid solution exists, return an empty 2-D array.

**Constraints:**

- `1 <= colsum.length <= 10⁵`
- `0 <= upper, lower <= colsum.length`
- `0 <= colsum[i] <= 2`

## Examples

```
Example 1:
  Input: upper = 2, lower = 1, colsum = [1,1,1]
  Output: [[1,1,0],[0,0,1]]
  Explanation: [[1,0,1],[0,1,0]], and [[0,1,1],[1,0,0]] are also correct answers.
```

```
Example 2:
  Input: upper = 2, lower = 3, colsum = [2,2,1,1]
  Output: []
```

```
Example 3:
  Input: upper = 5, lower = 5, colsum = [2,1,2,0,1,0,1,2,0,1]
  Output: [[1,1,1,0,1,0,0,1,0,0],[1,0,1,0,0,0,1,1,0,1]]
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

## Follow-Up Questions
1. How would you modify the algorithm to return all possible matrices instead of just one?
2. What changes are needed if the matrix can have more than two rows?
3. Can the solution be adapted for a streaming `colsum` where the array is not fully known in advance?

## Key Takeaway
Greedy placement based on column sums and remaining row capacities yields a valid reconstruction or correctly detects impossibility.
