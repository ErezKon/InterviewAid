# 1952. Three Divisors

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/three-divisors](https://leetcode.com/problems/three-divisors)
**Companies:** Google, Microsoft

---

## Problem Description
Given an integer `n` (1 ≤ n ≤ 10⁹), determine whether `n` has exactly three positive divisors. Return `true` if it does, otherwise `false`. A divisor of `n` is a positive integer that divides `n` without remainder.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `4` | `true` | Divisors are {1, 2, 4}. |
| `5` | `false` | Divisors are {1, 5}. |
| `9` | `true` | Divisors are {1, 3, 9} (3 is prime, 3² = 9). |

## Approach
**Mathematical Insight – Perfect Square of a Prime** – A number has exactly three divisors iff it is the square of a prime (`p²`). Thus we need to check whether `n` is a perfect square and whether its square root is prime.

```text
FUNCTION hasThreeDivisors(n):
    SET root ← FLOOR(SQRT(n))
    IF root * root ≠ n:
        RETURN false
    RETURN isPrime(root)

FUNCTION isPrime(x):
    IF x < 2:
        RETURN false
    FOR i ← 2 TO FLOOR(SQRT(x)):
        IF x MOD i = 0:
            RETURN false
    RETURN true
```

## Walkthrough
Take `n = 49`:
1. `root = FLOOR(SQRT(49)) = 7`.
2. `7 * 7 = 49` → perfect square.
3. Check `isPrime(7)`: loop i=2..2, no divisor found → prime.
4. Return `true` (divisors {1,7,49}).

## Complexity Analysis
- **Time:** O(√√n) ≈ O(√n) for the primality test of `root` (since `root ≤ √n`).
- **Space:** O(1).

## Follow‑Up Questions
1. How would you handle multiple queries for different `n` efficiently?
2. Can you pre‑compute all numbers ≤ 10⁶ with exactly three divisors?
3. What changes if the input range expands to 64‑bit integers?

## Key Takeaway
A number has exactly three divisors precisely when it is the square of a prime, allowing a simple √ check followed by a primality test.