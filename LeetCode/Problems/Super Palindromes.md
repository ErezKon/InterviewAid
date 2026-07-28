# 906. Super Palindromes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-palindromes](https://leetcode.com/problems/super-palindromes)
**Companies:** Google

---

## Problem Description
A **super palindrome** is a number that is a palindrome in both its decimal representation and its binary representation. Given two integers `left` and `right` (0 ≤ left ≤ right ≤ 10^18), return the count of super palindromes in the inclusive range `[left, right]`.

## Examples
**Example 1:**
```
Input: left = 4, right = 1000
Output: 4
Explanation: The super palindromes are 4 (100), 9 (1001), 121 (1111001), 484 (111100100).
```

**Example 2:**
```
Input: left = 1, right = 2
Output: 1
Explanation: Only 1 (1) is a super palindrome.
```

## Approach
Generate palindromic numbers up to √right (since squaring a palindrome yields a candidate). For each palindrome `p`, compute `sq = p * p`. If `sq` lies in `[left, right]` and `sq` is a palindrome in decimal and binary, count it.

```text
FUNCTION isPalindromeString(s):
    RETURN s = REVERSE(s)

FUNCTION isBinaryPalindrome(num):
    SET binStr ← BINARY_STRING(num) // e.g., "10101"
    RETURN isPalindromeString(binStr)

FUNCTION generatePalindromes(limit):
    SET result ← empty list
    SET maxLen ← LENGTH(STRING(limit))
    FOR length ← 1 TO maxLen:
        // odd length
        FOR half ← 10^(length-1) TO 10^length - 1:
            SET s ← STRING(half)
            SET palStr ← s + REVERSE(s[0:-1])
            SET pal ← INTEGER(palStr)
            IF pal > limit: BREAK
            APPEND pal TO result
        // even length
        FOR half ← 10^(length-1) TO 10^length - 1:
            SET s ← STRING(half)
            SET palStr ← s + REVERSE(s)
            SET pal ← INTEGER(palStr)
            IF pal > limit: BREAK
            APPEND pal TO result
    RETURN result

FUNCTION superPalindromesCount(left, right):
    SET limit ← FLOOR(SQRT(right))
    SET pals ← generatePalindromes(limit)
    SET count ← 0
    FOR p IN pals:
        SET sq ← p * p
        IF sq < left OR sq > right: CONTINUE
        IF isPalindromeString(STRING(sq)) AND isBinaryPalindrome(sq):
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For `left = 4, right = 1000`:
1. `limit = floor(sqrt(1000)) = 31` → generate palindromes ≤ 31: 1,2,3,4,5,6,7,8,9,11,22.
2. Square each and test binary/decimal palindrome:
   - 2^2=4 (binary 100) → both palindromes → count.
   - 3^2=9 (1001) → count.
   - 11^2=121 (1111001) → count.
   - 22^2=484 (111100100) → count.
Total = 4.

## Complexity Analysis
- **Time:** O(√right) for generating palindromes up to sqrt(right); each candidate is checked in O(d) where d is number of digits/bits.
- **Space:** O(√right) for storing generated palindromes (can be streamed to reduce).

## Follow-Up Questions
1. How would you adapt the algorithm to count super palindromes in a base other than 10?
2. Can you improve space usage by generating palindromes on the fly without storing them all?
3. What is the impact on performance if `right` approaches 10^18?

## Key Takeaway
Generating palindromes up to the square‑root bound and testing both decimal and binary palindromicity yields an efficient solution for counting super palindromes.
