# 906. Super Palindromes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/super-palindromes](https://leetcode.com/problems/super-palindromes)
**Companies:** Google

---

## Problem Description

Let's say a positive integer is a **super-palindrome** if it is a palindrome, and it is also the square of a palindrome.

Given two positive integers `left` and `right` represented as strings, return *the number of **super-palindromes** integers in the inclusive range* `[left, right]`.

**Constraints:**
- `1 <= left.length, right.length <= 18`
- `left` and `right` consist of only digits.
- `left` and `right` cannot have leading zeros.
- `left` and `right` represent integers in the range `[1, 10^18 - 1]`.
- `left` is less than or equal to `right`.

## Examples

**Example 1:**
```
Input: left = "4", right = "1000"
Output: 4
Explanation: 4, 9, 121, and 484 are superpalindromes.
Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a palindrome.
```

**Example 2:**
```
Input: left = "1", right = "2"
Output: 1
```

## Approach
A super-palindrome is `p²` where `p` is a palindrome and `p²` is also a palindrome. Since `right < 10^18`, `p < 10^9`, so `p` has at most 9 digits and is fully determined by its first half (at most 5 digits). Enumerate every half `h` from 1 to 99999, build both the odd-length palindrome (`h` + reverse of `h` without its last digit) and the even-length palindrome (`h` + reverse of `h`), square it, and count it if the square lies in `[left, right]` and reads the same backwards in decimal.

```text
FUNCTION isPalindromeString(s):
    RETURN s = REVERSE(s)

FUNCTION superpalindromesInRange(left, right):
    SET L ← INTEGER(left)
    SET R ← INTEGER(right)
    SET count ← 0
    FOR half ← 1 TO 99999:
        SET s ← STRING(half)
        FOR palStr IN [s + REVERSE(s[0:-1]), s + REVERSE(s)]:   // odd, even length
            SET p ← INTEGER(palStr)
            SET sq ← p * p
            IF sq >= L AND sq <= R AND isPalindromeString(STRING(sq)):
                SET count ← count + 1
    RETURN count
```

## Walkthrough
For `left = "4", right = "1000"`: only `p <= floor(sqrt(1000)) = 31` can matter. The palindromes generated in that range are 1..9 (odd, from halves 1..9), 11 and 22 (even, from halves 1 and 2).

| p | p² | in [4, 1000]? | p² palindrome? | count |
|---|---|---|---|---|
| 1 | 1 | no | - | 0 |
| 2 | 4 | yes | yes | 1 |
| 3 | 9 | yes | yes | 2 |
| 4 | 16 | yes | no | 2 |
| 5..9 | 25, 36, 49, 64, 81 | yes | no | 2 |
| 11 | 121 | yes | yes | 3 |
| 22 | 484 | yes | yes | 4 |

Every other generated palindrome (33, 101, ...) squares to more than 1000. Result: `4`, matching the expected output (676 = 26² is never produced because 26 is not a palindrome).

## Complexity Analysis
- **Time:** O(W · d) where W = 10^5 halves (2 · 10^5 candidates) and d <= 18 digits for the palindrome check - effectively constant, about 4 · 10^6 character operations.
- **Space:** O(d) for the temporary strings.

## Follow-Up Questions
1. How would you adapt the algorithm to count super-palindromes in a base other than 10?
2. Can you prune the search further (e.g. it is known that the digits of `p` must be small - mostly 0, 1, 2 - for `p²` to be a palindrome)?
3. How would you handle a range bound up to 10^36, where `p` has up to 18 digits?

## Key Takeaway
Do not scan the range - enumerate the much smaller set of palindromic roots by generating them from their first half, square each one, and check the square with a simple string reversal.
