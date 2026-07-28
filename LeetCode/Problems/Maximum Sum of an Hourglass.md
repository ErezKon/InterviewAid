# 2428. Maximum Sum of an Hourglass

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-an-hourglass](https://leetcode.com/problems/maximum-sum-of-an-hourglass)
**Companies:** Nutanix

---

## Problem Description
Given an `m x n` integer matrix, an *hourglass* is a subset of values with indices forming the shape:
```
(a b c)
  d
(e f g)
```
Calculate the maximum sum of all hourglasses in the matrix. If the matrix is smaller than `3 x 3`, the answer is `0`.

## Examples
**Example 1**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: 35
Explanation: The only hourglass sum is 1+2+3+5+7+8+9 = 35.
```
**Example 2**
```
Input: matrix = [[-9,-9,-9,1,1,1],
                 [-9,-9,-9,1,1,1],
                 [-9,-9,-9,1,1,1],
                 [0,0,0,0,0,0],
                 [0,0,0,0,0,0]]
Output: 7
Explanation: The hourglass with maximum sum is formed by the right‑most 3x3 block.
```

## Approach
The hourglass shape has a fixed size of `3 x 3`. We can slide a window across the matrix, compute each hourglass sum using a constant‑time formula, and keep the maximum.

1. **Prefix‑Sum Grid** – Build a prefix sum matrix `P` where `P[i][j]` stores the sum of the sub‑matrix `(0,0)` to `(i‑1,j‑1)`. This allows O(1) retrieval of any rectangular sum.
2. **Hourglass Sum** – For each top‑left corner `(i,j)` where `i ≤ m‑3` and `j ≤ n‑3`, compute the sum of the three rows using the prefix sums and add the middle element.
3. Track the maximum value while iterating.

## Pseudocode
```text
FUNCTION maxHourglassSum(matrix):
    m ← ROW_COUNT(matrix)
    n ← COL_COUNT(matrix)
    IF m < 3 OR n < 3:
        RETURN 0
    // Build prefix sum matrix P of size (m+1) x (n+1)
    SET P ← 2D ARRAY (m+1) x (n+1) FILLED WITH 0
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            SET P[i][j] ← matrix[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]
    SET maxSum ← -∞
    FOR i ← 0 TO m-3:
        FOR j ← 0 TO n-3:
            // Sum of top row
            SET top ← P[i+1][j+3] - P[i+1][j]
            // Sum of middle element
            SET mid ← matrix[i+1][j+1]
            // Sum of bottom row
            SET bottom ← P[i+3][j+3] - P[i+3][j]
            SET hourglass ← top + mid + bottom
            IF hourglass > maxSum:
                SET maxSum ← hourglass
    RETURN maxSum
```

## Walkthrough
Consider the matrix from Example 2. After building `P`, the algorithm examines each possible top‑left corner. For corner `(0,3)`, the top row sum is `1+1+1 = 3`, middle element is `1`, bottom row sum is `1+1+1 = 3`; hourglass sum = `7`, which becomes the current maximum.

## Complexity Analysis
- **Time:** O(m·n) to build the prefix sum matrix plus O((m‑2)·(n‑2)) to evaluate hourglasses → O(m·n).
- **Space:** O(m·n) for the prefix sum matrix.

## Follow‑Up Questions
1. How would you modify the solution if the hourglass shape could be any `k x k` pattern?
2. Can you solve the problem in O(1) extra space by updating the matrix in‑place?
3. How would you extend this to find the top‑`k` hourglass sums?

## Key Takeaway
Using a prefix‑sum grid turns the fixed‑size hourglass sum computation into constant‑time per position, enabling an overall linear‑time solution.
