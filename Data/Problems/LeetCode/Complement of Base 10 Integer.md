# 1009. Complement of Base 10 Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/complement-of-base-10-integer](https://leetcode.com/problems/complement-of-base-10-integer)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

## Problem Description
The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

- For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `n`, return *its complement*.

**Constraints:**
- `0 <= n < 10^9`

**Note:** This question is the same as 476: [https://leetcode.com/problems/number-complement/](https://leetcode.com/problems/number-complement/)

## Examples
```
Example 1:
  Input: n = 5
  Output: 2
  Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.
```
```
Example 2:
  Input: n = 7
  Output: 0
  Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.
```
```
Example 3:
  Input: n = 10
  Output: 5
  Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.
```

## Approach
Create a mask consisting of all 1s with the same bit length as `n`. XOR `n` with the mask to flip every bit.

### Pseudocode
```text
FUNCTION bitwiseComplement(n):
    IF n = 0: RETURN 1
    // Determine number of bits needed for n
    bitLength ← FLOOR(LOG2(n)) + 1
    mask ← (1 << bitLength) - 1  // binary number with bitLength ones
    RETURN n XOR mask
```

## Walkthrough
For `n = 5`:
- `bitLength = 3` (binary 101)
- `mask = (1 << 3) - 1 = 8 - 1 = 7` (binary 111)
- `5 XOR 7 = 2` (binary 010).

## Complexity Analysis
- **Time:** O(1) – constant arithmetic operations.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you handle very large integers beyond typical 32-bit limits?
2. Can you compute the complement without using logarithms or bit-length functions?
3. How does the solution change if the complement must preserve a fixed word size (e.g., 32-bit)?

## Key Takeaway
Using a mask of all 1s matching the number’s bit length and XORing flips every bit efficiently.
