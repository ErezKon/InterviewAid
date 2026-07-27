# 2081. Sum of k-Mirror Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-k-mirror-numbers](https://leetcode.com/problems/sum-of-k-mirror-numbers)
**Companies:** Bloomberg, Cisco, Google, Meta, Microsoft

---

```
// Generate palindromes in base 10 (ascending order)
// For each, check if it's also a palindrome in base k
// Sum first n such numbers

FUNCTION kMirror(k, n):
    total = 0; count = 0; length = 1

    WHILE count < n:
        FOR each palindrome of 'length' digits in base 10:
            IF isPalindrome(palindrome, k):
                total += palindrome
                count += 1
                IF count == n: BREAK
        length += 1

    RETURN total
```
