# 2059. Minimum Operations to Convert Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-convert-number](https://leetcode.com/problems/minimum-operations-to-convert-number)
**Companies:** Google

---

## Problem Description
Given a positive integer `num`, you may perform the following operation any number of times: choose a positive integer `x` such that `x` is a divisor of the current number and replace the number with `num / x`. The operation cost is 1. Determine the minimum number of operations required to reduce `num` to 1.

## Examples
- Input: `12` → Output: `3` (12 → 6 (divide by 2) → 3 (divide by 2) → 1 (divide by 3)).
- Input: `1` → Output: `0` (already 1).

## Approach
The optimal strategy is to always divide by the largest prime factor, which reduces the number most quickly. Compute the prime factorization, then the answer equals the total count of prime factors (with multiplicity).

```text
FUNCTION minOperations(num):
    IF num = 1: RETURN 0
    SET ops ← 0
    SET divisor ← 2
    WHILE divisor * divisor ≤ num:
        WHILE num MOD divisor = 0:
            SET num ← num / divisor
            SET ops ← ops + 1
        SET divisor ← divisor + 1
    IF num > 1: // remaining prime factor
        SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Step | num before | divisor | Action | num after | ops |
|------|------------|---------|--------|-----------|-----|
| 1 | 12 | 2 | divide while divisible | 3 | 2 |
| 2 | 3 | 3 | divide once | 1 | 3 |
Result = 3 operations.

## Complexity Analysis
Time: O(√n) for trial division. Space: O(1).

## Follow-Up Questions
- How would you handle very large `num` where trial division is too slow?
- What if you could also multiply by a divisor instead of dividing?
- Can you compute the sequence of divisors used?

## Key Takeaway
The minimum number of operations equals the total number of prime factors (including repeats); dividing by each prime factor reduces the number optimally.
