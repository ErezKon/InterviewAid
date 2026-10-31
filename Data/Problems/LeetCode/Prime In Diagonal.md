# 2614. Prime In Diagonal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-in-diagonal](https://leetcode.com/problems/prime-in-diagonal)
**Companies:** Google

---

## Problem Description

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
Only the `2n` cells on the two diagonals matter: `nums[i][i]` and `nums[i][n-1-i]`. Scan them, test each value for primality with trial division up to `√v`, and keep the largest prime seen (start from `0`). Skipping values not larger than the current best avoids unnecessary prime checks.

### Pseudocode
```text
FUNCTION diagonalPrime(nums):
    n ← nums.length
    best ← 0
    FOR i ← 0 TO n - 1:
        FOR v IN [nums[i][i], nums[i][n - 1 - i]]:
            IF v > best AND isPrime(v):
                best ← v
    RETURN best

FUNCTION isPrime(x):
    IF x < 2: RETURN FALSE
    FOR d ← 2 WHILE d * d ≤ x:
        IF x MOD d = 0: RETURN FALSE
    RETURN TRUE
```

## Walkthrough
Example 2: `nums = [[1,2,3],[5,17,7],[9,11,10]]`, `n = 3`.
- i=0: `nums[0][0] = 1` (not prime), `nums[0][2] = 3` → prime, best = 3.
- i=1: `nums[1][1] = 17` → prime, best = 17; `nums[1][1] = 17` again, not > best.
- i=2: `nums[2][2] = 10` (not > 17, skipped), `nums[2][0] = 9` (skipped).

Return `17`.

## Complexity Analysis
- Time: `O(n * √m)` where `m` is the maximum element value - `2n` diagonal cells, each with an `O(√m)` prime check.
- Space: `O(1)` additional space.

## Follow-Up Questions
- When would a Sieve of Eratosthenes up to `4*10^6` be preferable to trial division, and what is its memory cost?
- How would you use Miller-Rabin if values could be up to `10^18`?
- How would you return the largest prime on any row, column, or diagonal of the matrix?

## Key Takeaway
Restrict the search to the `2n` diagonal cells and apply a `√v` primality test; only check candidates that could improve the current answer.
