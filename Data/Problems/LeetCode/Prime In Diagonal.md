# 2614. Prime In Diagonal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-in-diagonal](https://leetcode.com/problems/prime-in-diagonal)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve a different problem (checking that all primes lie on the main diagonal). Correct idea: scan both diagonals — `nums[i][i]` and `nums[i][n-1-i]` — and return the largest value that is prime (trial division up to `√v`), or `0`. O(n·√V).*

You are given a 0-indexed two-dimensional integer array `nums`.

Return *the largest **prime** number that lies on at least one of the **diagonals** of* `nums`. In case, no prime is present on any of the diagonals, return *0.*

Note that:

- An integer is **prime** if it is greater than `1` and has no positive integer divisors other than `1` and itself.
- An integer `val` is on one of the **diagonals** of `nums` if there exists an integer `i` for which `nums[i][i] = val` or an `i` for which `nums[i][nums.length - i - 1] = val`.

For example, in `nums = [[1,2,3],[5,6,7],[9,10,11]]` the diagonals are `[1,6,11]` and `[3,6,9]`.

**Constraints:**
- `1 <= nums.length <= 300`
- `nums.length == nums_i.length`
- `1 <= nums[i][j] <= 4*10^6`

## Examples

**Example 1:**
```
Input: nums = [[1,2,3],[5,6,7],[9,10,11]]
Output: 11
Explanation: The numbers 1, 3, 6, 9, and 11 are the only numbers present on at least one of the diagonals. Since 11 is the largest prime, we return 11.
```

**Example 2:**
```
Input: nums = [[1,2,3],[5,17,7],[9,11,10]]
Output: 17
Explanation: The numbers 1, 3, 9, 10, and 17 are all present on at least one of the diagonals. 17 is the largest prime, so we return 17.
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
