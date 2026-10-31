# 3556. Sum of Largest Prime Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-largest-prime-substrings](https://leetcode.com/problems/sum-of-largest-prime-substrings)
**Companies:** Netcracker Technology

---

## Problem Description

> *Note: statement checked against the official text with verify.py.*

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
Since `|s| ≤ 10`, there are at most 55 substrings, and every substring value is below 10^10. So brute-force enumeration is cheap:
1. **Enumerate substrings** – for each start `i`, extend the end `j` and build the value incrementally (`num = num·10 + digit`). Leading zeros are naturally ignored by the numeric conversion.
2. **Primality test** – trial division up to `√num` (at most 10^5 iterations per value).
3. **Deduplicate** – store primes in a set, because each prime counts once even if it appears in several substrings.
4. **Answer** – sort the distinct primes in descending order and sum the first three (or all of them if fewer; 0 if none).

```text
FUNCTION sumOfLargestPrimes(s)
    n ← length(s)
    primes ← empty set
    FOR i ← 0 TO n-1
        num ← 0
        FOR j ← i TO n-1
            num ← num * 10 + digit(s[j])
            IF isPrime(num)
                ADD num TO primes
    sorted ← primes sorted in descending order
    RETURN sum of the first min(3, |sorted|) elements of sorted

FUNCTION isPrime(v)
    IF v < 2 RETURN false
    d ← 2
    WHILE d * d ≤ v
        IF v MOD d = 0 RETURN false
        d ← d + 1
    RETURN true
```

## Walkthrough
Example 1: `s = "12234"`.

| i | substrings (num) | primes found |
|---|------------------|--------------|
| 0 | 1, 12, 122, 1223, 12234 | 1223 |
| 1 | 2, 22, 223, 2234 | 2, 223 |
| 2 | 2, 23, 234 | 2 (duplicate), 23 |
| 3 | 3, 34 | 3 |
| 4 | 4 | — |

Distinct primes = {1223, 223, 23, 3, 2}. Three largest: 1223 + 223 + 23 = **1469**.

## Complexity Analysis
- **Time:** O(n² · √V) where V < 10^10 is the largest substring value — at most 55 · 10^5 ≈ 5.5·10^6 divisions.
- **Space:** O(n²) for the set of distinct primes (at most 55 entries).

## Follow-Up Questions
1. How would you return the k largest distinct primes instead of 3? (Keep a min-heap of size k or sort the set.)
2. What if `s` could be much longer (values far beyond 64 bits)? (Use deterministic Miller-Rabin on big integers, and restrict attention to the longest substrings first since they produce the largest values.)
3. How would you speed up repeated primality tests? (Sieve small primes once and trial-divide only by primes up to 10^5.)

## Key Takeaway
Tiny input bounds make exhaustive substring enumeration optimal; the key details are building numbers incrementally, deduplicating with a set, and handling the "fewer than three primes" case.
