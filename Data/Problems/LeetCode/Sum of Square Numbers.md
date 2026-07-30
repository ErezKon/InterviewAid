# 633. Sum of Square Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-square-numbers](https://leetcode.com/problems/sum-of-square-numbers)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Problem Description
Given a non‑negative integer `c`, determine whether there exist two integers `a` and `b` such that `a² + b² = c`. Return `true` if such a pair exists, otherwise return `false`.

## Examples
**Example 1:**
```
Input: c = 5
Output: true
Explanation: 1² + 2² = 5.
```

**Example 2:**
```
Input: c = 3
Output: false
Explanation: No pair of squares sums to 3.
```

## Approach
Use the two‑pointer technique on the sorted list of possible square values. Start with `a = 0` (smallest square) and `b = ⌊√c⌋` (largest possible square). Adjust pointers based on the sum compared to `c`.

### Pseudocode
```text
FUNCTION judgeSquareSum(c):
    a ← 0
    b ← FLOOR(SQRT(c))
    WHILE a ≤ b:
        sum ← a * a + b * b
        IF sum = c:
            RETURN true
        ELSE IF sum < c:
            a ← a + 1
        ELSE:
            b ← b - 1
    RETURN false
```

## Walkthrough
For `c = 5`:
| Step | a | b | sum | Action |
|------|---|---|-----|--------|
|1|0|2|0+4=4|sum < 5 → a = 1|
|2|1|2|1+4=5|sum = 5 → return true|

## Complexity Analysis
- **Time:** `O(√c)` – each pointer moves at most `√c` steps.
- **Space:** `O(1)` – only a few integer variables.

## Follow‑Up Questions
1. How would you extend this to find all distinct pairs `(a, b)`?
2. Can the problem be solved using number‑theoretic properties (e.g., Fermat's theorem on sums of two squares)?
3. How would the algorithm change if `c` could be negative?

## Key Takeaway
Two pointers on the range `[0, √c]` provide a simple linear‑time solution for checking the sum‑of‑two‑squares condition without extra space.
