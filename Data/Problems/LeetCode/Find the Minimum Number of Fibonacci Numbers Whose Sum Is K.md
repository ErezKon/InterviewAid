# 1414. Find the Minimum Number of Fibonacci Numbers Whose Sum Is K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k](https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy — O(log k) ✅](#4-approach-greedy--olog-k-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an integer `k`, *return the minimum number of Fibonacci numbers whose sum is equal to* `k`. The same Fibonacci number can be used multiple times.

The Fibonacci numbers are defined as:

- `F1 = 1`
- `F2 = 1`
- `Fn = Fn-1 + Fn-2` for `n > 2`.

It is guaranteed that for the given constraints we can always find such Fibonacci numbers that sum up to `k`.

**Constraints:**
- `1 <= k <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: k = 7
  Output: 2
  Explanation: The Fibonacci numbers are: 1, 1, 2, 3, 5, 8, 13, ...
  For k = 7 we can use 2 + 5 = 7.

Example 2:
  Input: k = 10
  Output: 2
  Explanation: For k = 10 we can use 2 + 8 = 10.

Example 3:
  Input: k = 19
  Output: 3
  Explanation: For k = 19 we can use 1 + 5 + 13 = 19.
```

---

## 3. Key Insight

> Greedily subtract the largest Fibonacci number ≤ k. By Zeckendorf's theorem, every positive integer has a unique representation as a sum of non-consecutive Fibonacci numbers, and greedy gives the minimum count.

---

## 4. Approach: Greedy — O(log k) ✅

```
FUNCTION findMinFibonacciNumbers(k):
    // Generate Fibonacci numbers up to k
    fibs ← [1, 1]
    WHILE fibs[-1] < k DO
        fibs.APPEND(fibs[-1] + fibs[-2])

    count ← 0
    FOR i ← LENGTH(fibs) - 1 DOWNTO 0 DO
        IF fibs[i] <= k THEN
            k -= fibs[i]
            count += 1
        IF k == 0 THEN BREAK

    RETURN count
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log k) — ~44 Fibonacci numbers up to 10⁹ |
| **Space** | O(log k) |

---

## 6. Key Takeaway

> **Greedy with Fibonacci** always works for minimum count by Zeckendorf's theorem. Generate Fibonacci numbers up to k, then greedily subtract the largest.
