# 866. Prime Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prime-palindrome](https://leetcode.com/problems/prime-palindrome)
**Companies:** Amazon, Google, Meta

---

```
FUNCTION primePalindrome(n):
    // All even-length palindromes (except 11) are divisible by 11
    FUNCTION isPrime(x):
        IF x < 2: RETURN false
        FOR i ← 2 TO sqrt(x): IF x % i == 0: RETURN false
        RETURN true

    // Generate odd-length palindromes
    FOR length IN [1, 3, 5, 7, 9]:
        FOR half: build palindrome, check >= n and isPrime
    // Also check 11

    IF n <= 2: RETURN 2
    IF n <= 11: iterate and check
    // Generate palindromes and test primality
```
