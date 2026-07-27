# 2110. Number of Smooth Descent Periods of a Stock

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Running Length — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays where each consecutive pair decreases by exactly 1 (smooth descent). Single elements count.

---

## 2. Key Insight

> Track the current run length of consecutive descent. Each new element extending a descent contributes `run` new subarrays ending at it.

---

## 3. Approach: Running Length — O(n) ✅

```
FUNCTION getDescentPeriods(prices):
    count = 0; run = 0
    FOR i ← 0 TO len(prices) - 1:
        IF i > 0 AND prices[i] == prices[i-1] - 1: run += 1
        ELSE: run = 1
        count += run
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Running length accumulation.** A run of length `k` contributes `k*(k+1)/2` subarrays total. Incrementally add `run` at each step.
