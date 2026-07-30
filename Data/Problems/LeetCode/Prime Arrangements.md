# 1175. Prime Arrangements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-arrangements](https://leetcode.com/problems/prime-arrangements)
**Companies:** Amazon

---

## Problem Description
Given an integer `n`, you have to arrange the numbers from `1` to `n` such that prime numbers occupy prime indices (1-indexed) and non‑prime numbers occupy non‑prime indices. Return the number of valid arrangements modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: n = 5
Output: 12
Explanation: There are 3 prime numbers (2,3,5) and 2 non‑prime numbers (1,4). The prime indices are 2,3,5. Number of ways = 3! * 2! = 12.
```
**Example 2:**
```
Input: n = 1
Output: 1
Explanation: Only one position which is non‑prime, and the only number 1 is non‑prime.
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
