# 829. Consecutive Numbers Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/consecutive-numbers-sum](https://leetcode.com/problems/consecutive-numbers-sum)
**Companies:** Airbnb, Amazon, De Shaw, Google, Microsoft, Oracle, Tiktok, Zoho

---

## Problem Description
Given a positive integer `n`, return the number of ways to write `n` as the sum of one or more consecutive positive integers.

## Examples
- Input: `n = 5` → Output: `2` (5 = 5, 5 = 2+3)
- Input: `n = 9` → Output: `3` (9 = 9, 9 = 4+5, 9 = 2+3+4)

## Approach
**Algorithm:** Math based on divisor enumeration (O(√n))
The sum of `k` consecutive numbers starting from `x` is `k*x + k*(k-1)/2 = n`. Rearranged, `x = (n - k*(k-1)/2) / k` must be a positive integer. Iterate `k` while `k*(k-1)/2 < n` and count valid `k`.

```text
FUNCTION consecutiveNumbersSum(n):
    SET count ← 0
    SET k ← 1
    WHILE k * (k - 1) / 2 < n:
        IF (n - k * (k - 1) / 2) MOD k == 0:
            SET count ← count + 1
        SET k ← k + 1
    RETURN count
```

## Walkthrough
| k | k*(k-1)/2 | n - k*(k-1)/2 | Divisible by k? | Count |
|---|-----------|--------------|----------------|-------|
| 1 | 0         | n            | always true   | +1 |
| 2 | 1         | n-1          | check          | ... |
| … | …         | …            | …              | … |
The loop stops when `k*(k-1)/2` exceeds `n`.

## Complexity Analysis
- **Time:** O(√n) – we iterate up to √(2n).
- **Space:** O(1) – only constant extra variables.

## Follow-Up Questions
- How would you modify the solution to list all possible sequences, not just count them?
- Can this be extended to include negative integers in the sequences?
- What is the relationship between this problem and the number of odd divisors of `n`?

## Key Takeaway
The number of ways to represent `n` as a sum of consecutive positive integers equals the count of odd divisors of `n`, which can be found by iterating possible sequence lengths up to √n.