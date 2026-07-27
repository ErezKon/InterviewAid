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

Given integer `k`, return the minimum number of Fibonacci numbers whose sum equals `k`. Each Fibonacci number can be used multiple times.

**Constraints:**
- `1 <= k <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  k = 7
  Output: 2
  Reason: 7 = 5 + 2. Both are Fibonacci numbers.
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
