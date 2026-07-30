# 3556. Sum of Largest Prime Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-largest-prime-substrings](https://leetcode.com/problems/sum-of-largest-prime-substrings)
**Companies:** Netcracker Technology

---

## Problem Description
Given a string `s` consisting of digits, consider every contiguous substring of `s`. For each substring, interpret it as a decimal integer (leading zeros are allowed). Find the **largest prime number** that appears among all these integer values. Return the sum of all occurrences of this largest prime substring in the original string. If no prime substring exists, return `0`.

## Examples
**Example 1**
```
Input: s = "11373"
Output: 5
Explanation: Prime substrings are 11, 13, 37, 73, 113, 137, 373. The largest prime is 373, which occurs once. Sum = 3+7+3 = 13? Actually we sum the digits of the substring? The problem asks for sum of the substring's numeric value occurrences, so answer is 373.
```
**Example 2**
```
Input: s = "102030"
Output: 0
Explanation: No prime substrings exist.
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
