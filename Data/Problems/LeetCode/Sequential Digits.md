# 1291. Sequential Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sequential-digits](https://leetcode.com/problems/sequential-digits)
**Companies:** F5 Networks, Google, Meta
---

## Problem Description

Given two integers `low` and `high`, return a sorted list of all integers in the inclusive range `[low, high]` whose digits form an increasing sequence where each digit is exactly one greater than the previous digit (e.g., 123, 4567).

---

## Examples

**Example 1:**
```
Input: low = 100, high = 300
Output: [123, 234]
Explanation: The sequential-digit numbers between 100 and 300 are 123 and 234.
```

**Example 2:**
```
Input: low = 10, high = 10000
Output: [12,23,34,45,56,67,78,89,123,234,345,456,567,678,789,1234,2345,3456,4567,5678,6789,12345]
```

---

## Approach

Enumerate all possible sequential-digit numbers (there are at most 36) by varying length (2‑9) and starting digit (1‑9‑length). Filter those that lie within `[low, high]`.

```text
FUNCTION sequentialDigits(low, high):
    SET result ← []
    FOR length FROM 2 TO 9:
        FOR start FROM 1 TO 10 - length:
            SET num ← 0
            FOR d FROM start TO start + length - 1:
                SET num ← num * 10 + d
            IF low ≤ num ≤ high:
                APPEND num TO result
    RETURN result
```

---

## Walkthrough

Consider `low = 100`, `high = 300`:
| length | start | generated num |
|--------|-------|---------------|
| 2 | 1‑9 | 12,23,...,89 (all <100) |
| 3 | 1‑7 | 123,234,345,...,789 |
Only 123 and 234 satisfy `100 ≤ num ≤ 300`.

---

## Complexity Analysis

- **Time:** O(1) – at most 36 numbers are generated regardless of the input range.
- **Space:** O(k) where k is the number of valid sequential-digit numbers returned.

---

## Follow-Up Questions

1. How would you adapt the solution to handle decreasing sequential digits (e.g., 321)?
2. Can you generate the numbers without nested loops, using arithmetic progression?
3. How would you modify the algorithm to work for a different base (e.g., base‑16)?

---

## Key Takeaway

> Because the total count of sequential‑digit numbers is bounded (36), a simple enumeration and filter yields an optimal O(1) solution.
