# 2081. Sum of k-Mirror Numbers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-k-mirror-numbers](https://leetcode.com/problems/sum-of-k-mirror-numbers)
**Companies:** Bloomberg, Cisco, Google, Meta, Microsoft

---

## Problem Description

A **k-mirror number** is a **positive** integer **without leading zeros** that reads the same both forward and backward in base-10 **as well as** in base-k.

- For example, `9` is a 2-mirror number. The representation of `9` in base-10 and base-2 are `9` and `1001` respectively, which read the same both forward and backward.
- On the contrary, `4` is not a 2-mirror number. The representation of `4` in base-2 is `100`, which does not read the same both forward and backward.

Given the base `k` and the number `n`, return *the **sum** of the* `n` ***smallest** k-mirror numbers*.

**Constraints:**
- `2 <= k <= 9`
- `1 <= n <= 30`

## Examples

**Example 1:**
```
Input: k = 2, n = 5
Output: 25
Explanation:
The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
  base-10    base-2
    1          1
    3          11
    5          101
    7          111
    9          1001
Their sum = 1 + 3 + 5 + 7 + 9 = 25.
```

**Example 2:**
```
Input: k = 3, n = 7
Output: 499
Explanation:
The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
  base-10    base-3
    1          1
    2          2
    4          11
    8          22
    121        11111
    151        12121
    212        21212
Their sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.
```

**Example 3:**
```
Input: k = 7, n = 17
Output: 20379000
Explanation: The 17 smallest 7-mirror numbers are:
1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596
```

## Approach
Generate base-10 palindromes in increasing order. For each palindrome, convert it to base `k` and check if that representation is also a palindrome. Keep a running total until `n` numbers are collected.

```text
FUNCTION isPalindromeString(s):
    RETURN s = REVERSE(s)

FUNCTION toBase(num, base):
    SET digits ← empty list
    SET x ← num
    WHILE x > 0:
        SET digits.PREPEND(x MOD base)
        SET x ← x DIV base
    RETURN JOIN(digits) AS STRING

FUNCTION generatePalindromes():
    SET length ← 1
    WHILE TRUE:
        // odd length
        FOR half ← 10^(length-1) TO 10^length - 1:
            SET s ← STRING(half)
            SET palindrome ← s + REVERSE(s[0:-1])
            YIELD INTEGER(palindrome)
        // even length
        FOR half ← 10^(length-1) TO 10^length - 1:
            SET s ← STRING(half)
            SET palindrome ← s + REVERSE(s)
            YIELD INTEGER(palindrome)
        SET length ← length + 1

FUNCTION kMirror(k, n):
    SET count ← 0
    SET total ← 0
    FOR num IN generatePalindromes():
        IF isPalindromeString(toBase(num, k)):
            SET total ← total + num
            SET count ← count + 1
            IF count = n:
                BREAK
    RETURN total
```

## Walkthrough
For `k = 2, n = 5`:
1. Generate base-10 palindromes: 1,2,3,4,5,6,7,8,9,11,…
2. Test each in base 2:
   - 1 → "1" (palindrome) → add
   - 2 → "10" (not palindrome)
   - 3 → "11" (palindrome) → add
   - 4 → "100" (not)
   - 5 → "101" (palindrome) → add
   - 6 → "110" (not)
   - 7 → "111" (palindrome) → add
   - 8 → "1000" (not)
   - 9 → "1001" (palindrome) → add (5 numbers reached)
Sum = 25.

## Complexity Analysis
- **Time:** O(L * n) where L is the average length of generated palindromes; each candidate requires conversion to base `k` and a palindrome check, both linear in the number of digits.
- **Space:** O(L) for storing the digit list of a single number.

## Follow-Up Questions
1. How would you modify the algorithm to return the `n`-th k-mirror number instead of the sum?
2. Can you generate palindromes directly in base `k` to avoid conversion?
3. What is the complexity if `k` is very large (e.g., `k = 10^9`)?

## Key Takeaway
Generating base-10 palindromes and filtering them by a palindrome test in another base yields a simple yet effective O(n)-ish solution for k-mirror numbers.
