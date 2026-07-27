# 2427. Number of Common Factors

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force — O(min(a,b))](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the number of common factors of `a` and `b`.

---

## 2. Approach: Brute Force — O(min(a,b)) ✅

```
FUNCTION commonFactors(a, b):
    RETURN SUM(1 for i in range(1, MIN(a,b)+1) if a%i==0 and b%i==0)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(min(a, b)) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Iterate up to min and check divisibility.** Alternatively, find `gcd(a, b)` and count its divisors for O(√gcd) time.
