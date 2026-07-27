# 1925. Count Square Sum Triples

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-square-sum-triples](https://leetcode.com/problems/count-square-sum-triples)
**Companies:** Bloomberg, Google, Meta, Qualtrics, Turing

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a positive integer `n`, return the number of triples `(a, b, c)` where `1 <= a, b, c <= n` and `a² + b² = c²` (Pythagorean triples).

**Constraints:**
- `1 <= n <= 250`

---

## Examples

**Example 1:**
- **Input:** `n = 5`
- **Output:** `2`
- **Explanation:** (3,4,5) and (4,3,5).

---

## Key Insight

Enumerate pairs `(a, b)`, compute `c = √(a² + b²)`, and check if `c` is a perfect integer ≤ n. Since `a` and `b` are ordered, multiply by 2 when `a ≠ b` to count both orderings.

---

## Approach

```
FUNCTION countTriples(n):
    count = 0
    FOR a ← 1 TO n:
        FOR b ← a TO n:
            c = sqrt(a*a + b*b)
            IF c == int(c) AND c <= n: count += 2 IF a != b ELSE 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) |
| **Space** | O(1) |

---

## Key Takeaway

> **Pythagorean triple enumeration: iterate two sides, compute the third, check if it's a perfect square. The constraint n ≤ 250 makes O(n²) trivially fast.**
