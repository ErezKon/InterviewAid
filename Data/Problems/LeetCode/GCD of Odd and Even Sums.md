# 3658. GCD of Odd and Even Sums

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/gcd-of-odd-and-even-sums](https://leetcode.com/problems/gcd-of-odd-and-even-sums)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
You are given an integer `n`. Your task is to compute the **GCD** (greatest common divisor) of two values:

- `sumOdd`: the sum of the smallest `n` positive odd numbers.
- `sumEven`: the sum of the smallest `n` positive even numbers.

Return the GCD of `sumOdd` and `sumEven`.

**Constraints:**
- `1 <= n <= 1000`

## Examples
```
Example 1:
  Input: n = 4
  Output: 4
  Explanation:
  - Sum of the first 4 odd numbers sumOdd = 1 + 3 + 5 + 7 = 16
  - Sum of the first 4 even numbers sumEven = 2 + 4 + 6 + 8 = 20
  Hence, GCD(sumOdd, sumEven) = GCD(16, 20) = 4.
```
```
Example 2:
  Input: n = 5
  Output: 5
  Explanation:
  - Sum of the first 5 odd numbers sumOdd = 1 + 3 + 5 + 7 + 9 = 25
  - Sum of the first 5 even numbers sumEven = 2 + 4 + 6 + 8 + 10 = 30
  Hence, GCD(sumOdd, sumEven) = GCD(25, 30) = 5.
```

## Approach
Calculate the two sums in a single pass, then apply Euclid's algorithm to find their GCD.

```text
FUNCTION gcdOfSums(nums):
    oddSum ← 0
    evenSum ← 0
    FOR num IN nums:
        IF num MOD 2 == 1:
            oddSum ← oddSum + num
        ELSE:
            evenSum ← evenSum + num
    // Euclidean algorithm
    WHILE evenSum ≠ 0:
        temp ← evenSum
        evenSum ← oddSum MOD evenSum
        oddSum ← temp
    RETURN oddSum
```
The loop terminates when the remainder becomes zero, leaving the GCD in `oddSum`.

## Walkthrough
| Step | num | oddSum | evenSum |
|------|-----|--------|---------|
| 1 | 1 | 1 | 0 |
| 2 | 2 | 1 | 2 |
| 3 | 3 | 4 | 2 |
| 4 | 4 | 4 | 6 |
| 5 | 5 | 9 | 6 |
After loop: GCD(9,6) → 3.

## Complexity Analysis
- **Time:** `O(n)` for the single pass plus `O(log min(oddSum, evenSum))` for GCD computation.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you modify the solution if the array is extremely large and cannot fit in memory?
2. Can you compute the GCD incrementally as you stream the numbers?
3. What if you need the GCD of sums of numbers at even and odd *indices* instead of parity?

## Key Takeaway
Separating the array into two groups based on a simple property and then applying Euclid's algorithm yields the GCD efficiently.
