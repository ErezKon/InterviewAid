# 2485. Find the Pivot Integer

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math — O(1) ✅](#3-approach-math--o1-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Find `x` such that `1 + 2 + ... + x = x + (x+1) + ... + n`. Return -1 if no such x exists.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Key Insight

> Sum 1..x = Sum x..n implies `x(x+1)/2 = n(n+1)/2 - x(x-1)/2`, simplifying to `x² = n(n+1)/2`. Check if this is a perfect square.

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION pivotInteger(n):
    // 1+2+...+x = x+...+n → x² = n(n+1)/2
    val = n * (n + 1) // 2
    x = int(sqrt(val))
    RETURN x IF x * x == val ELSE -1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Derive `x² = n(n+1)/2` algebraically. If this value is a perfect square, `x = √(n(n+1)/2)`, else no pivot exists.
