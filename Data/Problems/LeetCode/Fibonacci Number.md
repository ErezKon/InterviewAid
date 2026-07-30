# 509. Fibonacci Number

**Difficulty:** 🟢 Easy
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/fibonacci-number](https://leetcode.com/problems/fibonacci-number)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Cognizant, Google, Htc, Infosys, Intel, Lti, Meta, Microsoft, Nvidia, Spotify, Tcs, Wix

---

## Problem Description
Compute the `n`‑th Fibonacci number where `F(0) = 0`, `F(1) = 1` and for `n > 1`, `F(n) = F(n‑1) + F(n‑2)`. Return `F(n)` modulo `10^9 + 7` if required by the platform (LeetCode uses 32‑bit integer range).

## Examples
```text
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Input: n = 5
Output: 5
Explanation: Sequence: 0,1,1,2,3,5 → F(5)=5.
```

## Approach
Iteratively build the sequence using two variables to hold the two most recent values. This yields O(n) time and O(1) space.

## Pseudocode
```text
FUNCTION fib(n):
    IF n == 0: RETURN 0
    IF n == 1: RETURN 1
    SET a ← 0
    SET b ← 1
    FOR i FROM 2 TO n:
        SET temp ← a + b
        SET a ← b
        SET b ← temp
    RETURN b
```

## Walkthrough
| i | a (F(i‑2)) | b (F(i‑1)) | temp = a+b (F(i)) |
|---|-----------|-----------|-------------------|
| 2 | 0 | 1 | 1 |
| 3 | 1 | 1 | 2 |
| 4 | 1 | 2 | 3 |
| 5 | 2 | 3 | 5 |
The loop ends with `b = 5`, which is `F(5)`.

## Complexity Analysis
- **Time:** O(n) – each integer from 2 to n is processed once.
- **Space:** O(1) – only a few scalar variables are used.

## Follow‑Up Questions
- How can you compute `F(n)` in O(log n) time? (Use matrix exponentiation or fast doubling.)
- What modifications are needed to handle very large `n` under a modulus?
- Can you derive a closed‑form expression (Binet's formula) and discuss its numerical stability?

## Key Takeaway
An iterative two‑variable update provides the simplest and most efficient way to compute Fibonacci numbers in linear time with constant space.
