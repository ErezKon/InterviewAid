# 1175. Prime Arrangements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-arrangements](https://leetcode.com/problems/prime-arrangements)
**Companies:** Amazon

---

## Problem Description

Return the number of permutations of 1 to `n` so that prime numbers are at prime indices (1-indexed.)

*(Recall that an integer is prime if and only if it is greater than 1, and cannot be written as a product of two positive integers both smaller than it.)*

Since the answer may be large, return the answer **modulo `10^9 + 7`**.

**Constraints:**
- `1 <= n <= 100`

## Examples

**Example 1:**
```
Input: n = 5
Output: 12
Explanation: For example [1,2,5,4,3] is a valid permutation, but [5,2,3,4,1] is not because the prime number 5 is at index 1.
```

**Example 2:**
```
Input: n = 100
Output: 682289015
```

## Approach
The problem reduces to counting permutations of primes among prime positions and non‑primes among non‑prime positions.
1. Count `p` = number of primes ≤ n.
2. Count `np` = n - p (non‑primes).
3. Answer = `p! * np!` modulo `10^9+7`.

### Pseudocode
```text
FUNCTION primeArrangements(n):
    SET MOD ← 1_000_000_007
    SET p ← countPrimes(n)
    SET np ← n - p
    SET factP ← factorial(p) MOD MOD
    SET factNP ← factorial(np) MOD MOD
    RETURN (factP * factNP) MOD MOD

FUNCTION countPrimes(limit):
    SET count ← 0
    FOR i ← 2 TO limit:
        IF isPrime(i):
            SET count ← count + 1
    RETURN count

FUNCTION isPrime(x):
    IF x < 2: RETURN FALSE
    FOR i ← 2 TO sqrt(x):
        IF x MOD i = 0: RETURN FALSE
    RETURN TRUE

FUNCTION factorial(k):
    SET result ← 1
    FOR i ← 2 TO k:
        SET result ← (result * i) MOD MOD
    RETURN result
```

## Walkthrough
| Step | n | p (primes ≤ n) | np | factP | factNP | Answer |
|------|---|----------------|----|-------|--------|--------|
| 1    | 5 | 3              | 2  | 6     | 2      | 12 |
| 2    | 1 | 0              | 1  | 1     | 1      | 1 |

## Complexity Analysis
- Time: `O(n √n)` for prime counting (sieve can improve to `O(n log log n)`).
- Space: `O(1)` extra space besides input.

## Follow‑Up Questions
- How would you modify the solution to handle multiple queries of `n` efficiently?
- Can you compute the result for very large `n` (e.g., up to 10^7) within time limits?
- What if the arrangement must also satisfy that the sum of numbers at prime indices is prime?

## Key Takeaway
The count of valid arrangements equals the product of factorials of the number of prime and non‑prime positions, highlighting a simple combinatorial reduction.
