# 2427. Number of Common Factors

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#problem-description)
2. [Examples](#examples)
3. [Approach](#approach)
4. [Walkthrough](#walkthrough)
5. [Complexity Analysis](#complexity-analysis)
6. [Follow-Up Questions](#follow-up-questions)
7. [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two positive integers `a` and `b`, return the number of common factors they share. A factor of a number divides it evenly with no remainder.

---

## Examples

**Example 1:**
```
Input: a = 12, b = 6
Output: 4
Explanation: The common factors are 1, 2, 3, and 6.
```

**Example 2:**
```
Input: a = 25, b = 30
Output: 2
Explanation: The common factors are 1 and 5.
```

---

## Approach

A straightforward method iterates from `1` to `min(a, b)` and counts numbers that divide both `a` and `b`. A more efficient alternative is to compute `g = gcd(a, b)` and count the divisors of `g`.

```text
FUNCTION commonFactors(a, b):
    g ← GCD(a, b)
    count ← 0
    FOR i ← 1 TO √g:
        IF g MOD i == 0:
            IF i * i == g:
                count ← count + 1   // perfect square divisor
            ELSE:
                count ← count + 2   // i and g/i are distinct divisors
    RETURN count
```

---

## Walkthrough

Consider **Example 1** (`a = 12`, `b = 6`).
| Step | Action | `g = GCD(12,6)` | Divisors Found |
|------|--------|----------------|----------------|
| 1 | Compute GCD | 6 | — |
| 2 | Iterate i = 1 → √6 ≈ 2 | — | i=1 divides 6 → count+=2 (1,6) |
| 3 | i = 2 divides 6 → count+=2 (2,3) | — | Total count = 4 |
The four divisors correspond to the common factors 1, 2, 3, 6.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(√g) – iterating up to the square root of the GCD |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution to return the list of common factors instead of just the count?
2. Can you solve the problem without computing the GCD, using only a single loop up to `min(a, b)`?
3. How does the approach change if `a` and `b` can be up to 10⁹?

---

## Key Takeaway

> **Reduce to divisor counting of the GCD.** Compute `gcd(a, b)` and count its divisors in O(√g) time.
