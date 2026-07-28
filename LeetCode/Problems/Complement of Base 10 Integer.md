# 1009. Complement of Base 10 Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/complement-of-base-10-integer](https://leetcode.com/problems/complement-of-base-10-integer)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

## Problem Description
Given a non‑negative integer `n`, return its bitwise complement (invert all bits) in base‑10. The complement is defined by flipping each bit of the binary representation of `n` (excluding leading zeros). For `n = 0`, the result is defined as `1`.

## Examples
**Example 1**
```
Input: n = 5
Output: 2
Explanation: 5 in binary is 101; its complement is 010 which is 2.
```
**Example 2**
```
Input: n = 1
Output: 0
Explanation: 1 in binary is 1; complement is 0.
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
1. How would you handle very large integers beyond typical 32‑bit limits?
2. Can you compute the complement without using logarithms or bit‑length functions?
3. How does the solution change if the complement must preserve a fixed word size (e.g., 32‑bit)?

## Key Takeaway
Using a mask of all 1s matching the number’s bit length and XORing flips every bit efficiently.
