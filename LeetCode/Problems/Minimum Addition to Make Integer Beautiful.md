# 2457. Minimum Addition to Make Integer Beautiful

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Infosys, Meta
---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a positive integer `n` and a `target`, find the minimum non-negative integer `x` such that `n + x` has a digit sum ≤ `target`.

---

## Key Insight

> Round `n` up to the next multiple of increasing powers of 10 until the digit sum drops to ≤ target. Each rounding zeros out a low digit and potentially carries into higher digits, reducing the digit sum.

---

## Approach: Greedy Rounding — O(log² n) ✅

```
FUNCTION makeIntegerBeautiful(n, target):
    original ← n
    IF digitSum(n) ≤ target THEN RETURN 0
    power ← 1
    WHILE digitSum(n) > target DO
        n ← CEIL(n / (10 * power)) * 10 * power
        power ← power * 10
    RETURN n - original
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy rounding | **O(log² n)** | **O(1)** |

---

## Key Takeaway

> **Round up by increasing powers of 10** — each rounding zeros out digits from the right, reducing digit sum. Stop when the sum drops to the target.

---
