# 866. Prime Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prime-palindrome](https://leetcode.com/problems/prime-palindrome)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an integer `n` (1 ≤ n ≤ 10⁸), find the smallest prime number that is also a palindrome and is greater than or equal to `n`.

## Examples
**Example 1:**
```
Input: n = 6
Output: 7
Explanation: 7 is the first prime palindrome ≥ 6.
```
**Example 2:**
```
Input: n = 8
Output: 11
Explanation: 11 is the smallest prime palindrome ≥ 8.
```
**Example 3:**
```
Input: n = 9989900
Output: 100030001
Explanation: The next prime palindrome after 9,989,900 is 100,030,001.
```

## Approach
All even‑length palindromes (except 11) are divisible by 11, so only odd‑length palindromes need to be generated.
1. If `n ≤ 2` return 2; if `n ≤ 11` iterate from `n` to 11 and test.
2. For lengths `1, 3, 5, 7, 9` (sufficient for `n ≤ 10⁸`):
   - Generate the first half of the palindrome, mirror it to form an odd‑length palindrome.
   - If the palindrome ≥ `n` and `isPrime(palindrome)`, return it.
3. If none found, the answer is 100030001 (the first 9‑digit prime palindrome).

### Pseudocode
```text
FUNCTION primePalindrome(n):
    IF n ≤ 2: RETURN 2
    IF n ≤ 11:
        FOR x ← n TO 11:
            IF isPrime(x) AND isPalindrome(x):
                RETURN x
    FOR length IN [1, 3, 5, 7, 9]:
        SET halfLen ← (length + 1) / 2
        SET start ← 10^(halfLen-1)
        SET end ← 10^halfLen - 1
        FOR half ← start TO end:
            SET pal ← buildOddPalindrome(half)
            IF pal ≥ n AND isPrime(pal):
                RETURN pal
    RETURN 100030001

FUNCTION buildOddPalindrome(half):
    SET s ← STRING(half)
    SET rev ← REVERSE(s[0:-1])   // drop last char to keep odd length
    RETURN INTEGER(s + rev)

FUNCTION isPrime(x):
    IF x < 2: RETURN FALSE
    IF x MOD 2 = 0: RETURN x = 2
    FOR i ← 3 TO sqrt(x) STEP 2:
        IF x MOD i = 0: RETURN FALSE
    RETURN TRUE

FUNCTION isPalindrome(x):
    SET s ← STRING(x)
    RETURN s = REVERSE(s)
```

## Walkthrough
For `n = 8`:
- `n ≤ 11` branch runs. Check 8 (not prime), 9 (not prime), 10 (not prime), 11 (prime & palindrome) → return 11.
For `n = 130`:
- Length 1 and 3 palindromes generated (e.g., 131, 151, …). The first palindrome ≥130 that is prime is 131 → return 131.

## Complexity Analysis
- Time: Generating at most ~10⁴ palindromes and testing primality up to √pal (≤ 10⁴) → roughly `O(10⁴ * √10⁸)` ≈ `O(10⁶)`, well within limits.
- Space: `O(1)` extra space.

## Follow‑Up Questions
- How would you adapt the algorithm for `n` up to `10¹⁸`?
- Can you pre‑compute all prime palindromes up to a bound and answer queries in `O(1)`?
- What optimizations exist for the primality test (e.g., Miller‑Rabin) for larger numbers?

## Key Takeaway
By generating only odd‑length palindromes and leveraging the fact that even‑length palindromes are non‑prime (except 11), the search space shrinks dramatically, enabling an efficient solution.
