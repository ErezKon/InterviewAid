# 826. Most Profit Assigning Work

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-profit-assigning-work](https://leetcode.com/problems/most-profit-assigning-work)
**Companies:** Amazon, Doordash, Google, Meta, Microsoft, Netease

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Two Pointers — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Assign each worker a job with `difficulty ≤ worker's ability`. Each worker does at most one job. Multiple workers can do the same job. Return **maximum total profit**.

**Constraints:**
- `1 <= n <= 10⁴`

---

## 2. Key Insight

> Sort jobs by difficulty and workers by ability. Sweep through workers with a pointer into jobs, maintaining a running max profit. Each worker gets the best profit available at their ability level.

---

## 3. Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION maxProfitAssignment(difficulty, profit, worker):
    jobs = sorted(zip(difficulty, profit))
    SORT worker

    maxProfit = 0; j = 0; total = 0
    FOR ability IN worker:
        WHILE j < len(jobs) AND jobs[j][0] <= ability:
            maxProfit = MAX(maxProfit, jobs[j][1])
            j += 1
        total += maxProfit

    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sort both arrays, sweep with running max.** As workers get stronger, more jobs become available. The running max tracks the best profit seen so far — no need to re-scan.
