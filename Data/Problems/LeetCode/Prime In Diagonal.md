# 2614. Prime In Diagonal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-in-diagonal](https://leetcode.com/problems/prime-in-diagonal)
**Companies:** Google

---

## Problem Description
Given an `n x n` integer matrix, determine whether every prime number in the matrix appears only on the main diagonal (positions where row index equals column index). Return `true` if the condition holds, otherwise `false`.

## Examples
**Example 1:**
```
Input: matrix = [[2,4,6],[8,3,10],[12,14,5]]
Output: true
Explanation: Primes 2,3,5 are on positions (0,0), (1,1), (2,2).
```
**Example 2:**
```
Input: matrix = [[4,2],[3,6]]
Output: false
Explanation: Prime 2 is off the diagonal at (0,1).
```

## Approach
Iterate through all cells. For each cell, if the value is prime and its row index `i` is not equal to column index `j`, the matrix fails the condition.

### Pseudocode
```text
FUNCTION primeInDiagonal(matrix):
    FOR i ← 0 TO matrix.length - 1:
        FOR j ← 0 TO matrix[i].length - 1:
            IF isPrime(matrix[i][j]) AND i ≠ j:
                RETURN FALSE
    RETURN TRUE

FUNCTION isPrime(x):
    IF x < 2: RETURN FALSE
    FOR d ← 2 TO sqrt(x):
        IF x MOD d = 0: RETURN FALSE
    RETURN TRUE
```

## Walkthrough
Consider the first example matrix `[[2,4,6],[8,3,10],[12,14,5]]`.
- (0,0): 2 is prime, i=j → ok.
- (1,1): 3 is prime, i=j → ok.
- (2,2): 5 is prime, i=j → ok.
All other cells are non‑prime, so the function returns `TRUE`.

## Complexity Analysis
- Time: `O(n² * √m)` where `m` is the maximum element value (prime check).
- Space: `O(1)` additional space.

## Follow‑Up Questions
- How would you optimize the prime check for large matrix values?
- Can the solution be extended to check primes on both main and anti‑diagonals?
- What if the matrix is sparse and stored in a compressed format?

## Key Takeaway
A simple double loop combined with a primality test efficiently verifies that all primes reside on the main diagonal.
