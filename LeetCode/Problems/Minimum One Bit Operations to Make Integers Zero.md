# 1611. Minimum One Bit Operations to Make Integers Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero](https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero)
**Companies:** Bloomberg, Expedia, Google, Oracle, Servicenow

---

## Problem Description
Given a non‑negative integer `n`, you can perform the following operation any number of times: flip the least significant bit of `n` (i.e., toggle the rightmost bit). The operation count needed to reduce `n` to zero follows a Gray‑code pattern. Compute the minimum number of operations required.

## Examples
**Example 1**
```
Input: n = 3
Output: 2
Explanation: 3 (11) → 2 (10) → 0 (00).
```
**Example 2**
```
Input: n = 6
Output: 4
Explanation: 6 (110) → 7 (111) → 5 (101) → 4 (100) → 0 (000).
```

## Approach
Use the **inverse Gray code** property. The number of operations equals the integer obtained by XOR‑ing `n` with all its right‑shifted versions.

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
Time: O(log n) – loop runs for each bit.
Space: O(1) – constant extra variables.

## Follow‑Up Questions
* How would the solution adapt if flipping the most significant bit were allowed?
* Can we extend the method to compute the sequence of intermediate numbers?
* What is the relationship between this problem and binary reflected Gray codes?

## Key Takeaway
The minimum operations correspond to the inverse Gray code of `n`, obtainable by XOR‑ing `n` with all its right‑shifted copies.
