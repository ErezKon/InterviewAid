# 1952. Three Divisors

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/three-divisors](https://leetcode.com/problems/three-divisors)
**Companies:** Google, Microsoft

---

## Problem Description
Given an integer `n`, return `true` *if* `n` *has **exactly three positive divisors**. Otherwise, return* `false`.

An integer `m` is a **divisor** of `n` if there exists an integer `k` such that `n = k * m`.

**Constraints:**
- `1 ≤ n ≤ 10⁴`

## Examples
```
Example 1:
  Input: n = 2
  Output: false
  Explanation: 2 has only two divisors: 1 and 2, so the answer is false.
```
```
Example 2:
  Input: n = 4
  Output: true
  Explanation: 4 has three divisors: 1, 2, and 4.
```

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

## Follow-Up Questions
1. How would you handle multiple queries for different `n` efficiently?
2. Can you pre-compute all numbers ≤ 10⁶ with exactly three divisors?
3. What changes if the input range expands to 64-bit integers?

## Key Takeaway
A number has exactly three divisors precisely when it is the square of a prime, allowing a simple √ check followed by a primality test.