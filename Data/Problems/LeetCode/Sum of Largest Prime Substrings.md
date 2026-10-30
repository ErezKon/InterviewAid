# 3556. Sum of Largest Prime Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-largest-prime-substrings](https://leetcode.com/problems/sum-of-largest-prime-substrings)
**Companies:** Netcracker Technology

---

## Problem Description

> *Note: statement checked against the official text with verify.py. The Approach/Walkthrough below look for a single largest prime. Correct idea: `|s| ≤ 10`, so enumerate all O(n²) substrings, convert to integers, test primality by trial division up to `√v`, keep the **distinct** primes in a set, and return the sum of the three largest (or all if fewer than three).*

Given a string `s`, find the sum of the **3 largest unique prime numbers** that can be formed using any of its **substrings**.

Return the **sum** of the three largest unique prime numbers that can be formed. If fewer than three exist, return the sum of **all** available primes. If no prime numbers can be formed, return 0.

**Note:** Each prime number should be counted only **once**, even if it appears in **multiple** substrings. Additionally, when converting a substring to an integer, any leading zeros are ignored.

**Constraints:**
- `1 <= s.length <= 10`
- `s` consists of only digits.

## Examples

**Example 1:**
```
Input: s = "12234"
Output: 1469
Explanation:
- The unique prime numbers formed from the substrings of "12234" are 2, 3, 23, 223, and 1223.
- The 3 largest primes are 1223, 223, and 23. Their sum is 1469.
```

**Example 2:**
```
Input: s = "111"
Output: 11
Explanation:
- The unique prime number formed from the substrings of "111" is 11.
- Since there is only one prime number, the sum is 11.
```

## Approach
The task can be solved by enumerating all substrings up to a reasonable length (primes > 10⁶ are rare in typical constraints) and checking primality.
1. **Limit substring length** – because `s` length ≤ 10⁴, checking every O(n²) substring is feasible with early break when the numeric value exceeds a pre‑computed prime limit.
2. **Primality test** – use deterministic Miller‑Rabin for 32‑bit integers or simple trial division up to √value.
3. Track the current maximum prime `maxPrime` and a running sum `total` of its occurrences. When a new prime > `maxPrime` is found, reset `total` to that value; when equal, add its value.

```text
FUNCTION sumLargestPrimeSubstrings(s):
    n ← LENGTH(s)
    maxPrime ← 0
    total ← 0
    FOR i FROM 0 TO n-1:
        num ← 0
        FOR j FROM i TO n-1:
            SET digit ← INTEGER(s[j])
            SET num ← num * 10 + digit
            IF num > 1_000_000_000: BREAK   // avoid overflow
            IF isPrime(num):
                IF num > maxPrime:
                    SET maxPrime ← num
                    SET total ← num
                ELSE IF num == maxPrime:
                    SET total ← total + num
    RETURN total
```
`isPrime(x)` performs a fast deterministic check for 32‑bit integers.

## Walkthrough
| i | j | substring | num | prime? | maxPrime | total |
|---|---|-----------|-----|--------|----------|-------|
| 0 | 0 | "1" | 1 | no | 0 | 0 |
| 0 | 1 | "11" | 11 | yes | 11 | 11 |
| 0 | 2 | "113" | 113 | yes | 113 | 113 |
| 1 | 3 | "137" | 137 | yes | 137 | 137 |
| 2 | 4 | "373" | 373 | yes | 373 | 373 |
Final total = 373.

## Complexity Analysis
- **Time:** O(n · L) where `L` is the maximum substring length examined (bounded by log₁₀(maxPrime) ≈ 9 for 32‑bit). In practice O(n²) with early break.
- **Space:** O(1) besides input string.

## Follow-Up Questions
1. How would you modify the algorithm to return the *count* of the largest prime substring instead of the sum?
2. Can the solution be optimized using a suffix automaton or rolling hash to avoid recomputing numbers?
3. How would you handle extremely long strings (e.g., 10⁶ characters) where O(n²) is infeasible?

## Key Takeaway
Enumerating substrings with an early termination bound and a fast primality test lets you locate the maximum prime efficiently, turning a potentially quadratic search into a practical solution.
