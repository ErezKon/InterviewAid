# 1611. Minimum One Bit Operations to Make Integers Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero](https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero)
**Companies:** Bloomberg, Expedia, Google, Oracle, Servicenow

---

## Problem Description

Given an integer `n`, you must transform it into `0` using the following operations any number of times:

- Change the rightmost (`0^th`) bit in the binary representation of `n`.
- Change the `i^th` bit in the binary representation of `n` if the `(i-1)^th` bit is set to `1` and the `(i-2)^th` through `0^th` bits are set to `0`.

Return *the minimum number of operations to transform *`n`* into *`0`*.*

**Constraints:**
- `0 <= n <= 10^9`

## Examples

**Example 1:**
```
Input: n = 3
Output: 2
Explanation: The binary representation of 3 is "11".
"11" -> "01" with the 2^nd operation since the 0^th bit is 1.
"01" -> "00" with the 1^st operation.
```

**Example 2:**
```
Input: n = 6
Output: 4
Explanation: The binary representation of 6 is "110".
"110" -> "010" with the 2^nd operation since the 1^st bit is 1 and 0^th through 0^th bits are 0.
"010" -> "011" with the 1^st operation.
"011" -> "001" with the 2^nd operation since the 0^th bit is 1.
"001" -> "000" with the 1^st operation.
```

## Approach
Use the **inverse Gray code** property. The number of operations equals the integer obtained by XOR-ing `n` with all its right-shifted versions.

```text
FUNCTION minimumOneBitOperations(n):
    SET result ← 0
    WHILE n > 0:
        SET result ← result XOR n
        SET n ← n >> 1
    RETURN result
```

## Walkthrough
| n (binary) | result after iteration | n after shift |
|------------|-----------------------|--------------|
| 110 (6)    | 110 XOR 0 = 110       | 011 (3)      |
| 011 (3)    | 110 XOR 011 = 101     | 001 (1)      |
| 001 (1)    | 101 XOR 001 = 100     | 000 (0)      |
| 000 (0)    | return 100 (4)        |
The final `result` is the minimum operation count.

## Complexity Analysis
Time: O(log n) – loop runs for each bit.
Space: O(1) – constant extra variables.

## Follow-Up Questions
* How would the solution adapt if flipping the most significant bit were allowed?
* Can we extend the method to compute the sequence of intermediate numbers?
* What is the relationship between this problem and binary reflected Gray codes?

## Key Takeaway
The minimum operations correspond to the inverse Gray code of `n`, obtainable by XOR-ing `n` with all its right-shifted copies.
